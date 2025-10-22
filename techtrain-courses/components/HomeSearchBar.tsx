'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search } from 'lucide-react'
import Button from '@/components/ui/Button'

export default function HomeSearchBar() {
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/courses?search=${encodeURIComponent(searchQuery.trim())}`)
    } else {
      router.push('/courses')
    }
  }

  return (
    <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 max-w-2xl">
      <div className="flex-1 relative group">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-secondary-400 w-5 h-5 group-focus-within:text-primary-600 transition-colors" />
        <input
          type="text"
          placeholder="Zoek cursussen, technologieën, vaardigheden..."
          className="pl-12 pr-4 h-14 w-full rounded-xl border-2 border-white/20 bg-white/95 backdrop-blur-sm text-secondary-900 placeholder-secondary-500 focus:ring-4 focus:ring-white/30 focus:border-white transition-all shadow-xl"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <Button
        type="submit"
        size="lg"
        className="h-14 px-8 bg-white text-primary-600 hover:bg-secondary-50 font-semibold shadow-xl"
        aria-label="Zoeken"
      >
        <Search className="w-5 h-5 sm:mr-2" />
        <span className="hidden sm:inline">Zoeken</span>
      </Button>
    </form>
  )
}
