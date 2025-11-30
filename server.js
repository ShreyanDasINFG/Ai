import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import OpenAI from "openai";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

app.post("/api/chat", async (req, res) => {
    try {
        const userMsg = req.body.message;

        const completion = await client.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: userMsg }]
        });

        res.json({ reply: completion.choices[0].message.content });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "API error" });
    }
});

const PORT = 3000;
app.listen(PORT, () => console.log("Server running on port " + PORT));