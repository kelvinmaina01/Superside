import { Card, CardContent } from "@/components/ui/card";
import { Camera, Brain, Globe, Zap, Shield, MessageSquare } from "lucide-react";

const features = [
  {
    icon: Camera,
    badge: "Core Feature",
    title: "Screenshot Snap Tool",
    description: "Use our intuitive snap tool to capture any area of a webpage - perfect for quizzes, articles, and visual content",
  },
  {
    icon: Brain,
    badge: "AI-Powered",
    title: "Quiz & Q&A Detection",
    description: "Automatically identifies quiz questions and Q&A content in screenshots, providing instant accurate answers with detailed explanations",
  },
  {
    icon: Globe,
    badge: "Multilingual AI",
    title: "16 Languages Supported",
    description: "Advanced AI models analyze and summarize content in 16 languages including English, Tamil, Hindi, Malayalam, Telugu, Kannada, Spanish, French, German, Arabic, Chinese, Japanese, and more",
  },
  {
    icon: Zap,
    badge: "Lightning Fast",
    title: "Instant Results",
    description: "Get comprehensive summaries in under 3 seconds, no waiting required",
  },
  {
    icon: Shield,
    badge: "Secure",
    title: "Privacy First",
    description: "All processing happens locally or through secure, encrypted connections",
  },
  {
    icon: MessageSquare,
    badge: "Interactive",
    title: "Chat for More Details",
    description: "Continue the conversation with AI to get deeper insights and clarifications on any topic",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features</h2>
          <p className="text-xl text-muted-foreground">
            Everything You Need To Stay Informed
          </p>
          <p className="text-muted-foreground mt-2">
            Our Chrome extension combines cutting-edge AI with intuitive design to revolutionize how you consume web content.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                  {feature.badge}
                </span>
                <h3 className="text-xl font-semibold mt-3 mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
