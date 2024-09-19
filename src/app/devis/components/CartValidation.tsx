'use client'

import React, { useState, useEffect } from 'react';
import { createQuote } from "@/services/quotes";
import { Button } from '@/components/ui/button';
import { useDevis } from '@/app/context/DevisContext';
import { useCart } from '@/app/context/CartContext';
import { useRouter } from 'next/navigation';
import { ChevronRight, ChevronLeft } from "lucide-react";
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const CartValidation = ({ formData, cart, onPrevious }: { formData: any, cart: any, onPrevious: () => void }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<'success' | 'error' | null>(null);
  const total = cart.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0);
  const [pdfData, setPdfData] = useState<any>(null); // State to hold PDF data
  const { clearFormData } = useDevis();
  const { clearCart } = useCart();
  const router = useRouter();

  // Ensure that formData has the necessary user info and check that formData is not undefined
  useEffect(() => {
    if (formData && (!formData.first_name || !formData.last_name || !formData.phone_number)) {
      console.error("User information is incomplete:", formData);
    }
  }, [formData]);

  const generatePDFData = () => {
    if (!formData || !cart || cart.length === 0) {
        console.error("formData or cart is null or empty");
        return null; // Handle the case where formData or cart is not available
    }

    const { first_name, last_name, email, phone_number, event_start_date, event_end_date, is_traiteur } = formData;

    // Prepare PDF data
    const pdfContent = {
        userInfo: { 
            first_name, 
            last_name, 
            email, 
            phone_number, 
            is_traiteur, 
            date: { from: new Date(event_start_date), to: new Date(event_end_date) }
        },
        products: cart.map((item: { name: string; quantity: number; price: number }) => ({
            name: item.name,
            quantity: item.quantity,
            totalPrice: (item.price * item.quantity).toFixed(2),
        })),
        totalPrice: total.toFixed(2),
      };

    return pdfContent; // Return the PDF content
  };

  const handleSubmit = async () => {
    if (isSubmitting) return; 
    setIsSubmitting(true);

    const quoteData = {
      ...formData,
      total_cost: total,
      status: "nouveau",
      is_paid: false,
      traiteur_price: 0,
      other_expenses: 0,
    };

    const quoteItems = cart.map((item: any) => ({
      product_id: item.id,
      quantity: item.quantity,
    }));

    try {
      // Create the quote
      const result = await createQuote(quoteData, quoteItems);
      console.log("Quote created:", result);

      // Generate PDF data
      const pdfContent = generatePDFData(); // Generate PDF data here
      if (!pdfContent) {
        setSubmitResult('error'); // Set error if PDF content is invalid
        return; // Exit if PDF content is not valid
      }

      // Send email with the quote data and PDF
      await sendEmail(quoteData, pdfContent); // Send email with PDF content
      setPdfData(pdfContent); // Store PDF data for downloading later

      // Do not clear formData here if you want to retain it
      // clearFormData(); // Comment this out
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
  const sendEmail = async (quoteData: any, pdfContent: any) => {
    try {
      const response = await fetch('/api/quotes/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: quoteData.first_name,
          last_name: quoteData.last_name,
          phone_number: quoteData.phone_number,
          event_start_date: quoteData.event_start_date,
          event_end_date: quoteData.event_end_date,
          is_traiteur: quoteData.is_traiteur,
          description: quoteData.description,
          pdfContent: pdfContent, // Include PDF content
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Email sending failed:', errorData);
        throw new Error(`Failed to send email: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error sending email:', error);
      throw error; // Rethrow to handle in the main try-catch
    }
  };

  const downloadPDF = () => {
    if (!pdfData) {
      console.error('PDF data is not ready');
      alert('Unable to download PDF: Missing data.');
      return;
    }

    const doc = new jsPDF();
    const { userInfo, products, totalPrice } = pdfData;

    // Add title
    doc.setFontSize(24);
    doc.text(`Devis pour ${userInfo.first_name} ${userInfo.last_name}`, 10, 20);

    // Add user Information
    doc.setFontSize(12);
    doc.text(`Email: ${userInfo.email}`, 10, 30);
    doc.text(`Téléphone: ${userInfo.phone_number}`, 10, 40);
    doc.text(`Option traiteur: ${userInfo.is_traiteur ? 'Oui' : 'Non'}`, 10, 50); // Include traiteur option
    
    // Handle dates properly
    const eventFromDate = formatDateToParisTime(userInfo.date.from);
    const eventToDate = formatDateToParisTime(userInfo.date.to);
    doc.text(`Date de l'événement: ${eventFromDate} au ${eventToDate}`, 10, 60); // Include both dates

    // Table headers
    const headers = [['Produit', 'Quantité', 'Prix']];
    const data = products.map((item: { name: string; quantity: number; totalPrice: string }) => [
      item.name,
      item.quantity,
      `${item.totalPrice}€`
    ]);

    // Generate table with the product details
    (doc as any).autoTable({
      head: headers,
      headStyles: { fillColor: [50, 50, 50], textColor: [255, 255, 255] }, // Dark gray background and white text
      body: data,
      startY: 70,
    });

    // Add total price
    doc.setFontSize(18);
    doc.text(`Montant provisoire: ${totalPrice}€`, 10, (doc as any).lastAutoTable.finalY + 10);

    const pageCount = doc.internal.pages.length - 1;
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(12);
      doc.text(`Page ${i} sur ${pageCount}`, doc.internal.pageSize.getWidth() - 40, doc.internal.pageSize.getHeight() - 10);
    }
    // Save the generated PDF
    doc.save(`Devis_${userInfo.first_name}_${new Date().toLocaleDateString('fr-FR')}.pdf`); // Save the PDF
  };
  

  // Update the button to download the PDF
  if (submitResult === 'success') {
    console.log("Current formData:", formData); // Debugging log
    return (
      <div className="w-full max-w-2xl mx-auto text-center flex flex-col items-center justify-center h-[60vh]">
        <h2 className="text-2xl font-bold mb-4">Devis envoyé avec succès!</h2>
        <p className="mb-4">Merci pour votre demande. Vous pouvez télécharger votre devis ci-dessous.</p>
        {/* Download PDF Button */}
        {formData && ( // Only render if formData is available
          <Button
            onClick={downloadPDF} // Trigger download on button click
            className="mt-3 rounded-full py-6 px-8 text-lg font-light bg-green-500 hover:bg-green-700"
          >
            Télécharger le devis en PDF
          </Button>
        )}
        <Button onClick={() => router.push('/')} className="mt-3 rounded-full py-6 px-8 text-lg font-light">
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
      <div className="w-full h-full max-w-2xl mx-auto sm:mt-20">
        <h2 className="text-2xl font-bold mb-4">Récapitulatif de votre devis</h2>
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Informations personnelles</h3>
          <p>Nom: {formData?.last_name}</p>
          <p>Prénom: {formData?.first_name}</p>
          <p>Email: {formData?.email}</p>
          <p>Téléphone: {formData?.phone_number}</p>
        </div>
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Produits</h3>
          {cart.map((item: any) => (
            <div key={item.id} className="flex justify-between mb-2">
              <span>{item.name} x {item.quantity}</span>
              <span>{(item.price * item.quantity).toFixed(2)}€</span>
            </div>
          ))}
          <div className="flex justify-between font-bold mt-2">
            <span>Total:</span>
            <span>{total.toFixed(2)}€</span>
          </div>
        </div>
      </div>
      <div className="w-full h-full flex flex-col sm:flex-row justify-end bottom-0 gap-4 mt-24">
        <Button
          onClick={() => {
            onPrevious();
            window.scrollTo(0, 0);
          }}
          variant="outline"
          className="bg-zinc-200 text-gray-800 h-[65px] w-full sm:h-[78px] sm:w-[170px] rounded-full border-none p-6 flex items-center space-x-4 transition-all duration-300 group"
          disabled={isSubmitting}
        >
          <ChevronLeft className="min-w-6 min-h-6 text-gray-800 transition-transform duration-300 group-hover:-translate-x-2" />
          <span className="font-semibold text-gray-800 text-xl">Précédent</span>
        </Button>
        <Button
          onClick={handleSubmit} // Send email on button click
          className="h-[65px] w-full sm:h-[78px] sm:w-[170px] rounded-full p-6 flex items-center space-x-4 transition-all duration-300 group"
          disabled={isSubmitting}
        >
          <span className="font-semibold text-xl">Envoyer</span>
          <ChevronRight className="w-6 h-6 text-white transition-transform duration-300 group-hover:translate-x-2" />
        </Button>
      </div>
    </div>
  );
};

export default CartValidation;
