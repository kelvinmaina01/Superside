import { Button } from "@/components/ui/button";
import { Star, Users, Shield, Play } from "lucide-react";
import SupersideLogo from "@/components/SupersideLogo";

const CTA = () => {
  return (
    <section className="py-20 px-4 bg-primary text-primary-foreground">
      <div className="container mx-auto text-center max-w-3xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="text-xl opacity-90 mb-8">Join Thousands of Users</p>
        <p className="opacity-80 mb-8">
          Install our Chrome extension and start summarizing web content instantly. Free, secure, and trusted by professionals worldwide.
        </p>

        <div className="flex items-center justify-center gap-8 mb-8">
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5" />
            <span className="font-medium">4.9/5 Rating</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            <span className="font-medium">10,000+ Users</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            <span className="font-medium">Privacy Certified</span>
          </div>
        </div>

        <div className="bg-background/10 rounded-2xl p-8 backdrop-blur">
          <h3 className="text-xl font-semibold mb-6">Install the Extension</h3>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            <Button size="lg" variant="secondary" className="gap-2 px-8">
              <SupersideLogo className="w-5 h-5" />
              Add to Chrome
            </Button>
            <Button size="lg" variant="outline" className="gap-2 px-8 bg-transparent border-primary-foreground/30 hover:bg-primary-foreground/10">
              <Play className="w-5 h-5" />
              Watch Demo
            </Button>
          </div>
          <p className="text-sm opacity-80">
            Compatible with Chrome 88+ • Free Forever • No Account Required
          </p>

          <div className="grid md:grid-cols-3 gap-6 mt-8 text-left">
            <div className="flex gap-3">
              <span className="w-8 h-8 rounded-full bg-background/20 flex items-center justify-center flex-shrink-0">1</span>
              <div>
                <h4 className="font-medium">Click "Add to Chrome"</h4>
                <p className="text-sm opacity-80">You'll be redirected to the Chrome Web Store</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="w-8 h-8 rounded-full bg-background/20 flex items-center justify-center flex-shrink-0">2</span>
              <div>
                <h4 className="font-medium">Install Extension</h4>
                <p className="text-sm opacity-80">Click "Add to Chrome" and confirm installation</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="w-8 h-8 rounded-full bg-background/20 flex items-center justify-center flex-shrink-0">3</span>
              <div>
                <h4 className="font-medium">Start Summarizing</h4>
                <p className="text-sm opacity-80">Select any content on any webpage and get AI summaries</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
