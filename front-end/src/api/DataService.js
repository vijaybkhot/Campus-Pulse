import api from './api.js'
import { setAuthToken } from './api.js'


const DataService = {
    getUserProfile: async () => {
        const response = await api.get('/user/profile')
        return response.data
    },
    getAllPosts: async () => {
        console.log(api)
        const token = localStorage.getItem('jwtToken'); 
        setAuthToken(token)
        const response = await api.get('/dashboard')
        console.log(response.data)
        return response.data
    },
    getAllRoomates: async () => {
        const response = await api.get('/roomates/')
        return response.data
    }
}
    
export default DataService