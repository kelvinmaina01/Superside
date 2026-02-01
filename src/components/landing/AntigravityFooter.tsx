import SupersideLogo from "@/components/SupersideLogo";

const AntigravityFooter = () => {
  return (
    <section className="py-8 px-4 overflow-hidden relative border-t border-slate-100 dark:border-slate-800">
      <div className="container mx-auto flex flex-col items-center justify-center gap-4">
        <div className="flex items-center gap-6 opacity-40 hover:opacity-100 transition-opacity duration-700 pointer-events-none group">
          <div className="animate-circulate">
            <SupersideLogo className="w-16 h-16 md:w-24 md:h-24 transition-all duration-700" />
          </div>
          <h2
            className="text-[10vw] md:text-[8vw] font-bold leading-none tracking-tighter select-none whitespace-nowrap"
            style={{
              fontFamily: 'system-ui, -apple-system, sans-serif',
              letterSpacing: '-0.05em'
            }}
          >
            superside extension
          </h2>
        </div>
      </div>

      <style>{`
        @keyframes circulate {
          0% { transform: rotate(0deg) translate(8px) rotate(0deg); }
          100% { transform: rotate(360deg) translate(8px) rotate(-360deg); }
        }
        .animate-circulate {
          animation: circulate 4s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default AntigravityFooter;
