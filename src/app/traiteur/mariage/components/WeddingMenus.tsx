"use client";

import { useState } from 'react';

const menus = [
  {
    id: "essentiel",
    title: "Essentiel",
    price: "59 €/pers.",
    description: "La formule parfaite pour un mariage élégant et raffiné, en toute simplicité.",
    details: {
      "Entrées (1 au choix)": ["Salade melon–jambon cru", "gésiers confits", "aumônière chèvre/tapenade"],
      "Plats (1 au choix)": ["Filet mignon sauce moutarde", "saumon riz-poivrons", "risotto fruits de mer"],
      "Fromages": ["Comté & Brie, salade verte"],
      "Desserts": ["Fraisier ou duo chocolaté"],
      "Inclus": ["pain, eau plate/gazeuse, café, nappage, verrerie, vaisselle, serviette, service"],
    },
  },
  {
    id: "premium",
    title: "Premium",
    price: "79 €/pers.",
    description: "Montez en gamme avec des saveurs plus audacieuses et des produits d'exception.",
    details: {
      "Entrées": ["Cheesecake saumon", "salade crevettes-ananas", "crème de lentilles au foie gras"],
      "Plats": ["Magret sauce miel", "cabillaud chorizo", "rumsteck sauce poivre"],
      "Fromage": ["Assiette de 3 fromages"],
      "Desserts": ["Tartelette chocolat-praliné", "fondant citron"],
      "Inclus": ["Mêmes prestations que pour l’Essentiel"],
    },
  },
  {
    id: "prestige",
    title: "Prestige",
    price: "109 €/pers.",
    description: "L'expérience culinaire ultime pour un mariage sans compromis, du vin d'honneur au dessert.",
    details: {
      "Vin d’honneur": ["8 pièces + 1 atelier, mise en bouche surprise"],
      "Entrées": ["Tartare de daurade", "Saint-Jacques croustillantes", "foie gras toast"],
      "Plats": ["Filet de bœuf", "noix de Saint-Jacques curry", "suprême de volaille langoustines"],
      "Fromages": ["Assiette de 5 fromages"],
      "Desserts": ["Merveilleux choco ou plateau de 5 mignardises"],
      "Inclus": ["Prestations Essentiel + vin d’honneur"],
    },
  },
  {
    id: "enfant",
    title: "Menu Enfant",
    price: "17 €/enfant",
    description: "Un menu savoureux et adapté pour que les plus jeunes aussi se régalent.",
    details: {
      "Entrées": ["Billes de melon", "mini quiches"],
      "Plats": ["Cuisse de poulet crème", "cheeseburger + frites"],
      "Desserts": ["Brochette de fruits ou glace"],
      "Boissons": ["Capri Sun, eau plate"],
    },
  },
];

const WeddingMenus = () => {
  const [flippedMenuId, setFlippedMenuId] = useState<string | null>(null);

  const handleFlip = (menuId: string) => {
    setFlippedMenuId(flippedMenuId === menuId ? null : menuId);
  };

  return (
    <section className="py-12 md:py-24 w-[80%]">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Choisissez Votre Expérience
        </h2>
        <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
          Découvrez nos formules conçues pour s'adapter à chaque envie et budget. Cliquez sur une formule pour en explorer les détails.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {menus.map((menu) => (
            <div
              key={menu.id}
              className="group h-[450px] [perspective:1000px]"
              onClick={() => handleFlip(menu.id)}
            >
              <div
                className={`relative w-full h-full [transform-style:preserve-3d] transition-transform duration-700 cursor-pointer ${
                  flippedMenuId === menu.id ? '[transform:rotateY(180deg)]' : ''
                }`}
              >
                {/* Front of the card */}
                <div className="absolute w-full h-full [backface-visibility:hidden] bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
                  <div className="p-6 text-center flex-grow">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">{menu.title}</h3>
                    <p className="text-gray-500 mb-4">{menu.description}</p>
                  </div>
                  <div className="p-4 bg-gray-100 text-center">
                    <p className="text-2xl font-bold text-primary">{menu.price}</p>
                    <p className="text-sm text-gray-500 mt-2">Cliquez pour voir le menu</p>
                  </div>
                </div>

                {/* Back of the card */}
                <div className="absolute w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] bg-white rounded-lg shadow-lg overflow-hidden flex flex-col p-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2 text-center">{menu.title}</h3>
                  <p className="text-xl font-semibold text-primary text-center mb-4">{menu.price}</p>
                  <div className="overflow-y-auto flex-grow pr-2 text-left">
                    <div className="space-y-4">
                      {Object.entries(menu.details).map(([category, items]) => (
                        <div key={category}>
                          <h4 className="font-semibold text-gray-800 text-lg mb-2 border-b pb-1">{category}</h4>
                          <ul className="list-none space-y-1">
                            {(items as string[]).map((item, i) => (
                              <li key={i} className="text-gray-600 text-sm">{item}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-center text-gray-400 mt-4">Cliquez pour retourner</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WeddingMenus; 