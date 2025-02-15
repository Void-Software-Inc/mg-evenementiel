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

  const generatePDFData = (quoteId?: number) => {
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
        quoteId,
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

    const { voie, compl, cp, ville, depart, pays = "France", ...restFormData } = formData;
    
    const quoteData = {
      ...restFormData,
      total_cost: totalTTC,
      status: "nouveau",
      is_paid: false,
      traiteur_price: 0,
      other_expenses: 0,
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
      const quoteId = result.quoteId; // Get the quote ID from the response

      const pdfContent = generatePDFData(quoteId); // Pass quote ID to generatePDFData
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
    const { userInfo, products, totalHT, tva, totalTTC, quoteId } = pdfData;
    const pageWidth = doc.internal.pageSize.getWidth();
    const rightMargin = 15;
    const lineSpacing = 7;

    // Add logo with correct aspect ratio
    const img = new Image();
    img.src = '/quote-mg-events.png';
    
    // Calculate dimensions maintaining aspect ratio
    const originalWidth = 788;
    const originalHeight = 380;
    const desiredWidth = 65; // Slightly increased for better visibility
    const scaledHeight = (desiredWidth * originalHeight) / originalWidth;
    
    doc.setFontSize(50);
    doc.setTextColor(51); // Single value for grayscale (51 = #333333)
    doc.text(`Devis`, 15, 30);
    doc.setTextColor(0); // Reset to black

    doc.addImage(img, 'PNG', 133, 5, desiredWidth, scaledHeight);

    // Adjust subsequent content position based on logo height
    const contentStartY = 5 + scaledHeight; // Reduced top padding

    // Quote date and number at the top right
    const quoteDate = new Date().toLocaleDateString('fr-FR');
    const quoteValue = (quoteId || '...').toString();

    // Date and quote info on the left
    doc.setFontSize(9);

    // Date
    doc.setFont('helvetica', 'bold');
    doc.text("Date:", 15, contentStartY + 15);
    doc.setFont('helvetica', 'normal');
    doc.text(quoteDate, 15 + doc.getTextWidth("Date:   "), contentStartY + 15);

    // Quote number
    doc.setFont('helvetica', 'bold');
    doc.text("Numéro devis: ", 15, contentStartY + 21);
    doc.setFont('helvetica', 'normal');
    doc.text(quoteValue, 15 + doc.getTextWidth("Numéro devis:   "), contentStartY + 21);

    // Event dates
    const eventFromDate = formatDateToParisTime(userInfo.date.from);
    const eventToDate = formatDateToParisTime(userInfo.date.to);
    const eventDateValue = eventFromDate === eventToDate ? eventFromDate : `du ${eventFromDate} au ${eventToDate}`;
    doc.setFont('helvetica', 'bold');
    doc.text("Date(s) de l'événement:", 15, contentStartY + 27);
    doc.setFont('helvetica', 'normal');
    doc.text(eventDateValue, 15, contentStartY + 33);

    // Traiteur option
    const traiteurValue = userInfo.is_traiteur ? 'Oui' : 'Non';
    doc.setFont('helvetica', 'bold');
    doc.text("Option traiteur:", 15, contentStartY + 39);
    doc.setFont('helvetica', 'normal');
    doc.text(traiteurValue, 15 + doc.getTextWidth("Option traiteur:    "), contentStartY + 39);

    // Add client info aligned to the right
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text("Client", pageWidth - 15 - doc.getTextWidth("Client"), contentStartY + 15);
    doc.setFont('helvetica', 'normal');

    const clientInfo = [
        `${userInfo.first_name} ${userInfo.last_name}`,
        `${userInfo.email}`,
        `${userInfo.phone_number}`,
        `${formData.voie}${formData.compl ? `, ${formData.compl}` : ''}`,
        `${formData.cp} ${formData.ville}`,
        `${formData.depart}`
    ];

    doc.setFont('helvetica', 'normal');

    clientInfo.forEach((line, index) => {
        const lineWidth = doc.getTextWidth(line);
        doc.text(line, pageWidth - 15 - lineWidth, contentStartY + 21 + (index * 6));
    });

    // Calculate Y position after last client info line
    const lastClientInfoY = contentStartY + 21 + ((clientInfo.length - 1) * 6);

    // Add payment terms and conditions on the left
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text("Termes et conditions", 15, lastClientInfoY + 10);
    doc.setFont('helvetica', 'normal');
    doc.text("Devis valable un mois", 15, lastClientInfoY + 15);
    doc.text("Un acompte de 30% est requis", 15, lastClientInfoY + 20);

    // Add address section on the right
    doc.setFont('helvetica', 'bold');
    const addressTitle = "Adresse de récupération du matériel";
    const addressTitleWidth = doc.getTextWidth(addressTitle);
    doc.text(addressTitle, pageWidth - 15 - addressTitleWidth, lastClientInfoY + 10);
    
    doc.setFont('helvetica', 'normal');
    const addressText = "Chemin des droits de l'homme et du citoyen, 31450 Ayguevives";
    const addressWidth = doc.getTextWidth(addressText);
    doc.text(addressText, pageWidth - 15 - addressWidth, lastClientInfoY + 15);

    // Generate table with the product details
    const headers = [['Produit', 'Quantité', 'Prix']];
    const data = products.map((item: { name: string; quantity: number; totalPrice: string }) => [
      item.name,
      item.quantity,
      `${item.totalPrice}€`
    ]);

    // Update the autoTable configuration to handle pagination
    (doc as any).autoTable({
      head: headers,
      headStyles: { fillColor: [50, 50, 50], textColor: [255, 255, 255] },
      body: data,
      startY: lastClientInfoY + 30,
      styles: {
        fontSize: 9
      },
      // Add margin settings to ensure content doesn't overflow
      margin: { bottom: 60 },
      // Add a didDrawPage hook to handle footers on each page
      didDrawPage: function(data: any) {
        const pageHeight = doc.internal.pageSize.getHeight();
        
        // Add page numbers
        const pageNumber = doc.internal.pages.length - 1;
        const totalPages = doc.internal.pages.length - 1;
        doc.setFontSize(8);
        const text = `Page ${pageNumber} sur ${totalPages}`;
        const textWidth = doc.getTextWidth(text);
        doc.text(
          text,
          doc.internal.pageSize.getWidth() - 15 - textWidth,
          pageHeight - 10
        );

        // Add footer content
        const footerY = pageHeight - 45; // Start footer 45 units from bottom

        // Add horizontal line
        doc.setDrawColor(168, 168, 168);
        doc.setLineWidth(0.5);
        doc.line(15, footerY, pageWidth - 15, footerY);

        // Add the three sections below the line
        doc.setFontSize(9);
        
        // Company section
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(89, 89, 89);
        doc.text("Entreprise", 15, footerY + 10);
        doc.setFont('helvetica', 'normal');
        doc.text("MG Événements\nChemin des droits de l'homme\net du citoyen, 31450 Ayguevives", 15, footerY + 15);

        // Contact section
        const contactX = pageWidth / 3 + 10;
        doc.setFont('helvetica', 'bold');
        doc.text("Coordonnées", contactX, footerY + 10);
        doc.setFont('helvetica', 'normal');
        doc.text("Mani Grimaudo\n07 68 10 96 17\nmgevenementiel31@gmail.com\nwww.mgevenements.fr", contactX, footerY + 15);

        // Bank details section
        const bankX = (2 * pageWidth) / 3;
        doc.setFont('helvetica', 'bold');
        doc.text("Coordonnées bancaires", bankX, footerY + 10);
        doc.setFont('helvetica', 'normal');
        doc.text("IBAN FR76 2823 3000 0113 2935 6527 041\nCode BIC / SWIFT REVOFRP2\nPaypal: mani.grimaudo@icloud.com", bankX, footerY + 15);
      }
    });

    // Get the final Y position after the table
    const finalY = (doc as any).lastAutoTable.finalY + 7;
    
    // Check if there's enough space for totals and signature
    const requiredSpace = 120; // Approximate space needed for totals, signature box, and company info
    const pageHeight = doc.internal.pageSize.getHeight();
    
    // If there isn't enough space, add a new page
    if (finalY + requiredSpace > pageHeight - 20) {
      doc.addPage();
      // Reset finalY to top of new page with some margin
      const newFinalY = 20;
      addTotalsAndSignature(doc, newFinalY, pageWidth, totalHT, tva, totalTTC, rightMargin, lineSpacing);
    } else {
      addTotalsAndSignature(doc, finalY, pageWidth, totalHT, tva, totalTTC, rightMargin, lineSpacing);
    }

    doc.save(`Devis_${userInfo.first_name}_${new Date().toLocaleDateString('fr-FR')}.pdf`);
  };
  
  // Helper function to add totals and signature section
  const addTotalsAndSignature = (
    doc: any,
    startY: number,
    pageWidth: number,
    totalHT: number,
    tva: number,
    totalTTC: number,
    rightMargin: number,
    lineSpacing: number
  ) => {
    // Add totals
    doc.setFontSize(9);
    doc.setTextColor(0, 0, 0);
    doc.setFont('helvetica', 'bold');

    // Total HT
    const totalHTText = `Total HT:  ${Number(totalHT).toFixed(2)}€`;
    const totalHTWidth = doc.getTextWidth(totalHTText);
    doc.text(totalHTText, pageWidth - rightMargin - totalHTWidth, startY);

    // TVA
    const tvaText = `TVA 20%:  ${Number(tva).toFixed(2)}€`;
    const tvaWidth = doc.getTextWidth(tvaText);
    doc.text(tvaText, pageWidth - rightMargin - tvaWidth, startY + lineSpacing);

    // Total TTC
    const totalTTCText = `Total TTC:  ${Number(totalTTC).toFixed(2)}€`;
    const totalTTCWidth = doc.getTextWidth(totalTTCText);
    doc.text(totalTTCText, pageWidth - rightMargin - totalTTCWidth, startY + (lineSpacing * 2));

    // Add signature box
    const signatureText = "Signature du client (précédée de la mention « Bon pour accord »)";
    const signatureBoxWidth = totalHTWidth + 80;
    const signatureBoxHeight = 30;
    const signatureBoxX = pageWidth - rightMargin - signatureBoxWidth;
    const signatureBoxY = startY + (lineSpacing * 3);

    // Draw signature box and add company information
    addSignatureAndCompanyInfo(doc, signatureBoxX, signatureBoxY, signatureBoxWidth, 
      signatureBoxHeight, signatureText, pageWidth);
  };

  // Helper function to add signature box and company information
  const addSignatureAndCompanyInfo = (
    doc: any,
    signatureBoxX: number,
    signatureBoxY: number,
    signatureBoxWidth: number,
    signatureBoxHeight: number,
    signatureText: string,
    pageWidth: number
  ) => {
    // Draw gray rectangle
    doc.setFillColor(240, 240, 240);
    doc.rect(signatureBoxX, signatureBoxY, signatureBoxWidth, signatureBoxHeight, 'F');

    // Add signature text with gray color (#858584)
    doc.setFontSize(9);
    doc.setTextColor(133, 133, 132);
    const signatureTextWidth = doc.getTextWidth(signatureText);
    doc.text(signatureText, 
        signatureBoxX + (signatureBoxWidth - signatureTextWidth) / 2, 
        signatureBoxY + 7
    );
    
    // Reset colors for the rest of the document
    doc.setTextColor(0, 0, 0);
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
