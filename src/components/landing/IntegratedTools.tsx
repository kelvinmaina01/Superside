import { Bot, Sparkles, Brain, MessageSquare, Zap } from "lucide-react";

const tools = [
  { name: "ChatGPT", icon: MessageSquare },
  { name: "Groq", icon: Zap },
  { name: "DeepSeek", icon: Brain },
  { name: "Gemini", icon: Sparkles },
  { name: "Claude", icon: Bot },
];

// Duplicate for seamless loop
const allTools = [...tools, ...tools];

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
              className="flex items-center gap-3 mx-12 flex-shrink-0"
            >
              <div className="w-10 h-10 rounded-lg bg-background border flex items-center justify-center text-muted-foreground">
                <tool.icon className="w-5 h-5" />
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
