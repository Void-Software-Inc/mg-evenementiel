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
        region,
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
            region,
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
    const { voie, compl, cp, ville, region, pays, ...quoteDataWithoutAddress } = quoteData;

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
                region: formData.region,
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
      `Date(s) de l'événement: ${eventFromDate} au ${eventToDate}`,
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
        `${formData.region}`
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
      <div className="w-full h-full max-w-2xl mx-auto sm:mt-20">
        <h2 className="text-2xl font-bold mb-4">Récapitulatif de votre devis</h2>
        <div className="mb-6">
          <p className="text-xl font-semibold mb-2">Informations personnelles</p>
          <p>Nom: {formData?.last_name}</p>
          <p>Prénom: {formData?.first_name}</p>
          <p>Email: {formData?.email}</p>
          <p>Téléphone: {formData?.phone_number}</p>
        </div>
        <div className="mb-6">
          <p className="text-xl font-semibold mb-2">Produits</p>
          {cart.map((item: any) => (
            <div key={item.id} className="flex justify-between mb-2">
              <span>{item.name} x {item.quantity}</span>
              <span>{(item.price * item.quantity).toFixed(2)}€</span>
            </div>
          ))}
          <p className="text-xl font-semibold mb-2 mt-6">Total</p>
          <div className="flex flex-col items-start text-lg font-medium">
            <div className="flex justify-between w-full sm:w-1/2 md:w-1/3">
              <span>Total HT:</span>
              <span className='font-semibold'>{totalHT.toFixed(2)}€</span>
            </div>
            <div className="flex justify-between w-full sm:w-1/2 md:w-1/3">
              <span>TVA 20%:</span>
              <span className='font-semibold'>{tva.toFixed(2)}€</span>
            </div>
            <div className="flex justify-between w-full sm:w-1/2 md:w-1/3">
              <span>Total TTC:</span>
              <span className='font-semibold'>{totalTTC.toFixed(2)}€</span>
            </div>
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
