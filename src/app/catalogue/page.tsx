import CatalogDisplay from "./components/CatalogDisplay";
import { ProductProvider } from '@/app/context/ProductContext';
import Head from 'next/head';

const CataloguePage: React.FC = () => {
  return (
    <>
    <Head>
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "MG Événementiel",
          "url": "https://www.mgevenements.fr",
          "logo": "https://www.mgevenements.fr/favicon_io/favicon.ico",
          "description": "Découvrez notre catalogue de mobilier et de matériel à louer pour vos événements dans le Sud de la France.",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Toulouse",
            "addressRegion": "Occitanie",
            "addressCountry": "France"
          },
          "sameAs": [
            "https://www.mariages.net/chapiteau-mariage/mg-evenementiel--e331790",
            "https://www.instagram.com/mg_evenementiel/"
          ]
        })}
      </script>
    </Head>
        <ProductProvider>
          <CatalogDisplay />
        </ProductProvider>
        <div className="h-12 w-full bg-white"></div>
      </>
  );
};

export default CataloguePage;
