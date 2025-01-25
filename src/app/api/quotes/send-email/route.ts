import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Handler for POST requests
export async function POST(request: Request) {
  try {
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
      event_start_date, 
      event_end_date, 
      is_traiteur, 
      description 
    } = await request.json();

    // Setup Nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: 'smtp.mailgun.org',
      port: 587,
      secure: false, // TLS
      auth: {
        user: process.env.MAILGUN_USER,
        pass: process.env.MAILGUN_PASS,
      },
      // Add DKIM configuration if you have it set up with Mailgun
      dkim: process.env.MAILGUN_DKIM_KEY ? {
        domainName: 'mgevenements.fr',
        keySelector: 'mailgun',
        privateKey: process.env.MAILGUN_DKIM_KEY,
      } : undefined,
    });
    
    const staticEmail = 'mgevenementiel31@gmail.com';

    // Format dates
    const formattedStartDate = new Date(event_start_date).toLocaleDateString('fr-FR');
    const formattedEndDate = new Date(event_end_date).toLocaleDateString('fr-FR');

    // Enhanced email configuration
    await transporter.sendMail({
      from: {
        name: 'MG Événements', // Add a proper sender name
        address: process.env.MAILGUN_USER as string,
      },
      to: staticEmail,
      replyTo: email, // Add reply-to header
      subject: `🎉 Nouveau devis de ${first_name} ${last_name}`,
      headers: {
        'X-Priority': '1', // Set high priority
        'X-MSMail-Priority': 'High',
        'Importance': 'high',
        'List-Unsubscribe': `<mailto:${process.env.MAILGUN_USER}>`, // Add unsubscribe header
      },
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f8f8;">
          <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h1 style="color: #18181B; font-size: 24px; margin-bottom: 20px; text-align: center; border-bottom: 2px solid #E4E4E7; padding-bottom: 10px;">
              Nouveau Devis Reçu
            </h1>
            
            <div style="margin-bottom: 30px;">
              <h2 style="color: #18181B; font-size: 18px; margin-bottom: 15px;">Informations Client</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #71717A; width: 140px;">Nom complet:</td>
                  <td style="padding: 8px 0; color: #18181B;">${first_name} ${last_name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #71717A;">Email:</td>
                  <td style="padding: 8px 0; color: #18181B;">
                    <a href="mailto:${email}" style="color: #2563EB; text-decoration: none;">${email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #71717A;">Téléphone: </td>
                  <td style="padding: 8px 0; color: #18181B;">${phone_number}</td>
                </tr>
              </table>
            </div>

            <div style="margin-bottom: 30px;">
              <h2 style="color: #18181B; font-size: 18px; margin-bottom: 15px;">Détails de l'Événement</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #71717A; width: 140px;">Date(s):</td>
                  <td style="padding: 8px 0; color: #18181B;">
                    ${formattedStartDate}${formattedStartDate !== formattedEndDate ? ` au ${formattedEndDate}` : ''}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #71717A;">Option traiteur:</td>
                  <td style="padding: 8px 0; color: #18181B;">${is_traiteur === true || is_traiteur === "true" ? 'Oui' : 'Non'}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #71717A;">Adresse:</td>
                  <td style="padding: 8px 0; color: #18181B;">
                    ${voie}${compl ? `, ${compl}` : ''}<br>
                    ${cp} ${ville}<br>
                    ${depart}
                  </td>
                </tr>
              </table>
            </div>

            ${description ? `
              <div style="margin-bottom: 30px;">
                <h2 style="color: #18181B; font-size: 18px; margin-bottom: 15px;">Description</h2>
                <p style="color: #18181B; line-height: 1.5; background-color: #F4F4F5; padding: 15px; border-radius: 6px; margin: 0;">
                  ${description}
                </p>
              </div>
            ` : ''}

            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 2px solid #E4E4E7;">
              <p style="color: #71717A; font-size: 14px; margin: 0;">
                Ce devis a été généré automatiquement via le site web MG Événements
              </p>
            </div>
          </div>
        </div>
      `,
      // Add plain text version
      text: `
        Nouveau Devis Reçu
        
        Informations Client:
        - Nom complet: ${first_name} ${last_name}
        - Email: ${email}
        - Téléphone: ${phone_number}
        
        Détails de l'Événement:
        - Date(s): ${formattedStartDate}${formattedStartDate !== formattedEndDate ? ` au ${formattedEndDate}` : ''}
        - Option traiteur: ${is_traiteur === true || is_traiteur === "true" ? 'Oui' : 'Non'}
        - Adresse: ${voie}${compl ? `, ${compl}` : ''}, ${cp} ${ville}, ${depart}
        
        ${description ? `Description: ${description}` : ''}
        
        Ce devis a été généré automatiquement via le site web MG Événements
      `,
    });

    return NextResponse.json({ message: 'Email sent successfully' });
  } catch (error: any) {
    console.error('Error sending email:', error);
    return NextResponse.json({ message: 'Failed to send email', error: error.message }, { status: 500 });
  }
}
