import React from 'react';

// Define the type for the props
interface EmergencyProps {
  src: string;
  title: string;
  desc: string;
  ph: string;
}

const Emergency: React.FC<EmergencyProps> = (props) => {
  return (
    <div>
      <div className="xl:container m-auto px-8 py-4 text-gray-600 md:px-12 xl:px-12 2xl:ml-40">
        <div className="lg:bg-white dark:lg:bg-darker lg:px-16 lg:py-6 rounded-[4rem] space-y-4 md:flex md:gap-2 justify-center md:space-y-0 lg:items-center">
          <div className="ml-6 md:5/12 lg:w-2/6">
            <img src={props.src} alt="image" loading="lazy" width="300px" height="300px" />
          </div>
          <div className="w-full md:w-7/12 lg:w-1/2">
            <h2 className="text-3xl font-bold text-center xl:text-start text-gray-900 md:text-4xl dark:text-white">
              {props.title}
            </h2>
            <p className="my-8 text-gray-600 dark:text-gray-300">{props.desc}</p>
            <div className="flex flex-col md:flex-row gap-5">
              <a
                href={`tel:${props.ph}`}
                className="relative flex h-12 w-full items-center justify-center px-8 before:absolute before:inset-0 before:rounded-full before:bg-red-600 before:bg-gradient-to-b before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 dark:before:border-gray-700 dark:before:bg-gray-800 sm:w-max"
              >
                <span className="relative text-base font-semibold text-white dark:text-white">Call Now</span>
              </a>
              <a
                href={`https://wa.me/${props.ph}`}
                target="_blank"
                rel="noopener noreferrer"
                className="relative flex h-12 w-full items-center justify-center px-8 before:absolute before:inset-0 before:rounded-full before:bg-green-600 before:bg-gradient-to-b before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 dark:before:border-gray-700 dark:before:bg-gray-800 sm:w-max"
              >
                <span className="relative text-base font-semibold text-white dark:text-white">Whatsapp Now</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Emergency;
