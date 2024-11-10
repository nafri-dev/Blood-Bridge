'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HeroVideoDialog } from "./components/ui/hero-video-dialog"
import { WordRotateDemo } from "./Rotate"
import { ChevronRight } from 'lucide-react'

export function HeroVideoDialogDemoTopInBottomOut() {
  const [activeVideo, setActiveVideo] = useState(0)

  const videos = [
    {
      videoSrc: "https://www.youtube.com/embed/0jDdmLpwrFk?si=e2Niqi1DO3HiNB1Z",
      thumbnailSrc: "img/ash.webp",
      thumbnailAlt: "Blood Donation Benefits",
      title: "Dr. Ashwin Vijay about Blood Donation"
    },
    {
      videoSrc: "https://www.youtube.com/embed/jrSJVXy7WoA?si=oeoglfGV5wyQifJJ",
      thumbnailSrc: "img/hq720.webp",
      thumbnailAlt: "Blood Donation Process",
      title: "Benefits of Blood donation explained"
    },
    {
      videoSrc: "https://www.youtube.com/embed/xCD9yIgAupo?si=nh8lHjhwEbVRfBfy",
      thumbnailSrc: "img/doc.webp",
      thumbnailAlt: "Medical Perspective",
      title: "Dr.Sengottaiyan about Blood donation"
    }
  ]

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-red-900 to-red-600 text-white overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MCIgaGVpZ2h0PSI1MCI+CiAgPGNpcmNsZSBjeD0iMjUiIGN5PSIyNSIgcj0iMjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIiBzdHJva2Utd2lkdGg9IjAuNSIvPgo8L3N2Zz4=')] opacity-20"></div>

      <div className="relative max-w-7xl mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-6">
            Donating Blood Protects you from <span className="text-yellow-300"><WordRotateDemo /></span>
          </h1>
          <p className="font-normal text-2xl sm:text-2xl md:text-3xl max-w-3xl mx-auto">
            Discover the life-changing impact of your donation
          </p>
        </motion.div>
        
        <div className="mt-12 md:mt-16 relative">
          <motion.div 
            className="absolute -top-16 -left-16 w-32 h-32 md:w-32 md:h-48 bg-red-500 rounded-full filter blur-3xl opacity-50"
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
          />
          <motion.div 
            className="absolute -bottom-16 -right-16 w-32 h-32 md:w-48 md:h-48 bg-yellow-500 rounded-full filter blur-3xl opacity-50"
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 8, repeat: Infinity, repeatType: "reverse", delay: 4 }}
          />

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
            <div className=" h-full w-full  rounded-lg overflow-hidden shadow-2xl ">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeVideo}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <HeroVideoDialog
                    animationStyle="top-in-bottom-out"
                    videoSrc={videos[activeVideo].videoSrc}
                    thumbnailSrc={videos[activeVideo].thumbnailSrc}
                    thumbnailAlt={videos[activeVideo].thumbnailAlt}
                    className="w-full h-full object-cover  ml-0"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="space-y-6">
              {videos.map((video, index) => (
                <motion.button
                  key={index}
                  className={`w-full text-left p-4 rounded-lg transition-colors ${
                    index === activeVideo ? 'bg-white bg-opacity-20' : 'hover:bg-white hover:bg-opacity-10'
                  }`}
                  onClick={() => setActiveVideo(index)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <h3 className="font-semibold text-xl mb-2 flex items-center">
                    {video.title}
                    <ChevronRight className={`ml-2 transition-transform ${index === activeVideo ? 'rotate-90' : ''}`} />
                  </h3>
                  <p className="text-sm text-gray-300">Click to watch video</p>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}