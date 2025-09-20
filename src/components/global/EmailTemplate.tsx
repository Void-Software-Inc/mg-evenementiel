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
  
  interface EmailTemplateProps {
    prenom: string;
    nom: string;
    email: string;
    telephone: string;
    date: string;
    eventType: string;
    traiteur: string;
    message: string;
  }
  
  export const EmailTemplate = ({
    prenom,
    nom,
    email,
    telephone,
    date,
    eventType,
    traiteur,
    message,
  }: EmailTemplateProps) => {
    return (
      <Html>
        <Head />
        <Preview>Nouvelle demande de contact - MG Événementiel</Preview>
        <Body style={main}>
          <Container style={container}>
            <Section style={header}>
              <Heading style={headerText}>Nouvelle demande de contact</Heading>
            </Section>
  
            <Section style={content}>
              <Section style={infoRows}>
                <Section style={infoRow}>
                  <Text style={label}>Nom :</Text>
                  <Text style={value}>{nom}</Text>
                </Section>
  
                <Section style={infoRow}>
                  <Text style={label}>Prénom :</Text>
                  <Text style={value}>{prenom}</Text>
                </Section>
  
                <Section style={infoRow}>
                  <Text style={label}>Email :</Text>
                  <Text style={value}>{email}</Text>
                </Section>
  
                <Section style={infoRow}>
                  <Text style={label}>Téléphone :</Text>
                  <Text style={value}>{telephone}</Text>
                </Section>
  
                <Hr style={divider} />
  
                <Section style={infoRow}>
                  <Text style={label}>Date :</Text>
                  <Text style={value}>{date}</Text>
                </Section>
  
                <Section style={infoRow}>
                  <Text style={label}>Événement :</Text>
                  <Text style={value}>{eventType}</Text>
                </Section>
  
                <Section style={infoRow}>
                  <Text style={label}>Traiteur :</Text>
                  <Text style={value}>{traiteur}</Text>
                </Section>
              </Section>
  
              <Hr style={divider} />
  
              <Section style={messageSection}>
                <Heading as="h2" style={messageHeader}>
                  Message :
                </Heading>
                <Text style={messageText}>{message}</Text>
              </Section>
            </Section>
  
            <Section style={footer}>
              <Text style={footerText}>
                Ce message a été envoyé via le formulaire de contact de{" "}
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
    fontFamily:
      '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
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
    backgroundColor: "#18181b", // Changed to match your zinc-900 theme
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
    width: "120px",
    marginRight: "12px",
    fontSize: "14px",
  };
  
  const value = {
    color: "#18181b",
    flex: "1",
    fontSize: "14px",
  };
  
  const divider = {
    margin: "24px 0",
    borderTop: "1px solid #e6ebf1",
  };
  
  const messageSection = {
    backgroundColor: "#f8fafc",
    padding: "16px",
    borderRadius: "4px",
  };
  
  const messageHeader = {
    fontSize: "18px",
    color: "#18181b",
    marginBottom: "12px",
  };
  
  const messageText = {
    color: "#4a5568",
    whiteSpace: "pre-wrap",
    margin: "0",
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