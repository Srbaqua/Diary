const axios = require("axios");
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const getConceptsFromGemini = async (text) => {
  try {
    const prompt = `
Extract key topics and concepts from the following content and return ONLY a valid JSON array like:
["Topic1", "Topic2", "Concept A", "Concept B"]

Content:
"${text}"
`;

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: prompt }] }],
      }
    );

    console.log("🔁 Gemini Response:", response.data);

    // Try parsing the response text as a JSON array
    const rawText = response.data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

    let concepts = [];
    try {
      concepts = JSON.parse(rawText);
    } catch (e) {
      console.warn("⚠ Gemini response not in JSON. Falling back to split.");
      concepts = rawText.split(/\n|,|\*/).map(c => c.trim()).filter(Boolean);
    }

    return Array.isArray(concepts) ? concepts.slice(0, 10) : [];
  } catch (err) {
    console.error("❌ Gemini API error:", err.response?.data || err.message);
    return [];
  }
};

module.exports = { getConceptsFromGemini };
