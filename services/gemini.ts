
import { GoogleGenAI, Type } from "@google/genai";
import { Meal } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const analyzeFoodImage = async (base64Image: string): Promise<Partial<Meal>> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        {
          parts: [
            { text: "Identify the food in this image and provide its estimated nutritional information for one typical serving. Provide the name, total calories, and macronutrients (protein, carbs, fat in grams). Also include estimates for fiber (g), sugar (g), and sodium (mg)." },
            {
              inlineData: {
                mimeType: "image/jpeg",
                data: base64Image
              }
            }
          ]
        }
      ],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            calories: { type: Type.NUMBER },
            macros: {
              type: Type.OBJECT,
              properties: {
                protein: { type: Type.NUMBER },
                carbs: { type: Type.NUMBER },
                fat: { type: Type.NUMBER }
              },
              required: ["protein", "carbs", "fat"]
            },
            nutrients: {
              type: Type.OBJECT,
              properties: {
                fiber: { type: Type.STRING },
                sugar: { type: Type.STRING },
                sodium: { type: Type.STRING }
              }
            }
          },
          required: ["name", "calories", "macros"]
        }
      }
    });

    const result = JSON.parse(response.text || "{}");
    return result;
  } catch (error) {
    console.error("Error analyzing food image:", error);
    throw error;
  }
};
