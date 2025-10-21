import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components'

interface WelcomeEmailProps {
  fullName: string
}

export default function WelcomeEmail({ fullName }: WelcomeEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Welkom bij TechTrain - Jouw IT-carrière begint hier</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>Welkom bij TechTrain!</Heading>

          <Text style={paragraph}>Hallo {fullName},</Text>

          <Text style={paragraph}>
            Bedankt voor je registratie bij TechTrain. We zijn blij dat je ervoor hebt gekozen
            om je IT-vaardigheden naar een hoger niveau te tillen.
          </Text>

          <Text style={paragraph}>
            Met je account kun je:
          </Text>

          <ul style={list}>
            <li style={listItem}>Door ons volledige cursusaanbod bladeren</li>
            <li style={listItem}>Inschrijven voor cursussen</li>
            <li style={listItem}>Je leervoortgang bijhouden</li>
            <li style={listItem}>Certificaten downloaden</li>
          </ul>

          <Section style={buttonContainer}>
            <Button style={button} href={`${process.env.NEXT_PUBLIC_APP_URL}/courses`}>
              Bekijk Cursussen
            </Button>
          </Section>

          <Text style={paragraph}>
            Heb je vragen? Neem gerust contact met ons op via{' '}
            <a href="mailto:info@techtrain.nl" style={link}>info@techtrain.nl</a>
          </Text>

          <Text style={footer}>
            Met vriendelijke groet,<br />
            Het TechTrain Team
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
}

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
  maxWidth: '600px',
}

const heading = {
  fontSize: '32px',
  lineHeight: '1.3',
  fontWeight: '700',
  color: '#484848',
  padding: '17px 24px 0',
}

const paragraph = {
  fontSize: '18px',
  lineHeight: '1.4',
  color: '#484848',
  padding: '24px 24px 0',
}

const list = {
  fontSize: '18px',
  lineHeight: '1.4',
  color: '#484848',
  padding: '12px 24px',
}

const listItem = {
  marginBottom: '8px',
}

const buttonContainer = {
  padding: '27px 24px',
}

const button = {
  backgroundColor: '#2563EB',
  borderRadius: '5px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: '600',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  padding: '12px 20px',
}

const link = {
  color: '#2563EB',
  textDecoration: 'underline',
}

const footer = {
  color: '#9ca299',
  fontSize: '14px',
  marginTop: '60px',
  padding: '0 24px',
}
