import React, { useState } from 'react';

const ParkingLotOperator = () => {
    const [plateNumber, setPlateNumber] = useState('');
    const [parkingStrategy, setParkingStrategy] = useState('Standard');

    const handlePark = () => {
        console.log(`Plate Number: ${plateNumber}, Parking Strategy: ${parkingStrategy}`);
    };

    const handleFetch = () => {
        console.log(`Plate Number: ${plateNumber}`);
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px' }}>
            <div style={{ padding: '5px' }}>
                <label>
                    Plate Number:
                    <input
                        type="text"
                        value={plateNumber}
                        onChange={(e) => setPlateNumber(e.target.value)}
                        style={{ marginLeft: '5px' }}
                    />
                </label>
            </div>
            <div style={{ padding: '5px' }}>
                <label>
                    Parking Strategy:
                    <select
                        value={parkingStrategy}
                        onChange={(e) => setParkingStrategy(e.target.value)}
                        style={{ marginLeft: '5px' }}
                    >
                        <option value="Standard">Standard</option>
                        <option value="Smart">Smart</option>
                        <option value="SuperSmart">SuperSmart</option>
                    </select>
                </label>
            </div>
            <div style={{ padding: '5px' }}>
                <button
                    onClick={handlePark}
                    style={{ backgroundColor: '#a7d9te', padding: '5px 10px' }}
                >
                    Park
                </button>
            </div>
            <div style={{ padding: '5px' }}>
                <button
                    onClick={handleFetch}
                    style={{ backgroundColor: '#a7d9te', padding: '5px 10px' }}
                >
                    Fetch
                </button>
            </div>
        </div>
    );
};

export default ParkingLotOperator;