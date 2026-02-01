import { Button } from "@/components/ui/button";
import { Star, Users, Shield, Play } from "lucide-react";
import SupersideLogo from "@/components/SupersideLogo";

const CTA = () => {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto text-center max-w-7xl bg-primary text-primary-foreground rounded-3xl p-12 md:p-16 shadow-2xl">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="text-xl opacity-90 mb-8">Join Thousands of Users</p>
        <p className="opacity-80 mb-8">
          Install our Chrome extension and start summarizing web content instantly. Free, secure, and trusted by professionals worldwide.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-8 mb-8">
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5" />
            <span className="font-medium">4.9/5 Rating</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.041-1.61-4.041-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.22 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            <span className="font-medium">2.4k GitHub Stars</span>
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
          <p className="text-sm opacity-90 font-medium">
            Free Plan ($0/forever) • Premium Plan ($15/month)
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
