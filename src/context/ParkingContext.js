import React, { createContext, useReducer, useEffect } from 'react';
import { getParkingLots } from '../api/parking';

const ParkingContext = createContext();

const parkingReducer = (state, action) => {
    switch (action.type) {
        case 'SET_PARKING_LOTS':
            return { ...state, parkingLots: action.payload };
        case 'PARK_CAR':
            const updatedParkingLots = state.parkingLots.map(lot => {
                if (lot.id === action.payload.parkingLotId) {
                    const updatedTickets = [...lot.tickets, action.payload];
                    return { ...lot, tickets: updatedTickets };
                }
                return lot;
            });
            return { ...state, parkingLots: updatedParkingLots };
        case 'FETCH_CAR':
            const parkingLotsAfterFetch = state.parkingLots.map(lot => {
                if (lot.id === action.payload.parkingLotId) {
                    const updatedTickets = lot.tickets.filter(ticket => ticket.id !== action.payload.id);
                    return { ...lot, tickets: updatedTickets };
                }
                return lot;
            });
            return { ...state, parkingLots: parkingLotsAfterFetch };
        default:
            return state;
    }
};

const ParkingProvider = ({ children }) => {
    const [state, dispatch] = useReducer(parkingReducer, { parkingLots: [] });

    useEffect(() => {
        const fetchParkingLots = async () => {
            try {
                const data = await getParkingLots();
                dispatch({ type: 'SET_PARKING_LOTS', payload: data });
            } catch (error) {
                console.error('Error fetching parking lots:', error);
            }
        };

        fetchParkingLots();
    }, []);

    return (
        <ParkingContext.Provider value={{ state, dispatch }}>
            {children}
        </ParkingContext.Provider>
    );
};

export { ParkingContext, ParkingProvider };