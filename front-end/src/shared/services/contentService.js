import axios from "axios";
const backendURL = import.meta.env.VITE_BASE_URL;
 // same as backend
const API_URL = `${backendURL}/api/Content`; // same as backend

// 📌 Fetch content for a specific region & category
export const getContent = async (region, category) => {
  try {
    const response = axios.get(`${backendURL}/api/content/${region}/${category}`);
    return response.data; // backend sends array of content objects
  } catch (error) {
    console.error("Error fetching content:", error);
    return [];
  }
};
