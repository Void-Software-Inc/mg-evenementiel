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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg shadow-sm"
    >
      <div className="flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          <p className="text-sm sm:text-base text-blue-800 font-medium text-center">
            {activeMessage.message}
          </p>
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
        </div>
      </div>
    </motion.div>
  );
};

export default ClientMessage;
