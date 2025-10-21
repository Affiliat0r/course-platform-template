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
  Hr,
} from '@react-email/components'

interface EnrollmentConfirmationProps {
  fullName: string
  courseTitle: string
  startDate: string
  location: string
  price: number
}

export default function EnrollmentConfirmation({
  fullName,
  courseTitle,
  startDate,
  location,
  price,
}: EnrollmentConfirmationProps) {
  return (
    <Html>
      <Head />
      <Preview>Inschrijving bevestigd: {courseTitle}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>Inschrijving Bevestigd!</Heading>

          <Text style={paragraph}>Hallo {fullName},</Text>

          <Text style={paragraph}>
            Je bent succesvol ingeschreven voor de volgende cursus:
          </Text>

          <Section style={courseBox}>
            <Heading as="h2" style={courseTitleStyle}>
              {courseTitle}
            </Heading>

            <table style={detailsTable}>
              <tbody>
                <tr>
                  <td style={label}>Startdatum:</td>
                  <td style={value}>{startDate}</td>
                </tr>
                <tr>
                  <td style={label}>Locatie:</td>
                  <td style={value}>{location}</td>
                </tr>
                <tr>
                  <td style={label}>Prijs:</td>
                  <td style={value}>€{price.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </Section>

          <Text style={paragraph}>
            Je ontvangt één week voor de startdatum een herinnering met alle details.
          </Text>

          <Section style={buttonContainer}>
            <Button style={button} href={`${process.env.NEXT_PUBLIC_APP_URL}/dashboard/enrollments`}>
              Bekijk Mijn Cursussen
            </Button>
          </Section>

          <Hr style={hr} />

          <Text style={footer}>
            Vragen? Mail ons op{' '}
            <a href="mailto:info@techtrain.nl" style={link}>info@techtrain.nl</a>
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

const courseBox = {
  backgroundColor: '#f8f9fa',
  padding: '24px',
  borderRadius: '8px',
  margin: '24px 24px 0',
}

const courseTitleStyle = {
  fontSize: '24px',
  fontWeight: '600',
  color: '#2563EB',
  margin: '0 0 16px 0',
}

const detailsTable = {
  width: '100%',
}

const label = {
  fontSize: '14px',
  color: '#6b7280',
  paddingBottom: '8px',
  paddingRight: '16px',
}

const value = {
  fontSize: '16px',
  color: '#111827',
  fontWeight: '500',
  paddingBottom: '8px',
}

const hr = {
  borderColor: '#e6ebf1',
  margin: '40px 24px',
}

const link = {
  color: '#2563EB',
  textDecoration: 'underline',
}

const footer = {
  color: '#9ca299',
  fontSize: '14px',
  padding: '0 24px',
}
