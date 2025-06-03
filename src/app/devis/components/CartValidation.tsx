'use client'

import React, { useState, useEffect } from 'react';
import { createQuote } from "@/services/quotes";
import { Button } from '@/components/ui/button';
import { useCart } from '@/app/context/CartContext';
import { useRouter } from 'next/navigation';
import { ChevronRight, ChevronLeft } from "lucide-react";
import { generateQuotePDF } from '@/utils/pdf/generateQuotePDF';
import { Product } from '@/utils/types/products';
import { QuoteItem } from '@/utils/types/quotes';
import { jsPDF } from 'jspdf';

const CartValidation = ({ formData, cart, onPrevious }: { formData: any, cart: any, onPrevious: () => void }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<'success' | 'error' | null>(null);
  const [pdfData, setPdfData] = useState<any>(null);
  const { clearCart } = useCart();
  const router = useRouter();

  // Mapping for option names
  const optionNameMapping: { [key: string]: string } = {
    'marquee_setup': 'Montage et installation pour barnum',
    'delivery': 'Livraison',
    'marquee_dismantling': 'Démontage du barnum',
    'pickup': 'Récupération du matériel',
    'decoration': 'Décoration',
    'table_service': 'Service à table',
  };

  // Ensure that formData has the necessary user info and check that formData is not undefined
  useEffect(() => {
    if (formData && (!formData.first_name || !formData.last_name || !formData.phone_number)) {
      console.error("User information is incomplete:", formData);
    }
  }, [formData]);

  useEffect(() => {
    if (submitResult === 'success') {
      window.scrollTo(0, 0);
    }
  }, [submitResult]);

  // Separate cart items by category
  const decorationItems = cart.filter((item: any) => item.category === "decoration");
  const traiteurItems = cart.filter((item: any) => item.category === "traiteur");
  
  // Get selected fees
  const selectedFees = formData?.fees?.filter((fee: any) => fee.enabled) || [];
  
  // Calculate totals
  const decorationTotal = decorationItems.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0);
  const traiteurTotal = traiteurItems.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0);
  const feesTotal = selectedFees.reduce((sum: number, fee: any) => sum + fee.price, 0);
  const totalHT = decorationTotal + traiteurTotal + feesTotal;
  const tva = totalHT * 0.20; // 20% TVA
  const totalTTC = totalHT;

  const handleSubmit = async () => {
    if (isSubmitting) return; 
    setIsSubmitting(true);

    const { voie, compl, cp, ville, depart, pays = "France", ...restFormData } = formData;
    
    const quoteData = {
      first_name: restFormData.first_name,
      last_name: restFormData.last_name,
      email: restFormData.email,
      phone_number: restFormData.phone_number,
      event_start_date: restFormData.event_start_date,
      event_end_date: restFormData.event_end_date,
      is_traiteur: restFormData.is_traiteur,
      description: restFormData.description,
      total_cost: totalTTC,
      status: "nouveau",
      is_paid: false,
      traiteur_price: 0,
      other_expenses: 0,
      fees: formData.fees,
      address: {
        voie,
        compl,
        cp,
        ville,
        depart,
        pays
      }
    };

    const quoteItems = cart.map((item: any) => ({
      product_id: item.id,
      quantity: item.quantity,
    }));

    try {
      const result = await createQuote(quoteData, quoteItems);
      const quoteId = result.quoteId;

      // Convert cart items to products format
      const products: Product[] = cart.map((item: any) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        category: item.category,
        type: item.type
      }));

      // Convert quote items to the correct format
      const formattedQuoteItems: QuoteItem[] = quoteItems.map((item: any) => ({
        product_id: item.product_id,
        quantity: item.quantity
      }));

      // Generate PDF using the new function
      await generateQuotePDF(
        { 
          ...quoteData, 
          id: quoteId,
          created_at: new Date().toISOString(),
          last_update: new Date().toISOString(),
          fees: selectedFees // Add the selected fees to the PDF data
        },
        formattedQuoteItems,
        products
      );

      clearCart();
      setSubmitResult('success');
    } catch (error) {
      console.error("Error creating quote or sending email:", error);
      setSubmitResult('error');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const formatDateToParisTime = (date: Date | undefined) => {
    const parisTimeZone = 'Europe/Paris';
    if (!date) return '';
    // Format the date to 'dd/mm/yyyy' format
    return new Date(date).toLocaleDateString('fr-FR', { timeZone: parisTimeZone });
  };
  
 
  

  // Update the button to download the PDF
  if (submitResult === 'success') {
    return (
      <div className="w-full max-w-2xl mx-auto text-center flex flex-col items-center justify-center h-[60vh]">
        <h2 className="text-2xl font-bold mb-4">Devis envoyé avec succès!</h2>
        <p className="mb-4">Merci pour votre demande. Vous pouvez télécharger votre devis ci-dessous.</p>
        {formData && (
          <Button
          onClick={() => window.location.reload()}
          className="mt-3 rounded-full py-6 px-8 text-lg font-light bg-green-500 hover:bg-green-700 w-full sm:w-[280px]"
          >
            Télécharger le devis en PDF
          </Button>
        )}
        <Button onClick={() => router.push('/')} className="mt-3 rounded-full py-6 px-8 text-lg font-light w-full sm:w-[280px]">
          Retour à l'accueil
        </Button>
      </div>
    );
  }

  if (submitResult === 'error') {
    return (
      <div className="w-full max-w-2xl mx-auto text-center flex flex-col items-center justify-center h-[60vh]">
        <h2 className="text-2xl font-bold mb-4 text-red-600">Erreur lors de l'envoi du devis</h2>
        <p className="mb-4">Désolé, une erreur s'est produite. Veuillez réessayer plus tard.</p>
        <Button onClick={() => setSubmitResult(null)} className="px-4 py-2 bg-black text-white rounded-full">
          Réessayer
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div className="w-full h-full max-w-4xl mx-auto sm:mt-20 p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-8 text-zinc-800 border-b pb-4">Récapitulatif de votre devis</h2>
        
        {/* Personal Information Card */}
        <div className="mb-8 bg-gray-50 p-6 rounded-lg">
          <p className="text-xl font-semibold mb-4 text-zinc-800 flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Informations personnelles
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p className="flex items-center"><span className="font-medium mr-2">Nom:</span> {formData?.last_name}</p>
            <p className="flex items-center"><span className="font-medium mr-2">Prénom:</span> {formData?.first_name}</p>
            <p className="flex items-center"><span className="font-medium mr-2">Email:</span> {formData?.email}</p>
            <p className="flex items-center"><span className="font-medium mr-2">Téléphone:</span> {formData?.phone_number}</p>
          </div>
        </div>

        {/* Event Details Card */}
        <div className="mb-8 bg-gray-50 p-6 rounded-lg">
          <p className="text-xl font-semibold mb-4 text-zinc-800 flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Événement
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p className="flex items-center"><span className="font-medium mr-2">Date(s):</span> {formData?.event_end_date === formData?.event_start_date ? 
              formatDateToParisTime(new Date(formData?.event_start_date)) : 
              `Du ${formatDateToParisTime(new Date(formData?.event_start_date))} au ${formatDateToParisTime(new Date(formData?.event_end_date))}`}
            </p>
            <p className="flex items-center">
              <span className="font-medium mr-2">Option traiteur:</span>
              <span className={`px-3 py-1 rounded-full text-sm ${formData?.is_traiteur ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-zinc-800'}`}>
                {formData?.is_traiteur ? 'Oui' : 'Non'}
              </span>
            </p>
          </div>
        </div>

        {/* Products Table Card */}
        <div className="mb-8 bg-gray-50 p-4 sm:p-6 rounded-lg">
          <p className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            Produits
          </p>
          
          {/* Matériel et Décoration Section */}
          {decorationItems.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center mb-3 pb-1 border-b">
                <span className="inline-block w-1.5 h-5 bg-blue-500 rounded-full mr-1.5"></span>
                <h3 className="font-medium text-base text-gray-800">Matériel et Décoration</h3>
              </div>
              
              <div className="overflow-x-auto -mx-4 sm:mx-0">
                <div className="min-w-full inline-block align-middle">
                  <div className="overflow-hidden">
                    <table className="min-w-full">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="px-3 sm:px-4 py-3 text-left text-sm sm:text-base font-semibold text-gray-600">Produit</th>
                          <th className="px-3 sm:px-4 py-3 text-center text-sm sm:text-base font-semibold text-gray-600">Quantité</th>
                          <th className="px-3 sm:px-4 py-3 text-right text-sm sm:text-base font-semibold text-gray-600">Prix</th>
                        </tr>
                      </thead>
                      <tbody>
                        {decorationItems.map((item: any) => (
                          <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50">
                            <td className="px-3 sm:px-4 py-3 text-sm sm:text-base whitespace-normal">{item.name}</td>
                            <td className="px-3 sm:px-4 py-3 text-center text-sm sm:text-base">{item.quantity}</td>
                            <td className="px-3 sm:px-4 py-3 text-right text-sm sm:text-base font-medium">{(item.price * item.quantity).toFixed(2)}€</td>
                          </tr>
                        ))}
                        <tr className="bg-gray-50">
                          <td colSpan={2} className="px-3 sm:px-4 py-2 text-left text-sm font-medium text-gray-600">Sous-total Matériel et Décoration:</td>
                          <td className="px-3 sm:px-4 py-2 text-right text-sm font-semibold">{decorationTotal.toFixed(2)}€</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Traiteur Section */}
          {traiteurItems.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center mb-3 pb-1 border-b">
                <span className="inline-block w-1.5 h-5 bg-amber-500 rounded-full mr-1.5"></span>
                <h3 className="font-medium text-base text-gray-800">Traiteur</h3>
              </div>
              
              <div className="overflow-x-auto -mx-4 sm:mx-0">
                <div className="min-w-full inline-block align-middle">
                  <div className="overflow-hidden">
                    <table className="min-w-full">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="px-3 sm:px-4 py-3 text-left text-sm sm:text-base font-semibold text-gray-600">Produit</th>
                          <th className="px-3 sm:px-4 py-3 text-center text-sm sm:text-base font-semibold text-gray-600">Quantité</th>
                          <th className="px-3 sm:px-4 py-3 text-right text-sm sm:text-base font-semibold text-gray-600">Prix</th>
                        </tr>
                      </thead>
                      <tbody>
                        {traiteurItems.map((item: any) => (
                          <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50">
                            <td className="px-3 sm:px-4 py-3 text-sm sm:text-base whitespace-normal">{item.name}</td>
                            <td className="px-3 sm:px-4 py-3 text-center text-sm sm:text-base">{item.quantity}</td>
                            <td className="px-3 sm:px-4 py-3 text-right text-sm sm:text-base font-medium">{(item.price * item.quantity).toFixed(2)}€</td>
                          </tr>
                        ))}
                        <tr className="bg-gray-50">
                          <td colSpan={2} className="px-3 sm:px-4 py-2 text-left text-sm font-medium text-gray-600">Sous-total Traiteur:</td>
                          <td className="px-3 sm:px-4 py-2 text-right text-sm font-semibold">{traiteurTotal.toFixed(2)}€</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Selected Options Section */}
          <div className="mt-6 border-t pt-4">
            <p className="text-xl font-semibold mb-4 text-zinc-800 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Options sélectionnées
            </p>
            {selectedFees.length > 0 ? (
              <div className="grid grid-cols-1 gap-2">
                {selectedFees.map((fee: any, index: number) => {
                  const displayName = optionNameMapping[fee.name] || fee.name || fee.description || 'Option sans nom';
                  return (
                    <div key={index} className="flex items-center">
                      <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      <span className="text-gray-700">{displayName}</span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-gray-500 italic">Aucune option sélectionnée</p>
            )}
          </div>

          {/* Totals Section */}
          <div className="mt-6 border-t pt-4">
            <div className="flex flex-col items-end space-y-2">
              <div className="flex justify-between w-full max-w-[300px] bg-zinc-800 text-white p-3 rounded-lg">
                <span className="text-sm sm:text-lg">Total :</span>
                <span className="font-bold text-sm sm:text-lg">{totalTTC.toFixed(2)}€</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="w-full max-w-4xl mx-auto flex flex-col sm:flex-row justify-end gap-4 mt-8 mb-12">
        <Button
          onClick={() => {
            onPrevious();
            window.scrollTo(0, 0);
          }}
          variant="outline"
          className="bg-zinc-200 text-zinc-700 h-[65px] w-full sm:h-[78px] sm:w-[170px] rounded-full border-none p-6 flex items-center space-x-4 transition-all duration-300 group"
          disabled={isSubmitting}
        >
          <ChevronLeft className="min-w-6 min-h-6 text-zinc-800 transition-transform duration-300 space-x-4 group-hover:-translate-x-2" />
          <span className="font-semibold text-zinc-800 text-xl">Précédent</span>
        </Button>

        <Button
          onClick={handleSubmit}
          className="h-[65px] w-full sm:h-[78px] sm:w-[170px] rounded-full p-6 flex items-center space-x-4 transition-all duration-300 group"
          disabled={isSubmitting}
        >
          <span className="font-semibold text-xl">
            {isSubmitting ? 'Envoi...' : 'Envoyer'}
          </span>
          <ChevronRight className="w-6 h-6 text-white transition-transform duration-300 group-hover:translate-x-2" />
        </Button>
      </div>
    </div>
  );
};

export default CartValidation;
