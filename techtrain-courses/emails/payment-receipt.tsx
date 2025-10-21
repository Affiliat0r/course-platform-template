import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components'

interface PaymentReceiptProps {
  fullName: string
  courseTitle: string
  amount: number
  paymentDate: string
  paymentMethod: string
  invoiceNumber: string
}

export default function PaymentReceipt({
  fullName,
  courseTitle,
  amount,
  paymentDate,
  paymentMethod,
  invoiceNumber,
}: PaymentReceiptProps) {
  return (
    <Html>
      <Head />
      <Preview>Betaling ontvangen voor {courseTitle}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>Betaling Ontvangen</Heading>

          <Text style={paragraph}>Hallo {fullName},</Text>

          <Text style={paragraph}>
            We hebben je betaling ontvangen. Bedankt voor je inschrijving!
          </Text>

          <Section style={receiptBox}>
            <Heading as="h2" style={receiptTitle}>Betalingsgegevens</Heading>

            <table style={table}>
              <tbody>
                <tr>
                  <td style={label}>Factuurnummer:</td>
                  <td style={value}>{invoiceNumber}</td>
                </tr>
                <tr>
                  <td style={label}>Datum:</td>
                  <td style={value}>{paymentDate}</td>
                </tr>
                <tr>
                  <td style={label}>Cursus:</td>
                  <td style={value}>{courseTitle}</td>
                </tr>
                <tr>
                  <td style={label}>Betaalmethode:</td>
                  <td style={value}>{paymentMethod}</td>
                </tr>
                <tr style={totalRow}>
                  <td style={labelBold}>Totaal:</td>
                  <td style={valueBold}>€{amount.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </Section>

          <Text style={paragraph}>
            Deze e-mail dient als je officiële betalingsbewijs. Bewaar deze goed voor je administratie.
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

const receiptBox = {
  backgroundColor: '#f8f9fa',
  padding: '24px',
  borderRadius: '8px',
  margin: '24px 24px 0',
  border: '2px solid #e5e7eb',
}

const receiptTitle = {
  fontSize: '20px',
  fontWeight: '600',
  color: '#111827',
  margin: '0 0 16px 0',
}

const table = {
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

const totalRow = {
  borderTop: '2px solid #e5e7eb',
}

const labelBold = {
  fontSize: '16px',
  color: '#6b7280',
  fontWeight: '600',
  paddingTop: '12px',
  paddingBottom: '8px',
  paddingRight: '16px',
}

const valueBold = {
  fontSize: '18px',
  color: '#2563EB',
  fontWeight: '700',
  paddingTop: '12px',
  paddingBottom: '8px',
}

const footer = {
  color: '#9ca299',
  fontSize: '14px',
  marginTop: '60px',
  padding: '0 24px',
}
