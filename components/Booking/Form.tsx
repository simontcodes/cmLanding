"use client";

import { useState, ChangeEvent, FormEvent } from "react";

interface FormData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  email?: string;
}

const Form = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      // Submit the form data
      console.log(formData);
      // Reset the form
      setFormData({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
      });
      setErrors({});
    }
  };

  return (
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
          {errors.firstName && <p className="text-error">{errors.firstName}</p>}
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
  );
};

export default Form;
