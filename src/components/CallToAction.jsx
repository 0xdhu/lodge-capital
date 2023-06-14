
import { CircleBackground } from '@/components/CircleBackground'


export function CallToAction() {
  return (
    <section
      id="get-free-shares-today"
      className="relative overflow-hidden lg:overflow-visible invisible lg:visible   py-20 sm:py-28 z-10"
    >
      <div className="absolute scale-50 md:scale-100 -top-1/2 left-20 -translate-y-1/2 sm:left-1/2 sm:-translate-x-1/2">
        <CircleBackground color="#C0C0C0" className="animate-spin-slower" />
        
      </div>
     
    </section>
  )
}
