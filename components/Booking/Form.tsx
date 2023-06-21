"use client";

import { useState, ChangeEvent, FormEvent } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import services from "./typeOFserviceData";
import axios from "axios";

interface FormData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
}

interface ResponseBooking {
  data?: {
    user: {
      firstName: string;
      lastName: string;
      email: string;
    };
    checkoutUrl: string;
  };
}

interface ResponseTimes {
  data: {
    availableTimes: string[];
  };
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  email?: string;
  time?: string;
  date?: string;
  option?: string;
}

const Form = () => {
  //states for the form
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  //---------------------------------------------------
  //states for the datepicker and available times

  const [selectedDate, setSelectedDate] = useState(null);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");

  const currentDate = new Date();
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 90);

  // Function to fetch available times for the selected date
  const fetchAvailableTimes = async (date) => {
    // You can make an API call or perform any logic to get available times for the selected date
    try {
      const response: ResponseTimes = await axios.get(
        `http://localhost:8080/availableTimes/${date}`
      );
      const { availableTimes } = response.data;
      setAvailableTimes(availableTimes);
    } catch (error) {
      console.error("Error fetching available times:", error);
    }
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

  //----------------------------------------
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.name, e.target.value);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //----------------------------------

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sessionStorage.setItem("email", formData.email);
    // Validate the form
    const newErrors: FormErrors = {};
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!selectedTime) {
      newErrors.time = "Please select a time";
    }
    if (!selectedDate) {
      newErrors.date = "Please select a date";
    }
    if (!selectedOption) {
      newErrors.option = "Please select a type of service";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      const fullData = [
        formData,
        {
          date: selectedDate,
          time: selectedTime,
          typeOfAppointment: selectedOption,
          amount: 100,
          transactionNumber: "001",
        },
      ];
      try {
        // Submit the form data
        const response: ResponseBooking = await axios.post(
          "http://localhost:8080/booking",
          fullData
        );

        console.log(response);

        if (response.data && response.data.checkoutUrl) {
          // Navigate to the Square payment link
          window.location.href = response.data.checkoutUrl;
        } else {
          throw new Error("Invalid response format.");
        }

        // Reset the form
        setFormData({
          firstName: "",
          lastName: "",
          phoneNumber: "",
          email: "",
        });
        setErrors({});
      } catch (error) {
        console.error("Failed to submit form data:", error);
        // Handle the error, display an error message, etc.
      }
    }
  };

  return (
    <>
      <div id="booking" className="pt-16 md:pt-20 lg:pt-28">
        <div className=" mx-auto flex w-full max-w-xs">
          <div className="flex-col">
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              className="border-gray-300 w-full rounded border p-2 text-center shadow-sm"
              inline
              minDate={currentDate}
              filterDate={excludeWeekends}
              maxDate={maxDate}
            />
            {errors.date && <p className="text-error">{errors.date}</p>}
          </div>
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
              {errors.time && <p className="text-error">{errors.time}</p>}
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
              {errors.option && <p className="text-error">{errors.option}</p>}

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
      </div>
      <div className="p-4">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="firstName"
              className="text-gray-700 mb-2 block font-medium"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={`w-full border px-4 py-2 ${
                errors.firstName ? "border-error" : "border-gray-300"
              } focus:ring-blue-500 rounded-md focus:outline-none focus:ring-2`}
            />
            {errors.firstName && (
              <p className="text-error">{errors.firstName}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="lastName"
              className="text-gray-700 mb-2 block font-medium"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={`w-full border px-4 py-2 ${
                errors.lastName ? "border-error" : "border-gray-300"
              } focus:ring-blue-500 rounded-md focus:outline-none focus:ring-2`}
            />
            {errors.lastName && <p className="text-error">{errors.lastName}</p>}
          </div>

          <div className="mb-4">
            <label
              htmlFor="phoneNumber"
              className="text-gray-700 mb-2 block font-medium"
            >
              Phone Number
            </label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className={`w-full border px-4 py-2 ${
                errors.phoneNumber ? "border-error" : "border-gray-300"
              } focus:ring-blue-500 rounded-md focus:outline-none focus:ring-2`}
            />
            {errors.phoneNumber && (
              <p className="text-error">{errors.phoneNumber}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="text-gray-700 mb-2 block font-medium"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full border px-4 py-2 ${
                errors.email ? "border-error" : "border-gray-300"
              } focus:ring-blue-500 rounded-md focus:outline-none focus:ring-2`}
            />
            {errors.email && <p className=" text-error">{errors.email}</p>}
          </div>

          <button
            type="submit"
            className=" hover:bg-blue-600 focus:bg-blue-600 rounded-md bg-primary px-4 py-2 text-white focus:outline-none"
          >
            Go to payment
          </button>
        </form>
      </div>
    </>
  );
};

export default Form;
