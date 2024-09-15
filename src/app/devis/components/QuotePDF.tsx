'use client';

import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default function QuotePDF({ user, products, totalPrice }: { user: any, products: any[], totalPrice: number }) {
  const generatePDF = () => {
    const doc = new jsPDF();

    // Add title
    doc.text(`Devis pour ${user.first_name} ${user.last_name}`, 10, 10);

    // Add user information
    doc.text(`Email: ${user.email}`, 10, 20);
    doc.text(`Phone: ${user.phone_number}`, 10, 30);
    doc.text(`Event Date: ${user.date?.to ? formatDateToParisTime(user.date.to) : 'N/A'}`, 10, 40);

    // Prepare table content
    const tableHeaders = [['Product Name', 'Quantity', 'Price']];
    const tableRows = products.map(product => [
      product.name,
      product.quantity,
      `$${(product.price * product.quantity).toFixed(2)}`
    ]);

    // Generate table
    (doc as any).autoTable({
      head: tableHeaders,
      body: tableRows,
      startY: 50,
    });

    // Add total price below the table
    doc.text(`Total Price: $${totalPrice.toFixed(2)}`, 10, (doc as any).lastAutoTable.finalY + 10);

    // Save PDF
    doc.save('quote.pdf');
  };

}

// Helper to format date to Paris time
const formatDateToParisTime = (date: Date | undefined) => {
  const parisTimeZone = 'Europe/Paris';
  if (!date) return '';
  return new Date(date).toLocaleString('en-US', { timeZone: parisTimeZone, hour12: false }).replace(',', '');
};
