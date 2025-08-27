import express from "express";
import bodyParser from "body-parser";
import OpenAI from "openai";

const app = express();
app.use(bodyParser.json());

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.get("/", (req, res) => res.send("GoodPappa Chatbot is alive 🚀"));

app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;
  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are GoodPappa's support assistant. Answer clearly about products, prices, availability, and delivery." },
        { role: "user", content: userMessage }
      ]
    });
    res.json({ reply: completion.choices[0].message.content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ reply: "Oops, something went wrong." });
  }
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Server running on port " + listener.address().port);
});
