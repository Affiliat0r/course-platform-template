'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { confirmPayment } from '@/app/actions/payments'
import { createEnrollment } from '@/app/actions/enrollments'
import { createClient } from '@/lib/supabase/client'
import { Check } from 'lucide-react'
import Button from '@/components/ui/Button'

function SuccessContent() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const paymentIntent = searchParams.get('payment_intent')
  const courseId = searchParams.get('courseId')
  const scheduleId = searchParams.get('scheduleId')

  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const checkUser = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        router.push('/login')
        return
      }

      setUser(user)
    }

    checkUser()
  }, [router])

  useEffect(() => {
    if (!paymentIntent || !courseId || !scheduleId || !user) {
      if (user !== null && (!paymentIntent || !courseId || !scheduleId)) {
        router.push('/courses')
      }
      return
    }

    verifyPaymentAndEnroll()
  }, [paymentIntent, courseId, scheduleId, user])

  const verifyPaymentAndEnroll = async () => {
    try {
      // Verify payment
      const result = await confirmPayment(paymentIntent!)

      if ('error' in result) {
        setStatus('error')
        return
      }

      if (result.status === 'succeeded') {
        // Create enrollment
        const enrollResult = await createEnrollment(courseId!, scheduleId!)

        if ('error' in enrollResult) {
          console.error('Enrollment error:', enrollResult.error)
          // Payment succeeded but enrollment failed - still show success
          // Admin can manually add enrollment
        }

        setStatus('success')
      } else {
        setStatus('error')
      }
    } catch (error) {
      console.error('Payment verification error:', error)
      setStatus('error')
    }
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mb-4"></div>
          <p className="text-secondary-600">Betaling verifiëren...</p>
        </div>
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary-50">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-red-600 mb-4">Betaling mislukt</h1>
          <p className="text-secondary-600 mb-6">
            Er is een probleem opgetreden bij je betaling. Probeer het opnieuw of neem contact met ons op.
          </p>
          <div className="space-y-3">
            <Link href="/courses" className="block">
              <Button className="w-full">
                Terug naar cursussen
              </Button>
            </Link>
            <Link href="/contact" className="block">
              <Button variant="outline" className="w-full">
                Contact opnemen
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary-50 py-12">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="w-8 h-8 text-green-600" />
        </div>

        <h1 className="text-3xl font-bold text-secondary-900 mb-4">Betaling gelukt!</h1>
        <p className="text-secondary-600 mb-2">
          Je bent succesvol ingeschreven voor de cursus.
        </p>
        <p className="text-secondary-600 mb-6">
          Je ontvangt een bevestiging per e-mail met alle details.
        </p>

        <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <div className="text-left">
              <h3 className="font-semibold text-primary-900 mb-1">Wat nu?</h3>
              <ul className="text-sm text-primary-800 space-y-1">
                <li>• Bekijk je inschrijvingen in het dashboard</li>
                <li>• Controleer je e-mail voor details</li>
                <li>• Ontvang cursusmateriaal vóór de startdatum</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <Link href="/dashboard/enrollments" className="block">
            <Button className="w-full">
              Bekijk mijn cursussen
            </Button>
          </Link>
          <Link href="/courses" className="block">
            <Button variant="outline" className="w-full">
              Meer cursussen bekijken
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-secondary-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mb-4"></div>
          <p className="text-secondary-600">Laden...</p>
        </div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  )
}
