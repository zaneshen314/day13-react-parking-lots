// src/components/ParkingLot.js
import React from 'react';
import ParkingLotOperator from './ParkingLotOperator';
import ParkingLotSituation from './ParkingLotSituation';

const ParkingLot = () => {
    return (
        <div>
            <ParkingLotOperator />
            <ParkingLotSituation />
        </div>
    );
};

export default ParkingLot;