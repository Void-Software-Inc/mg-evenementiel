'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface DevisContextType {
  formData: any;
  setFormData: (data: any) => void;
  clearFormData: () => void;
}

const DevisContext = createContext<DevisContextType | undefined>(undefined);

export const DevisProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [formData, setFormData] = useState<any>(null);

  const clearFormData = () => {
    setFormData(null);
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