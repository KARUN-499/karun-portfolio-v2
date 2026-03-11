import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import MarqueeBanner from '@/components/MarqueeBanner';
import About from '@/components/About';
import Services from '@/components/Services';
import Portfolio from '@/components/Portfolio';
import Testimonials from '@/components/Testimonials';
import BookingSection from '@/components/BookingSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import ScrollObserver from '@/components/ScrollObserver';

export default function Home() {
  return (
    <main>
      <ScrollObserver />
      <Navbar />
      <Hero />
      <MarqueeBanner />
      <About />
      <Services />
      <Portfolio />
      <Testimonials />
      <BookingSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
