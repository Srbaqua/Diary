// services/api.js
import axios from 'axios';

const API_BASE = 'http://<your-server-ip>:5000/api';

export const uploadTextNote = async (userId, content) => {
  try {
    const res = await axios.post(${API_BASE}/notes/upload-text, {
      userId,
      content,
    });
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getConcepts = async () => {
  try {
    const res = await axios.get(${API_BASE}/concepts);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};