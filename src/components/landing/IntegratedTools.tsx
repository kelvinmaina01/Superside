// IntegratedTools.tsx

const tools = [
  {
    name: "ChatGPT",
    logo: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
        <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5153-4.9066 6.0462 6.0462 0 0 0-4.7471-3.1243 5.9867 5.9867 0 0 0-7.6923 3.1235 5.9847 5.9847 0 0 0-4.9066.5153 6.0462 6.0462 0 0 0-3.1243 4.7471 5.9867 5.9867 0 0 0 3.1235 7.6923 5.9847 5.9847 0 0 0 .5153 4.9066 6.0462 6.0462 0 0 0 4.7471 3.1243 5.9867 5.9867 0 0 0 7.6923-3.1235 5.9847 5.9847 0 0 0 4.9066-.5153 6.0462 6.0462 0 0 0 3.1243-4.7471 5.9867 5.9867 0 0 0-3.1235-7.6923ZM14.9317 20.3061a4.341 4.341 0 0 1-2.4578.7495 4.4109 4.4109 0 0 1-3.08-1.2514l.1147-.0655 4.5424-2.5833a.296.296 0 0 0 .1473-.2551v-6.42l1.9168 1.1065a.0393.0393 0 0 1 .0196.0344v5.405a4.3541 4.3541 0 0 1-1.203 3.2794ZM4.707 17.5684a4.341 4.341 0 0 1-.7495-2.4578 4.4109 4.4109 0 0 1 1.2514-3.08l-.1147.0655-4.5424 2.5833a.296.296 0 0 0-.1473.2551l-.0011 3.0975.0011.0011a.0393.0393 0 0 0 .0196.0344l4.6811 2.7018.1147-.0655a4.3541 4.3541 0 0 1-.6613-3.1354ZM3.6934 6.8839a4.341 4.341 0 0 1 2.4578-.7495 4.4109 4.4109 0 0 1 3.08 1.2514l-.1147.0655-4.5424 2.5833a.296.296 0 0 0-.1473.2551V3.8703a.0393.0393 0 0 1 .0196-.0344l4.6811-2.7018-.1147.0655a4.3541 4.3541 0 0 1-5.4341 2.6843ZM19.293 6.4316a4.341 4.341 0 0 1 .7495 2.4578 4.4109 4.4109 0 0 1-1.2514 3.08l.1147-.0655 4.5424-2.5833a.296.296 0 0 0 .1473-.2551v-3.0975a.0393.0393 0 0 0-.0196-.0344l-4.6811-2.7018-.1147.0655a4.3541 4.3541 0 0 1 .6613 3.134ZM20.3061 17.1161a4.341 4.341 0 0 1-2.4578.7495 4.4109 4.4109 0 0 1-3.08-1.2514l.1147-.0655 4.5424-2.5833a.296.296 0 0 0 .1473-.2551v6.42a.0393.0393 0 0 1-.0196.0344l-4.6811 2.7018.1147-.0655a4.3541 4.3541 0 0 1 5.4341-2.6843ZM12 8.7188l-1.9168-1.1065a.0393.0393 0 0 1-.0196-.0344v-2.213L12 4.2586l1.9364 1.1061v2.213a.0393.0393 0 0 1-.0196.0344L12 8.7188ZM11.7583 12 8.3562 13.9634a.0393.0393 0 0 1-.0392 0L6.4 12.8569v-3.9268a.0393.0393 0 0 1 .0196-.0344l3.4021-1.9634a.0393.0393 0 0 1 .0392 0L13.2631 8.8957v3.9268a.0393.0393 0 0 1-.0196.0344L11.7583 12Z" />
      </svg>
    )
  },
  {
    name: "Groq",
    logo: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
        <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71L12 2z" />
      </svg>
    )
  },
  {
    name: "DeepSeek",
    logo: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
        <path d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm0 2a8 8 0 100 16 8 8 0 000-16zM11 7h2v2h-2V7zm0 4h2v6h-2v-6z" />
      </svg>
    )
  },
  {
    name: "Gemini",
    logo: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
        <path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8L12 2z" />
      </svg>
    )
  },
  {
    name: "Claude",
    logo: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
        <path d="M12 2L4 21h16L12 2z" />
      </svg>
    )
  },
];

// Triple for very smooth loop with spacing
const allTools = [...tools, ...tools, ...tools];

const IntegratedTools = () => {
  return (
    <section className="py-16 overflow-hidden">
      <div className="container mx-auto px-4 mb-8">
        <p className="text-center text-muted-foreground text-sm uppercase tracking-widest opacity-70">
          Integrated with
        </p>
      </div>

      {/* Restricted width container with space on sides */}
      <div className="max-w-5xl mx-auto px-8 relative">
        <div className="relative group">
          {/* Fading edges */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />

          {/* Marquee track - Slowed down and increased gap */}
          <div className="flex animate-marquee hover:[animation-play-state:paused]">
            {allTools.map((tool, index) => (
              <div
                key={`${tool.name}-${index}`}
                className="flex items-center gap-4 mx-12 flex-shrink-0"
              >
                <div className="w-12 h-12 rounded-xl bg-card border flex items-center justify-center shadow-sm text-primary transition-colors group-hover:bg-accent">
                  {tool.logo}
                </div>
                <span className="text-xl font-semibold text-foreground/80 whitespace-nowrap">
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
