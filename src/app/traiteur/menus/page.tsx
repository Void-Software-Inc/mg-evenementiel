import React from 'react';
import MenuHeader from './components/MenuHeader';
import MenuCard from './components/MenuCard';

// Menu categories
const menuCategories = {
  mariage: {
    title: "Mariage",
    items: [
      {
        title: "Vin d'honneur",
        type: "MARIAGES",
        imageUrl: "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/menu%20cards/no-revisions-gA81ZTsql68-unsplash.webp?t=2025-08-24T22%3A35%3A27.340Z",
        pdfUrl: "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/pdf-menus/Vin_d_honneur_MG_EVENEMENTS.pdf?t=2025-09-15T18%3A38%3A05.169Z"
      },
      {
        title: "Brunch",
        type: "MARIAGES",
        imageUrl: "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/menu%20cards/dylan-lu-SpwsT6b0W4A-unsplash.webp?t=2025-08-24T22%3A33%3A02.102Z",
        pdfUrl: "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/pdf-menus/Brunch_Mariage_MG_EVENEMENTS.pdf?t=2025-09-15T17%3A59%3A17.175Z"
      },
      {
        title: "Buffet dînatoire",
        type: "MARIAGES",
        imageUrl: "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/menu%20cards/kari-bjorn-photography-DZt8M38gJ38-unsplash(2).webp?t=2025-09-15T18%3A36%3A41.247Z",
        pdfUrl: "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/pdf-menus/Buffet_Dinatoire_MARIAGES_MG_EVENEMENTS.pdf?t=2025-09-15T17%3A59%3A24.213Z"
      },
      {
        title: "Repas assis",
        type: "MARIAGES",
        imageUrl: "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/menu%20cards/robert-vasquez-OyINhnh9bbw-unsplash.webp",
        pdfUrl: "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/pdf-menus/Repas_Assis_Mariage_MG_EVENEMENTS.pdf?t=2025-09-15T17%3A59%3A33.399Z"
      }
    ]
  },
  social: {
    title: "Professionnels & Particuliers",
    items: [
      {
        title: "Brunch Particuliers",
        type: "PARTICULIERS",
        imageUrl: "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/menu%20cards/colin-michel-7N8amvEYF-0-unsplash(1)(1).webp?t=2025-09-15T18%3A14%3A06.240Z",
        pdfUrl: "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/pdf-menus/Brunch_particuliers_MG_EVENEMENTS.pdf?t=2025-09-15T18%3A02%3A06.970Z"
      },
      {
        title: "Brunch Professionnels",
        type: "PROFESSIONNELS",
        imageUrl: "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/menu%20cards/redd-francisco-11KJfLNCPDU-unsplash.webp?t=2025-09-15T18%3A15%3A27.087Z",
        pdfUrl: "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/pdf-menus/Brunch_pro_MG_EVENEMENTS.pdf?t=2025-09-15T18%3A02%3A13.485Z"
      },
      {
        title: "Buffet dînatoire",
        type: "PROS & PARTICULIERS",
        imageUrl: "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/menu%20cards/imattsmart-HaXSx0UvHRE-unsplash.webp",
        pdfUrl: "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/pdf-menus/Buffet_Dinatoire_pros_particuliers_MG_EVENEMENTS.pdf?t=2025-09-15T18%3A02%3A18.734Z"
      },
      {
        title: "Repas assis",
        type: "PROS & PARTICULIERS",
        imageUrl: "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/menu%20cards/chuttersnap-aEnH4hJ_Mrs-unsplash(1).webp",
        pdfUrl: "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/pdf-menus/Repas_Assis_pros_particuliers_MG_EVENEMENTS.pdf?t=2025-09-15T18%3A02%3A26.491Z"
      }
    ]
  },
  general: {
    title: "Général",
    items: [
      {
        title: "Ateliers culinaires",
        type: "GÉNÉRAL",
        imageUrl: "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/menu%20cards/israel-pina-UHJ3fOfJ-5c-unsplash.webp?t=2025-08-24T22%3A34%3A33.143Z",
        pdfUrl: "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/pdf-menus/Ateliers_Culinaires_MG_EVENEMENTS.pdf?t=2025-09-15T18%3A40%3A49.388Z"
      },
      {
        title: "Bouchées & Mignardises",
        type: "GÉNÉRAL",
        imageUrl: "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/menu%20cards/karl-joshua-bernal-N7wQG77kTB8-unsplash.webp",
        pdfUrl: "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/pdf-menus/Plateaux_Bouchees_MG_EVENEMENTS.pdf?t=2025-08-24T22%3A19%3A13.239Z"
      },
      {
        title: "Moment du gâteau & Buffet sucré",
        type: "GÉNÉRAL",
        imageUrl: "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/menu%20cards/andy-quezada-OePfJ_lmY4M-unsplash.webp?t=2025-08-24T22%3A31%3A12.213Z",
        pdfUrl: "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/pdf-menus/Buffet_Sucre_MG_EVENEMENTS.pdf" 
      },
      {
        title: "Carte des boissons",
        type: "GÉNÉRAL",
        imageUrl: "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/menu%20cards/jiwon-kang-eCDtMhvexWc-unsplash.webp?t=2025-09-15T18%3A20%3A53.729Z",
        pdfUrl: "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/pdf-menus/Carte_Boissons.pdf?t=2025-09-15T18%3A18%3A12.546Z" 
      }
    ]
  }
};

// Helper component to render a category section
const CategorySection = ({ title, items, categoryKey }: { title: string; items: any[]; categoryKey: string }) => {
  const itemsInLastRow = items.length % 3;
  const offsetClass = itemsInLastRow === 1 ? 'lg:col-start-2' : '';
  const hoverColor = categoryKey === 'social' ? 'hover:bg-zinc-100' : 'hover:bg-zinc-50';

  return (
    <div className="mb-20 pb-8">
      <h2 className="text-3xl sm:text-4xl font-light text-zinc-900 text-center mb-8 sm:mb-12">
        {title}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-8 sm:gap-y-12">
        {items.map((item, index) => {
          const isLastInRow = {
            sm: (index + 1) % 2 === 0,
            lg: (index + 1) % 3 === 0
          };
          const isLastItem = index === items.length - 1;

          return (
            <div 
              key={index} 
              className={`relative flex justify-center rounded-md transition-colors duration-300 ease-in-out ${hoverColor} ${
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
  );
};

export default function MenusPage() {
  return (
    <main className="mt-20 mb-32">
      <div className="container mx-auto px-4 md:px-8">
        <MenuHeader />
      </div>
      
      {Object.entries(menuCategories).map(([key, category]) => {
        const hasBackground = key === 'social';
        
        return (
          <div key={key} className={`w-full ${hasBackground ? 'bg-zinc-50' : ''}`}>
            <div className="container mx-auto px-4 md:px-8 mt-10 sm:mt-20">
              <div className="max-w-7xl mx-auto pt-8">
                <CategorySection
                  title={category.title}
                  items={category.items}
                  categoryKey={key}
                />
              </div>
            </div>
          </div>
        );
      })}
    </main>
  );
}