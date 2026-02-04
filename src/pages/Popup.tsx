import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Camera, Zap, Brain, Aperture } from "lucide-react";

const Popup = () => {
    const [language, setLanguage] = useState("English");
    const [mode, setMode] = useState("fast");

    useEffect(() => {
        // Load saved settings if any
        chrome.storage?.sync.get(['language', 'mode'], (result) => {
            if (result.language) setLanguage(result.language);
            if (result.mode) setMode(result.mode);
        });
    }, []);

    const handleCapture = async () => {
        // Save settings before capture
        chrome.storage?.sync.set({ language, mode });

        try {
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

            if (tab?.id) {
                // Check if we can inject scripting (simplified check by just trying)
                if (tab.url?.startsWith("chrome://") || tab.url?.startsWith("edge://") || tab.url?.startsWith("about:")) {
                    alert("Cannot capture functionality on this special page. Please try a normal website.");
                    return;
                }

                await chrome.tabs.sendMessage(tab.id, { type: 'SHOW_OVERLAY' });
                window.close();
            }
        } catch (error) {
            console.error("Capture Error:", error);
            // Fallback: Try injecting script if message failed (meaning it might not be there)
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
            if (tab?.id) {
                try {
                    await chrome.scripting.executeScript({
                        target: { tabId: tab.id },
                        files: ['content.js']
                    });
                    // Retry message
                    await chrome.tabs.sendMessage(tab.id, { type: 'SHOW_OVERLAY' });
                    window.close();
                } catch (injectionError) {
                    alert("Failed to start capture. Please refresh the page and try again.");
                }
            }
        }
    };

    return (
        <div className="w-[350px] p-4 bg-background">
            <Card className="border-0 shadow-none">
                <CardHeader className="text-center pb-2">
                    <div className="mx-auto mb-2 text-primary">
                        <Aperture className="w-10 h-10 mx-auto" />
                    </div>
                    <CardTitle className="text-xl">SnapLearn AI</CardTitle>
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
