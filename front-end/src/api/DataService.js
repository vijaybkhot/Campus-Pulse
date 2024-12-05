import api from './api.js'
import { setAuthToken } from './api.js'


const DataService = {
    getUserProfile: async () => {
        const response = await api.get('users/me')
        const token = localStorage.getItem('jwtToken'); 
        setAuthToken(token)
        /*console.log(response.data.data)*/
        return response.data.data
    },
    getAllPosts: async () => {
        console.log(api)
        const token = localStorage.getItem('jwtToken'); 
        setAuthToken(token)
        const response = await api.get('/dashboard')
        /*console.log(response.data)*/
        return response.data
    },
    
    getAllRoommates: async (filters = {}) => {
        const token = localStorage.getItem("jwtToken");
        setAuthToken(token);
    
        const queryParams = new URLSearchParams(filters).toString(); // Construct query params
        const response = await api.get(`/roommates?${queryParams}`);
        // /*console.log("Fetched Roommates:", response.data.roommates); // Debugging */
        return response.data.roommates;
      },
       // Fetch all events
       getAllEvents: async () => {
        try {
            const token = localStorage.getItem('jwtToken');
            setAuthToken(token);
    
            const response = await api.get('/events'); // Fetch events
            console.log("Fetched Events:", response.data.data.data); // Debugging
            return response.data.data.data; // Access `data.data` to match the Postman response
        } catch (error) {
            console.error("Error fetching all events:", error.response || error.message);
            return []; // Return an empty array to avoid breaking the UI
        }
    },
        
    // Fetch event by ID
    // Fetch event by ID
    getEventById: async (eventId) => {
        try {
            const token = localStorage.getItem('jwtToken');
            setAuthToken(token);

            const response = await api.get(`/events/${eventId}`); // API endpoint to fetch an event by ID
            /*console.log("Fetched Event:", response.data.event); // Debugging*/
            return response.data.event; // Assuming API returns an `event` object
        } catch (error) {
            /*console.error("Error fetching event by ID:", error.response || error.message);*/
            return null; // Return null to avoid breaking the UI
        }
    }
}
    
export default DataService