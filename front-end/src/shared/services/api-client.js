import axios from 'axios';

export const apiClient = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout : 30000,
    headers : {
        'Content-Type' : 'application/json'
    }
});

// ✅ AI Planner Endpoints
export const generateAITrip = async (tripData) => {
    try {
        const response = await apiClient.post('/api/ai/planner', tripData);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

// ✅ Chatbot Endpoint
export const sendChatMessage = async (message, history = []) => {
    try {
        const response = await apiClient.post('/api/chat/message', { message, history });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

