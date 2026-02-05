import { useState } from "react";
import {
    Globe,
    Paperclip,
    ImageIcon,
    ArrowUp,
    X,
    Plus,
    Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ModeSelector } from "./ModeSelector";
import { ModelSelector } from "./ModelSelector";
import { LanguageSelector } from "./LanguageSelector";

const ChatInput = () => {
    const [message, setMessage] = useState("");
    const [isWebSearch, setIsWebSearch] = useState(false);

    return (
        <div className="relative group bg-card rounded-2xl border shadow-lg shadow-black/5 ring-1 ring-black/5 overflow-hidden transition-all duration-300 focus-within:ring-primary/20 focus-within:shadow-xl focus-within:shadow-primary/5">
            {/* Header: Mode & Model Selectors */}
            <div className="flex items-center justify-between px-3 py-2 border-b border-border/40 bg-muted/10">
                <ModeSelector />
                <ModelSelector />
            </div>

            <textarea
                placeholder="Ask anything..."
                rows={1}
                className="w-full bg-transparent border-none focus:ring-0 resize-none px-4 pt-4 pb-12 text-lg placeholder:text-muted-foreground/60 min-h-[100px] overflow-y-auto max-h-[400px] focus-visible:ring-0"
                value={message}
                onChange={(e) => {
                    setMessage(e.target.value);
                    e.target.style.height = 'auto';
                    e.target.style.height = `${Math.max(100, Math.min(e.target.scrollHeight, 400))}px`;
                }}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        // handle send
                    }
                }}
            />

            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="sm"
                        className={cn(
                            "h-8 rounded-full gap-2 transition-colors",
                            isWebSearch ? "bg-primary/10 text-primary hover:bg-primary/20" : "text-muted-foreground hover:bg-muted"
                        )}
                        onClick={() => setIsWebSearch(!isWebSearch)}
                    >
                        <Globe className="h-4 w-4" />
                        <span className="text-xs font-medium">All Web</span>
                    </Button>

                    <div className="w-px h-4 bg-border mx-1" />

                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted">
                        <Paperclip className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted">
                        <ImageIcon className="h-4 w-4" />
                    </Button>

                    <div className="w-px h-4 bg-border mx-1" />

                    <LanguageSelector />
                </div>

                <div className="flex items-center gap-3">
                    <span className="text-[10px] text-muted-foreground tabular-nums">
                        {message.length}/1500
                    </span>
                    <Button
                        size="icon"
                        className={cn(
                            "h-9 w-9 rounded-xl transition-all duration-300",
                            message.trim() ? "bg-primary scale-100" : "bg-muted text-muted-foreground scale-95 opacity-50"
                        )}
                        disabled={!message.trim()}
                    >
                        <ArrowUp className="h-5 w-5" />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ChatInput;
