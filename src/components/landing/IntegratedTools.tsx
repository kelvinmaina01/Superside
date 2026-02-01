// IntegratedTools.tsx

const tools = [
  { name: "ChatGPT", logo: "https://logo.clearbit.com/openai.com" },
  { name: "Groq", logo: "https://logo.clearbit.com/groq.com" },
  { name: "DeepSeek", logo: "https://logo.clearbit.com/deepseek.com" },
  { name: "Gemini", logo: "https://logo.clearbit.com/google.com" },
  { name: "Claude", logo: "https://logo.clearbit.com/anthropic.com" },
];

// Duplicate for seamless loop
const allTools = [...tools, ...tools, ...tools];

const IntegratedTools = () => {
  return (
    <section className="py-16 overflow-hidden bg-muted/30">
      <div className="container mx-auto px-4 mb-10">
        <p className="text-center text-muted-foreground text-sm uppercase tracking-widest">
          Integrated with
        </p>
      </div>

      {/* Marquee container */}
      <div className="relative">
        {/* Gradient masks for smooth fade */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-muted/30 to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-muted/30 to-transparent z-10" />

        {/* Marquee track */}
        <div className="flex animate-marquee">
          {allTools.map((tool, index) => (
            <div
              key={`${tool.name}-${index}`}
              className="flex items-center gap-2 mx-6 flex-shrink-0"
            >
              <div className="w-10 h-10 rounded-lg bg-background border flex items-center justify-center p-2 overflow-hidden shadow-sm">
                <img
                  src={tool.logo}
                  alt={tool.name}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://www.dummyimage.com/40x40/f1f5f9/64748b?text=" + tool.name[0];
                  }}
                />
              </div>
              <span className="text-lg font-medium text-muted-foreground whitespace-nowrap">
                {tool.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IntegratedTools;
