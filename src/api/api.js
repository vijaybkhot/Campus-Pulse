import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
    headers: {
        'Content-Type': 'application/json'
    }
})

api.interceptors.request.use(
    (config) => {
      console.log('Request Object:', config); // Log the full request object
      return config; // Proceed with the request
    },
    (error) => {
      console.error('Request Error:', error); // Log any error before the request is sent
      return Promise.reject(error);
    }
  );

export const setAuthToken = (token) => {
    if(token){
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }else{
        delete api.defaults.headers.common['Authorization']
    }
}

export default api