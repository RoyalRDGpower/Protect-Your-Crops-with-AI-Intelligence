import React, { useState, useRef } from 'react';
import { CameraIcon, UploadIcon, XIcon, CheckIcon, AlertCircleIcon } from 'lucide-react';
import { cn } from '../utils/cn';
import { analyzeImage, ScanResult } from '../services/ai';

interface ScannerProps {
  onClose: () => void;
}

export function Scanner({ onClose }: ScannerProps) {
  const [image, setImage] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState<string>('');
  const [result, setResult] = useState<ScanResult | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const startScan = async () => {
    if (!image) return;

    setIsScanning(true);
    setResult(null);
    setScanStep('Preparing scan...');

    try {
      const scanResult = await analyzeImage(image, (step) => {
        setScanStep(step);
      });
      setResult(scanResult);
    } catch (error) {
      console.error("Scan failed", error);
      // Fallback result on error
      setResult({
        disease: 'Analysis Failed',
        confidence: 0,
        treatment: ['Please try again later or contact support.']
      });
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-emerald-50">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <CameraIcon className="w-5 h-5 text-emerald-600" />
            Disease Scanner
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-emerald-100 rounded-full transition-colors text-gray-500 hover:text-gray-900"
          >
            <XIcon className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1">
          {!image ? (
            <div className="flex flex-col items-center justify-center py-12 px-4 border-2 border-dashed border-emerald-200 rounded-xl bg-emerald-50/50">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4 text-emerald-600">
                <UploadIcon className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Upload a photo of your crop</h3>
              <p className="text-gray-500 text-center mb-6 max-w-sm">
                For best results, make sure the affected area is clearly visible and well-lit.
              </p>

              <div className="flex gap-4 w-full max-w-xs">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex-1 bg-emerald-600 text-white py-3 px-4 rounded-xl font-medium hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <UploadIcon className="w-4 h-4" />
                  Choose File
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="hidden"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="relative rounded-xl overflow-hidden bg-gray-900 flex items-center justify-center h-64 md:h-80">
                <img
                  src={image}
                  alt="Crop to scan"
                  className="max-h-full max-w-full object-contain"
                />

                {isScanning && (
                  <div className="absolute inset-0 bg-emerald-900/40 backdrop-blur-sm flex flex-col items-center justify-center text-white p-6 text-center">
                    <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin mb-4"></div>
                    <p className="font-semibold text-lg">{scanStep}</p>
                  </div>
                )}
              </div>

              {!isScanning && !result && (
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={() => setImage(null)}
                    className="px-6 py-3 rounded-xl font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer"
                  >
                    Retake
                  </button>
                  <button
                    onClick={startScan}
                    className="px-6 py-3 rounded-xl font-medium text-white bg-emerald-600 hover:bg-emerald-700 transition-colors flex items-center gap-2 shadow-lg shadow-emerald-600/20 cursor-pointer"
                  >
                    <AlertCircleIcon className="w-5 h-5" />
                    Analyze Image
                  </button>
                </div>
              )}

              {result && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className={`bg-${result.confidence > 0 ? 'red' : 'gray'}-50 border border-${result.confidence > 0 ? 'red' : 'gray'}-100 rounded-xl p-5 flex items-start gap-4`}>
                    <div className={`w-10 h-10 rounded-full bg-${result.confidence > 0 ? 'red' : 'gray'}-100 flex items-center justify-center flex-shrink-0 text-${result.confidence > 0 ? 'red' : 'gray'}-600`}>
                      <AlertCircleIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{result.disease}</h3>
                      {result.confidence > 0 && (
                        <div className="flex items-center gap-2">
                          <div className="w-full bg-gray-200 rounded-full h-2 max-w-[200px]">
                            <div className="bg-red-500 h-2 rounded-full" style={{ width: `${result.confidence}%` }}></div>
                          </div>
                          <span className="text-sm font-medium text-gray-600">{result.confidence}% confidence</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <CheckIcon className="w-5 h-5 text-emerald-600" />
                      Recommended Treatment Plan
                    </h4>
                    <ul className="space-y-3">
                      {result.treatment.map((step: string, i: number) => (
                        <li key={i} className="flex gap-3 bg-gray-50 p-4 rounded-xl border border-gray-100">
                          <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-sm font-bold flex-shrink-0">
                            {i + 1}
                          </span>
                          <span className="text-gray-700">{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex gap-4 pt-4 border-t border-gray-100">
                    <button
                      onClick={() => setImage(null)}
                      className="flex-1 py-3 rounded-xl font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 transition-colors cursor-pointer"
                    >
                      Scan Another
                    </button>
                    <a
                      href="https://wa.me/2349079246026"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-3 rounded-xl font-medium text-white bg-emerald-600 hover:bg-emerald-700 transition-colors text-center"
                    >
                      Consult Expert
                    </a>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
