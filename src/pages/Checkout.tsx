import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Shield, CreditCard, Lock } from "lucide-react";
import SupersideLogo from "@/components/SupersideLogo";

const Checkout = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const planId = searchParams.get("plan") || "premium";

    const planDetails = {
        free: { name: "Free Plan", price: "$0.00" },
        premium: { name: "Premium Plan", price: "$15.00" },
    };

    const currentPlan = planId.includes("free") ? planDetails.free : planDetails.premium;

    const handlePayment = () => {
        // Simulate successful payment
        alert("Payment successful! Redirecting to dashboard...");
        navigate("/dashboard");
    };

    return (
        <div className="min-h-screen bg-[#F6F9FC] dark:bg-slate-950 flex flex-col md:flex-row">
            {/* Left Side: Summary */}
            <div className="flex-1 p-8 md:p-24 flex flex-col justify-center">
                <button
                    onClick={() => navigate("/")}
                    className="flex items-center gap-2 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors mb-12"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Website
                </button>

                <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white">
                        <SupersideLogo className="w-6 h-6" />
                    </div>
                    <span className="text-xl font-bold tracking-tight">Superside</span>
                </div>

                <div className="space-y-6">
                    <div>
                        <p className="text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider text-sm mb-2">Subscribe to</p>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white">
                            {currentPlan.name}
                        </h1>
                    </div>

                    <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-bold">{currentPlan.price}</span>
                        <span className="text-slate-500 text-lg">/month</span>
                    </div>

                    <div className="pt-8 border-t border-slate-200 dark:border-slate-800">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-slate-600 dark:text-slate-300">{currentPlan.name}</span>
                            <span className="font-semibold">{currentPlan.price}</span>
                        </div>
                        <div className="flex justify-between items-center text-xl font-bold pt-4 border-t border-slate-200 dark:border-slate-800">
                            <span>Total due today</span>
                            <span>{currentPlan.price}</span>
                        </div>
                    </div>
                </div>

                <div className="mt-auto pt-12 flex items-center gap-4 text-slate-400 text-sm">
                    <div className="flex items-center gap-1">
                        <Shield className="w-4 h-4" />
                        Guaranteed safe checkout
                    </div>
                </div>
            </div>

            {/* Right Side: Payment Form */}
            <div className="flex-1 bg-white dark:bg-slate-900 shadow-2xl p-8 md:p-24 flex flex-col justify-center border-l dark:border-slate-800">
                <div className="max-w-md w-full mx-auto space-y-8">
                    <div>
                        <h2 className="text-2xl font-bold mb-6">Payment method</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <button className="flex items-center justify-center gap-2 p-4 border-2 border-primary rounded-xl bg-primary/5 text-primary font-medium">
                                <CreditCard className="w-5 h-5" />
                                Card
                            </button>
                            <button className="flex items-center justify-center gap-2 p-4 border-2 border-transparent hover:border-slate-200 dark:hover:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 transition-colors">
                                <span className="text-lg font-bold"> Pay</span>
                            </button>
                        </div>
                    </div>

                    <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handlePayment(); }}>
                        <div className="space-y-1">
                            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Email</label>
                            <input
                                type="email"
                                defaultValue="customer@example.com"
                                className="w-full p-3 rounded-lg border dark:bg-slate-800 dark:border-slate-700 focus:ring-2 focus:ring-primary focus:outline-none transition-all"
                                required
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Card information</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="1234 5678 1234 5678"
                                    className="w-full p-3 rounded-lg border dark:bg-slate-800 dark:border-slate-700 focus:ring-2 focus:ring-primary focus:outline-none transition-all"
                                    required
                                />
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-2">
                                    <CreditCard className="w-5 h-5 text-slate-400" />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 pt-2">
                                <input
                                    type="text"
                                    placeholder="MM / YY"
                                    className="p-3 rounded-lg border dark:bg-slate-800 dark:border-slate-700 focus:ring-2 focus:ring-primary focus:outline-none transition-all"
                                    required
                                />
                                <input
                                    type="text"
                                    placeholder="CVC"
                                    className="p-3 rounded-lg border dark:bg-slate-800 dark:border-slate-700 focus:ring-2 focus:ring-primary focus:outline-none transition-all"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-1 pt-4">
                            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Name on card</label>
                            <input
                                type="text"
                                placeholder="John Doe"
                                className="w-full p-3 rounded-lg border dark:bg-slate-800 dark:border-slate-700 focus:ring-2 focus:ring-primary focus:outline-none transition-all"
                                required
                            />
                        </div>

                        <Button className="w-full h-12 text-lg font-bold mt-8 shadow-lg shadow-primary/20" type="submit">
                            Pay {currentPlan.price}
                        </Button>
                    </form>

                    <p className="text-center text-slate-400 text-xs px-8">
                        By confirming your subscription, you allow Superside to charge your card for this and future payments in accordance with their terms.
                    </p>

                    <div className="flex items-center justify-center gap-2 text-slate-400 text-sm">
                        <Lock className="w-3 h-3" />
                        <span>Securely processed by Stripe</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
