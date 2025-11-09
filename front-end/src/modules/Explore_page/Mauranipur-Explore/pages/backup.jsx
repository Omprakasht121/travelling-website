import axios from "axios";

const API_URL = "http://localhost:5000/api/content"; // change port if different

// 📌 Add new content
export const addContent = async (data) => {
  try {
    console.log("Sending data:", data);
    console.log("Sending FormData:");
  for (let [key, value] of data.entries()) {
    console.log(`${key}:`, value);
  }
    const response = await axios.post(`${API_URL}`, data, {
      headers: { "Content-Type": "multipart/form-data" }, // ✅ Added
    });
    return response.data;
  } catch (error) {
    console.error("Error adding content:", error);
    return { message: "Failed to add content" };
  }
};

// 📌 Fetch all content (for dashboard)
export const getAllContent = async () => {
  try {
    const response = await axios.get(`${API_URL}/all`);
    return response.data;
  } catch (error) {
    console.error("Error fetching content:", error);
    return [];
  }
};

// 📌 Update existing content
export const updateContent = async (id, updatedData) => {
  try {
    const response = await axios.put(`${API_URL}/update/${id}`, updatedData, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating content:", error);
    return { message: "Failed to update content" };
  }
};

// 📌 Delete content
export const deleteContent = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/delete/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting content:", error);
    return { message: "Failed to delete content" };
  }
};
