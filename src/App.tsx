import { lazy, Suspense, useEffect, useState } from 'react';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import ProcessSection from './components/ProcessSection/ProcessSection';
import ProjectsSection from './components/ProjectsSection/ProjectsSection';
import ServicesSection from './components/ServicesSection/ServicesSection';
import TestimonialsSection from './components/TestimonialsSection/TestimonialsSection';
import FAQSection from './components/FAQSection/FAQSection';
import ContactSection from './components/ContactSection/ContactSection';
import Footer from './components/Footer/Footer';
import { projects, type ProjectId } from './data/content';
import type { LegalPageKind } from './components/LegalPage/LegalPage';

const CasePage = lazy(() => import('./components/CasePage/CasePage'));
const LegalPage = lazy(() => import('./components/LegalPage/LegalPage'));

type AppRoute =
  | { type: 'home' }
  | { type: 'legal'; kind: LegalPageKind }
  | { type: 'case'; id: ProjectId };

function getRoute(): AppRoute {
  const hash = window.location.hash;
  switch (hash) {
    case '#/details':
      return { type: 'legal', kind: 'details' };
    case '#/privacy':
      return { type: 'legal', kind: 'privacy' };
    case '#/consent':
      return { type: 'legal', kind: 'consent' };
  }

  const caseMatch = hash.match(/^#\/case\/([^/]+)$/);
  const project = caseMatch ? projects.find((item) => item.id === caseMatch[1]) : undefined;
  return project ? { type: 'case', id: project.id } : { type: 'home' };
}

export default function App() {
  const [route, setRoute] = useState<AppRoute>(getRoute);

  useEffect(() => {
    const onHashChange = () => setRoute(getRoute());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  if (route.type === 'legal') {
    return (
      <Suspense fallback={null}>
        <LegalPage kind={route.kind} />
      </Suspense>
    );
  }

  if (route.type === 'case') {
    return (
      <>
        <Header />
        <Suspense fallback={null}>
          <CasePage projectId={route.id} />
        </Suspense>
        <Footer />
      </>
    );
  }

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
