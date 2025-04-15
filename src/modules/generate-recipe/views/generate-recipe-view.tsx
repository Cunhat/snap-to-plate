import HeroSection from "../sections/hero-sections";
import { RecentGenerationsSection } from "../sections/recent-generations-section";

export default function GenerateRecipeView() {
  return (
    <main className="container flex-1 px-4 py-8 md:py-12">
      <div className="mx-auto max-w-4xl space-y-12">
        <HeroSection />
        <RecentGenerationsSection />
      </div>
    </main>
  );
}
