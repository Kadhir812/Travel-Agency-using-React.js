import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaBus, FaExchangeAlt, FaCalendarAlt, FaUser, FaQuestionCircle } from 'react-icons/fa';

const Booking = () => {
  const [fromDistricts, setFromDistricts] = useState([]);
  const [toDistricts, setToDistricts] = useState([]);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');
  const [buses, setBuses] = useState([]);

  
  useEffect(() => {
    const fetchDistricts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/locations');
        if (response.data.length > 0) {
          setFromDistricts(response.data[0].districts); // Assuming each location has a 'districts' array
          setToDistricts(response.data[0].districts);
        }
      } catch (err) {
        console.error('Error fetching districts', err);
      }
    };
    fetchDistricts();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/search-buses', {
        from,
        to,
        date,
      });
      setBuses(response.data);
    } catch (err) {
      console.error('No buses found', err);
      setBuses([]);
    }
  };

  const handleSwap = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
  };

  return (
    <div className="min-h-screen bg-slate-700 flex flex-col items-center justify-center">
      <header className="w-1/2 p-4 flex justify-between items-center bg-red-400 rounded-lg shadow-md">
        <div className="flex items-center">
          <img src="../logo.jpeg" alt="Logo" className="h-11 mr-2" />
          <h1 className="text-black text-xl font-bold">Bus Tickets</h1>
        </div>
        <div className="font-bold flex space-x-4">
          <button className="text-black"><FaQuestionCircle /></button>
          <button className="text-black"><FaUser /></button>
        </div>
      </header>

      <form onSubmit={handleSearch} className="bg-red-200 p-8 rounded-lg shadow-lg w-1/2 mt-7">
        <h2 className="text-2xl font-bold text-center text-gray-800">Search Bus Tickets</h2>

        <div className="flex justify-between items-center space-x-4 mt-4">
          <div className="flex items-center space-x-2 w-1/3">
            <FaBus className="text-gray-600" />
            <select
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            >
              <option value="">Select District</option>
              {fromDistricts.map((district, index) => (
                <option key={index} value={district}>
                  {district}
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            className="p-2 border rounded-full bg-white text-pink-500"
            onClick={handleSwap}
          >
            <FaExchangeAlt />
          </button>

          <div className="flex items-center space-x-2 w-1/3">
            <FaBus className="text-gray-600" />
            <select
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              value={to}
              onChange={(e) => setTo(e.target.value)}
            >
              <option value="">Select District</option>
              {toDistricts.map((district, index) => (
                <option key={index} value={district}>
                  {district}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center space-x-2 w-1/3">
            <FaCalendarAlt className="text-gray-600" />
            <input
              type="date"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-teal-400 text-white font-bold py-3 rounded-lg mt-8"
        >
          Search Buses
        </button>
      </form>

      {buses.length > 0 && (
        <div className="mt-8 w-full max-w-md">
          <h3 className="text-white text-center text-lg font-bold mb-4">Available Buses</h3>
          <ul className="space-y-4">
            {buses.map((bus, index) => (
              <li key={index} className="bg-white p-4 rounded-lg shadow-lg">
                <p className="text-pink-500 font-bold text-lg">{bus.busName}</p>
                <p className="text-gray-600">{bus.from} to {bus.to}</p>
                <p className="text-gray-600">Departure: {bus.departureTime}</p>
                <p className="text-gray-600">Arrival: {bus.arrivalTime}</p>
                <p className="text-gray-600">Seats Available: {bus.seatsAvailable}</p>
                <p className="text-gray-600">Price: ₹{bus.price}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Booking;
