import React from 'react';
import MenuHeader from './components/MenuHeader';
import MenuCard from './components/MenuCard';

const menuItems = [
  {
    title: "Brunch",
    type: "PRO, PARTICULIERS & MARIAGES",
    imageUrl: "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/menu%20cards/dylan-lu-SpwsT6b0W4A-unsplash.webp?t=2025-08-24T22%3A33%3A02.102Z",
    pdfUrl: "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/pdf-menus/Brunch_MG_EVENEMENTS.pdf?t=2025-08-24T22%3A18%3A26.499Z"
  },
  {
    title: "Vin d'honneur",
    type: "PRO, PARTICULIERS & MARIAGES",
    imageUrl: "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/menu%20cards/no-revisions-gA81ZTsql68-unsplash.webp?t=2025-08-24T22%3A35%3A27.340Z",
    pdfUrl: "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/pdf-menus/Vin_d_honneur_MG%20_EVENEMENTS.pdf?t=2025-08-24T22%3A19%3A38.906Z"
  },
  {
    title: "Ateliers culinaires",
    type: "PRO, PARTICULIERS & MARIAGES",
    imageUrl: "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/menu%20cards/israel-pina-UHJ3fOfJ-5c-unsplash.webp?t=2025-08-24T22%3A34%3A33.143Z",
    pdfUrl: "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/pdf-menus/Ateliers_MG_EVENEMENTS.pdf?t=2025-08-24T22%3A18%3A12.205Z"
  },
  {
    title: "Bouchées & Mignardises",
    type: "PRO, PARTICULIERS & MARIAGES",
    imageUrl: "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/menu%20cards/karl-joshua-bernal-N7wQG77kTB8-unsplash.webp",
    pdfUrl: "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/pdf-menus/Plateaux_Bouchees_MG_EVENEMENTS.pdf?t=2025-08-24T22%3A19%3A13.239Z"
  },
  {
    title: "Buffet dînatoire",
    type: "PRO & PARTICULIERS",
    imageUrl: "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/menu%20cards/imattsmart-HaXSx0UvHRE-unsplash.webp",
    pdfUrl: "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/pdf-menus/Buffet_Dinatoire_MG_EVENEMENTS.pdf?t=2025-08-24T22%3A18%3A36.855Z"
  },
  {
    title: "Repas assis",
    type: "MARIAGES",
    imageUrl: "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/menu%20cards/robert-vasquez-OyINhnh9bbw-unsplash.webp",
    pdfUrl: "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/pdf-menus/Repas_Assis_Mariage_MG_EVENEMENTS.pdf?t=2025-08-24T22%3A19%3A29.371Z"
  },
  {
    title: "Moment du gâteau & Buffet sucré",
    type: "PRO, PARTICULIERS & MARIAGES",
    imageUrl: "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/menu%20cards/andy-quezada-OePfJ_lmY4M-unsplash.webp?t=2025-08-24T22%3A31%3A12.213Z",
    pdfUrl: "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/pdf-menus/Buffet_Sucre_MG_EVENEMENTS.pdf" 
  }
];

export default function MenusPage() {
  const itemsInLastRow = menuItems.length % 3;
  const offsetClass = itemsInLastRow === 1 ? 'lg:col-start-2' : '';

  return (
    <main className="container mx-auto px-4 md:px-8 mt-20 mb-32">
      <MenuHeader />
      <div className="max-w-7xl mx-auto mt-10 sm:mt-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-8 sm:gap-y-12 lg:gap-y-16">
          {menuItems.map((item, index) => {
            const isLastInRow = {
              sm: (index + 1) % 2 === 0,
              lg: (index + 1) % 3 === 0
            };
            const isLastItem = index === menuItems.length - 1;

            return (
              <div 
                key={index} 
                className={`relative flex justify-center transition-colors duration-300 ease-in-out hover:bg-[#F7F3E6] ${
                  isLastItem && itemsInLastRow === 1 ? offsetClass : ''
                }`}
              >
                <div className="py-4">
                  <MenuCard
                    title={item.title}
                    type={item.type}
                    imageUrl={item.imageUrl}
                    pdfUrl={item.pdfUrl}
                  />
                </div>
                
                {/* Vertical dividers */}
                {!isLastItem && !isLastInRow.lg && (
                  <div className="hidden lg:block absolute -right-[0.5px] top-0 h-full w-[1px] bg-gray-200" />
                )}
                {!isLastItem && !isLastInRow.sm && (
                  <div className="hidden sm:block lg:hidden absolute -right-[0.5px] top-0 h-full w-[1px] bg-gray-200" />
                )}
                
                {/* Horizontal dividers - only for mobile */}
                {!isLastItem && (
                  <div className="w-full h-[1px] bg-gray-200 absolute bottom-0 left-0 sm:hidden" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}