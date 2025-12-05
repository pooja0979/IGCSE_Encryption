import { GoogleGenAI, Type } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateQuizQuestion = async (topic: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Generate a single multiple-choice question about ${topic}. The question should be suitable for an Edexcel IGCSE Computer Science (4CP0) student. 
      Focus on concepts like:
      - Definitions of encryption
      - How algorithms work (Caesar, Pigpen, Vigenère, Rail Fence)
      - Strengths and weaknesses (e.g., brute force on Caesar)
      - Trace table / Logic errors in encryption code (e.g. modulo wrap around)
      
      Provide 4 options and the correct answer index.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            question: { type: Type.STRING },
            options: { 
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            correctIndex: { type: Type.INTEGER },
            explanation: { type: Type.STRING }
          },
          required: ["question", "options", "correctIndex", "explanation"]
        }
      }
    });
    
    const text = response.text;
    return text ? JSON.parse(text) : null;
  } catch (error) {
    console.error("Gemini Quiz Error:", error);
    return null;
  }
};