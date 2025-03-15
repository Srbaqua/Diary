// /services/api.js
import axios from 'axios';
import { API } from '../config';


export const searchNotesByTopic = async (topic) => {
  try {
    const response = await axios.get(`${API}/related/${topic}`);
    return response.data;
  } catch (err) {
    console.error("API search error:", err);
    throw err;
  }
};

  export const uploadFileNote = async (userId, content, file) => {
    try {
      const formData = new FormData();
      formData.append('file', {
        uri: file.uri,
        name: file.name,
        type: file.mimeType || 'application/octet-stream',
      });
      formData.append('userId', userId);
      formData.append('content', content);
  
      const response = await axios.post(`${API}/upload-file`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
  
      return response.data;
    } catch (error) {
      console.error("API uploadFileNote error:", error);
      throw error;
    }
  };
  
