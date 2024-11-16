import React, { useState } from 'react'
import { Droplet, Heart, Users, AlertCircle, Check } from 'lucide-react'

const bloodTypes = ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'] as const
type BloodType = typeof bloodTypes[number]

const bloodCompatibility: { [K in BloodType]: BloodType[] } = {
  'O-': ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'],
  'O+': ['O+', 'A+', 'B+', 'AB+'],
  'A-': ['A-', 'A+', 'AB-', 'AB+'],
  'A+': ['A+', 'AB+'],
  'B-': ['B-', 'B+', 'AB-', 'AB+'],
  'B+': ['B+', 'AB+'],
  'AB-': ['AB-', 'AB+'],
  'AB+': ['AB+'],
}

export default function BloodTypeCompatibilityPage() {
  const [selectedType, setSelectedType] = useState<BloodType | null>(null)

  const handleBloodTypeClick = (type: BloodType) => {
    setSelectedType(type === selectedType ? null : type)
  }

  const getButtonColor = (type: BloodType) => {
    switch (type[0]) {
      case 'A': return 'text-red-600'
      case 'B': return 'text-blue-600'
      case 'O': return 'text-green-600'
      default: return 'text-purple-600'
    }
  }

  return (
    <div className="min-h-52 bg-red-600 mt-10 xl:mt-24 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl xl:text-6xl font-extrabold text-center text-white mb-6">
          Blood Type Compatibility Explorer
        </h1>
        <p className="font-normal text-xl text-center text-white mb-12 max-w-3xl mx-auto">
          Understanding blood type compatibility is crucial for safe transfusions and medical procedures. Explore how different blood types interact and learn about universal donors and recipients.
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 ml-14">Select a Blood Type</h2>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 mb-8 ml-4 md:ml-12">
              {bloodTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => handleBloodTypeClick(type)}
                  className={`relative flex items-center justify-center w-20 h-20 ${getButtonColor(type)} transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-opacity-50 ${selectedType === type ? 'ring-2 ring-offset-2 ring-opacity-50' : ''}`}
                  aria-pressed={selectedType === type}
                >
                  <svg className="absolute inset-0 w-full h-full text-current" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C12 2 4 9.43 4 14.5C4 19.09 7.58 22 12 22C16.42 22 20 19.09 20 14.5C20 9.43 12 2 12 2Z" />
                  </svg>
                  <span className="relative z-10 font-bold text-white">{type}</span>
                </button>
              ))}
            </div>
            {selectedType && (
              <div className="mt-8 p-6 bg-gray-50 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">
                  Compatibility with {selectedType}:
                </h3>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 ml-0 md:ml-6">
                  {bloodTypes.map((type) => (
                    <div
                      key={type}
                      className={`relative flex items-center justify-center w-20 h-20 ${getButtonColor(type)} transition duration-300 ease-in-out ${bloodCompatibility[selectedType].includes(type) ? 'opacity-100' : 'opacity-40'}`}
                    >
                      <svg className="absolute inset-0 w-full h-full text-current" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C12 2 4 9.43 4 14.5C4 19.09 7.58 22 12 22C16.42 22 20 19.09 20 14.5C20 9.43 12 2 12 2Z" />
                      </svg>
                      <span className="relative z-10 font-bold text-white">{type}</span>
                      {bloodCompatibility[selectedType].includes(type) && (
                        <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-1">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">About Blood Matching</h2>
            <div className="space-y-4">
              <p className="text-gray-600">
                Blood matching is a critical process in medicine that ensures the compatibility between a donor's blood and a recipient's blood. This process is essential for safe blood transfusions and other medical procedures involving blood products.
              </p>
              <p className="text-gray-600">
                The ABO blood group system and the Rh factor are the most important factors in determining blood compatibility. There are four main blood types: A, B, AB, and O, each of which can be either Rh-positive or Rh-negative.
              </p>
              <ul className="list-none space-y-2">
                <li className="flex items-center">
                  <Droplet className="text-red-500 mr-2" />
                  <span>Type O-negative is the universal donor</span>
                </li>
                <li className="flex items-center">
                  <Heart className="text-purple-500 mr-2" />
                  <span>Type AB-positive is the universal recipient</span>
                </li>
                <li className="flex items-center">
                  <Users className="text-blue-500 mr-2" />
                  <span>Matching within the same blood type is safest</span>
                </li>
                <li className="flex items-center">
                  <AlertCircle className="text-yellow-500 mr-2" />
                  <span>Some types are compatible with others</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
      </div>
      <div id="blood-flow-announcement" className="sr-only" aria-live="polite">
        {selectedType && `Selected blood type ${selectedType}. Compatible with: ${bloodCompatibility[selectedType].join(', ')}`}
      </div>
    </div>
  )
}