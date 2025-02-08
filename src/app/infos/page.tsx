import React from 'react';
import { AboutMG } from './components/AboutMG';
import Faq from './components/Faq';
import Head from 'next/head';

export default function InfosPage() {
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
          "description": "MG Événementiel propose la location de mobilier et de matériel de haute qualité pour des événements dans le Sud de la France.",
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
    <div className="h-fit w-full flex flex-col items-center justify-center mt-32">
      <AboutMG/>
      <Faq/>
    </div>
    </>
  );
};
