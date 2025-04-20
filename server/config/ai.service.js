import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

console.log(process.env.GEMINI_API_KEY);
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Single model configuration
const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    
});


export const generatePrompt = async (prompt, projectId) => {
    try {

        const result = await model.generateContent(prompt);
        const response = result.response.candidates[0].content.parts[0].text;
        console.log(result.response.candidates[0].content.parts[0]);

        return response;
    } catch (error) {
        console.error("AI Generation Error:", error);
        throw new Error(error.message);
    }
};
