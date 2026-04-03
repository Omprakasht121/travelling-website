

import { apiClient } from "../../shared/services/api-client.js";

export const registerApiCall = async(formData) => {
    try{
        const response = await apiClient.post('/api/user/register',formData);
        return response;
    }
    catch(err){
        console.log('error in registering user api',err);
        throw err;
    }
}

export const loginApiCall = async (formData) => {
    try{
    const response = await apiClient.post('/api/user/login',formData);
    return response;
    }
    catch(err){
        console.log('error in login api',err);
        throw err;
    }
}

