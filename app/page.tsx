import { HeroSection } from "@/components/hero-section"
import { EventDetails } from "@/components/event-details"
import { RsvpForm } from "@/components/rsvp-form"
import { Footer } from "@/components/footer"
import { GaleriaNina } from "@/components/GaleriaNina"

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <EventDetails />
      <RsvpForm />
      <Footer />
    </main>
  )
}
