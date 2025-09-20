import { EmailTemplate } from "@/components/global/EmailTemplate";
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const RECIPIENT_EMAIL = 'mgevenementiel31@gmail.com';

export async function POST(request: Request) {
  try {
    const formData = await request.json();
    const { 
      prenom, 
      nom, 
      email, 
      telephone, 
      date, 
      eventType, 
      traiteur, 
      message 
    } = formData;

    const { data, error } = await resend.emails.send({
      from: 'contact@mgevenements.fr', // Update this to your verified domain
      to: [RECIPIENT_EMAIL],
      subject: `MG Événementiel - Nouvelle Demande de ${prenom} ${nom}`,
      react: EmailTemplate({ 
        prenom, 
        nom, 
        email, 
        telephone, 
        date, 
        eventType, 
        traiteur, 
        message 
      }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}