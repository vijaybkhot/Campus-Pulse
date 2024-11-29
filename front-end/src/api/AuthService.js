import api from './api.js'

const AuthService = {
    login: async (credentials) => {
        const response = await api.post('/login', credentials)
        return response.data
    },
    signup: async (userData) => {
        console.log(userData)
        const response = await api.post('/users/signup', JSON.stringify(userData))
        return response.data
    },
     
    logout: async () => {
        const response = await api.post('/logout')
        return response.data
    }
}

export default AuthService