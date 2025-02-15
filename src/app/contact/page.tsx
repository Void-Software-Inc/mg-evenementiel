import React from 'react';
import type { Metadata } from 'next';
import ContactForm from './components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact - MG Événementiel',
  description: 'Contactez MG Événementiel pour la location de mobilier et de matériel pour réceptions dans le Sud de la France.',
  openGraph: {
    title: 'Contact - MG Événementiel',
    description: 'Contactez MG Événementiel pour la location de mobilier et de matériel pour réceptions dans le Sud de la France.',
    url: 'https://www.mgevenements.fr',
    siteName: 'MG Événementiel',
    images: [
      {
        url: 'https://www.mgevenements.fr/favicon_io/favicon.ico',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  // JSON-LD can be added using the jsonLd property
  alternates: {
    canonical: 'https://www.mgevenements.fr/contact',
  },
}

// You can add JSON-LD data using a separate variable
export const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "MG Événementiel",
  "url": "https://www.mgevenements.fr",
  "logo": "https://www.mgevenements.fr/favicon_io/favicon.ico",
  "description": "Contactez MG Événementiel pour la location de mobilier et de matériel pour réceptions dans le Sud de la France.",
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
}

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="h-full w-full left-0 top-0 -z-10 flex justify-center">
        <ContactForm />
      </div>
    </>
  );
}