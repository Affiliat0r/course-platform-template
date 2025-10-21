/**
 * Translates enrollment and authentication error codes to Dutch user-friendly messages
 */

export function translateEnrollmentError(error: string): string {
  const errorMap: Record<string, string> = {
    already_enrolled: 'Je bent al ingeschreven voor deze cursus.',
    course_full: 'Deze cursus is helaas vol. Probeer een andere datum.',
    schedule_not_found: 'Het geselecteerde schema kon niet worden gevonden.',
    unauthorized: 'Je moet ingelogd zijn om in te schrijven.',
    network_error: 'Netwerkfout. Probeer het opnieuw.',
    'U bent al ingeschreven voor deze cursus':
      'Je bent al ingeschreven voor deze cursus.',
    'U moet ingelogd zijn om in te schrijven voor een cursus':
      'Je moet ingelogd zijn om in te schrijven.',
  };

  return (
    errorMap[error] ||
    'Er is een fout opgetreden bij het inschrijven. Probeer het opnieuw.'
  );
}

export function translateAuthError(error: string): string {
  const errorMap: Record<string, string> = {
    'Invalid login credentials': 'Ongeldige inloggegevens. Controleer je e-mailadres en wachtwoord.',
    'Email not confirmed': 'Je e-mailadres is nog niet bevestigd. Controleer je inbox.',
    'User already registered': 'Dit e-mailadres is al geregistreerd.',
    'Password should be at least 6 characters':
      'Wachtwoord moet minimaal 6 tekens bevatten.',
    'Email rate limit exceeded':
      'Te veel pogingen. Probeer het later opnieuw.',
    'Invalid email': 'Ongeldig e-mailadres.',
    'Weak password': 'Wachtwoord is te zwak. Gebruik minimaal 8 tekens met letters en cijfers.',
  };

  return (
    errorMap[error] ||
    'Er is een fout opgetreden. Probeer het opnieuw of neem contact op met support.'
  );
}

export function translateError(error: string, type: 'enrollment' | 'auth' = 'enrollment'): string {
  if (type === 'auth') {
    return translateAuthError(error);
  }
  return translateEnrollmentError(error);
}
