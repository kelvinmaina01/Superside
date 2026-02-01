import SupersideLogo from "@/components/SupersideLogo";

const AntigravityFooter = () => {
  return (
    <section className="py-8 px-4 overflow-hidden relative border-t border-slate-100 dark:border-slate-800">
      <div className="container mx-auto flex flex-col items-center justify-center gap-4">
        <div className="flex items-center gap-6 opacity-20 hover:opacity-100 transition-opacity duration-700 pointer-events-none group">
          <div className="animate-float">
            <SupersideLogo className="w-16 h-16 md:w-24 md:h-24 grayscale group-hover:grayscale-0 transition-all duration-700" />
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
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0); }
          50% { transform: translateY(-15px) rotate(5deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default AntigravityFooter;
