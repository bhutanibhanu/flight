import React, { useState, useEffect } from 'react';
import Origin from './origin';
import Destination from './destination';
import DateInput from './DateInput';

const FlightSearchForm = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [flightResults, setFlightResults] = useState([]);

  const handleSearch = () => {
    const url = `http://localhost:8000/flight-search?originCode=${origin}&destinationCode=${destination}&dateOfDeparture=${date}`
    // Perform search using origin, destination, and date values call localhost
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setFlightResults(data);
        
      })
      .catch(error => {
        console.error('Error fetching flight data:', error);
      });
  };
  
  useEffect(() => {
    checkFormValidity();
  }, [origin, destination]);

  const checkFormValidity = () => {
    if (origin && destination) {
      setSubmitDisabled(false);
    } else {
      setSubmitDisabled(true);
    }
  };
  
  const flightData = flightResults.data; // Access the "data" array
  
//   if(flightData){
//   flightData.forEach((flight) => {
//     // Access the airline, price, and currency
//     const airline = flight.itineraries[0].segments[0].operating.carrierCode;
//     const price = flight.price.total;
//     const currency = flight.price.currency;
//     const carrierCode = flight.validatingAirlineCodes[0];
  
//     // Log the airline and its corresponding price
//     console.log("Airline:", airline);
//     console.log("Price:", price, currency);
//     console.log("Carrier Code:", carrierCode);
//   });
// }
  
  
  

  return (
    <div className="flight-search-form">
      <div className="dropdowns-container">
        <div className="dropdown-wrapper">
          <Origin onChange={setOrigin} />
        </div>
        <div className="dropdown-wrapper">
          <Destination onChange={setDestination} />
        </div>
        <div className="date-input-wrapper">
          <DateInput onChange={setDate} />
        </div>
        <div className="submit-button-wrapper">
          <button onClick={handleSearch} disabled={submitDisabled}>Submit</button>
        </div>
      </div>
      
      <div className="flight-results-container">
        <div className="flight-results">
          {flightResults.data && flightResults.data.length > 0 ? (
            <ul className="flight-results-list">
              {flightResults.data.map((flight, index) => (
                <li key={index}>
                  <p>Airline: {flight.itineraries[0].segments[0].operating.carrierCode}</p>
                  <p>Price: {flight.price.total} {flight.price.currency}</p>
                  <p>Carrier Code: {flight.validatingAirlineCodes[0]}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No flight results found.</p>
          )}
        </div>
      </div>
    </div>

  );
};

export default FlightSearchForm;
