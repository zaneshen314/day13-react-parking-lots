import React, { useContext } from 'react';
import Car from './Car';
import { ParkingContext } from '../context/ParkingContext';
import './css/ParkingLotSituation.css';

const ParkingLotSituation = () => {
    const { state } = useContext(ParkingContext);
    const { parkingLots } = state;

    const renderTable = (cars, columns) => {
        const rows = [];
        for (let i = 0; i < cars.length; i += columns) {
            rows.push(cars.slice(i, i + columns));
        }
        return (
            <table className="parking-lot-table">
                <tbody>
                {rows.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {row.map((car, colIndex) => (
                            <td key={colIndex} className="parking-lot-cell">
                                {car ? <Car plateNumber={car} /> : ''}
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        );
    };

    return (
        <div className="parking-lot-container">
            {parkingLots.map((lot, index) => {
                const columns = Math.ceil(Math.sqrt(lot.capacity));
                const cars = Array(lot.capacity).fill(null);
                lot.tickets.forEach(ticket => {
                    cars[ticket.position - 1] = ticket.plateNumber;
                });
                return (
                    <div key={index} className="parking-lot">
                        {renderTable(cars, columns)}
                        <div>{lot.name}</div>
                    </div>
                );
            })}
        </div>
    );
};

export default ParkingLotSituation;