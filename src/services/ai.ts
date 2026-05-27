export interface ScanResult {
  disease: string;
  confidence: number;
  treatment: string[];
}

const USE_MOCK = true;

export async function analyzeImage(imageBase64: string, onProgress?: (step: string) => void): Promise<ScanResult> {
  if (USE_MOCK) {
    if (onProgress) onProgress('Analyzing image with Qwen Vision...');
    await new Promise(r => setTimeout(r, 2000));

    if (onProgress) onProgress('Generating treatment plan with Cerebras...');
    await new Promise(r => setTimeout(r, 2000));

    return {
      disease: 'Cassava Mosaic Disease',
      confidence: 94,
      treatment: [
        'Uproot and burn infected plants immediately.',
        'Use disease-free stem cuttings for next planting.',
        'Control whiteflies using recommended organic pesticides.',
        'Practice crop rotation with non-host crops like maize or legumes.'
      ]
    };
  }

  try {
    if (onProgress) onProgress('Uploading image...');

    throw new Error("Backend not connected yet");
  } catch (error) {
    console.error("Error analyzing image:", error);
    throw error;
  }
}
