import axios from 'axios';

const baseUrl = 'http://localhost:8080';
// Get parking strategies
export const getParkingStrategy = async () => {
    try {
        const response = axios.get(`${baseUrl}/parking/strategy`);
        return response.data;
    } catch (error) {
        console.error('Error fetching parking strategies:', error);
        throw error;
    }
};

// Get parking lots
export const getParkingLots = async () => {
    try {
        const response = axios.get(`${baseUrl}/parking`);
        return response.data;
    } catch (error) {
        console.error('Error fetching parking lots:', error);
        throw error;
    }
};

// Park a car
export const parkCar = async (car, strategy) => {
    try {
        const response = axios.post(`${baseUrl}/parking/park/${strategy}`, car);
        return response.data;
    } catch (error) {
        console.error('Error parking car:', error);
        throw error;
    }
};

// Fetch a car
export const fetchCar = async (ticket) => {
    try {
        const response = axios.post(`${baseUrl}/parking/fetch`, ticket);
        return response.data;
    } catch (error) {
        console.error('Error fetching car:', error);
        throw error;
    }
};
