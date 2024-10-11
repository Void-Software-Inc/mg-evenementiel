import React from 'react';
import Head from 'next/head';
import ContactForm from './components/ContactForm';

export default function ContactPage() {
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
        })}
      </script>
    </Head>
      <div className="h-full w-full left-0 top-0 -z-10 flex justify-center">
        <ContactForm />
      </div>
      </>
  );
};
