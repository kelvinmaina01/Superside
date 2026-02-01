import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";

const Privacy = () => {
    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main className="container mx-auto px-4 py-20 max-w-4xl">
                <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
                <div className="prose prose-slate dark:prose-invert max-w-none">
                    <p className="text-lg text-muted-foreground mb-6">
                        Last updated: February 1, 2026
                    </p>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
                        <p>
                            Welcome to Superside ("we," "our," or "us"). We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our Chrome extension and related services.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
                        <p>
                            Superside is designed with a "privacy-first" approach. We minimize data collection to only what is necessary for the extension to function:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong>Screenshots:</strong> When you use the snap tool, the captured image is processed by our AI models to generate summaries. These images are not stored permanently on our servers.</li>
                            <li><strong>Usage Data:</strong> We may collect anonymous telemetry to improve extension performance and user experience.</li>
                            <li><strong>Account Information:</strong> If you upgrade to a premium plan, we collect necessary billing information through our secure payment processors.</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
                        <p>
                            We use the collected information to:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Provide and maintain the AI summarization services.</li>
                            <li>Improve our AI models and extension features.</li>
                            <li>Respond to your support requests and inquiries.</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">4. Data Security</h2>
                        <p>
                            We implement industry-standard security measures to protect your data. All communication between the extension and our servers is encrypted using SSL/TLS.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">5. Third-Party Services</h2>
                        <p>
                            We use trusted third-party AI providers (such as Groq, DeepSeek, and OpenAI) to process content. These providers have their own privacy policies regarding data handling.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">6. Changes to This Policy</h2>
                        <p>
                            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">7. Contact Us</h2>
                        <p>
                            If you have any questions about this Privacy Policy, please contact us at support@superside.ai.
                        </p>
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Privacy;
