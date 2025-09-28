import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { BackToTop } from '@/components/global/BackToTop';

export const metadata: Metadata = {
  title: 'Conditions Générales de Vente - MG Événements',
  description: 'Conditions générales de vente et modalités pour les services traiteur de MG Événements. Découvrez nos conditions de réservation, dégustations et prestations.',
  openGraph: {
    title: 'Conditions Générales de Vente - MG Événements',
    description: 'Conditions générales de vente et modalités pour les services traiteur de MG Événements. Découvrez nos conditions de réservation, dégustations et prestations.',
    url: 'https://www.mgevenements.fr/conditions',
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
    canonical: 'https://www.mgevenements.fr/conditions',
  },
}

export const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Conditions Générales de Vente - MG Événements",
  "url": "https://www.mgevenements.fr/conditions",
  "description": "Conditions générales de vente et modalités pour les services traiteur de MG Événements. Découvrez nos conditions de réservation, dégustations et prestations."
};

export default function ConditionsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div 
        className="min-h-screen w-full relative"
        style={{
          backgroundImage: `url('https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/tom-pumford-K-zyVx3Jakw-unsplash(1).jpg?t=2025-09-28T15%3A13%3A31.334Z')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/50"></div>
        
        <div className="relative z-10 min-h-screen py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-white mb-8 sm:mb-20 text-6xl sm:text-7xl md:text-8xl font-thin tracking-tight text-center drop-shadow-lg">
              CONDITIONS GÉNÉRALES
            </h1>
            <div className="w-full max-w-4xl mx-auto">

            {/* MODALITÉS Section */}
            <section className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg p-8 mb-8 border border-white/20">
              <h2 className="text-4xl font-light mb-8 text-zinc-800 border-b border-zinc-100 pb-4">
                MODALITÉS
              </h2>
              
              {/* LA DÉGUSTATION */}
              <div className="mb-12">
                <h3 className="text-2xl font-light mb-6 text-zinc-800">
                  LA DÉGUSTATION
                </h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xl font-medium mb-4 text-zinc-700">
                      Quand et comment est organisée la dégustation ?
                    </h4>
                    <div className="space-y-4 text-zinc-600">
                      <p>
                        Une fois le devis initial accepté, la dégustation a lieu.
                        Ceci permet aux mariés de confirmer leurs préférences et d'énoncer les spécificités.
                      </p>
                      <p>
                        Nous fixerons avec les mariés un rendez-vous afin de consacrer suffisamment de temps pour eux et ainsi apporter des réponses à toutes les questions.
                      </p>
                      <p>
                        La dégustation peut se dérouler dans nos locaux, dans un lieu de réception ou parfois même à domicile.
                      </p>
                      <p>
                        Le coût de la dégustation s'élève à <span className="font-medium">65,00 € par convive</span>, la participation étant limitée aux mariés et à deux invités.
                      </p>
                      <p className="font-medium text-zinc-700">
                        En cas de confirmation de votre mariage avec notre service, le coût de la dégustation pour les futurs mariés sera soustrait du devis définitif, soit 130,00€.
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xl font-medium mb-4 text-zinc-700">
                      Quoi déguster ?
                    </h4>
                    <p className="mb-4 text-zinc-600">
                      Ils retrouveront plusieurs choses lors de cette dégustation :
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-zinc-600">
                      <li>Une sélection de pièces à cocktails</li>
                      <li>Deux entrées différentes</li>
                      <li>Deux plats différents</li>
                      <li>Fromages</li>
                      <li>Deux desserts différents</li>
                    </ul>
                    <div className="mt-4 space-y-2 text-zinc-600">
                      <p>
                        Il est nécessaire de nous indiquer ce que vous souhaitez déguster parmi nos entrées, plats et desserts.
                      </p>
                      <p>
                        Il conviendra également de nous communiquer toutes restrictions alimentaires et allergies.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* CONDITIONS GÉNÉRALES DE VENTE Section */}
            <section className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg p-8 mb-8 border border-white/20">
              <h2 className="text-4xl font-light mb-8 text-zinc-800 border-b border-zinc-100 pb-4">
                CONDITIONS GÉNÉRALES DE VENTE
              </h2>

              {/* Objet */}
              <div className="mb-8">
                <h3 className="text-2xl font-light mb-4 text-zinc-800">Objet</h3>
                <p className="text-zinc-600">
                  Les présentes conditions générales de vente (CGV) régissent les relations contractuelles entre MG EVENEMENTS, ci-après dénommé « le Traiteur », et le client, ci-après dénommé « les mariés», dans le cadre de la prestation de services traiteur pour un mariage.
                </p>
              </div>

              {/* Devis et réservation */}
              <div className="mb-8">
                <h3 className="text-2xl font-light mb-4 text-zinc-800">Devis et réservation</h3>
                <div className="space-y-3 text-zinc-600">
                  <p>
                    Un devis détaillé sera établi par nos soins, il précisera les prestations proposées, le prix, les modalités de paiement et les éventuelles options.
                  </p>
                  <p>
                    La réservation sera considérée comme définitive à réception du devis signé, accompagné du versement d'un <span className="font-medium">acompte de 30% du montant total</span>.
                  </p>
                </div>
              </div>

              {/* Modifications et annulations */}
              <div className="mb-8">
                <h3 className="text-2xl font-light mb-4 text-zinc-800">Modifications et annulations</h3>
                <div className="space-y-3 text-zinc-600">
                  <p>
                    Toute modification du nombre de convives, du menu ou des prestations doit être communiquée par écrit au moins <span className="font-medium">15 jours avant la date</span> de votre mariage. La marge de tolérance pour les modifications est de <span className="font-medium">10%</span>.
                  </p>
                  <p>
                    En cas d'annulation de la réservation, les sommes versées resteront acquises à condition qu'elle soit notifiée <span className="font-medium">6 mois avant la date prévue</span> par écrit via e-mail.
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>L'obligation pour les mariés de régler <span className="font-medium">50% de la facture</span> en cas d'annulation 15 jours avant le début de la prestation.</li>
                    <li>L'obligation pour les mariés de s'acquitter de <span className="font-medium">l'intégralité de la facture</span> en cas d'annulation moins de 8 jours avant le mariage.</li>
                  </ul>
                </div>
              </div>

              {/* Conditions de paiement */}
              <div className="mb-8">
                <h3 className="text-2xl font-light mb-4 text-zinc-800">Conditions de paiement</h3>
                <div className="space-y-3 text-zinc-600">
                  <p>
                    Comme évoqué ci-dessus, un <span className="font-medium">acompte de 30% du montant total</span> est exigé à la réservation.
                  </p>
                  <p>
                    Le solde du paiement devra être réglé au plus tard <span className="font-medium">7 jours avant la date du mariage</span>.
                  </p>
                </div>
              </div>

              {/* Services inclus */}
              <div className="mb-8">
                <h3 className="text-2xl font-light mb-4 text-zinc-800">Services inclus</h3>
                <p className="mb-4 text-zinc-600">Le devis inclut :</p>
                <ul className="list-disc pl-6 space-y-2 text-zinc-600">
                  <li>Le déplacement de l'équipe dans un rayon de 30km, au-delà, un forfait de <span className="font-medium">1,00€/km</span> vous sera facturé.</li>
                  <li>La vaisselle, couvert nappage, verrerie (verre à eau, à vin, à champagne), dressage, service, serviette en tissus.</li>
                  <li>Le débarrassage de la salle.</li>
                </ul>
              </div>

              {/* Prestations */}
              <div className="mb-8">
                <h3 className="text-2xl font-light mb-4 text-zinc-800">Prestations</h3>
                <div className="space-y-3 text-zinc-600">
                  <p>
                    MG EVENEMENTS s'engage à fournir les prestations décrites dans le devis, dans le respect des normes d'hygiène et de sécurité en vigueur.
                  </p>
                  <p>
                    Toute modification du menu ou des prestations doit faire l'objet d'un accord écrit entre MG EVENEMENTS et les mariés et peut entraîner une révision du devis.
                  </p>
                  <p>
                    MG EVENEMENTS se réserve le droit de remplacer certains produits par des produits équivalents en cas d'indisponibilité, tout en informant les mariés.
                  </p>
                  <p>
                    La modification de nos prestations est possible, mais engendre un coût additionnel.
                  </p>
                </div>
              </div>

              {/* Dépôt de garantie */}
              <div className="mb-8">
                <h3 className="text-2xl font-light mb-4 text-zinc-800">Dépôt de garantie - Perte et casse</h3>
                <p className="text-zinc-600">
                  Le client est tenu responsable des pertes, dégradations et dommages sur le matériel fourni par l'entreprise. Ces pertes et dommages entraîneront une facturation supplémentaire. En guise de garantie, le client devra émettre un chèque de caution correspondant à la valeur des éléments loués.
                </p>
              </div>

              {/* Données personnelles */}
              <div className="mb-8">
                <h3 className="text-2xl font-light mb-4 text-zinc-800">Données personnelles</h3>
                <p className="text-zinc-600">
                  Conformément à la loi « Informatique et Libertés » du 6 janvier 1978 modifiée et au Règlement européen n°2016/679/UE du 27 avril 2016, le Client dispose d'un droit d'accès, de rectification, de suppression et d'opposition aux données personnelles le concernant.
                </p>
              </div>

              {/* Responsabilité */}
              <div className="mb-8">
                <h3 className="text-2xl font-light mb-4 text-zinc-800">Responsabilité</h3>
                <div className="space-y-4 text-zinc-600">
                  <p>
                    La responsabilité de MG EVENEMENTS, ou de ses partenaires, ne peut pas être engagée au cas où l'inexécution ou le retard dans l'exécution de l'une ou de plusieurs obligations contenues dans le présent contrat résulte d'un cas de force majeure.
                  </p>
                  <p>
                    Sont considérés notamment comme cas de force majeure les intempéries exceptionnelles, les catastrophes naturelles, les incendies et inondations, la foudre, les surtensions électroniques, les attentats, les grèves et les restrictions légales ou réglementaires à la fourniture de services de télécommunications, et tout autre événement de force majeure ou cas fortuit au sens de l'article 1148 du Code civil.
                  </p>
                  <p>
                    Nous dégageons également notre responsabilité sur des oublis ou des erreurs concernant des menus adaptés à votre demande de type : allergique, sans sel, hallal, casher…
                  </p>
                  <p>
                    Nous déclinons enfin toute responsabilité en cas de vol de fond et valeur, perte, dégradation des effets appartenant aux mariés et/ou aux convives qui pourraient survenir à l'occasion de la réception.
                  </p>
                  <p className="font-medium">
                    L'abus d'alcool est dangereux pour la santé, la consommation excessive de boissons par les invités adultes ou mineurs est du ressort de l'organisateur de l'événement et notre société se dégage de toute responsabilité de ce fait.
                  </p>
                </div>
              </div>

              {/* Litiges */}
              <div className="mb-8">
                <h3 className="text-2xl font-light mb-4 text-zinc-800">Litiges</h3>
                <div className="space-y-3 text-zinc-600">
                  <p>
                    Toute difficulté relative à la conclusion ou à l'exécution des ventes et des prestations devra faire l'objet d'une concertation préalable entre les mariés et MG EVENEMENTS.
                  </p>
                  <p>
                    En cas de litige de toute nature ou de contestation relative à la formation ou à l'exécution de la commande, le <span className="font-medium">Tribunal De Commerce de Toulouse</span> sera seul compétent, à moins que la société susmentionnée ne préfère saisir toute autre juridiction compétente.
                  </p>
                  <p>
                    Cette clause s'applique même en cas de référé, de demande incidente ou de pluralité de défendeurs et quels que soient le mode et les modalités de paiement.
                  </p>
                </div>
              </div>

              {/* Tarifs */}
              <div className="mb-8">
                <h3 className="text-2xl font-light mb-4 text-zinc-800">Tarifs</h3>
                <p className="text-zinc-600">
                  Les prix des services sont affichés en euros toutes taxes comprises (TTC) et correspondent aux tarifs en vigueur au moment de la commande. Le taux de TVA applicable est celui en vigueur à la date de réalisation des prestations.
                </p>
              </div>

              {/* Acceptation des CGV */}
              <div className="mb-8">
                <h3 className="text-2xl font-light mb-4 text-zinc-800">Acceptation des CGV</h3>
                <p className="text-zinc-600 font-medium">
                  La signature du devis par les mariés vaut acceptation pleine et entière des présentes CGV.
                </p>
              </div>
            </section>

            {/* Contact Information */}
            <section className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg p-8 mb-8 border border-white/20">
              <h2 className="text-3xl font-light mb-6 text-zinc-800 border-b border-zinc-100 pb-4">
                Contact
              </h2>
              <div className="space-y-2 text-zinc-600">
                <p className="font-medium text-zinc-800">MG EVENEMENTS</p>
                <p>Toulouse</p>
                <p>
                  Email : <a 
                    href="mailto:mgevenementiel31@gmail.com" 
                    className="text-blue-600 hover:underline"
                  >
                    mgevenementiel31@gmail.com
                  </a>
                </p>
                <p>
                  Instagram : <a 
                    href="https://www.instagram.com/mg_evenements31" 
                    className="text-blue-600 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    mg_evenements31
                  </a>
                </p>
                <p>
                  Site web : <a 
                    href="https://www.mgevenements.fr" 
                    className="text-blue-600 hover:underline"
                  >
                    www.mgevenements.fr
                  </a>
                </p>
                <p>Téléphone : 07 68 10 96 17</p>
              </div>
            </section>

            </div>
          </div>
        </div>
        <BackToTop />
      </div>
    </>
  );
}
