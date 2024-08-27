"use client";

import { useState } from 'react';
import CartStep from './CartStep';

const steps = [
  { name: 'Produits', number: 1 },
  { name: 'Informations', number: 2 },
  { name: 'Validation', number: 3 },
];

const Stepper = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="w-full">
      <h2 className="sr-only">Steps</h2>
  
      <div className="relative mb-8">
        <div className="absolute top-1/2 left-0 right-0 flex -translate-y-1/2">
          {steps.map((step, index) => (
            index < steps.length - 1 && (
              <div
                key={`line-${index}`}
                className={`h-0.5 flex-1 ${
                  currentStep > index + 1 ? 'bg-black' : 'bg-gray-100'
                }`}
              />
            )
          ))}
        </div>
  
        <ol className="relative z-10 flex justify-between text-sm font-medium text-gray-500">
          {steps.map((step) => (
            <li key={step.number} className="flex items-center gap-2 bg-white p-2">
              <span
                className={`size-6 rounded-full ${
                  currentStep >= step.number
                    ? 'bg-black text-white'
                    : 'bg-gray-100 text-gray-600'
                } text-center text-[10px]/6 font-bold`}
              >
                {currentStep > step.number ? '✓' : step.number}
              </span>
  
              <span className="hidden sm:block">{step.name}</span>
            </li>
          ))}
        </ol>
      </div>

      {currentStep === 1 && <CartStep />}

      <div className="mt-8 flex justify-between">
        <button
          onClick={handlePrevious}
          disabled={currentStep === 1}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={currentStep === steps.length}
          className="px-4 py-2 bg-black text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Stepper;