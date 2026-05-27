import { useState, useEffect } from 'react';
import { cn } from './utils/cn';

// Icons
const LeafIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
  </svg>
);

const CameraIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
    <circle cx="12" cy="13" r="3" />
  </svg>
);

const BrainIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z" />
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z" />
  </svg>
);

const WifiOffIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <line x1="1" y1="1" x2="23" y2="23" />
    <path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55" />
    <path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39" />
    <path d="M10.71 5.05A16 16 0 0 1 22.58 9" />
    <path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88" />
    <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
    <line x1="12" y1="20" x2="12.01" y2="20" />
  </svg>
);

const CheckIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const MenuIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const XIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const PhoneIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
    <line x1="12" y1="18" x2="12.01" y2="18" />
  </svg>
);

const GlobeIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const ShieldCheckIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <polyline points="9 12 12 15 16 10" />
  </svg>
);

const ZapIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const ArrowRightIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const StarIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const QuoteIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
    <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
  </svg>
);

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const LinkedInIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const TwitterIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

// Demo Image Component
const DemoScan = () => {
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<null | { disease: string; confidence: number; solution: string }>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setScanning(true);
      setTimeout(() => {
        setResult({
          disease: "Cassava Mosaic Disease",
          confidence: 94,
          solution: "Apply neem oil spray and remove infected leaves. Use resistant varieties for next planting."
        });
        setScanning(false);
      }, 2500);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full max-w-xs mx-auto sm:max-w-xs px-2 sm:px-0">
      <div className="relative bg-gradient-to-br from-emerald-50 to-green-100 rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
        {/* Leaf Image Simulation */}
        <div className="aspect-square relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-48 h-48 relative">
              {/* Cassava Leaf Shape */}
              <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-lg">
                <path
                  d="M100 20 Q130 50 140 90 Q150 130 120 160 Q100 180 80 160 Q50 130 60 90 Q70 50 100 20"
                  fill="#84cc16"
                  stroke="#65a30d"
                  strokeWidth="2"
                />
                <path d="M100 20 L100 160" stroke="#65a30d" strokeWidth="3" />
                <ellipse cx="110" cy="80" rx="8" ry="12" fill="#a3e635" opacity="0.6" />
                <ellipse cx="90" cy="100" rx="6" ry="10" fill="#a3e635" opacity="0.6" />
                {/* Disease spots */}
                <circle cx="105" cy="70" r="5" fill="#f59e0b" opacity="0.7" />
                <circle cx="95" cy="120" r="4" fill="#f59e0b" opacity="0.7" />
                <circle cx="115" cy="110" r="3" fill="#f59e0b" opacity="0.7" />
              </svg>
            </div>
          </div>

          {/* Scanning Effect */}
          {scanning && (
            <>
              <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/20 to-transparent animate-scan" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="w-32 h-32 border-2 border-emerald-400 rounded-lg animate-pulse" />
              </div>
            </>
          )}

          {/* Corner Markers */}
          <div className="absolute top-4 left-4 w-8 h-8 border-l-4 border-t-4 border-emerald-500 rounded-tl-lg" />
          <div className="absolute top-4 right-4 w-8 h-8 border-r-4 border-t-4 border-emerald-500 rounded-tr-lg" />
          <div className="absolute bottom-4 left-4 w-8 h-8 border-l-4 border-b-4 border-emerald-500 rounded-bl-lg" />
          <div className="absolute bottom-4 right-4 w-8 h-8 border-r-4 border-b-4 border-emerald-500 rounded-br-lg" />
        </div>

        {/* Result Card */}
        {result && (
          <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm p-4 animate-in slide-in-from-bottom duration-500">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
              <span className="text-sm font-semibold text-red-600">{result.disease}</span>
            </div>
            <div className="text-xs text-gray-600 mb-2">Confidence: {result.confidence}%</div>
            <div className="text-xs text-emerald-700 bg-emerald-50 p-2 rounded-lg">
              <span className="font-semibold">Solution:</span> {result.solution}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Navigation Component
const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Features', href: '#features' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Testimonials', href: '#testimonials' },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      scrolled ? "glass shadow-lg py-3" : "bg-transparent py-5"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <a href="#" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
              <LeafIcon className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">AgriScan<span className="text-emerald-600">AI</span></span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="text-gray-600 hover:text-emerald-600 font-medium transition-colors">
                {link.name}
              </a>
            ))}
            <button
              onClick={onOpenScanner}
              className="bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white px-5 py-2.5 rounded-full font-semibold transition-all hover:shadow-lg hover:shadow-emerald-200 cursor-pointer"
            >
              Scan Crop Now
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 text-gray-700">
            {isOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-xl border-t">
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block py-2 text-gray-700 hover:text-emerald-600 font-medium"
                >
                  {link.name}
                </a>
              ))}
              <button
                onClick={onOpenScanner}
                className="block w-full bg-emerald-600 active:scale-95 text-white py-3 rounded-xl font-semibold mt-4 text-center transition-transform cursor-pointer"
              >
                Scan Crop Now
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

// Hero Section
const Hero = () => (
  <section className="relative pt-24 pb-12 lg:pt-40 lg:pb-32 overflow-hidden">
    {/* Background Elements */}
    <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-lime-50" />
    <div className="absolute top-20 right-0 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl" />
    <div className="absolute bottom-0 left-0 w-72 h-72 bg-lime-200/30 rounded-full blur-3xl" />

    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="text-center lg:text-left">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            AI-Powered with MediaPipe Technology
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
            Protect Your Crops with{' '}
            <span className="bg-gradient-to-r from-emerald-600 to-lime-500 bg-clip-text text-transparent">
              AI Intelligence
            </span>
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0">
            Snap a photo of any crop disease and get instant diagnosis in English.
            Works offline on any Android device - no internet needed!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button
              onClick={onOpenScanner}
              className="bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all hover:shadow-xl hover:shadow-emerald-200 flex items-center justify-center gap-2 cursor-pointer"
            >
              <CameraIcon className="w-5 h-5" />
              Scan Crop Now
            </button>
            <a
              href="https://wa.me/2349079246026"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white hover:bg-gray-50 active:scale-95 text-gray-700 border-2 border-gray-200 px-8 py-4 rounded-full font-semibold text-lg transition-all hover:border-emerald-300 flex items-center justify-center gap-2"
            >
              <PhoneIcon className="w-5 h-5" />
              Download App
            </a>
          </div>

          {/* Trust Badges */}
          <div className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <CheckIcon className="w-5 h-5 text-emerald-500" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckIcon className="w-5 h-5 text-emerald-500" />
              <span>Works offline</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckIcon className="w-5 h-5 text-emerald-500" />
              <span>English language support</span>
            </div>
          </div>
        </div>

        <div className="relative">
          <DemoScan />
          {/* Floating Elements */}
          <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg p-3 animate-float">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                <BrainIcon className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <div className="text-xs text-gray-500">AI Accuracy</div>
                <div className="font-bold text-emerald-600">94%+</div>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-3 animate-float" style={{ animationDelay: '0.5s' }}>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-lime-100 rounded-lg flex items-center justify-center">
                <GlobeIcon className="w-5 h-5 text-lime-600" />
              </div>
              <div>
                <div className="text-xs text-gray-500">Language</div>
                <div className="font-bold text-lime-600">English</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// Features Section
const Features = () => {
  const features = [
    {
      icon: CameraIcon,
      title: "Instant Photo Analysis",
      description: "Take a picture of any crop leaf and get disease diagnosis in seconds using advanced AI-powered vision.",
      color: "emerald"
    },
    {
      icon: WifiOffIcon,
      title: "Works Offline",
      description: "No internet? No problem! Our AI runs directly on your device using MediaPipe technology.",
      color: "blue"
    },
    {
      icon: GlobeIcon,
      title: "English Language",
      description: "Get results and solutions in clear English language for easy understanding and implementation.",
      color: "purple"
    },
    {
      icon: ShieldCheckIcon,
      title: "Treatment Solutions",
      description: "Receive specific, actionable advice on how to treat detected diseases and prevent future outbreaks.",
      color: "orange"
    },
    {
      icon: ZapIcon,
      title: "Fast & Accurate",
      description: "Our AI-powered system delivers 94%+ accuracy in disease detection across all crop types.",
      color: "yellow"
    },
    {
      icon: PhoneIcon,
      title: "Mobile Optimized",
      description: "Designed specifically for Android devices with low resource requirements. Works on any smartphone.",
      color: "pink"
    }
  ];

  return (
    <section id="features" className="py-12 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Everything You Need to{' '}
            <span className="text-emerald-600">Protect Your Farm</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our AI-powered platform gives farmers the tools they need to identify and treat crop diseases before they spread.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="group p-6 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-emerald-100"
            >
              <div className={cn(
                "w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-colors",
                feature.color === 'emerald' && "bg-emerald-100 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white",
                feature.color === 'blue' && "bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white",
                feature.color === 'purple' && "bg-purple-100 text-purple-600 group-hover:bg-purple-600 group-hover:text-white",
                feature.color === 'orange' && "bg-orange-100 text-orange-600 group-hover:bg-orange-600 group-hover:text-white",
                feature.color === 'yellow' && "bg-yellow-100 text-yellow-600 group-hover:bg-yellow-600 group-hover:text-white",
                feature.color === 'pink' && "bg-pink-100 text-pink-600 group-hover:bg-pink-600 group-hover:text-white",
              )}>
                <feature.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// How It Works Section
const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Take a Photo",
      description: "Open the app and take a clear picture of the affected crop leaf or plant using your phone camera."
    },
    {
      number: "02",
      title: "AI Analysis",
      description: "Our AI-powered system instantly analyzes the image to detect diseases, pests, or nutrient deficiencies."
    },
    {
      number: "03",
      title: "Get Results",
      description: "Receive detailed diagnosis with confidence score, disease information, and treatment recommendations."
    },
    {
      number: "04",
      title: "Apply Solution",
      description: "Follow the step-by-step treatment guide in English language to cure your crops and prevent future issues."
    }
  ];

  return (
    <section id="how-it-works" className="py-12 lg:py-20 bg-gradient-to-b from-emerald-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Simple Steps to{' '}
            <span className="text-emerald-600">Healthier Crops</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our easy-to-use app guides you through the entire process in just a few taps.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, idx) => (
            <div key={idx} className="relative">
              <div className="text-6xl font-bold text-emerald-100 mb-4">{step.number}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-emerald-200 -translate-x-1/2" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Validation Section
const ValidationSection = () => {
  return (
    <section className="py-12 lg:py-20 bg-emerald-900 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 p-12 opacity-10">
        <LeafIcon className="w-64 h-64" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-emerald-800 text-emerald-100 px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-emerald-700">
              <span className="w-2 h-2 bg-lime-400 rounded-full animate-pulse" />
              Industry Validation
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Recognized & Validated by <span className="text-lime-400">Agricultural Experts</span>
            </h2>
            <p className="text-lg text-emerald-100 mb-8 max-w-xl">
              Our AI technology isn't just theory—it's been rigorously tested and validated for accuracy and reliability in real-world farming conditions.
              See how we're revolutionizing crop protection with cutting-edge artificial intelligence.
            </p>

            <a
              href="https://elitehustlevaultcentral.blogspot.com/2026/02/ai-revolutionizing-crop-protection.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-lime-400 hover:bg-lime-500 text-emerald-900 px-6 py-3 rounded-xl font-bold transition-all hover:scale-105 shadow-lg shadow-lime-900/20"
            >
              Read Validation Report
              <ArrowRightIcon className="w-5 h-5" />
            </a>
          </div>

          <div className="bg-emerald-800/50 backdrop-blur-sm rounded-2xl p-8 border border-emerald-700/50">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <ShieldCheckIcon className="w-6 h-6 text-lime-400" />
              Why Trust AgriScan AI?
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <CheckIcon className="w-5 h-5 text-lime-400 mt-0.5 flex-shrink-0" />
                <span className="text-emerald-100">Validated against thousands of disease samples</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckIcon className="w-5 h-5 text-lime-400 mt-0.5 flex-shrink-0" />
                <span className="text-emerald-100">94%+ detection accuracy in field tests</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckIcon className="w-5 h-5 text-lime-400 mt-0.5 flex-shrink-0" />
                <span className="text-emerald-100">Endorsed by agricultural extension officers</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckIcon className="w-5 h-5 text-lime-400 mt-0.5 flex-shrink-0" />
                <span className="text-emerald-100">Featured in leading agricultural tech blogs</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

// Pricing Section
const Pricing = () => {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for trying out the app",
      features: [
        "10 scans per month",
        "Basic disease detection",
        "English language only",
        "Online mode only",
        "Community support"
      ],
      cta: "Get Started",
      link: "https://wa.me/2349079246026",
      popular: false
    },
    {
      name: "Farmer Pro",
      price: "$4.99",
      period: "per month",
      description: "Best for small-scale farmers",
      features: [
        "Unlimited scans",
        "Advanced AI detection",
        "English language",
        "Offline mode enabled",
        "Treatment recommendations",
        "Priority email support"
      ],
      cta: "Start Free Trial",
      link: "https://flutterwave.com/pay/bho7r7ehnkso",
      popular: true
    },
    {
      name: "Cooperative",
      price: "$19.99",
      period: "per month",
      description: "For farming cooperatives & groups",
      features: [
        "Everything in Pro",
        "Up to 10 farmer accounts",
        "Bulk crop monitoring",
        "Analytics dashboard",
        "Custom integrations",
        "24/7 phone support"
      ],
      cta: "Contact Sales",
      link: "https://wa.me/2349079246026",
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-12 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Affordable Plans for{' '}
            <span className="text-emerald-600">Every Farmer</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Start free and upgrade when you're ready. No hidden fees, cancel anytime.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={cn(
                "relative rounded-2xl p-8 transition-all duration-300",
                plan.popular
                  ? "bg-gradient-to-b from-emerald-600 to-emerald-700 text-white shadow-xl shadow-emerald-200 scale-105"
                  : "bg-gray-50 hover:shadow-lg border border-gray-100"
              )}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-lime-400 text-emerald-900 px-4 py-1 rounded-full text-sm font-bold">
                  Most Popular
                </div>
              )}
              <div className="mb-6">
                <h3 className={cn("text-xl font-bold mb-2", plan.popular ? "text-white" : "text-gray-900")}>
                  {plan.name}
                </h3>
                <p className={cn("text-sm", plan.popular ? "text-emerald-100" : "text-gray-500")}>
                  {plan.description}
                </p>
              </div>
              <div className="mb-6">
                <span className={cn("text-4xl font-bold", plan.popular ? "text-white" : "text-gray-900")}>
                  {plan.price}
                </span>
                <span className={cn("text-sm", plan.popular ? "text-emerald-200" : "text-gray-500")}>
                  /{plan.period}
                </span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, fidx) => (
                  <li key={fidx} className="flex items-center gap-3">
                    <CheckIcon className={cn("w-5 h-5 flex-shrink-0", plan.popular ? "text-lime-400" : "text-emerald-500")} />
                    <span className={cn("text-sm", plan.popular ? "text-emerald-50" : "text-gray-600")}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
              {plan.name === "Free Trial" ? (
                <button
                  onClick={onOpenScanner}
                  className={cn(
                    "w-full py-3 rounded-xl font-semibold transition-all block text-center cursor-pointer",
                    plan.popular
                      ? "bg-white text-emerald-600 hover:bg-emerald-50"
                      : "bg-emerald-600 text-white hover:bg-emerald-700"
                  )}
                >
                  Scan for Free
                </button>
              ) : (
                <a
                  href={plan.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "w-full py-3 rounded-xl font-semibold transition-all block text-center",
                    plan.popular
                      ? "bg-white text-emerald-600 hover:bg-emerald-50"
                      : "bg-emerald-600 text-white hover:bg-emerald-700"
                  )}
                >
                  {plan.cta}
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Testimonials Section
const Testimonials = () => {
  const testimonials = [
    {
      quote: "This app saved my cassava farm! I detected the mosaic disease early and treated it before it spread to all my crops.",
      author: "Amara Okafor",
      role: "Cassava Farmer, Nigeria",
      rating: 5
    },
    {
      quote: "The offline feature is a game-changer. I can scan my crops even in remote areas with no internet connection.",
      author: "Jean-Pierre Mutombo",
      role: "Maize Farmer, DRC",
      rating: 5
    },
    {
      quote: "Getting results in English makes it so easy to understand and follow the treatment instructions. Highly recommended!",
      author: "Amina Hassan",
      role: "Tomato Farmer, Kenya",
      rating: 5
    }
  ];

  return (
    <section id="testimonials" className="py-12 lg:py-20 bg-gradient-to-b from-white to-emerald-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Trusted by{' '}
            <span className="text-emerald-600">Farmers Worldwide</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join thousands of farmers who are already protecting their crops with AgriScan AI.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <StarIcon key={i} className="w-5 h-5 text-yellow-400" />
                ))}
              </div>
              <QuoteIcon className="w-8 h-8 text-emerald-200 mb-4" />
              <p className="text-gray-700 mb-6 italic">"{testimonial.quote}"</p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold">
                  {testimonial.author.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.author}</div>
                  <div className="text-sm text-gray-500">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// CTA Section
const CTA = () => (
  <section className="py-12 lg:py-20 bg-emerald-600">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
        Ready to Protect Your Crops?
      </h2>
      <p className="text-lg text-emerald-100 mb-8 max-w-2xl mx-auto">
        Start your free trial today and join thousands of farmers using AI to detect and treat crop diseases.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={onOpenScanner}
          className="bg-white text-emerald-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-emerald-50 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          Scan Your Crop
          <ArrowRightIcon className="w-5 h-5" />
        </button>
        <a
          href="https://wa.me/2349079246026"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-emerald-700 text-white border-2 border-emerald-500 px-8 py-4 rounded-full font-semibold text-lg hover:bg-emerald-800 transition-all"
        >
          Contact Sales
        </a>
      </div>
    </div>
  </section>
);

// Footer
const Footer = () => (
  <footer className="bg-gray-900 text-gray-300 py-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-4 gap-8 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center">
              <LeafIcon className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white">AgriScan<span className="text-emerald-500">AI</span></span>
          </div>
          <p className="text-sm text-gray-400">
            Empowering farmers with AI-powered crop disease detection and treatment solutions.
          </p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Product</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#features" className="hover:text-emerald-400 transition-colors">Features</a></li>
            <li><a href="#pricing" className="hover:text-emerald-400 transition-colors">Pricing</a></li>
            <li><a href="https://wa.me/2349079246026" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">Download App</a></li>
            <li><a href="#" className="hover:text-emerald-400 transition-colors">API</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="https://elitehustlevaultcentral.blogspot.com/p/about-royal-digital-empire_10.html" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors py-1 block">About Us</a></li>
            <li><a href="#" className="hover:text-emerald-400 transition-colors py-1 block">Blog</a></li>
            <li><a href="#" className="hover:text-emerald-400 transition-colors py-1 block">Careers</a></li>
            <li><a href="https://wa.me/2349079246026" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors py-1 block">Contact</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Support</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-emerald-400 transition-colors py-1 block">Help Center</a></li>
            <li><a href="#" className="hover:text-emerald-400 transition-colors py-1 block">Documentation</a></li>
            <li><a href="https://elitehustlevaultcentral.blogspot.com/p/privacy-policy.html" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors py-1 block">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-emerald-400 transition-colors py-1 block">Terms of Service</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm text-gray-500">
          © 2025 AgriScan AI. All rights reserved.
        </p>
        <div className="flex gap-4">
          <a
            href="https://x.com/agorbroders"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-emerald-400 transition-colors"
          >
            <span className="sr-only">Twitter</span>
            <TwitterIcon className="w-5 h-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/royalrdgpower"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-emerald-400 transition-colors"
          >
            <span className="sr-only">LinkedIn</span>
            <LinkedInIcon className="w-5 h-5" />
          </a>
          <a
            href="https://www.facebook.com/srdgintel"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-emerald-400 transition-colors"
          >
            <span className="sr-only">Facebook</span>
            <FacebookIcon className="w-5 h-5" />
          </a>
          <a
            href="https://wa.me/2349079246026"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-emerald-400 transition-colors"
          >
            <span className="sr-only">WhatsApp</span>
            <WhatsAppIcon className="w-5 h-5" />
          </a>
        </div>
      </div>
    </div>
  </footer>
);

// Main App Component
import { Scanner } from "./components/Scanner";

export function App() {
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  return (
    <div className="min-h-screen bg-white">
      <Navigation onOpenScanner={() => setIsScannerOpen(true)} />
      <Hero onOpenScanner={() => setIsScannerOpen(true)} />
      <Features />
      <HowItWorks />
      <ValidationSection />
      <Pricing onOpenScanner={() => setIsScannerOpen(true)} />
      <Testimonials />
      <CTA onOpenScanner={() => setIsScannerOpen(true)} />
      <Footer />
      {isScannerOpen && <Scanner onClose={() => setIsScannerOpen(false)} />}
    </div>
  );
}
