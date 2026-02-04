import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Camera, Zap, Brain, User, LogOut, CreditCard } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import SupersideLogo from "@/components/SupersideLogo";

interface UserProfile {
    user: {
        username: string;
        email: string;
    };
    screenshots_today: number;
    tier: string;
}

const Popup = () => {
    const [language, setLanguage] = useState("English");
    const [mode, setMode] = useState("fast");
    const [user, setUser] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Load saved settings and auth token
        chrome.storage?.sync.get(['language', 'mode', 'access_token'], async (result: { language?: string; mode?: string; access_token?: string }) => {
            if (result.language) setLanguage(result.language);
            if (result.mode) setMode(result.mode);

            if (result.access_token) {
                try {
                    const response = await fetch('http://127.0.0.1:8000/api/v1/profile/', {
                        headers: {
                            'Authorization': `Bearer ${result.access_token}`
                        }
                    });
                    if (response.ok) {
                        const data = await response.json();
                        setUser(data);
                    } else {
                        // Token might be invalid
                        chrome.storage.sync.remove('access_token');
                    }
                } catch (error) {
                    console.error("Failed to fetch profile", error);
                }
            }
            setLoading(false);
        });
    }, []);

    const handleCapture = async () => {
        chrome.storage?.sync.set({ language, mode });

        try {
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

            if (!tab?.id) {
                alert("No active tab found. Please try again.");
                return;
            }

            // Check for restricted pages
            const restrictedPatterns = [
                'chrome://', 'edge://', 'about:', 'chrome-extension://',
                'accounts.google.com', 'login.microsoftonline.com'
            ];

            const isRestricted = restrictedPatterns.some(pattern =>
                tab.url?.includes(pattern)
            );

            if (isRestricted) {
                alert("This page blocks extensions for security reasons. Please try on a different website.");
                return;
            }

            // First, ensure the content script is loaded
            try {
                // Try to send message first
                await chrome.tabs.sendMessage(tab.id, { type: 'SHOW_OVERLAY' });
                window.close();
            } catch (messageError) {
                // If message fails, inject the script
                console.log("Content script not found, injecting...");
                await chrome.scripting.executeScript({
                    target: { tabId: tab.id },
                    files: ['content.js']
                });

                // Wait a bit for script to initialize
                await new Promise(resolve => setTimeout(resolve, 100));

                // Retry message
                await chrome.tabs.sendMessage(tab.id, { type: 'SHOW_OVERLAY' });
                window.close();
            }
        } catch (error: any) {
            console.error("Capture Error:", error);
            const errorMessage = error?.message || String(error);

            if (errorMessage.includes('cannot be scripted')) {
                alert("This page cannot be captured due to browser security restrictions. Please try a regular website.");
            } else {
                alert(`Failed to start capture: ${errorMessage}\n\nTry refreshing this page or navigating to a different website.`);
            }
        }
    };

    const handleLogin = () => {
        chrome.tabs.create({ url: 'http://localhost:8080/login' });
    };

    const handleLogout = () => {
        chrome.storage?.sync.remove('access_token');
        setUser(null);
    };

    return (
        <div className="w-[350px] p-4 bg-background">
            <Card className="border-0 shadow-none relative">
                {/* User Profile Dropdown */}
                <div className="absolute top-0 right-0">
                    {loading ? (
                        <div className="w-8 h-8 rounded-full bg-muted animate-pulse" />
                    ) : user ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.user.username}`} alt={user.user.username} />
                                        <AvatarFallback>{user.user.username.charAt(0).toUpperCase()}</AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56" align="end" forceMount>
                                <DropdownMenuLabel className="font-normal">
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-sm font-medium leading-none">{user.user.username}</p>
                                        <p className="text-xs leading-none text-muted-foreground">
                                            {user.user.email}
                                        </p>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => chrome.tabs.create({ url: 'http://localhost:8080/dashboard' })}>
                                    <CreditCard className="mr-2 h-4 w-4" />
                                    <span>Manage Credits</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={handleLogout} className="text-red-600 focus:text-red-600">
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span>Sign out</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <Button variant="ghost" size="sm" onClick={handleLogin}>
                            Sign In
                        </Button>
                    )}
                </div>

                <CardHeader className="text-center pb-2 pt-8">
                    <div className="mx-auto mb-2">
                        <SupersideLogo className="w-10 h-10" />
                    </div>
                    <CardTitle className="text-xl">Superside</CardTitle>
                    <CardDescription>Capture & Analyze</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">

                    <div className="space-y-2">
                        <Label>Analysis Mode</Label>
                        <RadioGroup defaultValue={mode} onValueChange={setMode} className="grid grid-cols-2 gap-2">
                            <div>
                                <RadioGroupItem value="fast" id="fast" className="peer sr-only" />
                                <Label
                                    htmlFor="fast"
                                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                                >
                                    <Zap className="mb-2 h-4 w-4" />
                                    <div className="text-xs font-semibold">Fast</div>
                                </Label>
                            </div>
                            <div>
                                <RadioGroupItem value="thinking" id="thinking" className="peer sr-only" />
                                <Label
                                    htmlFor="thinking"
                                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                                >
                                    <Brain className="mb-2 h-4 w-4" />
                                    <div className="text-xs font-semibold">Thinking</div>
                                </Label>
                            </div>
                        </RadioGroup>
                    </div>

                    <div className="space-y-2">
                        <Label>Output Language</Label>
                        <Select value={language} onValueChange={setLanguage}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select Language" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="English">English</SelectItem>
                                <SelectItem value="Spanish">Spanish</SelectItem>
                                <SelectItem value="French">French</SelectItem>
                                <SelectItem value="German">German</SelectItem>
                                <SelectItem value="Chinese">Chinese</SelectItem>
                                <SelectItem value="Japanese">Japanese</SelectItem>
                                <SelectItem value="Korean">Korean</SelectItem>
                                <SelectItem value="Russian">Russian</SelectItem>
                                <SelectItem value="Portuguese">Portuguese</SelectItem>
                                <SelectItem value="Italian">Italian</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <Button className="w-full gap-2 mt-4" size="lg" onClick={handleCapture}>
                        <Camera className="w-4 h-4" />
                        Capture Screenshot
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
};

export default Popup;
