import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Groq from "groq-sdk";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

app.post("/ask-ai", async (req, res) => {
  const { question, context } = req.body;

  console.log("📩 Question:", question);

  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",

      messages: [
        {
          role: "system",
          content:
            "You are a biomedical AI assistant specializing in protein structure, mutations, and disease mechanisms.",
        },
        {
          role: "user",
          content: `Protein Context:\n${context}\n\nQuestion:\n${question}`,
        },
      ],
      temperature: 0.4,
    });

    const answer = completion.choices[0].message.content;

    console.log("✅ Groq AI answered");

    res.json({ answer });
  } catch (error) {
    console.error("❌ Groq AI error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

app.listen(5000, () => {
  console.log("🧠 Groq AI Agent running on http://localhost:5000");
});
