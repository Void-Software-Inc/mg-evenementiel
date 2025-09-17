'use client'

import React, { useEffect, useState } from 'react';
import { getClientMessages } from '@/services/clientMessage';
import { ClientMessage as ClientMessageType } from '@/utils/types/clientMessage';
import { motion } from 'framer-motion';

const ClientMessage = () => {
  const [activeMessage, setActiveMessage] = useState<ClientMessageType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClientMessages = async () => {
      try {
        const messages = await getClientMessages();
        // Find the first active message
        const activeMsg = messages.find(message => message.is_active);
        setActiveMessage(activeMsg || null);
      } catch (error) {
        console.error('Error fetching client messages:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchClientMessages();
  }, []);

  // Don't render anything if loading or no active message
  if (loading || !activeMessage) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 1, 
        delay: 0.6, 
        ease: "easeOut",
        scale: { duration: 0.8, delay: 0.7 }
      }}
      className="mt-6 relative"
    >
      {/* Elegant divider line above */}
      <div className="flex items-center justify-center mb-4">
        <motion.div 
          className="h-px bg-gradient-to-r from-transparent via-white/50 to-transparent w-16"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        />
        <motion.div 
          className="mx-4 w-3 h-3 bg-gradient-to-r from-yellow-300 via-yellow-200 to-yellow-100 rounded-full"
          animate={{ 
            scale: [1, 1.4, 1],
            opacity: [0.8, 1, 0.8],
            boxShadow: [
              "0 0 15px rgba(255, 255, 0, 0.4), 0 0 30px rgba(255, 255, 0, 0.2)",
              "0 0 25px rgba(255, 255, 0, 0.8), 0 0 50px rgba(255, 255, 0, 0.4)", 
              "0 0 15px rgba(255, 255, 0, 0.4), 0 0 30px rgba(255, 255, 0, 0.2)"
            ]
          }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
        <motion.div 
          className="h-px bg-gradient-to-r from-transparent via-white/50 to-transparent w-16"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        />
      </div>

      {/* Message content with subtle shimmer effect */}
      <div className="text-center px-6 relative">
        <motion.div
          className="absolute inset-0"
          animate={{ x: ["-100%", "100%"] }}
          transition={{ 
            duration: 3, 
            repeat: Infinity, 
            ease: "linear",
            delay: 1
          }}
        />
        <motion.p 
          className="text-white text-base sm:text-lg font-light tracking-wider leading-relaxed italic relative z-10"
          animate={{ 
            textShadow: [
              "0 0 10px rgba(255, 255, 255, 0.3)",
              "0 0 20px rgba(255, 255, 255, 0.5)",
              "0 0 10px rgba(255, 255, 255, 0.3)"
            ]
          }}
          transition={{ 
            duration: 2.5, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        >
          {activeMessage.message}
        </motion.p>
      </div>

      {/* Elegant divider line below */}
      <div className="flex items-center justify-center mt-4">
        <motion.div 
          className="h-px bg-gradient-to-r from-transparent via-white/50 to-transparent w-16"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        />
        <motion.div 
          className="mx-4 w-3 h-3 bg-gradient-to-r from-yellow-300 via-yellow-200 to-yellow-100 rounded-full"
          animate={{ 
            scale: [1, 1.4, 1],
            opacity: [0.8, 1, 0.8],
            boxShadow: [
              "0 0 15px rgba(255, 255, 0, 0.4), 0 0 30px rgba(255, 255, 0, 0.2)",
              "0 0 25px rgba(255, 255, 0, 0.8), 0 0 50px rgba(255, 255, 0, 0.4)", 
              "0 0 15px rgba(255, 255, 0, 0.4), 0 0 30px rgba(255, 255, 0, 0.2)"
            ]
          }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 0.5
          }}
        />
        <motion.div 
          className="h-px bg-gradient-to-r from-transparent via-white/50 to-transparent w-16"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        />
      </div>
    </motion.div>
  );
};

export default ClientMessage;
