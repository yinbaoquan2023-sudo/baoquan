import { GoogleGenAI } from "@google/genai";

const MODEL_NAME = 'gemini-2.5-flash-image';

// Initialize the API client
// We assume process.env.API_KEY is available as per instructions.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Generates a new image based on a source image and a text prompt.
 * This utilizes the multimodal capabilities of Gemini 2.5 Flash Image.
 */
export const generateMarketingVisual = async (
  sourceImageBase64: string,
  mimeType: string,
  prompt: string
): Promise<string> => {
  try {
    // Remove header if present (e.g., "data:image/png;base64,")
    const base64Data = sourceImageBase64.replace(/^data:image\/\w+;base64,/, "");

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Data,
              mimeType: mimeType,
            },
          },
          {
            text: prompt,
          },
        ],
      },
    });

    // Iterate through parts to find the image part
    if (response.candidates?.[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData && part.inlineData.data) {
          // Construct the data URL for the generated image
          return `data:image/png;base64,${part.inlineData.data}`;
        }
      }
    }

    throw new Error("No image data found in the response.");
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
