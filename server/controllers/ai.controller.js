import { generatePrompt } from "../config/ai.service.js";

export const getResultController = async (req, res) => {
    try {
        // const { prompt } = req.params;
        const { prompt } = req.query; // Use query parameters if needed
        if (!prompt) {
            return res.status(400).json({ error: "Prompt is required" });
        }



        const result = await generatePrompt(prompt);
        res.send(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
