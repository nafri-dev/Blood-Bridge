import React, { useState } from 'react';
import axios from 'axios';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

function DonateForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    gender: '',

    weight: '',
    bloodType: '',
    lastDonation: '',
    healthCondition: '',
    medications: '',
    recentIllness: '',
    consent: false
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('Submitting...');
    try {
      const response = await axios.post(`${import.meta.env.REACT_APP_API_URL}/api/donors`, formData,{
        withCredentials: true,
      });
      console.log('Response:', response.data);
      setMessage(response.data.message);
      setFormData({
        name: '',
        email: '',
        phone: '',
        age: '',
        gender: '',
        weight: '',
        bloodType: '',
        lastDonation: '',
        healthCondition: '',
        medications: '',
        recentIllness: '',
        consent: false
      });
    } catch (error) {
      console.error('Error details:', error.response ? error.response.data : error.message);
      setMessage('Error submitting donation. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-red-600 py-6 px-8">
          <Link to="/" className="inline-block text-white hover:text-red-200 transition duration-150 ease-in-out">
            <ArrowLeftIcon className="h-6 w-6" />
          </Link>
          <h2 className="text-3xl font-extrabold text-white text-center mt-2">Donate Blood</h2>
        </div>
        <form onSubmit={handleSubmit} className="px-8 py-6 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { name: 'name', label: 'Full Name', type: 'text' },
              { name: 'email', label: 'Email', type: 'email' },
              { name: 'phone', label: 'Phone Number', type: 'tel' },
              { name: 'age', label: 'Age', type: 'number', min: '18', max: '65' },
              { name: 'weight', label: 'Weight (kg)', type: 'number', min: '50' },
              { name: 'lastDonation', label: 'Last Donation Date (if any)', type: 'date' },
            ].map((field) => (
              <div key={field.name} className="relative">
                <input
                  type={field.type}
                  id={field.name}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  required
                  min={field.min}
                  max={field.max}
                  className="peer w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-red-500 transition-colors placeholder-transparent"
                  placeholder={field.label}
                />
                <label
                  htmlFor={field.name}
                  className="absolute left-4 -top-2.5 bg-white px-1 text-sm text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-red-600"
                >
                  {field.label}
                </label>
              </div>
            ))}
            <div className="relative">
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
                className="peer w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-red-500 transition-colors appearance-none"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              <label
                htmlFor="gender"
                className="absolute left-4 -top-2.5 bg-white px-1 text-sm text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-red-600"
              >
                Gender
              </label>
            </div>
            <div className="relative">
              <select
                id="bloodType"
                name="bloodType"
                value={formData.bloodType}
                onChange={handleChange}
                required
                className="peer w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-red-500 transition-colors appearance-none"
              >
                <option value="">Select Blood Type</option>
                {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              <label
                htmlFor="bloodType"
                className="absolute left-4 -top-2.5 bg-white px-1 text-sm text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-red-600"
              >
                Blood Type
              </label>
            </div>
          </div>
          {['healthCondition', 'medications', 'recentIllness'].map((field) => (
            <div key={field} className="relative">
              <textarea
                id={field}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                rows="3"
                className="peer w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-red-500 transition-colors placeholder-transparent"
                placeholder={field === 'healthCondition' ? 'Current Health Condition' : field === 'medications' ? 'Current Medications (if any)' : 'Any Recent Illness or Surgery'}
              ></textarea>
              <label
                htmlFor={field}
                className="absolute left-4 -top-2.5 bg-white px-1 text-sm text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-red-600"
              >
                {field === 'healthCondition' ? 'Current Health Condition' : field === 'medications' ? 'Current Medications (if any)' : 'Any Recent Illness or Surgery'}
              </label>
            </div>
          ))}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="consent"
              name="consent"
              checked={formData.consent}
              onChange={handleChange}
              required
              className="h-5 w-5 text-red-600 focus:ring-red-500 border-gray-300 rounded"
            />
            <label htmlFor="consent" className="text-sm text-gray-700">
              I consent to donate blood and confirm that all information provided is accurate.
            </label>
          </div>
          <button
            type="submit"
            className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-150 ease-in-out"
          >
            Submit Donation Form
          </button>
        </form>
      </div>
      {message && (
        <div className={`mt-4 p-4 ${message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'} rounded-md max-w-4xl mx-auto`}>
          {message}
        </div>
      )}
    </div>
  );
}

export default DonateForm;