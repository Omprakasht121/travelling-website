import axios from "axios";

const backendURL = import.meta.env.VITE_BASE_URL;
const API_URL = `${backendURL}/api/content`;   // FIXED ✔

// Fetch content for a specific region & category
export const getContent = async (region, category) => {
  try {
    const res = await axios.get(`${API_URL}/${region}/${category}`);
    return res.data;   // backend sends array of content objects
  } catch (error) {
    console.error("Error fetching content:", error);
    return [];
  }
};
