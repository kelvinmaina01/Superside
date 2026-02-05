
import { useState } from "react";
import { User, Settings, Zap, Brain, Sparkles, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

interface ProfilePopoverProps {
    onOpenSettings: () => void;
}

const ProfilePopover = ({ onOpenSettings }: ProfilePopoverProps) => {
    const [selectedMode, setSelectedMode] = useState("fast");

    return (
        <Popover>
            <PopoverTrigger asChild>
                <button className="fixed top-6 right-6 z-50 group outline-none">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm ring-2 ring-background border border-primary/10 transition-all duration-300 group-hover:ring-4 group-hover:ring-primary/20 group-hover:scale-110">
                        JD
                    </div>
                </button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0 mr-6 mb-2" align="end" sideOffset={8}>
                {/* User Info Section */}
                <div className="p-4 flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-lg border-2 border-primary/10 shrink-0">
                        JD
                    </div>
                    <div className="space-y-1 overflow-hidden">
                        <div className="flex items-center gap-2">
                            <h4 className="font-semibold text-sm truncate">kelvin maina</h4>
                            <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-100 text-[10px] h-5 px-1.5 font-medium rounded-md">Individual</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground truncate">kelvin.reallife8@gmail.com</p>
                    </div>
                </div>

                <div className="h-px bg-border/50 mx-4" />

                {/* Credits Section */}
                <div className="p-4 space-y-3">
                    <div className="flex items-center justify-between text-sm">
                        <span className="font-semibold">Credits</span>
                        <span className="text-blue-600 font-bold">466 left ›</span>
                    </div>
                    <Progress value={75} className="h-2 bg-blue-100" />
                    <p className="text-[10px] text-muted-foreground">
                        <span className="inline-block w-2 h-2 rounded-full bg-blue-300 mr-1.5 align-middle"></span>
                        Daily credits reset at midnight UTC
                    </p>
                </div>

                <div className="h-px bg-border/50 mx-4" />

                {/* AI Modes Section */}
                <div className="py-2">
                    <div className="px-4 py-2 flex items-center justify-between hover:bg-muted/50 transition-colors cursor-pointer" onClick={() => setSelectedMode('fast')}>
                        <div className="flex items-center gap-3">
                            <Zap className="w-4 h-4 text-yellow-500" />
                            <span className="text-sm font-medium">Fast</span>
                        </div>
                        <Switch checked={selectedMode === 'fast'} />
                    </div>
                    <div className="px-4 py-2 flex items-center justify-between hover:bg-muted/50 transition-colors cursor-pointer" onClick={() => setSelectedMode('thinking')}>
                        <div className="flex items-center gap-3">
                            <Brain className="w-4 h-4 text-purple-500" />
                            <span className="text-sm font-medium">Thinking</span>
                        </div>
                        <Switch checked={selectedMode === 'thinking'} />
                    </div>
                    <div className="px-4 py-2 flex items-center justify-between hover:bg-muted/50 transition-colors cursor-pointer" onClick={() => setSelectedMode('research')}>
                        <div className="flex items-center gap-3">
                            <Sparkles className="w-4 h-4 text-blue-500" />
                            <span className="text-sm font-medium">Deep Research</span>
                        </div>
                        <Switch checked={selectedMode === 'research'} />
                    </div>
                </div>

                <div className="h-px bg-border/50 mx-4" />

                {/* Account Settings Link */}
                <div className="p-2">
                    <Button
                        variant="ghost"
                        className="w-full justify-start gap-3 h-10 px-4 font-normal text-foreground hover:bg-muted"
                        onClick={onOpenSettings}
                    >
                        <Settings className="w-4 h-4" />
                        Account Settings
                    </Button>
                    <Button
                        variant="ghost"
                        className="w-full justify-start gap-3 h-10 px-4 font-normal text-red-600 hover:text-red-600 hover:bg-red-50"
                    >
                        <LogOut className="w-4 h-4" />
                        Log out
                    </Button>
                </div>

            </PopoverContent>
        </Popover>
    );
};

export default ProfilePopover;
