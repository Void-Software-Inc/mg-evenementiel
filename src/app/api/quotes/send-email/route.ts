import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

// Handler for POST requests
export async function POST(request: Request) {
  try {
    const { first_name, last_name, email, phone_number, voie, compl, cp, ville, region, event_start_date, event_end_date, is_traiteur, description, pdfContent } = await request.json();

    // Check if pdfContent is valid
    if (!pdfContent) {
      throw new Error('PDF content is missing');
    }

    // Setup Nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: 'smtp.mailgun.org',
      port: 587,
      auth: {
        user: process.env.MAILGUN_USER,
        pass: process.env.MAILGUN_PASS,
      },
    });
    
    // evab.onbon37@gmail.com
    const staticEmail = 'mgevenementiel31@gmail.com'; 

    // Generate PDF
    const pdfBuffer = generatePDF(pdfContent); // Generate PDF from the content

    //console.log("Preparing to send email to:", staticEmail); // Log the email address
    // Send email to the static email address
    await transporter.sendMail({
      from: process.env.MAILGUN_USER, // Sender address
      to: staticEmail, // Send to static email
      subject: `Nouveau devis de ${first_name} ${last_name}`,
      html: `
        <div>
          <h2>Nouveau Devis</h2>
          <p><strong>Nom:</strong> ${first_name} ${last_name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Téléphone:</strong> ${phone_number}</p>
          <p><strong>Adresse:</strong> ${voie} ${compl ? `, ${compl}` : ''}, ${cp} ${ville} ${region}</p>
          <p><strong>Date de l'événement:</strong> ${new Date(event_start_date).toLocaleDateString('fr-FR')} au ${new Date(event_end_date).toLocaleDateString('fr-FR')}</p>
          <p><strong>Option traiteur:</strong> ${is_traiteur === "true" ? 'Oui' : 'Non'}</p>
          <p><strong>Description:</strong> ${description}</p>
        </div>
      `,
      attachments: [
        {
          filename: `Devis_${first_name}_${new Date().toLocaleDateString('fr-FR')}.pdf`,
          content: pdfBuffer,
          contentType: 'application/pdf',
        },
      ],
    });

 //   console.log("Email sent successfully to:", staticEmail); // Log success
    return NextResponse.json({ message: 'Email sent successfully' });
  } catch (error: any) {
    console.error('Error sending email:', error); // Log the error details
    return NextResponse.json({ message: 'Failed to send email', error: error.message }, { status: 500 }); // Return error message
  }
}

// Function to generate PDF
const generatePDF = (pdfContent: any): Buffer => {
  const doc = new jsPDF();
  const { userInfo, products, totalHT, tva, totalTTC } = pdfContent;

  // Add title
  doc.setFontSize(24);
  doc.text(`Devis pour ${userInfo.first_name} ${userInfo.last_name}`, 10, 20);

  // Add user Information
  doc.setFontSize(12);
  doc.text(`Téléphone: ${userInfo.phone_number}`, 10, 30);
  doc.text(`Email: ${userInfo.email}`, 10, 40);
  doc.text(`Option traiteur: ${userInfo.is_traiteur ? 'Oui' : 'Non'}`, 10, 50);

  // Handle dates properly
  const eventFromDate = new Date(userInfo.date.from).toLocaleDateString('fr-FR');
  const eventToDate = new Date(userInfo.date.to).toLocaleDateString('fr-FR');
  doc.text(`Date de l'événement: ${eventFromDate} au ${eventToDate}`, 10, 60);

  // Add address information
  doc.text(`Adresse: ${userInfo.voie ? userInfo.voie : ''} ${userInfo.compl ? `, ${userInfo.compl}` : ''}, ${userInfo.cp ? userInfo.cp : ''} ${userInfo.ville ? userInfo.ville : ''} ${userInfo.region ? userInfo.region : ''}`, 10, 70);

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
    body: data,
    startY: 85,
  });

  // Add total price
  doc.setFontSize(14);
  doc.text(`TVA: ${tva}€`, 10, (doc as any).lastAutoTable.finalY + 20);
  doc.text(`Prix HT: ${totalHT}€`, 10, (doc as any).lastAutoTable.finalY + 30);
  doc.text(`Prix TTC: ${totalTTC}€`, 10, (doc as any).lastAutoTable.finalY + 40);

  return Buffer.from(doc.output('arraybuffer'));
};
