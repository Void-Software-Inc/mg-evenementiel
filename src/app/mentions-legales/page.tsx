import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { BackToTop } from '@/components/global/BackToTop';
import { LinkedInLogoIcon } from '@radix-ui/react-icons';

export const metadata: Metadata = {
  title: 'Mentions Légales - MG Événements',
  description: 'Mentions légales de MG Événements, location de mobilier et matériel pour événements dans le Sud de la France. Basé à Toulouse, dans le 31.',
  openGraph: {
    title: 'Mentions Légales - MG Événements',
    description: 'Mentions légales de MG Événements, location de mobilier et matériel pour événements dans le Sud de la France. Basé à Toulouse, dans le 31.',
    url: 'https://www.mgevenements.fr/mentions-legales',
    siteName: 'MG Événements',
    images: [
      {
        url: 'https://www.mgevenements.fr/favicon_io/favicon.ico',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.mgevenements.fr/mentions-legales',
  },
}

export const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Mentions Légales - MG Événements",
  "url": "https://www.mgevenements.fr/mentions-legales",
  "description": "Mentions légales de MG Événements, location de mobilier et matériel pour événements dans le Sud de la France. Basé à Toulouse, dans le 31."
};

export default function MentionsLegalesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen w-full py-32 bg-gradient-to-b from-white to-zinc-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-zinc-800 mb-8 sm:mb-20 text-6xl  sm:text-7xl md:text-8xl font-thin tracking-tight text-center">
            MENTIONS LÉGALES
          </h1>
          <div className="w-full max-w-4xl mx-auto">
            <section className="bg-white rounded-2xl shadow-sm p-8 mb-8">
              <h2 className="text-3xl font-light mb-6 text-zinc-800 border-b border-zinc-100 pb-4">
                Bienvenue sur notre site web
              </h2>
              <p className="mb-2">
                Conformément à <a 
                  href="https://www.legifrance.gouv.fr/loda/article_lc/LEGIARTI000049577522"
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  l'article 6 de la loi n°2004-575 du 21 juin 2004 pour la Confiance dans l'Économie Numérique
                </a>, il est précisé aux utilisateurs du site l'identité des intervenants dans le cadre de sa réalisation et de son suivi.
              </p>
            </section>

            <section className="bg-white rounded-2xl shadow-sm p-8 mb-8">
              <h2 className="text-3xl font-light mb-6 text-zinc-800 border-b border-zinc-100 pb-4">
                Informations sur l'entreprise
              </h2>
              <p className="mb-1">MG Événements</p>
              <p className="mb-1">Chemin des droits de l'homme et du citoyen</p>
              <p className="mb-1">31450 Ayguevives</p>
              <p className="mb-1">Responsable : Mani GRIMAUDO</p>
              <p className="mb-1">Contact : 07 68 10 96 17 | <a 
                href="mailto:mgevenementiel31@gmail.com"
                className="text-blue-600 hover:underline"
              >
                mgevenementiel31@gmail.com
              </a></p>
              <p className="mb-1">Forme juridique : EI</p>
              <p className="mb-1">Numéro SIREN/SIRET : 918 638 008</p>
              <p className="mb-1">Numéro de TVA : FR88918638008</p>
              <p className="mb-1">Code APE : 5320Z</p>
            </section>

            <section className="bg-white rounded-2xl shadow-sm p-8 mb-8">
              <h2 className="text-3xl font-light mb-6 text-zinc-800 border-b border-zinc-100 pb-4">
                Éditeur du site
              </h2>
              <p className="mb-1">Le site a été développé par Void Software Inc.</p>
              
              <div className="space-y-2">
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center gap-2">
                    <p>Samuel COELHO</p>
                    <a 
                      href="https://www.linkedin.com/in/samuel-c-293984212/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <LinkedInLogoIcon className="w-4 h-4" />
                    </a>
                    <span className="mx-2">|</span>
                    <a 
                      href="mailto:samuel.coelho@voidsoftware.pro"
                      className="text-blue-600 hover:underline"
                    >
                      samuel.coelho@voidsoftware.pro
                    </a>
                  </div>

                  <div className="flex items-center gap-2">
                    <p>Eva BARDEAU</p>
                    <a 
                      href="https://www.linkedin.com/in/eva-bardeau-95ba311aa/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <LinkedInLogoIcon className="w-4 h-4" />
                    </a>
                    <span className="mx-2">|</span>
                    <a 
                      href="mailto:eva.bardeau@voidsoftware.pro"
                      className="text-blue-600 hover:underline"
                    >
                      eva.bardeau@voidsoftware.pro
                    </a>
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-white rounded-2xl shadow-sm p-8 mb-8">
              <h2 className="text-3xl font-light mb-6 text-zinc-800 border-b border-zinc-100 pb-4">
                Hébergement
              </h2>
              <p className="mb-1">Ce site est hébergé par HETZNER.</p>
              <p className="mb-1">Industriestr. 25</p>
              <p className="mb-1">91710 Gunzenhausen</p>
              <p className="mb-1">Allemagne</p>
              <p className="mb-1">Contact : +49 (0)9831 505-0 | <a 
                href="https://www.hetzner.com"
                className="text-blue-600 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                www.hetzner.com
              </a></p>
            </section>

            <section className="bg-white rounded-2xl shadow-sm p-8 mb-8">
              <h2 className="text-3xl font-light mb-6 text-zinc-800 border-b border-zinc-100 pb-4">
                Propriété intellectuelle
              </h2>
              
              <div className="space-y-6">
                <p>
                  L'ensemble du contenu présent sur le site, incluant, de façon non limitative, les textes, graphismes, logos, icônes, et logiciels, est la propriété de MG Événements ou de ses partenaires, et est protégé par les lois françaises et internationales relatives à la propriété intellectuelle.
                </p>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-medium mb-4 text-zinc-700">
                      Images du catalogue
                    </h3>
                    <p>
                      Certaines images présentées dans le catalogue ne sont pas la propriété de MG Événements.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-medium mb-4 text-zinc-700">
                      Photos de la page "Réalisations"
                    </h3>
                    <p>
                      Les photographies illustrant la page "Réalisations" sont la propriété exclusive de MG Événements. Toute reproduction, représentation, modification ou utilisation de ces images sans autorisation préalable est strictement interdite.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-medium mb-4 text-zinc-700">
                      Image libre de droits dans le menu
                    </h3>
                    <p>
                      Une image libre de droits est utilisée dans le menu. Nous nous engageons à respecter les termes d'utilisation associés à cette image.
                    </p>
                  </div>
                </div>

                <p className="text-sm font-medium mt-6">
                  Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable de MG Événements.
                </p>
              </div>
            </section>

            <section className="bg-white rounded-2xl shadow-sm p-8 mb-8">
              <h2 className="text-3xl font-light mb-6 text-zinc-800 border-b border-zinc-100 pb-4">
                Gestion des données personnelles (RGPD)
              </h2>
              <div className="mb-6">
        <h3 className="text-xl font-medium mb-4 text-zinc-800">Collecte et traitement des données</h3>
        <p className="mb-4">
          Conformément au <a href="https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX%3A32016R0679" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Règlement Général sur la Protection des Données (RGPD)</a> et 
          à la <a href="https://www.legifrance.gouv.fr/loda/id/JORFTEXT000000886460/" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">loi Informatique et Libertés du 6 janvier 1978 modifiée</a>, 
          MG Événements s'engage à assurer un niveau de protection optimal des données personnelles des utilisateurs de son site.
        </p>
        <ul className="list-disc pl-6 space-y-3 text-zinc-600">
          <li>
            <span className="font-medium">Données collectées :</span> Dans le cadre de l'utilisation du site et des services proposés (formulaire de contact, demande de devis), nous collectons des informations personnelles telles que nom, prénom, adresse électronique, numéro de téléphone.
          </li>
          <li>
            <span className="font-medium">Finalité du traitement :</span> Les données collectées sont utilisées exclusivement pour répondre à vos demandes, établir des devis, et assurer le suivi de nos prestations.
          </li>
          <li>
            <span className="font-medium">Durée de conservation :</span> Les données sont conservées pour la durée nécessaire aux finalités pour lesquelles elles ont été collectées.
          </li>
        </ul>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-medium mb-4 text-zinc-800">Droits des utilisateurs</h3>
        <p className="mb-3">
          Conformément au RGPD, chaque utilisateur dispose des droits suivants sur ses données :
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <span className="font-medium">Droit d'accès :</span> Vous avez le droit de demander une copie de vos données personnelles détenues par MG Événements.
          </li>
          <li>
            <span className="font-medium">Droit de rectification :</span> Vous pouvez demander à corriger ou mettre à jour vos informations si elles sont inexactes.
          </li>
          <li>
            <span className="font-medium">Droit à l'effacement :</span> Vous pouvez demander la suppression de vos données.
          </li>
          <li>
            <span className="font-medium">Droit d'opposition et de limitation :</span> Vous pouvez vous opposer ou limiter le traitement de vos données dans certains cas.
          </li>
          <li>
            <span className="font-medium">Droit à la portabilité :</span> Vous pouvez demander à ce que vos données soient transférées à un autre organisme.
          </li>
        </ul>
      </div>

      <p className="text-sm">
        Pour exercer ces droits, veuillez envoyer un email à <a 
          href="mailto:mgevenementiel31@gmail.com"
          className="text-blue-600 hover:underline"
        >
          mgevenementiel31@gmail.com
        </a> avec en objet "Droit sur mes données personnelles".
      </p>
            </section>

            <section className="bg-white rounded-2xl shadow-sm p-8 mb-8">
              <h2 className="text-3xl font-light mb-6 text-zinc-800 border-b border-zinc-100 pb-4">
                Limitation de responsabilité
              </h2>
              <div className="space-y-4">
                <p>
                  MG Événements ne pourra être tenue responsable des dommages directs et indirects causés au matériel de l'utilisateur, lors de l'accès au site internet, résultant de :
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>L'utilisation d'un matériel ne répondant pas aux spécifications techniques</li>
                  <li>L'apparition d'un bug ou d'une incompatibilité</li>
                </ul>
                
                <p>
                  MG Événements ne pourra également être tenue responsable des dommages indirects consécutifs à l'utilisation du site (tels par exemple qu'une perte de marché ou perte d'une chance).
                </p>
              </div>
            </section>

            <section 
              id="cookies-policy" 
              className="bg-white rounded-2xl shadow-sm p-8 mb-8 scroll-mt-32"
            >
              <h2 className="text-3xl font-light mb-6 text-zinc-800 border-b border-zinc-100 pb-4">
                Politique de gestion des cookies
              </h2>
              
              <div className="space-y-6">
                <p>
                  Le site MG Événements utilise des cookies pour garantir le bon fonctionnement de certaines fonctionnalités, notamment la gestion de votre panier et le cache des images. Ces cookies sont essentiels pour améliorer votre expérience de navigation en permettant des interactions fluides et rapides.
                </p>

                <div>
                  <h3 className="text-xl font-medium mb-4 text-zinc-800">Types de cookies utilisés</h3>
                  <p className="mb-2">
                    <span className="font-medium">Cookies techniques :</span> Ces cookies sont strictement nécessaires au fonctionnement du site. Ils permettent de :
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Sauvegarder les éléments de votre panier jusqu'à la validation de la création de votre devis.</li>
                    <li>Mémoriser les images chargées pour éviter des requêtes répétées à la base de données.</li>
                  </ul>
                  <p className="text-sm italic">
                    Ces cookies ne collectent aucune donnée personnelle et ne sont pas utilisés à des fins de suivi ou de publicité.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-medium mb-4 text-zinc-800">Consentement</h3>
                  <p>
                    En poursuivant votre navigation sur notre site, vous acceptez l'utilisation de ces cookies techniques. Nous vous informons que vous avez la possibilité de configurer votre navigateur pour bloquer ces cookies, mais cela pourrait affecter certaines fonctionnalités du site.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-medium mb-4 text-zinc-800">Gestion des cookies</h3>
                  <p className="mb-3">
                    Pour plus d'informations sur la gestion des cookies, vous pouvez consulter les liens suivants :
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>
                      <Link 
                        href="https://www.legifrance.gouv.fr/loda/id/JORFTEXT000000886460/"
                        className="text-blue-600 hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Loi Informatique et Libertés
                      </Link>
                    </li>
                    <li>
                      <Link 
                        href="https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX%3A32016R0679"
                        className="text-blue-600 hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Règlement Général sur la Protection des Données (RGPD)
                      </Link>
                    </li>
                    <li>
                      <Link 
                        href="https://www.cnil.fr/fr/cookies-et-autres-traceurs"
                        className="text-blue-600 hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Guide de la CNIL sur les cookies
                      </Link>
                    </li>
                  </ul>
                </div>

                <p>
                  Pour toute question concernant notre politique de gestion des cookies, vous pouvez nous contacter à l'adresse suivante : {' '}
                  <a 
                    href="mailto:mgevenementiel31@gmail.com"
                    className="text-blue-600 hover:underline"
                  >
                    mgevenementiel31@gmail.com
                  </a>
                </p>
              </div>
            </section>

            <section className="bg-white rounded-2xl shadow-sm p-8 mb-8">
              <h2 className="text-3xl font-light mb-6 text-zinc-800 border-b border-zinc-100 pb-4">
                Conditions générales d'utilisation du site (CGU)
              </h2>
              
              <div className="space-y-6">
                <p>
                  L'utilisation du site MG Événements implique l'acceptation pleine et entière des conditions générales d'utilisation décrites ci-après :
                </p>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-medium mb-4 text-zinc-800">Accès au site</h3>
                    <p>
                      Le site est accessible en tout lieu, sous réserve de disponibilité technique. Tous les frais liés à l'accès au site sont à la charge de l'utilisateur.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-medium mb-4 text-zinc-800">Services proposés</h3>
                    <p>
                      Le site a pour objet de fournir une information concernant les services de MG Événements, notamment la location de mobilier et de matériel pour événements dans le Sud de la France.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-medium mb-4 text-zinc-800">Modifications</h3>
                    <p>
                      MG Événements se réserve le droit de modifier les présentes mentions légales à tout moment, afin de les adapter aux évolutions du site.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-white rounded-2xl shadow-sm p-8 mb-8">
              <h2 className="text-3xl font-light mb-6 text-zinc-800 border-b border-zinc-100 pb-4">
                Droit applicable et attribution de juridiction
              </h2>
              
              <div className="space-y-4">
                <p>
                  Tout litige en relation avec l'utilisation du site est soumis au droit français. Il est fait attribution exclusive de juridiction aux tribunaux compétents de Toulouse.
                </p>
              </div>
            </section>
          </div>
        </div>
        <BackToTop />
      </div>
    </>
  );
}