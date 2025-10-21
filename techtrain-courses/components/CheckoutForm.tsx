'use client'

import { useState } from 'react'
import {
  useStripe,
  useElements,
  PaymentElement
} from '@stripe/react-stripe-js'
import Button from '@/components/ui/Button'
import { useRouter } from 'next/navigation'

interface CheckoutFormProps {
  amount: number
  courseId: string
  scheduleId: string
}

export default function CheckoutForm({
  amount,
  courseId,
  scheduleId
}: CheckoutFormProps) {
  const stripe = useStripe()
  const elements = useElements()
  const router = useRouter()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setLoading(true)
    setError(null)

    const { error: submitError } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/checkout/success?courseId=${courseId}&scheduleId=${scheduleId}`,
      },
    })

    if (submitError) {
      setError(submitError.message || 'Er is een fout opgetreden bij de betaling')
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4 text-secondary-900">Betaalmethode</h2>
        <div className="text-sm text-secondary-600 mb-4">
          Selecteer je betaalmethode hieronder. We accepteren creditcards, debetkaarten en iDEAL.
        </div>
        <PaymentElement />
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <div>
              <h3 className="font-semibold mb-1">Betalingsfout</h3>
              <p>{error}</p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-center mb-4 pb-4 border-b">
          <span className="font-semibold text-secondary-900">Totaalbedrag:</span>
          <span className="text-2xl font-bold text-primary-600">€{amount.toFixed(2)}</span>
        </div>

        <div className="space-y-3 mb-6">
          <div className="flex items-start gap-2 text-sm text-secondary-600">
            <svg className="w-5 h-5 flex-shrink-0 text-green-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Inclusief materialen en certificaat</span>
          </div>
          <div className="flex items-start gap-2 text-sm text-secondary-600">
            <svg className="w-5 h-5 flex-shrink-0 text-green-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Directe bevestiging per e-mail</span>
          </div>
          <div className="flex items-start gap-2 text-sm text-secondary-600">
            <svg className="w-5 h-5 flex-shrink-0 text-green-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Veilige betaling via Stripe</span>
          </div>
        </div>

        <Button
          type="submit"
          disabled={!stripe || loading}
          size="lg"
          className="w-full"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Verwerken...
            </span>
          ) : (
            `Betaal €${amount.toFixed(2)}`
          )}
        </Button>

        <p className="text-xs text-secondary-500 text-center mt-4">
          Veilige betaling via Stripe. Je gegevens worden versleuteld verzonden.
        </p>
      </div>
    </form>
  )
}
