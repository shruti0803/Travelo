import axios from "axios";

const GEMINI_API_KEY = "AIzaSyCRymUERA_7lw-bUvsQTu0x4Gg4IP2NLR8";

export const travelChatbot = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { city } = req.body;

  if (!city || city.trim() === "") {
    return res.status(400).json({ error: "City name is required" });
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 7000);

    const payload = {
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `
You are a smart travel recommendation assistant.  
The user will give a city name, and you must respond with **the top areas of interest, must-visit attractions, cultural spots, food streets, and local tips**.  
Keep your answer concise, engaging, and formatted with bullet points.

City: ${city}
            `,
            },
          ],
        },
      ],
    };

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      payload,
      { headers: { "Content-Type": "application/json" }, signal: controller.signal }
    );

    clearTimeout(timeout);

    const answer = response?.data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!answer) return res.status(500).json({ error: "Empty response from Gemini" });

    return res.status(200).json({ answer });
  } catch (err) {
    console.error("Gemini API Error:", err.response?.data || err.message);
    return res.status(500).json({ error: "Gemini API failed" });
  }
};
