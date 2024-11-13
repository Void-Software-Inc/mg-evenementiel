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
  const [pdfData, setPdfData] = useState<any>(null);
  const { clearFormData } = useDevis();
  const { clearCart } = useCart();
  const router = useRouter();

  // Ensure that formData has the necessary user info and check that formData is not undefined
  useEffect(() => {
    if (formData && (!formData.first_name || !formData.last_name || !formData.phone_number)) {
      console.error("User information is incomplete:", formData);
    }
  }, [formData]);

  const totalHT = cart.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0);
  const tva = totalHT * 0.20; // 20% TVA
  const totalTTC = totalHT + tva;

  const generatePDFData = () => {
    if (!formData || !cart || cart.length === 0) {
        console.error("formData or cart is null or empty");
        return null;
    }

    const { 
        first_name, 
        last_name, 
        email, 
        phone_number, 
        voie, 
        compl, 
        cp, 
        ville, 
        depart,
        pays = "France",
        event_start_date, 
        event_end_date, 
        is_traiteur 
    } = formData;

    const pdfContent = {
        userInfo: { 
            first_name, 
            last_name, 
            email, 
            phone_number, 
            voie,
            compl,
            cp,
            ville,
            depart,
            pays, 
            is_traiteur, 
            date: { from: new Date(event_start_date), to: new Date(event_end_date) }
        },
        products: cart.map((item: { name: string; quantity: number; price: number }) => ({
            name: item.name,
            quantity: item.quantity,
            totalPrice: (item.price * item.quantity).toFixed(2),
        })),
        totalHT: totalHT.toFixed(2),
        tva: tva.toFixed(2),
        totalTTC: totalTTC.toFixed(2),
    };

    return pdfContent;
  };

  const handleSubmit = async () => {
    if (isSubmitting) return; 
    setIsSubmitting(true);

    const quoteData = {
      ...formData,
      total_cost: totalTTC, // Use totalTTC instead of total
      status: "nouveau",
      is_paid: false,
      traiteur_price: 0,
      other_expenses: 0,
    };

    // Remove address fields from formData for quoteData
    const { voie, compl, cp, ville, depart, pays, ...quoteDataWithoutAddress } = quoteData;

    const quoteItems = cart.map((item: any) => ({
      product_id: item.id,
      quantity: item.quantity,
    }));

    try {
      const result = await createQuote(quoteDataWithoutAddress, quoteItems);

      const pdfContent = generatePDFData();
      if (!pdfContent) {
        setSubmitResult('error');
        return;
      }

      await sendEmail(quoteData, pdfContent);
      setPdfData(pdfContent);

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
                email: quoteData.email,
                voie: formData.voie,
                compl: formData.compl,
                cp: formData.cp,
                ville: formData.ville,
                depart: formData.depart,
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
    const { userInfo, products, totalHT, tva, totalTTC } = pdfData;

    // Add title
    doc.setFontSize(24);
    doc.text(`DEVIS`, 10, 20);

    // Add client options and event dates on the right
    const eventFromDate = formatDateToParisTime(userInfo.date.from);
    const eventToDate = formatDateToParisTime(userInfo.date.to);
    doc.setFontSize(12);

    const optionsAndDates = [
      `Date(s) de l'événement: ${eventFromDate === eventToDate ? 
        eventFromDate : 
        `${eventFromDate} au ${eventToDate}`}`,
      `Option traiteur: ${userInfo.is_traiteur ? 'Oui' : 'Non'}`
    ];

    optionsAndDates.forEach((line, index) => {
      const textWidth = doc.getTextWidth(line); // Get the width of the text
      const pageWidth = doc.internal.pageSize.getWidth(); // Get the page width
      const xPosition = pageWidth - textWidth - 10; // Calculate x position for right alignment
      doc.text(line, xPosition, 30 + (index * 7)); // Adjusted vertical spacing to 10 for 
    })

    // Add quote creation date and number
    const quoteDate = new Date().toLocaleDateString('fr-FR');
//    const quoteNumber = "Quote #12345"; // Replace with actual quote number if available
    doc.setFontSize(12);
    doc.text(`Date: ${quoteDate}`, 10, 30); // Adjusted position
 //   doc.text(quoteNumber, 10, 40); // Adjusted position

    // Draw horizontal line
    doc.setLineWidth(0.5);
    doc.line(10, 50, 200, 50); // Adjust line position as needed

    // Add client info on the left with adjusted spacing
    const clientInfo = [
        `À l'attention de: ${userInfo.first_name} ${userInfo.last_name}`,
        `${userInfo.email}`,
        `${userInfo.phone_number}`,
        `${formData.voie}${formData.compl ? `, ${formData.compl}` : ''}`,
        `${formData.cp} ${formData.ville}`,
        `${formData.depart}`
    ];
    clientInfo.forEach((line, index) => {
        doc.text(line, 10, 60 + (index *7)); // Adjusted vertical spacing to 10 for closer lines
    });

    // Add company info on the right with adjusted spacing
    const companyInfo = [
      "MG Événements",
      "07 68 10 96 17",
      "mgevenementiel31@gmail.com",
      "3 Rue Guy de Maupassant",
      "31240 Toulouse"
  ];

    companyInfo.forEach((line, index) => {
        const textWidth = doc.getTextWidth(line); // Get the width of the text
        const pageWidth = doc.internal.pageSize.getWidth(); // Get the page width
        const xPosition = pageWidth - textWidth - 10; // Calculate x position for right alignment
        doc.text(line, xPosition, 60 + (index * 7)); // Adjusted vertical spacing to 10 for closer lines
    });

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
      headStyles: { fillColor: [50, 50, 50], textColor: [255, 255, 255] },
      body: data,
      startY: 105,
    });

    // Add payment terms and conditions on the left
    doc.setFontSize(14);
    doc.text("Termes et conditions", 10, (doc as any).lastAutoTable.finalY + 20);
    doc.setFontSize(12);
    doc.text("• Devis valable un mois", 15, (doc as any).lastAutoTable.finalY + 30);
    doc.text("• Un acompte de 30% est requis", 15, (doc as any).lastAutoTable.finalY + 40);

    // Add totals
    const pageWidth = doc.internal.pageSize.getWidth();
    const rectWidth = 70;
    const rectHeight = 8;
    const startX = pageWidth - rectWidth - 10;
    const startY = (doc as any).lastAutoTable.finalY + 20;
    const lineSpacing = rectHeight + 2; // Consistent spacing between lines

    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0); // Set text color to black for HT and TVA

    // Total HT
    doc.text(`Total HT: ${totalHT}€`, startX, startY);

    // TVA
    doc.text(`TVA 20%: ${tva}€`, startX, startY + lineSpacing);

    // Total TTC with black background and white text
    doc.setFillColor(50, 50, 50);
    doc.rect(startX, startY + lineSpacing+5 , rectWidth, rectHeight, 'F');
    doc.setTextColor(255, 255, 255); // Set text color to white for TTC
    doc.text(`Total TTC: ${totalTTC}€`, startX + 2, startY + lineSpacing + 11);

    // Reset text color to black for the rest of the document
    doc.setTextColor(0, 0, 0);

    const pageCount = doc.internal.pages.length - 1;
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(12);
      doc.text(`Page ${i} sur ${pageCount}`, doc.internal.pageSize.getWidth() - 40, doc.internal.pageSize.getHeight() - 10);
    }

    doc.save(`Devis_${userInfo.first_name}_${new Date().toLocaleDateString('fr-FR')}.pdf`); // Save the PDF
  };
  

  // Update the button to download the PDF
  if (submitResult === 'success') {
  //  console.log("Current formData:", formData); // Debugging log
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
          <div className="overflow-x-auto -mx-4 sm:mx-0"> {/* Negative margin on mobile to allow full bleed */}
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
                    {cart.map((item: any) => (
                      <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="px-3 sm:px-4 py-3 text-sm sm:text-base whitespace-normal">{item.name}</td>
                        <td className="px-3 sm:px-4 py-3 text-center text-sm sm:text-base">{item.quantity}</td>
                        <td className="px-3 sm:px-4 py-3 text-right text-sm sm:text-base font-medium">{(item.price * item.quantity).toFixed(2)}€</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Totals Section */}
          <div className="mt-6 border-t pt-4">
            <div className="flex flex-col items-end space-y-2">
              <div className="flex justify-between w-full max-w-[200px]">
                <span className="text-gray-600 text-sm sm:text-base">Total HT:</span>
                <span className="font-medium text-sm sm:text-base">{totalHT.toFixed(2)}€</span>
              </div>
              <div className="flex justify-between w-full max-w-[200px]">
                <span className="text-gray-600 text-sm sm:text-base">TVA 20%:</span>
                <span className="font-medium text-sm sm:text-base">{tva.toFixed(2)}€</span>
              </div>
              <div className="flex justify-between w-full max-w-[200px] bg-zinc-800 text-white p-3 rounded-lg">
                <span className="text-sm sm:text-lg">Total TTC:</span>
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
