import axios from "axios";

const API_URL = "http://localhost:5000/api/content"; // same as backend

// 📌 Fetch content for a specific region & category
export const getContent = async (region, category) => {
  try {
    const response = await axios.get(`${API_URL}/${region}/${category}`);
    return response.data; // backend sends array of content objects
  } catch (error) {
    console.error("Error fetching content:", error);
    return [];
  }
};
