import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Shield, CreditCard, Lock, CheckCircle2 } from "lucide-react";
import SupersideLogo from "@/components/SupersideLogo";

const Checkout = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const planId = searchParams.get("plan") || "premium";

    const planDetails = {
        free: {
            name: "Free Plan",
            price: "$0.00",
            features: ["5 screenshots/day", "16 languages", "Fast mode (Groq)"]
        },
        premium: {
            name: "Premium Plan",
            price: "$15.00",
            features: ["Unlimited screenshots", "Priority processing", "DeepSeek Thinking", "24/7 Support"]
        },
    };

    const currentPlan = planId.includes("free") ? planDetails.free : planDetails.premium;

    const handlePayment = () => {
        alert("Payment successful! Redirecting to dashboard...");
        navigate("/dashboard");
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col lg:flex-row font-sans text-slate-900 dark:text-slate-100 selection:bg-primary/20">
            {/* Left Column: Plan Summary + Brand */}
            <div className="lg:w-[45%] p-8 lg:p-20 relative overflow-hidden flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-slate-800">
                {/* Background Decorative Element */}
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -z-10" />
                <div className="absolute top-[40%] -right-24 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -z-10" />

                <div className="space-y-12">
                    <button
                        onClick={() => navigate("/")}
                        className="group flex items-center gap-2 text-slate-500 hover:text-primary transition-all font-medium text-sm"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Back to Home
                    </button>

                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-primary rounded-2xl shadow-lg shadow-primary/20">
                            <SupersideLogo className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-2xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400">
                            Superside
                        </span>
                    </div>

                    <div className="space-y-6 animate-in fade-in slide-in-from-left duration-700">
                        <div>
                            <p className="text-primary font-bold uppercase tracking-widest text-[10px] sm:text-xs mb-3 flex items-center gap-2">
                                <span className="w-8 h-[1px] bg-primary/30"></span>
                                Now Subscribing to
                            </p>
                            <h1 className="text-4xl md:text-6xl font-black leading-none mb-4">
                                {currentPlan.name}
                            </h1>
                            <div className="flex items-baseline gap-2">
                                <span className="text-4xl font-bold">{currentPlan.price}</span>
                                <span className="text-slate-500 font-medium">/ month</span>
                            </div>
                        </div>

                        <div className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/60 dark:border-slate-800/60 space-y-4">
                            <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Plan Highlights</p>
                            <ul className="grid sm:grid-cols-2 lg:grid-cols-1 gap-3">
                                {currentPlan.features.map((feature, i) => (
                                    <li key={i} className="flex items-center gap-3 text-sm font-medium">
                                        <CheckCircle2 className="w-5 h-5 text-primary" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="mt-12 lg:mt-0 space-y-4">
                    <div className="flex justify-between items-center text-sm font-medium pt-6 border-t border-slate-200 dark:border-slate-800">
                        <span className="text-slate-500">Subtotal</span>
                        <span>{currentPlan.price}</span>
                    </div>
                    <div className="flex justify-between items-center text-xl font-black">
                        <span>Total amount due</span>
                        <span className="text-primary">{currentPlan.price}</span>
                    </div>
                    <p className="text-[10px] text-slate-400 uppercase tracking-tight text-center lg:text-left">
                        Your payment info is encrypted and never stored on our servers.
                    </p>
                </div>
            </div>

            {/* Right Column: Checkout Form */}
            <div className="flex-1 bg-white dark:bg-[#020617] p-8 lg:p-20 flex flex-col justify-center overflow-y-auto">
                <div className="max-w-md w-full mx-auto space-y-10 animate-in fade-in slide-in-from-bottom duration-700">
                    <div>
                        <h2 className="text-2xl font-bold mb-1 tracking-tight">Checkout</h2>
                        <p className="text-slate-500 text-sm">Select payment method and fill details</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <button className="flex flex-col items-center justify-center gap-2 p-4 border-2 border-primary rounded-2xl bg-primary/[0.03] shadow-inner-sm transition-all scale-100 active:scale-95 group">
                            <CreditCard className="w-6 h-6 text-primary" />
                            <span className="text-xs font-bold text-primary uppercase">Credit Card</span>
                        </button>
                        <button className="flex flex-col items-center justify-center gap-2 p-4 border-2 border-transparent hover:border-slate-200 dark:hover:border-slate-800 rounded-2xl bg-slate-50 dark:bg-slate-900 transition-all opacity-70 grayscale hover:grayscale-0 hover:opacity-100">
                            <span className="text-xl font-bold tracking-tighter"> Pay</span>
                            <span className="text-[10px] font-bold text-slate-400 uppercase">Apple Pay</span>
                        </button>
                    </div>

                    <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); handlePayment(); }}>
                        <div className="space-y-2 group">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest px-1">Email Address</label>
                            <input
                                type="email"
                                defaultValue="customer@example.com"
                                className="w-full p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 focus:bg-white dark:focus:bg-slate-950 focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all font-medium"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest px-1">Card Information</label>
                            <div className="relative group">
                                <input
                                    type="text"
                                    placeholder="0000 0000 0000 0000"
                                    className="w-full p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 focus:bg-white dark:focus:bg-slate-950 focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all font-mono"
                                    required
                                />
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-2">
                                    <div className="w-8 h-5 bg-slate-200 dark:bg-slate-800 rounded-sm"></div>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    placeholder="MM / YY"
                                    className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 focus:bg-white dark:focus:bg-slate-950 focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all font-mono"
                                    required
                                />
                                <input
                                    type="text"
                                    placeholder="CVC"
                                    className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 focus:bg-white dark:focus:bg-slate-950 focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all font-mono"
                                    required
                                />
                            </div>
                        </div>

                        <Button className="w-full h-14 text-lg font-black mt-4 shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40 active:scale-[0.98] transition-all rounded-xl" type="submit">
                            Pay {currentPlan.price}
                        </Button>
                    </form>

                    <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                        <div className="flex items-center gap-1.5">
                            <Shield className="w-3.5 h-3.5" />
                            <span>PCI Compliant</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Lock className="w-3.5 h-3.5" />
                            <span>Secure Session</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                            <span>Encrypted</span>
                        </div>
                    </div>

                    <div className="pt-6 text-center border-t border-slate-100 dark:border-slate-800">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Powered by</span>
                        <div className="flex items-center justify-center gap-2 mt-2 grayscale hover:grayscale-0 transition-all opacity-40 hover:opacity-100 font-black italic text-xl">
                            stripe
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
