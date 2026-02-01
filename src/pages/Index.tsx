import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import Languages from "@/components/landing/Languages";
import HowItWorks from "@/components/landing/HowItWorks";
import Pricing from "@/components/landing/Pricing";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";
import AntigravityFooter from "@/components/landing/AntigravityFooter";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Features />
      <Languages />
      <HowItWorks />
      <Pricing />
      <CTA />
      <Footer />
      <AntigravityFooter />
    </div>
  );
};

export default Index;
