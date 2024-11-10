'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ScrollBasedVelocityDemo } from "./scroll"
import { Menu, X, ChevronDown } from 'lucide-react'

const Home2 = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    useEffect(() => {
        const handleResize = () => setIsMenuOpen(window.innerWidth >= 1024)
        window.addEventListener('resize', handleResize)
        handleResize()
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-900 via-red-800 to-red-900 text-white">
            <header className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md">
                <nav className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <motion.a 
                            href="#" 
                            className="flex items-center space-x-2"
                            whileHover={{ scale: 1.05 }}
                        >
                            <img src="img/blood-drop.png" alt="Blood Bridge Logo" className="h-10 w-10"/>
                            <span className="text-2xl font-bold">Blood Bridge</span>
                        </motion.a>
                        <div className="hidden lg:flex space-x-8">
                            <NavItem href="#">Home</NavItem>
                            <NavItem href="#">Donate</NavItem>
                            <NavItem href="#">Request</NavItem>
                            <NavItem href="#" isEmergency>Emergency Request</NavItem>
                        </div>
                        <motion.button 
                            className="lg:hidden text-3xl"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            {isMenuOpen ? <X /> : <Menu />}
                        </motion.button>
                    </div>
                </nav>
            </header>

            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div 
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        className="fixed inset-x-0 top-16 z-40 bg-red-900 lg:hidden"
                    >
                        <div className="flex flex-col items-center py-4 space-y-4">
                            <NavItem href="#">Home</NavItem>
                            <NavItem href="#">Donate</NavItem>
                            <NavItem href="#">Request</NavItem>
                            <NavItem href="#" isEmergency>Emergency Request</NavItem>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <main className="container mx-auto px-4 pt-24 pb-16">
                <section className="min-h-[calc(100vh-6rem)] flex flex-col justify-center items-center text-center">
                    <motion.h1 
                        className="text-5xl md:text-7xl font-bold mb-6"
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        Every Two Seconds<br />Someone Needs <span className="text-yellow-300">Blood</span>
                    </motion.h1>
                    <motion.p 
                        className="text-xl md:text-2xl mb-12 max-w-2xl"
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                    >
                        Our nation requires about 5 Crore units of blood annually, but only 2.5 Crore units are available. 
                        Your donation can make a life-changing difference.
                    </motion.p>
                    <motion.button
                        className="px-8 py-4 text-lg font-semibold text-red-600 bg-white rounded-full shadow-lg transition duration-300 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                    >
                        Donate Now
                    </motion.button>
                    <motion.div 
                        className="mt-16"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                    >
                        <ChevronDown size={48} className="animate-bounce" />
                    </motion.div>
                </section>

                <section >
        
                        <ScrollBasedVelocityDemo />
            </section>

             
            </main>

          
        </div>
    )
}

const NavItem = ({ href, children, isEmergency }) => (
    <motion.a 
        href={href} 
        className={`
            ${isEmergency ? 'bg-red-600 px-4 py-2 rounded-full' : ''}
            hover:text-yellow-300 transition duration-300
        `}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
    >
        {children}
    </motion.a>
)


export default Home2