import React from 'react';
import type { Metadata } from 'next';
import { AboutMG } from './components/AboutMG';
import Faq from './components/Faq';

export const metadata: Metadata = {
  title: 'Infos - MG Événementiel',
  description: 'MG Événementiel propose la location de mobilier et de matériel de haute qualité pour des événements dans le Sud de la France.',
  openGraph: {
    title: 'Infos - MG Événementiel',
    description: 'MG Événementiel propose la location de mobilier et de matériel de haute qualité pour des événements dans le Sud de la France.',
    url: 'https://www.mgevenements.fr/infos',
    siteName: 'MG Événementiel',
    images: [
      {
        url: 'https://www.mgevenements.fr/favicon_io/favicon.ico',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.mgevenements.fr/infos',
  },
}

export const jsonLd = {
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
};

export default function InfosPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="h-fit w-full flex flex-col items-center justify-center mt-32">
        <AboutMG/>
        <Faq/>
      </div>
    </>
  );
}