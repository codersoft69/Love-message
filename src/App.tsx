/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Flower2, Sparkles, MessageCircleHeart, CheckCircle2, XCircle } from 'lucide-react';

// Floating element component for cute background effects
interface FloatingElementProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  xOffset?: string | number;
  key?: React.Key;
}

const FloatingElement = ({ children, delay = 0, duration = 5, xOffset = 0 }: FloatingElementProps) => (
  <motion.div
    initial={{ y: '110vh', x: xOffset, opacity: 0 }}
    animate={{ 
      y: '-10vh', 
      opacity: [0, 1, 1, 0],
      x: typeof xOffset === 'number' ? xOffset + (Math.random() * 50 - 25) : xOffset
    }}
    transition={{ 
      duration, 
      repeat: Infinity, 
      delay,
      ease: "linear"
    }}
    className="absolute pointer-events-none"
  >
    {children}
  </motion.div>
);

export default function App() {
  const [response, setResponse] = useState<'none' | 'okay' | 'not-fine'>('none');
  const [showFlower, setShowFlower] = useState(false);

  useEffect(() => {
    if (response === 'not-fine') {
      const timer = setTimeout(() => setShowFlower(true), 300);
      return () => clearTimeout(timer);
    }
  }, [response]);

  const reset = () => {
    setResponse('none');
    setShowFlower(false);
  };

  return (
    <div className="min-h-screen bg-[#FFF5F7] flex flex-col items-center justify-center p-4 overflow-hidden relative font-sans selection:bg-pink-200">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <FloatingElement key={i} delay={i * 0.8} duration={6 + Math.random() * 4} xOffset={Math.random() * 100 + 'vw' as any}>
            {i % 2 === 0 ? (
              <Heart className="text-pink-200 fill-pink-200" size={24 + Math.random() * 20} />
            ) : (
              <Sparkles className="text-yellow-200" size={20 + Math.random() * 15} />
            )}
          </FloatingElement>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="z-10 w-full max-w-md bg-white/80 backdrop-blur-md p-8 rounded-[40px] shadow-xl border border-pink-100 text-center relative"
      >
        <AnimatePresence mode="wait">
          {response === 'none' && (
            <motion.div
              key="initial"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="space-y-6"
            >
              <div className="flex justify-center mb-4">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <MessageCircleHeart className="text-pink-500" size={64} />
                </motion.div>
              </div>
              
              <h1 className="text-4xl font-bold text-pink-600 tracking-tight">
                Hi Lubna! ✨
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                I wanted to say that I'm really, really <span className="font-bold text-pink-500 italic">sorry</span>. 🥺
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  onClick={() => setResponse('okay')}
                  className="flex-1 bg-pink-500 hover:bg-pink-600 text-white font-semibold py-4 px-6 rounded-2xl transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-pink-200 flex items-center justify-center gap-2"
                >
                  <CheckCircle2 size={20} />
                  It's okay
                </button>
                <button
                  onClick={() => setResponse('not-fine')}
                  className="flex-1 bg-white hover:bg-gray-50 text-gray-500 font-semibold py-4 px-6 rounded-2xl border-2 border-gray-100 transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
                >
                  <XCircle size={20} />
                  No, it's not fine
                </button>
              </div>
            </motion.div>
          )}

          {response === 'okay' && (
            <motion.div
              key="okay"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="space-y-6"
            >
              <div className="flex flex-col items-center gap-8">
                <div className="flex flex-wrap justify-center gap-4">
                  {/* Polaroid 1 */}
                  <motion.div
                    initial={{ scale: 0, rotate: -15 }}
                    animate={{ scale: 1, rotate: -5 }}
                    transition={{ type: "spring", delay: 0.2 }}
                    className="bg-white p-3 pb-10 shadow-xl border border-gray-100 rounded-sm transform hover:rotate-0 transition-transform duration-300"
                  >
                    <div className="w-40 h-48 overflow-hidden bg-gray-100">
                      <img 
                        src="lubna1.jpeg" 
                        alt="Lubna 1" 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "https://i.ibb.co.com/4qgGnG5/lubna1-jpg.jpg";
                        }}
                      />
                    </div>
                  </motion.div>

                  {/* Polaroid 2 */}
                  <motion.div
                    initial={{ scale: 0, rotate: 15 }}
                    animate={{ scale: 1, rotate: 5 }}
                    transition={{ type: "spring", delay: 0.4 }}
                    className="bg-white p-3 pb-10 shadow-xl border border-gray-100 rounded-sm transform hover:rotate-0 transition-transform duration-300 mt-4"
                  >
                    <div className="w-40 h-48 overflow-hidden bg-gray-100">
                      <img 
                        src="lubna2.jpeg" 
                        alt="Lubna 2" 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "https://i.ibb.co.com/WwkNczc/lubna2-jpg.jpg";
                        }}
                      />
                    </div>
                  </motion.div>
                </div>

                <div className="space-y-4 max-w-xs">
                  <motion.h2 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="text-3xl font-bold text-pink-600"
                  >
                    I Love You, Lubna! ❤️
                  </motion.h2>
                  
                  <motion.p 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="text-lg text-gray-600 italic leading-relaxed"
                  >
                    "You are the most beautiful person I know, inside and out. Thank you for being so understanding and for giving me another chance. I love you more than words can say!"
                  </motion.p>
                  
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="flex justify-center gap-2"
                  >
                    <Sparkles className="text-yellow-400" size={20} />
                    <Heart className="text-red-400 fill-red-400" size={20} />
                    <Sparkles className="text-yellow-400" size={20} />
                  </motion.div>
                </div>
              </div>

              <button
                onClick={reset}
                className="text-pink-400 hover:text-pink-600 text-sm font-medium underline underline-offset-4 pt-4"
              >
                Go back
              </button>
            </motion.div>
          )}

          {response === 'not-fine' && (
            <motion.div
              key="not-fine"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="space-y-6"
            >
              <div className="flex justify-center mb-4 relative">
                <AnimatePresence>
                  {showFlower && (
                    <motion.div
                      initial={{ scale: 0, rotate: -45 }}
                      animate={{ scale: 1, rotate: 0 }}
                      className="relative"
                    >
                      <Flower2 className="text-pink-500" size={100} />
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute -top-4 -right-4"
                      >
                        <Sparkles className="text-yellow-400" size={32} />
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              <h2 className="text-3xl font-bold text-gray-800">
                I understand... 🌸
              </h2>
              
              <p className="text-lg text-gray-600">
                Here is a flower for you because you deserve the world. I'll keep trying until you're happy again.
              </p>

              <button
                onClick={reset}
                className="text-pink-400 hover:text-pink-600 text-sm font-medium underline underline-offset-4"
              >
                Try again?
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Footer message */}
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-8 text-pink-300 text-sm font-medium tracking-widest uppercase"
      >
        Made with love for Lubna
      </motion.p>
    </div>
  );
}
