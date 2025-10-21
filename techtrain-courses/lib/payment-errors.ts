/**
 * Translates Stripe payment error codes to Dutch error messages
 */
export function translatePaymentError(errorCode: string): string {
  const errorMap: Record<string, string> = {
    // Card errors
    'card_declined': 'Je kaart is geweigerd. Probeer een andere betaalmethode.',
    'insufficient_funds': 'Onvoldoende saldo op je rekening.',
    'expired_card': 'Je kaart is verlopen.',
    'incorrect_cvc': 'De CVC-code is incorrect.',
    'incorrect_number': 'Het kaartnummer is incorrect.',
    'invalid_expiry_month': 'De vervalmaand is ongeldig.',
    'invalid_expiry_year': 'Het vervaljaar is ongeldig.',
    'invalid_number': 'Het kaartnummer is ongeldig.',
    'invalid_cvc': 'De CVC-code is ongeldig.',

    // Authentication errors
    'payment_intent_authentication_failure': 'Betaling niet geverifieerd. Controleer je gegevens.',
    'authentication_required': 'Verificatie vereist. Volg de instructies van je bank.',

    // Processing errors
    'processing_error': 'Er is een fout opgetreden bij het verwerken van de betaling.',
    'charge_already_captured': 'Deze betaling is al verwerkt.',
    'charge_already_refunded': 'Deze betaling is al terugbetaald.',
    'charge_disputed': 'Deze betaling is betwist.',
    'charge_expired_for_capture': 'De betaling is verlopen.',

    // Network errors
    'network_error': 'Netwerkfout. Controleer je internetverbinding.',

    // iDEAL specific errors
    'ideal_bank_account_verification_failed': 'Verificatie van je bankrekening is mislukt.',

    // Rate limit errors
    'rate_limit': 'Te veel pogingen. Probeer het later opnieuw.',

    // Generic errors
    'payment_method_not_available': 'Deze betaalmethode is niet beschikbaar.',
    'payment_intent_invalid_parameter': 'Ongeldige betalingsgegevens.',
    'payment_intent_payment_attempt_failed': 'Betaling mislukt. Probeer het opnieuw.',
    'payment_intent_unexpected_state': 'Onverwachte betalingsstatus. Neem contact op met support.',

    // Amount errors
    'amount_too_large': 'Het bedrag is te hoog.',
    'amount_too_small': 'Het bedrag is te laag.',

    // Currency errors
    'invalid_currency': 'Ongeldige valuta.',

    // Customer errors
    'customer_max_payment_methods': 'Je hebt het maximale aantal betaalmethoden bereikt.',

    // Setup errors
    'setup_intent_authentication_failure': 'Verificatie van betaalmethode mislukt.',
    'setup_intent_unexpected_state': 'Onverwachte status bij instellen van betaalmethode.',

    // Mandate errors
    'mandate_invalid': 'Ongeldige machtiging.',

    // Postal code errors
    'incorrect_zip': 'Onjuiste postcode.',
    'postal_code_invalid': 'Ongeldige postcode.',

    // API errors
    'api_key_expired': 'Systeemfout. Neem contact op met support.',
    'platform_api_key_expired': 'Systeemfout. Neem contact op met support.',

    // Default fallback
    'default': 'Er is een fout opgetreden. Probeer het opnieuw.'
  }

  return errorMap[errorCode] || errorMap['default']
}

/**
 * Formats a generic error message in Dutch
 */
export function formatPaymentError(error: any): string {
  if (typeof error === 'string') {
    return error
  }

  if (error?.code) {
    return translatePaymentError(error.code)
  }

  if (error?.message) {
    return error.message
  }

  return 'Er is een onbekende fout opgetreden bij de betaling.'
}

/**
 * Payment status messages in Dutch
 */
export const paymentStatusMessages = {
  processing: 'Betaling wordt verwerkt...',
  requires_payment_method: 'Selecteer een betaalmethode om door te gaan.',
  requires_confirmation: 'Bevestig je betaling om door te gaan.',
  requires_action: 'Aanvullende actie vereist. Volg de instructies.',
  succeeded: 'Betaling geslaagd!',
  canceled: 'Betaling geannuleerd.',
  failed: 'Betaling mislukt. Probeer het opnieuw.'
}

/**
 * iDEAL bank names in Dutch (for display purposes)
 */
export const idealBankNames: Record<string, string> = {
  'abn_amro': 'ABN AMRO',
  'asn_bank': 'ASN Bank',
  'bunq': 'bunq',
  'handelsbanken': 'Handelsbanken',
  'ing': 'ING',
  'knab': 'Knab',
  'rabobank': 'Rabobank',
  'regiobank': 'RegioBank',
  'revolut': 'Revolut',
  'sns_bank': 'SNS Bank',
  'triodos_bank': 'Triodos Bank',
  'van_lanschot': 'Van Lanschot'
}
