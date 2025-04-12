'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface DevisContextType {
  formData: any;
  setFormData: (data: any) => void;
  clearFormData: () => void;
}

const DevisContext = createContext<DevisContextType | undefined>(undefined);

// Default fees structure
const defaultFees = [
  { name: 'delivery', price: 0, enabled: false, description: '' },
  { name: 'pickup', price: 0, enabled: false, description: '' },
  { name: 'table_service', price: 0, enabled: false, description: '' },
  { name: 'marquee_setup', price: 0, enabled: false, description: '' },
  { name: 'marquee_dismantling', price: 0, enabled: false, description: '' },
  { name: 'decoration', price: 0, enabled: false, description: '' }
];

export const DevisProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [formData, setFormData] = useState<any>({
    fees: defaultFees
  });

  const clearFormData = () => {
    setFormData({
      fees: defaultFees
    });
  };

  return (
    <DevisContext.Provider value={{ formData, setFormData, clearFormData }}>
      {children}
    </DevisContext.Provider>
  );
};

export const useDevis = () => {
  const context = useContext(DevisContext);
  if (context === undefined) {
    throw new Error('useDevis must be used within a DevisProvider');
  }
  return context;
};