import api from './api.js'

const AuthService = {
    login: async (credentials) => {
        const response = await api.post('/login', credentials)
        return response.data
    },
    signup: async (userData) => {
        const response = await api.post('/signup', userData)
        return response.data
    },
     
    logout: async () => {
        const response = await api.post('/logout')
        return response.data
    }
}

export default AuthService