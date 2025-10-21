'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Elements } from '@stripe/react-stripe-js'
import { getStripe } from '@/lib/stripe-client'
import CheckoutForm from '@/components/CheckoutForm'
import { createPaymentIntent } from '@/app/actions/payments'
import { createClient } from '@/lib/supabase/client'

function CheckoutContent() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const courseId = searchParams.get('courseId')
  const scheduleId = searchParams.get('scheduleId')
  const amount = parseFloat(searchParams.get('amount') || '0')

  const [clientSecret, setClientSecret] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const checkUser = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        router.push('/login?redirect=' + encodeURIComponent(window.location.pathname + window.location.search))
        return
      }

      setUser(user)
    }

    checkUser()
  }, [router])

  useEffect(() => {
    if (!user) return

    if (!courseId || !scheduleId || !amount) {
      setError('Ongeldige betalingsgegevens')
      setLoading(false)
      return
    }

    // Create payment intent
    createPaymentIntent({
      courseId,
      scheduleId,
      amount,
      userId: user.id
    }).then(result => {
      if ('error' in result) {
        setError(result.error || 'Fout bij het initialiseren van de betaling')
      } else if (result.clientSecret) {
        setClientSecret(result.clientSecret)
      }
      setLoading(false)
    })
  }, [user, courseId, scheduleId, amount])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mb-4"></div>
          <p className="text-secondary-600">Betaling voorbereiden...</p>
        </div>
      </div>
    )
  }

  if (error || !clientSecret) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary-50">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-secondary-900 mb-4">Fout bij laden</h1>
          <p className="text-secondary-600 mb-6">{error || 'Fout bij het laden van de betaling'}</p>
          <button
            onClick={() => router.push('/courses')}
            className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
          >
            Terug naar cursussen
          </button>
        </div>
      </div>
    )
  }

  const options = {
    clientSecret,
    appearance: {
      theme: 'stripe' as const,
      variables: {
        colorPrimary: '#2563EB',
        colorBackground: '#ffffff',
        colorText: '#1f2937',
        colorDanger: '#ef4444',
        fontFamily: 'system-ui, sans-serif',
        spacingUnit: '4px',
        borderRadius: '8px',
      },
    },
  }

  return (
    <div className="min-h-screen bg-secondary-50 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-secondary-900 mb-2">Betaling</h1>
          <p className="text-secondary-600">Vul je betalingsgegevens in om de cursus te boeken</p>
        </div>

        <Elements stripe={getStripe()} options={options}>
          <CheckoutForm
            amount={amount}
            courseId={courseId!}
            scheduleId={scheduleId!}
          />
        </Elements>
      </div>
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-secondary-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mb-4"></div>
          <p className="text-secondary-600">Laden...</p>
        </div>
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  )
}
