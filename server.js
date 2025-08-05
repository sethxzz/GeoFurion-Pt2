
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

const OPENROUTER_API_KEY = "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";

app.post("/chat", async (req, res) => {
  const { message } = req.body;

  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "google/gemma-7b-it",
        messages: [
          { role: "system", content: "Você é a Furii, uma IA simpática, objetiva e inteligente." },
          { role: "user", content: message }
        ]
      },
      {
        headers: {
          "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    const reply = response.data.choices[0].message.content;
    res.json({ response: reply });
  } catch (error) {
    console.error("Erro na OpenRouter:", error?.response?.data || error.message);
    res.status(500).json({ response: "Erro ao conectar com a IA alternativa." });
  }
});

app.listen(3001, () => {
  console.log("🚀 Servidor da Furii com OpenRouter rodando em http://localhost:3001");
});



