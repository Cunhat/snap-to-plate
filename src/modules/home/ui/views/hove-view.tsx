import AreYouReadySection from "../sections/are-you-ready-section";
import DescriptionHeroBanner from "../sections/description-hero-banner-section";
import HowItWorksSection from "../sections/how-it-works-section";
import { RecentRecipesSection } from "../sections/recent-recipes-section";

export default function HomeView() {
  return (
    <main className="flex-1">
      <DescriptionHeroBanner />
      <AreYouReadySection />
      <RecentRecipesSection />
      <HowItWorksSection />
    </main>
  );
}
