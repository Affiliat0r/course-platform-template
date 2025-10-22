import Image from 'next/image'
import Link from 'next/link'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export default function Logo({
  size = 'md',
  className = ''
}: LogoProps) {
  const heights = {
    sm: 30,
    md: 40,
    lg: 50
  }

  const widths = {
    sm: 186,
    md: 248,
    lg: 310
  }

  return (
    <Link
      href="/"
      className={`inline-block ${className}`}
      aria-label="TechTrain - Naar homepagina"
    >
      <Image
        src="/images/branding/logo.svg"
        alt="TechTrain Logo"
        width={widths[size]}
        height={heights[size]}
        priority // Load logo immediately
        unoptimized // SVGs don't need Next.js optimization
        className="h-auto w-auto"
      />
    </Link>
  )
}
