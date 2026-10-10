import { imageUrl } from '@/lib/store'

export function Logo({ className = 'h-16 w-16 md:h-20 md:w-20' }: { className?: string }) {
  return (
    <img
      src={imageUrl('/img/logo.png', 160)}
      srcSet={`${imageUrl('/img/logo.png', 160)} 1x, ${imageUrl('/img/logo.png', 320)} 2x`}
      alt="MTJZA — Gifts · Fashion · Abaya"
      width={80}
      height={80}
      className={`rounded-full object-contain drop-shadow-md ${className}`}
    />
  )
}
