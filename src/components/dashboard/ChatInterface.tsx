import { ScrollArea } from "@/components/ui/scroll-area";
import ChatInput from "./ChatInput";
import SupersideLogo from "@/components/SupersideLogo";
import ProfilePopover from "./ProfilePopover";

const ChatInterface = ({ onOpenSettings }: { onOpenSettings?: () => void }) => {
    const userEmail = "kelvin.reallife8@gmail.com";
    const userName = userEmail.split('.')[0].charAt(0).toUpperCase() + userEmail.split('.')[0].slice(1); // Extracts "Kelvin"

    return (
        <div className="flex-1 flex flex-col items-center relative overflow-hidden bg-background">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-dots pointer-events-none" />

            {/* Floating Profile Popover */}
            <ProfilePopover onOpenSettings={onOpenSettings || (() => { })} />

            <ScrollArea className="flex-1 w-full z-10">
                <div className="max-w-4xl mx-auto px-4 py-20 flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
                    {/* Logo and Greeting */}
                    <div className="text-center space-y-8 mb-12">
                        {/* Bluish Orb Logo */}
                        <div className="w-24 h-24 mx-auto animate-breathe rounded-full bg-gradient-to-br from-blue-300 via-blue-500 to-purple-600 shadow-[0_0_40px_rgba(59,130,246,0.5)] bg-opacity-80 backdrop-blur-3xl relative">
                            <div className="absolute inset-0 rounded-full bg-white/20 blur-sm"></div>
                            <div className="absolute top-2 left-4 w-8 h-8 rounded-full bg-white/40 blur-md"></div>
                        </div>

                        <div className="space-y-4">
                            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground/90">
                                Good Morning, <span className="text-foreground">{userName}</span>
                            </h1>
                            <p className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 pb-2">
                                How Can I Assist You Today?
                            </p>
                        </div>
                    </div>
                </div>
            </ScrollArea>

            {/* Input Area */}
            <div className="w-full max-w-4xl px-4 pb-8 pt-4 z-20">
                <ChatInput />
                <p className="text-[10px] text-center text-muted-foreground mt-4">
                    Superside may display inaccurate info, so please double check the response. <span className="underline cursor-pointer">Your Privacy & Superside AI</span>
                </p>
            </div>
        </div>
    );
};

export default ChatInterface;
