"use client";
import React, { use, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import services from "./typeOFserviceData";

const DatePickerComponent = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");

  const currentDate = new Date();
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 90);

  // Function to fetch available times for the selected date
  const fetchAvailableTimes = (date) => {
    // You can make an API call or perform any logic to get available times for the selected date
    // For simplicity, let's assume the available times are an array of strings
    const times = ["10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM"];
    setAvailableTimes(times);
  };

  const excludeWeekends = (date) => {
    const day = date.getDay();
    return day !== 0 && day !== 6; // Exclude Sunday (0) and Saturday (6)
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    fetchAvailableTimes(date);
    setSelectedTime(null);
  };

  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <section id="booking" className="pt-16 md:pt-20 lg:pt-28">
      <div className=" mx-auto flex w-full max-w-xs">
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          className="border-gray-300 w-full rounded border p-2 text-center shadow-sm"
          inline
          minDate={currentDate}
          filterDate={excludeWeekends}
          maxDate={maxDate}
        />
        {availableTimes.length > 0 && (
          <div className="ml-4">
            <p className="font-medium">Available Times:</p>
            <div className="  grid w-[300px] grid-cols-2 gap-2">
              {availableTimes.map((time, index) => (
                <label
                  key={index}
                  className="border-gray-300 hover:bg-gray-100 inline-flex cursor-pointer items-center rounded border px-3 py-2 text-sm"
                >
                  <input
                    type="radio"
                    value={time}
                    checked={selectedTime === time}
                    onChange={handleTimeChange}
                    className="mr-1"
                  />
                  {time}
                </label>
              ))}
            </div>
            {selectedTime && (
              <div className="mt-4">
                <p className="font-medium">Selected Time: {selectedTime}</p>
              </div>
            )}
            <select
              value={selectedOption}
              onChange={handleOptionChange}
              className="mt-2 block w-full rounded-md border-primary bg-white py-2 px-3 shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
            >
              <option value="" disabled>
                Select a type of service
              </option>
              {services.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {selectedOption && (
              <div className="mt-4">
                <p className="font-medium">
                  Selected service: {selectedOption}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default DatePickerComponent;
