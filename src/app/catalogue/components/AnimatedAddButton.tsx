import React, { useState } from 'react';
import { Check, Plus } from 'lucide-react'; // Import Lucide icons

interface AnimatedAddButtonProps {
  onClick: (e: React.MouseEvent, removeAll: boolean) => void;
  quantity: number;
}

const AnimatedAddButton: React.FC<AnimatedAddButtonProps> = ({ onClick, quantity }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const isAdded = quantity > 0;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isAdded && quantity > 1) {
      setShowConfirmation(true);
    } else {
      onClick(e, false);
    }
  };

  const handleConfirm = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onClick(e, true);
    setShowConfirmation(false);
  };

  const handleCancel = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowConfirmation(false);
  };

  const stopPropagation = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const button = (
    <div className="relative w-16 h-16 flex items-center justify-center" onClick={stopPropagation}>
      <button
        className={`absolute w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
          isAdded 
            ? 'bg-green-500' 
            : 'bg-white/60 hover:bg-black'
        }`}
        onClick={handleClick}
      >
        {isAdded ? (
          <Check className="w-4 h-4 text-white" />
        ) : (
          <Plus className={`w-4 h-4 transition-colors duration-300 ${
            isAdded ? 'text-white' : 'text-black group-hover:text-white'
          }`} />
        )}
      </button>
    </div>
  );

  return (
    <div className="flex flex-col items-end group" onClick={stopPropagation}>
      <div className="flex items-center justify-end" onClick={stopPropagation}>
        <div
          className={`relative flex items-center justify-end overflow-hidden transition-all duration-500 ${
            showConfirmation ? 'w-56 bg-white/60 rounded-tr-full rounded-br-full rounded-tl-full' : 'w-16'
          }`}
          style={{ transitionDelay: showConfirmation ? '0ms' : '100ms' }}
          onClick={stopPropagation}
        >
          <div className="absolute left-3 right-12 text-xs h-8 flex items-center overflow-hidden" onClick={stopPropagation}>
            <p className={`whitespace-nowrap transition-opacity duration-300 ${showConfirmation ? 'opacity-100' : 'opacity-0'}`}>
              Retirer tous les {quantity} articles ?
            </p>
          </div>
          {button}
        </div>
      </div>
      <div 
        className={`mt-0 flex justify-start w-full h-6 transition-all duration-300 overflow-hidden ${
          showConfirmation ? 'max-h-6 opacity-100' : 'max-h-0 opacity-0'
        }`}
        style={{ transitionDelay: showConfirmation ? '175ms' : '0ms' }}
        onClick={stopPropagation}
      >
        <div className="flex justify-center bg-white/60 rounded-br-xl rounded-bl-xl w-[65%]" onClick={stopPropagation}>
          <button onClick={handleCancel} className="mr-2 font-bold text-xs text-gray-500 hover:text-gray-700">
            Annuler
          </button>
          <button onClick={handleConfirm} className="text-xs font-bold text-red-500 hover:text-red-700">
            Confirmer
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnimatedAddButton;