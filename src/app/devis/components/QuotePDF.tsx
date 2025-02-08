'use client';

import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default function QuotePDF({ user, products, totalHT, tva, totalTTC }: { user: any, products: any[], totalHT: number, tva: number, totalTTC: number }) {
  const generatePDF = () => {
    const doc = new jsPDF();

    // Add title
    doc.text(`Devis pour ${user.first_name} ${user.last_name}`, 10, 10);

  
    doc.text(`Email: ${user.email}`, 10, 20);
    doc.text(`Téléphone: ${user.phone_number}`, 10, 30);
    doc.text(`Date de l'événement: ${user.date?.to ? formatDateToParisTime(user.date.to) : 'N/A'}`, 10, 40);
    doc.text(`Option traiteur: ${user.is_traiteur ? 'Oui' : 'Non'}`, 10, 50);

    // Prepare table content
    const tableHeaders = [['Nom du Produit', 'Quantité', 'Prix HT']];
    const tableRows = products.map(product => [
      product.name,
      product.quantity,
      `${(product.price * product.quantity).toFixed(2)}€`
    ]);

    (doc as any).autoTable({
      head: tableHeaders,
      body: tableRows,
      startY: 60,
    });

    const finalY = (doc as any).lastAutoTable.finalY;

    doc.text(`Total HT: ${totalHT.toFixed(2)}€`, 10, finalY + 10);
    doc.text(`TVA (20%): ${tva.toFixed(2)}€`, 10, finalY + 20);
    doc.text(`Total TTC: ${totalTTC.toFixed(2)}€`, 10, finalY + 30);

    doc.save('quote.pdf');
  };

}

// Helper to format date to Paris time
const formatDateToParisTime = (date: Date | undefined) => {
  const parisTimeZone = 'Europe/Paris';
  if (!date) return '';
  return new Date(date).toLocaleString('fr-FR', { timeZone: parisTimeZone, hour12: false }).replace(',', '');
};
