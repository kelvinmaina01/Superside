import { Button } from "@/components/ui/button";
import { Chrome, Globe, Shield } from "lucide-react";

const Hero = () => {
  return (
    <section className="pt-32 pb-20 px-4">
      <div className="container mx-auto text-center max-w-4xl">
        <div className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-4 py-2 rounded-full text-sm mb-6">
          <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
          AI-Powered Chrome Extension
        </div>
        
        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
          Smart Summaries{" "}
          <span className="text-primary">In Seconds</span>
        </h1>
        
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Take a screenshot of any webpage area and get instant AI-powered summaries in 16 languages. 
          Break language barriers, save time, and never miss important information again.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Button size="lg" className="gap-2 px-8">
            <Chrome className="w-5 h-5" />
            Add to Chrome
          </Button>
        </div>

        <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-primary" />
            <span>16 Languages</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-primary" />
            <span>Privacy focused</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
