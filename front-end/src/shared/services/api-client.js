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

// ✅ Trip Endpoints
export const getTrips = async () => {
    try {
        const response = await apiClient.get('/api/trips');
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const createTrip = async (tripData) => {
    try {
        const response = await apiClient.post('/api/trips', tripData);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const getTrip = async (id) => {
    try {
        const response = await apiClient.get(`/api/trips/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const addLocationToTrip = async (tripId, contentId, category, dayNumber) => {
    try {
        const response = await apiClient.post(`/api/trips/${tripId}/locations`, {
            contentId,
            category,
            dayNumber
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

