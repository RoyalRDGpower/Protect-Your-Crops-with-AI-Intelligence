import { ImageClassifier, FilesetResolver } from '@mediapipe/tasks-vision';

export interface ScanResult {
  disease: string;
  confidence: number;
  treatment: string[];
}

let classifier: ImageClassifier | null = null;

// A generic Image Classification model used as a placeholder
// For production, replace this URL with the actual crop disease model
const MODEL_URL = "https://storage.googleapis.com/mediapipe-models/image_classifier/efficientnet_lite0/float32/1/efficientnet_lite0.tflite";

async function getClassifier(): Promise<ImageClassifier> {
  if (classifier) return classifier;

  const vision = await FilesetResolver.forVisionTasks(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm"
  );

  classifier = await ImageClassifier.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath: MODEL_URL,
      delegate: "GPU"
    },
    maxResults: 1,
    runningMode: "IMAGE"
  });

  return classifier;
}

function dataURLToImage(dataURL: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = dataURL;
  });
}

// Generate some mock treatment plans based on a placeholder classification
function getMockTreatment(categoryName: string): string[] {
  return [
    `Remove any affected parts immediately.`,
    `Ensure the plant is well-watered and receiving adequate sunlight.`,
    `Consider applying an appropriate organic treatment for ${categoryName.split(',')[0]}.`,
    `Monitor the plant closely for the next 7-14 days.`
  ];
}

export async function analyzeImage(imageBase64: string, onProgress?: (step: string) => void): Promise<ScanResult> {
  try {
    if (onProgress) onProgress('Loading AI model (offline)...');

    // Initialize the classifier
    const imageClassifier = await getClassifier();

    if (onProgress) onProgress('Preparing image...');
    const imageElement = await dataURLToImage(imageBase64);

    if (onProgress) onProgress('Analyzing image...');
    const result = await imageClassifier.classify(imageElement);

    const topResult = result.classifications[0]?.categories[0];

    if (!topResult) {
      throw new Error("No classification results found");
    }

    if (onProgress) onProgress('Generating treatment plan...');
    // We add a small delay for UI purposes (so the user sees the progress step)
    await new Promise(r => setTimeout(r, 800));

    // Capitalize the first letter of the result
    const categoryName = topResult.categoryName.charAt(0).toUpperCase() + topResult.categoryName.slice(1);

    return {
      disease: categoryName,
      confidence: Math.round(topResult.score * 100),
      treatment: getMockTreatment(categoryName)
    };
  } catch (error) {
    console.error("Error analyzing image:", error);
    // Provide a fallback gracefully
    return {
      disease: 'Analysis Failed',
      confidence: 0,
      treatment: ['Please ensure your image is clear and try again.', 'If the problem persists, contact support.']
    };
  }
}
