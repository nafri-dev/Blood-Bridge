'use client';

import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTint } from '@fortawesome/free-solid-svg-icons';

export default function BloodDonationSpinner() {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRotation((prevRotation) => (prevRotation + 1) % 360);
    }, 10);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex items-center justify-center  xl:mr-28 w-80 h-80 hidden xl:block">
      <div className="relative w-full h-full">
        {/* Static Blood Drop Icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <FontAwesomeIcon
            icon={faTint}
            className="text-red-600"
            style={{ fontSize: '50px' }} // Adjust size as needed
          />
        </div>

        {/* Circular Text Path that Spins */}
        <svg
          className="absolute inset-0"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: 'transform 0.1s linear',
          }}
        >
          <defs>
            <path
              id="circle"
              d="M50,15 a35,35 0 1,1 0,70 a35,35 0 1,1 0,-70"
            />
          </defs>
          <text className="text-[5px] fill-red-600 font-bold">
            <textPath href="#circle" startOffset="0%">
              DONATE BLOOD, SAVE LIFE • DONATE BLOOD, SAVE LIFE • DONATE BLOOD, SAVE LIFE •
            </textPath>
          </text>
        </svg>
      </div>
    </div>
  );
}
