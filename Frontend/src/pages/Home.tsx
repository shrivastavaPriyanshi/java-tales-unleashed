import { Header } from "@/components/Layout/Header";
import { HeroSection } from "@/components/Home/HeroSection";
import { FeaturesSection } from "@/components/Home/FeaturesSection";

const Home = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
      </main>
    </div>
  );
};

export default Home;