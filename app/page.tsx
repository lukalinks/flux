import { Navigation } from '../components/Navigation';
import { HeroSection } from '../components/HeroSection';
import { FeaturesSection } from '../components/FeaturesSection';
import { OnboardingSection } from '../components/OnboardingSection';
import { CTASection } from '../components/CTASection';
import { Footer } from '../components/Footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main className="flex-grow">
        <HeroSection />
        <FeaturesSection />
        <OnboardingSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
