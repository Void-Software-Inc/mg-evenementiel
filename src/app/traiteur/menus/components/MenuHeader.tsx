import React from 'react';

const MenuHeader = () => {
  return (
    <div className="text-center max-w-[90%] sm:max-w-3xl mx-auto sm:px-4 py-10 sm:py-16">
      <h1 className="text-6xl sm:text-7xl font-extralight mb-8 text-zinc-900">Menus</h1>
      <p className="text-base sm:text-lg text-zinc-700 font-light">
      Les menus présentés dans ce catalogue sont des suggestions élaborées par nos chefs. 
      Ils sont conçus pour inspirer vos choix et peuvent être adaptés selon les saisons, 
      vos goûts et les régimes alimentaires de vos convives. Mariages, anniversaires, 
      événements privés ou professionnels : chaque occasion est l’opportunité de créer 
      un menu personnalisé qui reflète vos envies.
      </p>
    </div>
  );
};

export default MenuHeader;
