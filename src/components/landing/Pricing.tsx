import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import SupersideLogo from "@/components/SupersideLogo";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const plans = [
  {
    id: "price_free_forever",
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for trying out WebClipInsights",
    features: [
      "5 screenshots per day",
      "🌍 16 language support",
      "Fast mode (Groq)",
      "Basic chat follow-ups",
      "Save highlights",
    ],
    cta: "Get Started Free",
    popular: false,
  },
  {
    id: "price_premium_monthly",
    name: "Premium",
    price: "$15",
    period: "per month",
    description: "For power users who need unlimited access",
    features: [
      "Unlimited screenshots",
      "16 language support",
      "Fast mode (Groq)",
      "Deep thinking mode (DeepSeek)",
      "Priority AI processing",
      "Unlimited chat follow-ups",
      "Full-screen chat mode",
      "Unlimited highlights storage",
      "Priority support",
    ],
    cta: "Upgrade to Premium",
    popular: true,
  },
];

const Pricing = () => {
  const navigate = useNavigate();
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleStripeCheckout = async (planId: string) => {
    setLoadingId(planId);

    // Simulate Stripe Checkout redirect
    console.log(`Redirecting to Stripe for plan: ${planId}`);

    setTimeout(() => {
      setLoadingId(null);
      navigate(`/checkout?plan=${planId}`);
    }, 800);
  };

  return (
    <section id="pricing" className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple Pricing</h2>
          <p className="text-xl text-muted-foreground">Choose the plan that works for you</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative ${plan.popular ? "border-primary shadow-xl scale-105" : "border"
                }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground ml-2">/{plan.period}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">{plan.description}</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className="w-full gap-2"
                  variant={plan.popular ? "default" : "outline"}
                  onClick={() => handleStripeCheckout(plan.id)}
                  disabled={loadingId === plan.id}
                >
                  <SupersideLogo className="w-4 h-4" />
                  {loadingId === plan.id ? "Processing..." : plan.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
