
import { useState } from "react";
import { Check, Languages, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

const languages = [
    { id: "en", label: "English", flag: "🇺🇸" },
    { id: "es", label: "Spanish", flag: "🇪🇸" },
    { id: "fr", label: "French", flag: "🇫🇷" },
    { id: "de", label: "German", flag: "🇩🇪" },
    { id: "zh", label: "Chinese", flag: "🇨🇳" },
    { id: "jp", label: "Japanese", flag: "🇯🇵" },
    { id: "kr", label: "Korean", flag: "🇰🇷" },
    { id: "pt", label: "Portuguese", flag: "🇧🇷" },
];

export const LanguageSelector = () => {
    const [open, setOpen] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted"
                    title="Choose Language"
                >
                    <Languages className="h-4 w-4" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="p-1 w-[180px]" align="start" side="top">
                <div className="space-y-0.5">
                    <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Language
                    </div>
                    {languages.map((lang) => (
                        <button
                            key={lang.id}
                            onClick={() => {
                                setSelectedLanguage(lang);
                                setOpen(false);
                            }}
                            className={cn(
                                "w-full flex items-center justify-between px-2 py-2 rounded-md text-sm transition-colors hover:bg-muted",
                                selectedLanguage.id === lang.id && "bg-muted font-medium text-foreground"
                            )}
                        >
                            <span className="flex items-center gap-3">
                                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-muted/50 text-sm shadow-sm ring-1 ring-border/50">
                                    {lang.flag}
                                </span>
                                {lang.label}
                            </span>
                            {selectedLanguage.id === lang.id && (
                                <Check className="w-3 h-3 text-primary" />
                            )}
                        </button>
                    ))}
                </div>
            </PopoverContent>
        </Popover>
    );
};
