import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Text,
  Heading,
  Hr,
  Link,
} from "@react-email/components";

interface CateringNotificationProps {
  quoteId: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  eventDate: string;
  hasTraiteurProducts: boolean;
  isTraiteurOptionSelected: boolean;
  totalAmount: string;
}

export const CateringNotificationTemplate = ({
  quoteId,
  clientName,
  clientEmail,
  clientPhone,
  eventDate,
  hasTraiteurProducts,
  isTraiteurOptionSelected,
  totalAmount,
}: CateringNotificationProps) => {
  return (
    <Html>
      <Head />
      <Preview>Notification - Nouveau devis avec services traiteur</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Heading style={headerText}>🍽️ Nouveau devis avec services traiteur</Heading>
          </Section>

          <Section style={content}>
            <Text style={alertText}>
              Un nouveau devis incluant des services traiteur vient d'être créé et nécessite votre attention.
            </Text>

            <Section style={infoRows}>
              <Section style={infoRow}>
                <Text style={label}>Numéro de devis :</Text>
                <Text style={value}>#{quoteId}</Text>
              </Section>

              <Section style={infoRow}>
                <Text style={label}>Client :</Text>
                <Text style={value}>{clientName}</Text>
              </Section>

              <Section style={infoRow}>
                <Text style={label}>Email :</Text>
                <Text style={value}>{clientEmail}</Text>
              </Section>

              <Section style={infoRow}>
                <Text style={label}>Téléphone :</Text>
                <Text style={value}>{clientPhone}</Text>
              </Section>

              <Section style={infoRow}>
                <Text style={label}>Date événement :</Text>
                <Text style={value}>{eventDate}</Text>
              </Section>

              <Section style={infoRow}>
                <Text style={label}>Montant total :</Text>
                <Text style={value}>{totalAmount}€</Text>
              </Section>
            </Section>

            <Hr style={divider} />

            <Section style={serviceSection}>
              <Heading as="h2" style={serviceHeader}>
                Services traiteur demandés :
              </Heading>
              
              {hasTraiteurProducts && (
                <Text style={serviceItem}>
                  ✅ Produits traiteur inclus dans le devis
                </Text>
              )}
              
              {isTraiteurOptionSelected && (
                <Text style={serviceItem}>
                  ✅ Option traiteur sélectionnée par le client
                </Text>
              )}
            </Section>

            <Hr style={divider} />
          </Section>

          <Section style={footer}>
            <Text style={footerText}>
              Cette notification a été générée automatiquement par le système de devis de{" "}
              <Link href="https://mgevenements.fr" style={link}>
                MG Événementiel
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

// Styles
const main = {
  backgroundColor: "#f6f9fc",
  fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen-Sans,Ubuntu,Cantarell,'Helvetica Neue',sans-serif",
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
  borderRadius: "4px",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
};

const header = {
  backgroundColor: "#ffb86a", // Amber color for catering theme
  padding: "24px",
  borderTopLeftRadius: "4px",
  borderTopRightRadius: "4px",
};

const headerText = {
  color: "#ffffff",
  fontSize: "24px",
  fontWeight: "bold",
  margin: "0",
};

const content = {
  padding: "24px",
};

const alertText = {
  color: "#dc2626",
  fontSize: "16px",
  fontWeight: "600",
  backgroundColor: "#fef2f2",
  padding: "12px",
  borderRadius: "4px",
  border: "1px solid #fecaca",
  marginBottom: "24px",
};

const infoRows = {
  display: "flex",
  flexDirection: "column" as const,
  gap: "4px",
};

const infoRow = {
  display: "flex",
  alignItems: "center",
  minHeight: "24px",
};

const label = {
  color: "#666666",
  fontWeight: "bold",
  width: "140px",
  marginRight: "12px",
  fontSize: "14px",
};

const value = {
  color: "#18181b",
  flex: "1",
  fontSize: "14px",
  fontWeight: "600",
};

const divider = {
  margin: "24px 0",
  borderTop: "1px solid #e6ebf1",
};

const serviceSection = {
  backgroundColor: "#fef3c7",
  padding: "16px",
  borderRadius: "4px",
  border: "1px solid #fbbf24",
};

const serviceHeader = {
  fontSize: "18px",
  color: "#92400e",
  marginBottom: "12px",
  margin: "0 0 12px 0",
};

const serviceItem = {
  color: "#92400e",
  fontSize: "14px",
  margin: "4px 0",
};

const actionSection = {
  backgroundColor: "#ecfdf5",
  padding: "16px",
  borderRadius: "4px",
  border: "1px solid #10b981",
};

const actionText = {
  color: "#065f46",
  fontSize: "16px",
  fontWeight: "600",
  margin: "0",
  textAlign: "center" as const,
};

const footer = {
  textAlign: "center" as const,
  padding: "0 24px",
};

const footerText = {
  fontSize: "14px",
  color: "#666666",
};

const link = {
  color: "#18181b",
  textDecoration: "none",
};
