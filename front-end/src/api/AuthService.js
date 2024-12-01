import api from './api.js'
import { setAuthToken } from './api.js';

const AuthService = {
    login: async (credentials) => {
        const response = await api.post('/users/login',  JSON.stringify(credentials))
        const { token } = response.data; 
        if (token) {
            localStorage.setItem('jwtToken', token); 
            setAuthToken(token)
        }
        return response.data;
    },
    signup: async (userData) => {
        console.log(userData)
        const response = await api.post('/users/signup', JSON.stringify(userData))
        const { token } = response.data; 
        if (token) {
            localStorage.setItem('jwtToken', token); 
            setAuthToken(token)
        }
        return response.data;
    },
     
    logout: async () => {
        localStorage.removeItem('jwtToken'); 
        const response = await api.post('/logout');
        return response.data;
    }
}

export default AuthService