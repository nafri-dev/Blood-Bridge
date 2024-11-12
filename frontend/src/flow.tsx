'use client';

import { useState } from 'react';
import { MapPin, Droplet, Home } from 'lucide-react';
import BloodDonationSpinner from './swing';

const locations = [
  { 
    type: 'Blood Testing Centers', 
    value: 'centers',
    icon: <MapPin className="text-red-700" size={24} />,
    places: [
      { name: 'Agp Neuro Clinic', url: 'https://www.justdial.com/Kanyakumari/Agp-Neuro-Clinic/nct-100001' },
      { name: 'Akilam Diagnostic Centre', url: 'https://www.justdial.com/Kanyakumari/Akilam-Diagnostic-Centre/nct-100002' },
      { name: 'Aswin Clinical Laboratory', url: 'https://www.justdial.com/Kanyakumari/Aswin-Clinical-Laboratory/nct-100003' },
      { name: 'Thyro Health Care Diagnostic Centre', url: 'https://www.justdial.com/Kanyakumari/Thyro-Health-Care/nct-100004' },
      { name: 'Krsnaa Diagnostics', url: 'https://www.justdial.com/Kanyakumari/Krsnaa-Diagnostics/nct-100005' }
    ]
  },
  { 
    type: 'Blood Banks', 
    value: 'banks',
    icon: <Droplet className="text-red-700" size={24} />,
    places: [
      { name: 'Manitham Arakattalai', url: 'https://www.justdial.com/Kanyakumari/Manitham-Arakattalai/nct-200001' },
      { name: 'Kanya Blood Bank', url: 'https://www.justdial.com/Kanyakumari/Kanya-Blood-Bank/nct-200002' },
      { name: 'Royal Blood Bank & Diagnostics', url: 'https://www.justdial.com/Kanyakumari/Royal-Blood-Bank/nct-200003' },
      { name: 'IMC Blood Bank', url: 'https://www.justdial.com/Kanyakumari/IMC-Blood-Bank/nct-200004' },
      { name: 'Sivanthi Blood Bank', url: 'https://www.justdial.com/Kanyakumari/Sivanthi-Blood-Bank/nct-200005' }
    ]
  },
  { 
    type: 'Home Blood Tests', 
    value: 'home',
    icon: <Home className="text-red-700" size={24} />,
    places: [
      { name: 'Crafts Diagnostics', url: 'https://www.justdial.com/Kanyakumari/Crafts-Diagnostics/nct-10049258' },
      { name: 'Christal Laboratory', url: 'https://www.justdial.com/Kanyakumari/Christal-Laboratory/nct-10049259' },
      { name: 'Sworna Clinical Laboratory', url: 'https://www.justdial.com/Kanyakumari/Sworna-Clinical-Laboratory/nct-10049260' },
      { name: 'MK Diagnostic Centre', url: 'https://www.justdial.com/Kanyakumari/MK-Diagnostic-Centre/nct-10049261' },
      { name: 'LCS Clinic & Diagnostic Centre', url: 'https://www.justdial.com/Kanyakumari/LCS-Clinic-Diagnostic-Centre/nct-10049262' }
    ]
  },
];

export default function BloodDonationPage() {
  const [activeTab, setActiveTab] = useState('centers');

  return (
    <div className="min-h-full bg-white p-6 py-10 xl:py-48">
      <div className="max-w-8xl  xl:ml-28 mx-auto flex flex-col sm:flex-row"> {/* Adjusted for responsive layout */}
        <div className="flex-1 mb-8 sm:mb-0">
          <h1 className="text-3xl font-extrabold xl:text-3xl text-red-800  text-center mb-10">
            Blood Banks , Labs in Kanyakumari district
          </h1>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="flex border-b">
              {locations.map((location) => (
                <button
                  key={location.value}
                  onClick={() => setActiveTab(location.value)}
                  className={`flex-1 py-4 px-2 text-sm font-medium focus:outline-none transition-colors duration-200 ${
                    activeTab === location.value
                      ? 'bg-red-100 text-red-800 border-b-2 border-red-800'
                      : 'text-gray-600 hover:bg-red-50'
                  }`}
                >
                  <div className="flex items-center justify-center space-x-2">
                    {location.icon}
                    <span className="hidden sm:inline">{location.type}</span>
                  </div>
                </button>
              ))}
            </div>
            <div className="p-6">
              {locations.map((location) => (
                activeTab === location.value && (
                  <div key={location.value}>
                    <h2 className="text-2xl font-semibold text-red-700 mb-4 flex items-center">
                      {location.icon}
                      <span className="ml-2">{location.type}</span>
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {location.places.map((place, index) => (
                        <a
                          key={index}
                          href={place.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block p-4 border border-gray-200 rounded-lg hover:bg-red-50 transition-colors duration-200 group"
                        >
                          <span className="text-gray-800 group-hover:text-red-700 font-medium transition-colors duration-200">
                            {place.name}
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>
                )
              ))}
            </div>
          </div>
          
        </div>
        <div className="ml-8 flex items-center justify-center"> {/* Center the spinner */}
          <BloodDonationSpinner  /> {/* Set the desired size */}
        </div>
      </div>
    </div>
  );
}
