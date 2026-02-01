import { useState, useEffect } from "react";

const tools = [
  { name: "ChatGPT", logo: "/logos/chatgpt.png" },
  { name: "Groq", logo: "/logos/groq.png" },
  { name: "DeepSeek", logo: "/logos/deepseek.png" },
  { name: "Gemini", logo: "/logos/gemini.png" },
  { name: "Claude", logo: "/logos/claude.png" },
];

const IntegratedTools = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % tools.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 overflow-hidden bg-accent/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-muted-foreground text-sm uppercase tracking-[0.2em] font-medium opacity-80">
            Powering your insights with
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative px-12">
          {/* Decorative backgrounds */}
          <div className="absolute top-1/2 left-0 -translate-y-1/2 w-32 h-32 bg-primary/10 rounded-full blur-3xl -z-10" />
          <div className="absolute top-1/2 right-0 -translate-y-1/2 w-32 h-32 bg-primary/10 rounded-full blur-3xl -z-10" />

          {/* New Grid Animation: Better than marquee */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center justify-items-center">
            {tools.map((tool, index) => (
              <div
                key={tool.name}
                className={`flex flex-col items-center gap-4 transition-all duration-700 ${index === activeIndex
                  ? "scale-110 opacity-100"
                  : "scale-90 opacity-60 hover:opacity-100"
                  }`}
              >
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white dark:bg-card border-2 border-primary/10 flex items-center justify-center shadow-xl p-4 overflow-hidden group">
                  <img
                    src={tool.logo}
                    alt={tool.name}
                    className="w-full h-full object-contain transform transition-transform group-hover:scale-110"
                  />
                </div>
                <span className={`text-sm font-bold tracking-wide transition-colors ${index === activeIndex ? "text-primary" : "text-muted-foreground"
                  }`}>
                  {tool.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntegratedTools;
