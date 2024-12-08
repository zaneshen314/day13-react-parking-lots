import instance from './interceptor';

// Get parking strategies
export const getParkingStrategy = async () => {
    try {
        const response = await instance.get('/parking/strategy');
        return response.data;
    } catch (error) {
        console.error('Error fetching parking strategies:', error);
        throw error;
    }
};

// Get parking lots
export const getParkingLots = async () => {
    try {
        const response = await instance.get('/parking');
        return response.data;
    } catch (error) {
        console.error('Error fetching parking lots:', error);
        throw error;
    }
};

// Park a car
export const parkCar = async (car, strategy) => {
    try {
        const response = await instance.post(`/parking/park/${strategy}`, car);
        return response.data;
    } catch (error) {
        console.error('Error parking car:', error);
        throw error;
    }
};

// Fetch a car
export const fetchCar = async (ticket) => {
    try {
        const response = await instance.post('/parking/fetch', ticket);
        return response.data;
    } catch (error) {
        console.error('Error fetching car:', error);
        throw error;
    }
};