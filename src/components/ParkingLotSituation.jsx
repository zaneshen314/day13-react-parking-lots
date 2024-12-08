import React from 'react';

const ParkingLotSlot = () => {
    const parkingLots = [
        { name: 'The Plaza Park', capacity: 9, cars: [true, true, false, false, false, false, false, false, false] },
        { name: 'City Mall Garage', capacity: 12, cars: [true, true, true, false, false, false, false, false, false, false, false, false] },
        { name: 'Office Tower Parking', capacity: 9, cars: [false, false, false, false, false, false, false, false, false] }
    ];

    const renderTable = (cars, columns) => {
        const rows = [];
        for (let i = 0; i < cars.length; i += columns) {
            rows.push(cars.slice(i, i + columns));
        }
        return (
            <table style={{ borderCollapse: 'collapse', margin: '10px' }}>
                <tbody>
                {rows.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {row.map((car, colIndex) => (
                            <td key={colIndex} style={{ border: '1px solid black', width: '30px', height: '30px', textAlign: 'center' }}>
                                {car ? 'x' : ''}
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        );
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            {parkingLots.map((lot, index) => {
                const columns = Math.ceil(Math.sqrt(lot.capacity));
                return (
                    <div key={index} style={{ textAlign: 'center' }}>
                        {renderTable(lot.cars, columns)}
                        <div>{lot.name}</div>
                    </div>
                );
            })}
        </div>
    );
};

export default ParkingLotSlot;