import React from 'react';
import { ParkingProvider } from './context/ParkingContext';
import ParkingLot from './components/ParkingLot';

const App = () => {
    return (
        <ParkingProvider>
            <ParkingLot />
        </ParkingProvider>
    );
};

export default App;