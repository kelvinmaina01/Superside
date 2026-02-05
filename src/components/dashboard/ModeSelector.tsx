
import { useState } from "react";
import { Zap, Brain, Sparkles, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

interface ModeOption {
    id: string;
    label: string;
    description: string;
    icon: any;
    color: string;
}

const modes: ModeOption[] = [
    {
        id: "fast",
        label: "Fast",
        description: "Quick responses for everyday tasks",
        icon: Zap,
        color: "text-amber-500",
    },
    {
        id: "thinking",
        label: "Thinking",
        description: "Deep reasoning for complex problems",
        icon: Brain,
        color: "text-purple-500",
    },
    {
        id: "research",
        label: "Deep Research",
        description: "Comprehensive web search & analysis",
        icon: Sparkles,
        color: "text-blue-500",
    },
];

interface ModeSelectorProps {
    selectedMode?: string;
    onModeChange?: (mode: string) => void;
}

export const ModeSelector = ({ selectedMode = "fast", onModeChange }: ModeSelectorProps) => {
    const [open, setOpen] = useState(false);
    const activeMode = modes.find((m) => m.id === selectedMode) || modes[0];

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="ghost"
                    size="sm"
                    className="h-9 px-3 gap-2 rounded-full border border-transparent hover:border-border hover:bg-muted/50 transition-all font-medium text-muted-foreground hover:text-foreground"
                >
                    <activeMode.icon className={cn("w-4 h-4", activeMode.color)} />
                    {activeMode.label}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-2" align="start" side="top">
                <div className="space-y-1">
                    <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Select Mode
                    </div>
                    {modes.map((mode) => (
                        <button
                            key={mode.id}
                            onClick={() => {
                                onModeChange?.(mode.id);
                                setOpen(false);
                            }}
                            className={cn(
                                "w-full flex items-start gap-3 p-3 rounded-lg text-left transition-colors hover:bg-muted/50",
                                selectedMode === mode.id && "bg-muted"
                            )}
                        >
                            <div className={cn("mt-0.5 p-1.5 rounded-md bg-background shadow-sm ring-1 ring-border/50", mode.color.replace('text-', 'bg-').replace('500', '100'))}>
                                <mode.icon className={cn("w-4 h-4", mode.color)} />
                            </div>
                            <div className="flex-1 space-y-0.5">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-foreground">
                                        {mode.label}
                                    </span>
                                    {selectedMode === mode.id && (
                                        <Check className="w-4 h-4 text-primary" />
                                    )}
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    {mode.description}
                                </p>
                            </div>
                        </button>
                    ))}
                </div>
            </PopoverContent>
        </Popover>
    );
};
