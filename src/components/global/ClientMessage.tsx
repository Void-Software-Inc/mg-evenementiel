'use client'

import React, { useEffect, useState } from 'react';
import { getClientMessages } from '@/services/clientMessage';
import { ClientMessage as ClientMessageType } from '@/utils/types/clientMessage';
import { X } from 'lucide-react';

const ClientMessage = () => {
  const [activeMessage, setActiveMessage] = useState<ClientMessageType | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDismissed, setIsDismissed] = useState(false);

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

  const handleDismiss = () => {
    setIsDismissed(true);
  };

  // Don't render anything if loading, no active message, or dismissed
  if (loading || !activeMessage || isDismissed) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-slate-900 via-gray-900 to-slate-900 backdrop-blur-md border-t border-gray-700/50 shadow-2xl">
      <div className="relative flex items-center px-4 py-4 mx-auto">
        
        {/* Message content - Normal for larger screens */}
        <div className="hidden lg:flex flex-1 text-center pr-10">
          <p className="text-white text-sm sm:text-base font-light tracking-wide leading-relaxed w-full">
            {activeMessage.message}
          </p>
        </div>

        {/* Message content - Scrolling marquee for mobile and tablet */}
        <div className="lg:hidden flex-1 overflow-hidden pr-10">
          <div className="whitespace-nowrap">
            <p className="text-white text-sm font-light tracking-wide leading-relaxed inline-block animate-marquee">
              {activeMessage.message}
              <span className="mx-8">•</span>
              {activeMessage.message}
              <span className="mx-8">•</span>
              {activeMessage.message}
              <span className="mx-8">•</span>
              {activeMessage.message}
              <span className="mx-8">•</span>
              {activeMessage.message}
              <span className="mx-8">•</span>
              {activeMessage.message}
              <span className="mx-8">•</span>
            </p>
          </div>
        </div>

        {/* Dismiss button positioned at absolute far right */}
        <button
          onClick={handleDismiss}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-white/10 transition-all duration-200 group z-10 lg:bg-transparent bg-black/40 lg:backdrop-blur-none backdrop-blur-sm"
          title="Fermer"
        >
          <X className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-200" />
        </button>
      </div>
      
      {/* Custom CSS for marquee animation */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default ClientMessage;
