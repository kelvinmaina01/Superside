
import { useState } from "react";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

const models = [
    { id: "claude-3-5-sonnet", label: "Claude 3.5 Sonnet", provider: "Anthropic", logo: "/logos/claude.png" },
    { id: "gpt-4o", label: "GPT-4o", provider: "OpenAI", logo: "/logos/chatgpt.png" },
    { id: "deepseek-r1", label: "DeepSeek R1", provider: "DeepSeek", logo: "/logos/deepseek.png" },
    { id: "gemini-1-5-pro", label: "Gemini 1.5 Pro", provider: "Google", logo: "/logos/gemini.png" },
    { id: "mixtral-8x7b", label: "Mixtral 8x7B", provider: "Groq", logo: "/logos/groq.png" },
];

export const ModelSelector = () => {
    const [open, setOpen] = useState(false);
    const [selectedModel, setSelectedModel] = useState(models[0]);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="ghost"
                    size="sm"
                    className="h-9 px-3 gap-2 rounded-full border border-transparent hover:border-border hover:bg-muted/50 transition-all text-muted-foreground hover:text-foreground"
                >
                    <div className="w-4 h-4 rounded-full overflow-hidden flex items-center justify-center">
                        <img src={selectedModel.logo} alt={selectedModel.provider} className="w-full h-full object-cover" />
                    </div>
                    <span className="text-sm font-medium">{selectedModel.label}</span>
                    {open ? <ChevronUp className="w-3.5 h-3.5 opacity-50" /> : <ChevronDown className="w-3.5 h-3.5 opacity-50" />}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="p-1 w-[220px]" align="start" side="top">
                <div className="space-y-0.5">
                    <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        AI Model
                    </div>
                    {models.map((model) => (
                        <button
                            key={model.id}
                            onClick={() => {
                                setSelectedModel(model);
                                setOpen(false);
                            }}
                            className={cn(
                                "w-full flex items-center justify-between px-2 py-2 rounded-md text-sm transition-colors hover:bg-muted",
                                selectedModel.id === model.id && "bg-muted font-medium text-foreground"
                            )}
                        >
                            <div className="flex items-center gap-2">
                                <div className="w-5 h-5 rounded-full overflow-hidden bg-background flex items-center justify-center border border-border/50">
                                    <img src={model.logo} alt={model.provider} className="w-full h-full object-cover" />
                                </div>
                                <span>{model.label}</span>
                            </div>
                            {selectedModel.id === model.id && (
                                <Check className="w-4 h-4 text-primary" />
                            )}
                        </button>
                    ))}
                </div>
            </PopoverContent>
        </Popover>
    );
};
