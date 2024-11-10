import React, { useState } from 'react'

const bloodTypes = ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+']

const bloodCompatibility = {
  'O-': ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'],
  'O+': ['O+', 'A+', 'B+', 'AB+'],
  'A-': ['A-', 'A+', 'AB-', 'AB+'],
  'A+': ['A+', 'AB+'],
  'B-': ['B-', 'B+', 'AB-', 'AB+'],
  'B+': ['B+', 'AB+'],
  'AB-': ['AB-', 'AB+'],
  'AB+': ['AB+'],
}

export default function BloodFlowAnimation() {
  const [selectedType, setSelectedType] = useState<string | null>(null)

  const handleBloodTypeClick = (type: string) => {
    setSelectedType(type)
  }

  const getButtonColor = (type: string) => {
    switch (type[0]) {
      case 'A': return 'bg-red-600 hover:bg-red-700'
      case 'B': return 'bg-red-700 hover:bg-red-800'
      case 'O': return 'bg-red-500 hover:bg-red-600'
      default: return 'bg-red-800 hover:bg-red-900'
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 p-6">
      <div className="bg-white rounded-2xl shadow-lg max-w-2xl w-full p-8">
        <h2 className="text-4xl font-bold text-red-600 mb-6 text-center">Blood Type Compatibility</h2>
        
        {/* Blood Type Selection */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {bloodTypes.map((type) => (
            <button
              key={type}
              onClick={() => handleBloodTypeClick(type)}
              className={`${getButtonColor(type)} text-white font-semibold py-3 px-6 rounded-lg transition-transform duration-300 transform hover:scale-110 shadow-md ${
                selectedType === type ? 'ring-4 ring-red-300' : ''
              }`}
              aria-pressed={selectedType === type}
            >
              {type}
            </button>
          ))}
        </div>
        
        {/* Compatibility Display */}
        {selectedType && (
          <div className="bg-gray-50 rounded-xl p-6 shadow-lg mt-4 transition-all duration-500">
            <h3 className="text-2xl font-semibold text-gray-700 mb-4 text-center">
              Compatible with {selectedType}:
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {bloodCompatibility[selectedType].map((compatibleType) => (
                <div
                  key={compatibleType}
                  className={`${getButtonColor(compatibleType)} text-white font-semibold py-2 px-4 rounded-full text-center shadow animate-bloodFlow`}
                >
                  {compatibleType}
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Accessibility Announcement */}
        <div id="blood-flow-announcement" className="sr-only" aria-live="polite">
          {selectedType && `Selected blood type ${selectedType}. Compatible with: ${bloodCompatibility[selectedType].join(', ')}`}
        </div>
      </div>
    </div>
  )
}
