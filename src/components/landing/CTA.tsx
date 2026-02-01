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

        <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-2xl border border-slate-100 text-slate-900 group overflow-hidden relative">
          <h3 className="text-2xl font-bold mb-8 tracking-tight text-slate-900">Install the Extension</h3>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <Button size="lg" className="gap-2 px-10 h-14 text-lg font-bold shadow-lg hover:scale-105 transition-transform bg-primary text-primary-foreground">
              <SupersideLogo className="w-6 h-6" />
              Add to Chrome
            </Button>
            <Button size="lg" variant="outline" className="gap-2 px-10 h-14 text-lg font-bold border-slate-200 hover:bg-slate-50 transition-all text-slate-700">
              <Play className="w-5 h-5 fill-current" />
              Watch Demo
            </Button>
          </div>

          <div className="inline-block px-4 py-1.5 rounded-full bg-slate-50 text-slate-500 text-sm font-semibold mb-12 border border-slate-100">
            Free Plan ($0/forever) • Premium Plan ($15/month)
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-left">
            {[
              { step: "1", title: "Add to Chrome", desc: "Redirect to the official Chrome Web Store" },
              { step: "2", title: "Install Now", desc: "Confirm the installation in your browser" },
              { step: "3", title: "Summarize", desc: "Select any text or area to get instant AI summaries" },
            ].map((item, i) => (
              <div key={i} className="relative p-6 rounded-2xl bg-slate-50/50 border border-slate-100 hover:border-primary/20 transition-all shadow-sm hover:shadow-md group/step">
                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-black mb-4 shadow-lg shadow-primary/20 group-hover/step:scale-110 transition-transform">
                  {item.step}
                </div>
                <h4 className="font-bold text-lg mb-2 text-slate-900">{item.title}</h4>
                <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
