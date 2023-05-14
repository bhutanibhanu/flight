import React, { useState, useEffect } from 'react';

const DateInput = ({ onChange}) => {

  const today = new Date().toISOString().substr(0, 10); 
  useEffect(() => {
    setSelectedDate(today);
    onChange(today);
  }, [onChange]);

  const [selectedDate, setSelectedDate] = useState('');

  const handleDateChange = (event) => {
    const dateValue = event.target.value
    setSelectedDate(dateValue);
    onChange(dateValue)
  };

  return (
    <div className='date'>
      <label htmlFor="dateInput"></label>
      <input
        id="dateInput"
        type="date"
        min={today}
        value={selectedDate}
        onChange={handleDateChange}
      />
    </div>
  );
};

export default DateInput;