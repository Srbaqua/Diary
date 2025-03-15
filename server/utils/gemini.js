const axios = require("axios");
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const getConceptsFromGemini = async (text) => {
  try {
    const prompt = `
Extract the most important concepts and topics from this note content.
Return only a plain JSON array like: ["Concept A", "Topic B", "Term C"].
Do NOT add any extra text, code blocks or explanation.

Note content:
"""
${text}
"""
`;

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: prompt }] }]
      }
    );

    let rawText = response.data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

    // Clean unnecessary wrappers
    rawText = rawText.replace(/```json|```|\n/g, "").trim();

    let concepts = [];

    try {
      concepts = JSON.parse(rawText);
    } catch (err) {
      console.warn("⚠ Gemini response not in JSON. Falling back to split.");
      concepts = rawText
        .replace(/[\[\]"]/g, '') // remove brackets and quotes
        .split(',')
        .map(c => c.trim())
        .filter(Boolean);
    }

    return Array.isArray(concepts) ? concepts.slice(0, 10) : [];
  } catch (err) {
    console.error("❌ Gemini Concept Extraction Error:", err.response?.data || err.message);
    return [];
  }
};

module.exports = { getConceptsFromGemini };
