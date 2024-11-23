import { ScrollBasedVelocityDemo } from "./scroll";
import { useState } from "react";
import { Link } from 'react-router-dom';

const Home1 = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="min-h-screen">
          <header>
      <nav className="fixed top-0 w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur shadow-md z-20">
        <div className="container mx-auto px-8  md:px-12">
          <div className="flex items-center justify-between py-4">
            {/* Logo Section */}
            <Link to="/" aria-label="Blood Bridge Logo" className="flex items-center space-x-2">
              <img src="img/blood-drop.png" alt="Blood Drop" className="h-10 w-10" />
              <span className="text-lg font-semibold text-red-700 dark:text-white">Blood Bridge</span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex lg:items-center lg:space-x-8">
              <Link to="/" className="text-gray-700 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 font-medium transition">Home</Link>
              <Link to="/donate" className="text-gray-700 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 font-medium transition">Donate</Link>
              <Link to="/request" className="text-gray-700 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 font-medium transition">Request</Link>
              <a href="#emergency" className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 dark:hover:bg-red-700 transition font-medium">
                Emergency Request
              </a>
              <Link to="/dashboard" aria-label="Admin Login" className="text-gray-700 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              aria-label="Toggle Navigation"
              className="lg:hidden p-2 focus:outline-none text-gray-800 dark:text-gray-300"
              onClick={toggleMenu}
            >
              {isMenuOpen ? (
                // Close icon
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              ) : (
                // Hamburger icon
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden space-y-8 mb-12 mt-4  bg-inherit dark:bg-gray-900 rounded-lg">
              <Link to="/" className="block text-left text-gray-700 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 font-medium transition">Home</Link>
              <Link to="/donate" className="block text-left text-gray-700 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 font-medium transition">Donate</Link>
              <Link to="/request" className="block text-left text-gray-700 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 font-medium transition">Request</Link>
              <a href="#emergency" className="block text-left text-gray-700 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 font-medium transition">
                Emergency Request
              </a>
              <Link to="/dashboard" className="flex items-center justify-center text-white dark:text-gray-300 bg-red-600 rounded-lg px-2 py-2  hover:text-red-500 dark:hover:text-red-400 transition">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Admin Login
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
            <div className="pt-12 md:py-12 xl:container m-auto mt-12 lg:mt-28 xl:mt-28  px-6 md:px-12">
                <div aria-hidden="true" className="absolute inset-0 my-auto w-96 h-32 rotate-45 bg-gradient-to-r from-red-400 to-red-200 blur-3xl opacity-50 dark:opacity-20"></div>
                <div className="relative lg:flex lg:items-center lg:gap-12">
                    <div className="text-center lg:text-left md:mt-12 lg:mt-0 sm:w-10/12 md:w-2/3 sm:mx-auto lg:mr-auto lg:w-6/12">
                        <h1 className="text-red-600 font-black tracking-wide md:font-extrabold text-3xl md:text-6xl lg:text-5xl xl:text-6xl dark:text-white ">
                            Every two seconds someone needs <br /> <span className="text-primary dark:text-primaryLight ">Blood🩸</span>
                        </h1>
                        <p className="mt-8 text-gray-600 dark:text-gray-300">
                            Every year our nation requires about 5 Crore units of blood, out of which only a meager 2.5 Crore units of blood are available.
                            The gift of blood is the gift of life. There is no substitute for human blood.
                            Every two seconds someone needs blood.
                            More than 38,000 blood donations are needed every day.
                        </p>
                        <div className="mt-8">
                            <Link
                                to="/donate"
                                className="px-8 py-4 mb-10 text-base font-semibold text-white bg-red-600 border-2 border-red-600 rounded-full shadow-md transition duration-300 hover:bg-red-50 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 w-full sm:w-auto inline-block text-center"
                            >
                                Donate Now
                            </Link>
                            <ScrollBasedVelocityDemo />
                        </div>
                    </div>
                    <div className="overflow-hidden w-full lg:w-7/12 lg:-mr-16">
                        <img src="img/new2.avif" alt="project illustration" />
                    </div>
                </div>
                <div aria-hidden="true" className="absolute right-10 my-auto w-32 h-32 rotate-45 bg-gradient-to-r from-red-600 to-red-400 blur-3xl opacity-100 dark:opacity-20"></div>
            </div>
        </div>
    );
};

export default Home1;