import React, { useState, useEffect } from 'react';

const Destination = ({ onChange}) => {
  const [input, setInput] = useState('');
  const [cities, setCities] = useState([]);
  const [showDropdown, setShowDropdown] = useState(true);

  useEffect(() => {
    fetchCities();
  }, [input]);

  const fetchCities = () => {
    const apiUrl = `http://localhost:8000/city/${input}`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const filteredCities = data.filter(city => city.IataCode || (city.PlaceId && city.PlaceId.length >= 3));
        setCities(filteredCities);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const handleInputChange = (event) => {
    setInput(event.target.value);
    setShowDropdown(true);
  };

  const handleDropdownSelect = (city) => {
    const selectedValue = city.IataCode || city.PlaceId || '';
    const displayValue = city.CityName;
    setInput(displayValue);
    setShowDropdown(false);
    onChange(selectedValue);
  };

  const renderCityLabel = (city) => {
    if (city.IataCode) {
      return `${city.CityName} (${city.IataCode})`;
    } else if (city.PlaceId && city.PlaceId.length >= 3) {
      return `${city.CityName} (${city.PlaceId})`;
    } else {
      return null;
    }
  };

  const handleInputBlur = () => {
    if (!cities.find(city => city.CityName === input)) {
      setInput('');
    }
  };

  return (
    <div className='dropdown-wrapper'>
      <label htmlFor="cityInput"></label>
      <div className="dropdown-container">
      <input 
        type="text" 
        id="cityInput" 
        placeholder="Destination" 
        value={input} 
        onChange={handleInputChange}
        onBlur={handleInputBlur}
         />
        {showDropdown && (
          <ul className="dropdown">
            {cities.map(city => (
              <li key={city.PlaceId} onClick={() => handleDropdownSelect(city)}>
                {renderCityLabel(city)}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Destination;
