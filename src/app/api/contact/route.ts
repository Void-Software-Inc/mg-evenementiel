import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';


// Handler for POST requests
export async function POST(request: Request) {
  try {
    const { prenom, nom, email, telephone, voie, compl, cp, ville, depart, pays, date, eventType, traiteur, message } = await request.json();

    // Setup Nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: 'smtp.mailgun.org',
      port: 587,
      auth: {
        user: process.env.MAILGUN_USER,
        pass: process.env.MAILGUN_PASS,
      },
    });
 
   // mgevenementiel31@gmail.com
    await transporter.sendMail({
      from: email,
      to: 'mgevenementiel31@gmail.com',
      subject: `MG Événementiel - Nouvelle Demande de ${prenom} ${nom}`,
      html: `
      <div style="font-size: 18px; line-height: 1.6;">
        <p><strong>Nouvelle Demande via le formulaire de contact</strong></p>        
        <p><strong>Nom & Prénom:</strong> ${prenom} ${nom}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Téléphone:</strong> ${telephone}</p>
        <p><strong>Voie:</strong> ${voie}</p>
        <p><strong>Complément d'Adresse:</strong> ${compl}</p>
        <p><strong>Code Postal:</strong> ${cp}</p>
        <p><strong>Ville:</strong> ${ville}</p>
        <p><strong>Région:</strong> ${depart}</p>
        <p><strong>Pays:</strong> ${pays}</p>
        <p><strong>Date(s) de l'événement souhaitée(s):</strong> ${date}</p>
        <p><strong>Type d'événement:</strong> ${eventType}</p>
        <p><strong>Option Traiteur:</strong> ${traiteur}</p>
        <p><strong>Message:</strong> ${message}</p>
      </div>
    `,
    });

    return NextResponse.json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ message: 'Failed to send email' }, { status: 500 });
  }
}
