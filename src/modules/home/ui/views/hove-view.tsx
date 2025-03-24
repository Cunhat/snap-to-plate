import DescriptionHeroBanner from "../sections/description-hero-banner-section";
import HowItWorksSection from "../sections/how-it-works-section";
import RecentRecipesSection from "../sections/recent-recipes-section";
import UrlInput from "../sections/url-input-section";

export default function HomeView() {
  return (
    <main className="flex-1">
      <DescriptionHeroBanner />
      <UrlInput />
      <RecentRecipesSection />
      <HowItWorksSection />
    </main>
  );
}
