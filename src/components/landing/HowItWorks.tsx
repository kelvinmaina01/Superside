import { MousePointer, Camera, Brain, FileText } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: MousePointer,
    title: "Select Area",
    description: "Use the snap tool to select and capture any area of a webpage you want to analyze and summarize.",
  },
  {
    number: "02",
    icon: Camera,
    title: "Capture & Process",
    description: "Our extension takes a smart screenshot and prepares the content for AI analysis.",
  },
  {
    number: "03",
    icon: Brain,
    title: "AI Analysis",
    description: "Advanced AI models analyze the visual and textual content to extract key information.",
  },
  {
    number: "04",
    icon: FileText,
    title: "Get Summary",
    description: "Receive a clear, concise summary with key points, insights, and actionable information.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-xl text-muted-foreground">Simple as Snap, Capture, Learn</p>
          <p className="text-muted-foreground mt-2">
            Get AI-powered insights from any webpage in just 4 simple steps. No complex setup, no learning curve.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-card rounded-2xl p-6 shadow-lg h-full">
                <div className="text-xs font-bold text-primary mb-4">STEP {step.number}</div>
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <step.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-primary/20"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
