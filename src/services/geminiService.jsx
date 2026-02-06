import { GoogleGenAI } from "@google/genai";
import {createSummarizationResult,defaultSummaryConfig,SummaryTone ,SummaryLength} from '../types'

// Function to summarize text using Gemini
export const summarizeText = async (text, config) => {

  // Create Gemini AI instance
 const apiKey = import.meta.env.VITE_GEMINI_API_KEY;


   // Check API key
  if (!apiKey) {
    throw new Error("API Key is missing. Please set it.");
  }

 // Create Gemini AI instance
  const ai = new GoogleGenAI({
    apiKey: apiKey,
  });



  // Length descriptions
  const lengthDesc = {
    short: "very concise (1-2 paragraphs)",
    medium: "balanced (3-4 paragraphs)",
    long: "detailed and comprehensive",
  };

  // Tone descriptions
  const toneDesc = {
    professional: "formal and business-like",
    casual: "friendly and easy-going",
    academic: "technical and rigorous",
    creative: "engaging and narrative",
  };

  // Bullet points instruction
  const bulletPointInstruction = config?.includeBulletPoints
    ? "Include a list of key takeaways as bullet points at the end."
    : "Do not use bullet points.";

  // Prompt sent to Gemini
  const prompt = `
Summarize the following text.

Target Length: ${lengthDesc[config?.length || "medium"]}
Tone: ${toneDesc[config?.tone || "professional"]}
Formatting: ${bulletPointInstruction}

Text to summarize:
---
${text}
---
`;

  try {
    // Call Gemini API
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      // config: {
      //   temperature: 0.7,
      //   topP: 0.8,
      //   topK: 40,
      // },
    });
       //  Correct way to read response
    const resultText = response?.candidates?.[0]?.content?.parts?.[0]?.text;
    // If response is empty
    if (!resultText) {
      throw new Error("Empty response from Gemini");
    }

    return resultText;

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to summarize text. Please try again.");
  }
};
