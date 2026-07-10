import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import ProcessSection from './components/ProcessSection/ProcessSection';
import ProjectsSection from './components/ProjectsSection/ProjectsSection';
import ServicesSection from './components/ServicesSection/ServicesSection';
import TestimonialsSection from './components/TestimonialsSection/TestimonialsSection';
import FAQSection from './components/FAQSection/FAQSection';
import ContactSection from './components/ContactSection/ContactSection';
import Footer from './components/Footer/Footer';

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ServicesSection />
        <ContactSection />
        <ProjectsSection />
        <TestimonialsSection />
        <ProcessSection />
        <FAQSection />
      </main>
      <Footer />
    </>
  );
}
