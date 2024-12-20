import React, { useState, useEffect, useContext } from 'react';
import { getParkingStrategy, parkCar, fetchCar } from '../api/parking';
import { ParkingContext } from '../context/ParkingContext';
import './css/ParkingLotOperator.css';

const ParkingLotOperator = () => {
    const [plateNumber, setPlateNumber] = useState('');
    const [parkingStrategy, setParkingStrategy] = useState('Standard');
    const [strategies, setStrategies] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [carDetails, setCarDetails] = useState(null);
    const { dispatch } = useContext(ParkingContext);

    useEffect(() => {
        const fetchStrategies = async () => {
            try {
                const data = await getParkingStrategy();
                setStrategies(data || []);
            } catch (error) {
                console.error('Error fetching parking strategies:', error);
            }
        };

        fetchStrategies();
    }, []);

    const validatePlateNumber = (plateNumber) => {
        const plateNumberPattern = /^[A-Z]{2}-\d{4}$/;
        return plateNumberPattern.test(plateNumber);
    };

    const handlePark = async () => {
        if (!plateNumber) {
            alert('Plate number cannot be empty.');
            return;
        }

        if (!validatePlateNumber(plateNumber)) {
            alert('Invalid plate number format. (e.g., AB-1234).');
            setPlateNumber('');
            return;
        }

        try {
            const response = await parkCar({ plateNumber }, parkingStrategy);
            dispatch({ type: 'PARK_CAR', payload: response });
        } catch (error) {
            console.error('Error parking car:', error);
        }
    };

    const handleFetch = async () => {
        if (!plateNumber) {
            alert('Plate number cannot be empty.');
            return;
        }

        if (!validatePlateNumber(plateNumber)) {
            alert('Invalid plate number format. (e.g., AB-1234).');
            setPlateNumber('');
            return;
        }

        try {
            const response = await fetchCar({ plateNumber });
            dispatch({ type: 'FETCH_CAR', payload: response });
            setCarDetails(response);
            setModalVisible(true);
        } catch (error) {
            console.error('Error fetching car:', error);
        }
    };

    return (
        <div className="parking-lot-operator">
            <div className="parking-lot-operator-element">
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
            <div className="parking-lot-operator-element">
                <label>
                    Parking Strategy:
                    <select
                        value={parkingStrategy}
                        onChange={(e) => setParkingStrategy(e.target.value)}
                        style={{ marginLeft: '5px' }}
                    >
                        {strategies.map((strategy) => (
                            <option key={strategy} value={strategy}>
                                {strategy}
                            </option>
                        ))}
                    </select>
                </label>
            </div>
            <div className="parking-lot-operator-element">
                <button
                    onClick={handlePark}
                    className="parking-lot-operator-button"
                >
                    Park
                </button>
            </div>
            <div className="parking-lot-operator-element">
                <button
                    onClick={handleFetch}
                    className="parking-lot-operator-button"
                >
                    Fetch
                </button>
            </div>
            {modalVisible && carDetails && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Car Details</h2>
                        <p>Plate Number: {carDetails.plateNumber}</p>
                        <p>Parking Time: {new Date(carDetails.startTime).toLocaleString()}</p>
                        <p>Fetch Time: {new Date(carDetails.endTime).toLocaleString()}</p>
                        <p>Cost: ${carDetails.cost}</p>
                        <button onClick={() => setModalVisible(false)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ParkingLotOperator;