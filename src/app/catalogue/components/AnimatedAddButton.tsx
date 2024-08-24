import React, { useState } from 'react';

interface AnimatedAddButtonProps {
  onClick: (removeAll: boolean) => void;
  quantity: number;
}

const AnimatedAddButton: React.FC<AnimatedAddButtonProps> = ({ onClick, quantity }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const isAdded = quantity > 0;

  const handleClick = () => {
    if (isAdded && quantity > 1) {
      setShowConfirmation(true);
    } else {
      onClick(false);
    }
  };

  const handleConfirm = () => {
    onClick(true);
    setShowConfirmation(false);
  };

  const handleCancel = () => {
    setShowConfirmation(false);
  };

  const button = (
    <button
      className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${
        isAdded ? 'bg-green-500' : 'bg-white'
      }`}
      onClick={handleClick}
    >
      <div className={`relative w-4 h-4 transition-transform duration-300 ${isAdded ? 'rotate-45 scale-110 -translate-x-[1px] -translate-y-[1px]' : 'rotate-0 scale-100'}`}>
        <span
          className={`absolute w-full h-[2px] transition-all duration-300 ${isAdded ? 'bg-white translate-x-[4px] translate-y-[5px] w-[9px]' : 'bg-black'}`}
          style={{ top: '50%', left: 0, marginTop: '-1px' }}
        />
        <span
          className={`absolute h-full w-[2px] transition-all duration-300 ${isAdded ? 'bg-white translate-x-[4px] -translate-y-[3px]' : 'bg-black'} ${
            'scale-y-100 translate-y-0'
          }`}
          style={{ left: '50%', top: 0, marginLeft: '-1px' }}
        />
      </div>
    </button>
  );

  return (
    <div className="flex flex-col items-end">
      <div className="flex items-center justify-end">
        <div
          className={`relative flex items-center justify-end bg-white rounded-full overflow-hidden transition-all duration-300 ${
            showConfirmation ? 'w-56' : 'w-8'
          }`}
          style={{ transitionDelay: showConfirmation ? '0ms' : '200ms' }}
        >
          <div className="absolute left-3 right-8 text-sm h-8 flex items-center overflow-hidden">
            <p className={`whitespace-nowrap transition-opacity duration-300 ${showConfirmation ? 'opacity-100' : 'opacity-0'}`}>
              Retirer tous les {quantity} articles ?
            </p>
          </div>
          {button}
        </div>
      </div>
      <div 
        className={`-mt-1 flex justify-center w-full transition-all duration-300 overflow-hidden ${
          showConfirmation ? 'max-h-10 opacity-100' : 'max-h-0 opacity-0'
        }`}
        style={{ transitionDelay: showConfirmation ? '300ms' : '0ms' }}
      >
        <div className="flex justify-center bg-white rounded-b-md w-[65%]">
          <button onClick={handleCancel} className="mr-2 text-sm text-gray-500 hover:text-gray-700">
            Annuler
          </button>
          <button onClick={handleConfirm} className="text-sm font-bold text-red-500 hover:text-red-700">
            Confirmer
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnimatedAddButton;