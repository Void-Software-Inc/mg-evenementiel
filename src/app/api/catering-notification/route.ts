import { CateringNotificationTemplate } from "@/components/global/CateringNotificationTemplate";
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const RECIPIENT_EMAIL = 'mgevenementiel31@gmail.com';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { 
      quoteId,
      clientName,
      clientEmail,
      clientPhone,
      eventDate,
      hasTraiteurProducts,
      isTraiteurOptionSelected,
      totalAmount
    } = data;

    // Validate required fields
    if (!quoteId || !clientName || !clientEmail) {
      return Response.json({ error: "Missing required fields" }, { status: 400 });
    }

    const { data: emailData, error } = await resend.emails.send({
      from: 'notifications@mgevenements.fr',
      to: [RECIPIENT_EMAIL],
      subject: `🍽️ Nouveau devis traiteur #${quoteId} - ${clientName}`,
      react: CateringNotificationTemplate({ 
        quoteId,
        clientName,
        clientEmail,
        clientPhone,
        eventDate,
        hasTraiteurProducts,
        isTraiteurOptionSelected,
        totalAmount
      }),
    });

    if (error) {
      console.error("Error sending catering notification email:", error);
      return Response.json({ error }, { status: 500 });
    }

    return Response.json({ success: true, data: emailData });
  } catch (error) {
    console.error("Error in catering notification route:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
