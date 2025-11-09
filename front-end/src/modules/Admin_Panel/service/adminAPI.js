import axios from "axios";
const API_URL = "http://localhost:5000/api/content";

// Add new
export const addContent = async (data) => {
  try {
    const res = await axios.post(`${API_URL}`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  } catch (err) {
    console.error("Error adding content:", err);
    return { message: "Failed to add content" };
  }
};

// Get all
export const getAllContent = async () => {
  try {
    const res = await axios.get(`${API_URL}/all`);
    return res.data;
  } catch (err) {
    console.error("Error fetching all:", err);
    return [];
  }
};

// Get by region/category
export const getContent = async (region, category) => {
  try {
    const res = await axios.get(`${API_URL}/${region}/${category}`);
    return res.data;
  } catch (err) {
    console.error("Error fetching content:", err);
    return [];
  }
};

// Update existing
export const updateContent = async (id, updatedData) => {
  try {
    const res = await axios.put(`${API_URL}/${id}`, updatedData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  } catch (err) {
    console.error("Error updating content:", err);
    return { message: "Failed to update content" };
  }
};

// Delete
export const deleteContent = async (id) => {
  try {
    const res = await axios.delete(`${API_URL}/${id}`);
    return res.data;
  } catch (err) {
    console.error("Error deleting content:", err);
    return { message: "Failed to delete content" };
  }
};
