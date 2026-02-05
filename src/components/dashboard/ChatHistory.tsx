import { Search, MoreVertical, MessageSquare, ChevronLeft, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const mockHistory = [
    {
        category: "Today",
        items: [
            { id: '1', title: "New chat", active: true, model: "/logos/claude.png" },
            { id: '2', title: "Generate a new insight summary...", active: false, model: "/logos/chatgpt.png" },
            { id: '3', title: "Build predictive model for user d...", active: false, model: "/logos/deepseek.png" },
        ]
    },
    {
        category: "Yesterday",
        items: [
            { id: '4', title: "AI summary: Neural Labs meetin...", active: false, model: "/logos/gemini.png" },
            { id: '5', title: "Draft automated report for Q4 a...", active: false, model: "/logos/claude.png" },
            { id: '6', title: "Enhance chatbot tone with adap...", active: false, model: "/logos/groq.png" },
        ]
    },
    {
        category: "Previous 7 Days",
        items: [
            { id: '7', title: "Create performance visualization...", active: false, model: "/logos/chatgpt.png" },
            { id: '8', title: "Optimize UI text for futuristic the...", active: false, model: "/logos/deepseek.png" },
            { id: '9', title: "Auto-generate project timeline f...", active: false, model: "/logos/claude.png" },
            { id: '10', title: "Review neural response accurac...", active: false, model: "/logos/gemini.png" },
            { id: '11', title: "UX feedback integration - Phas...", active: false, model: "/logos/groq.png" },
        ]
    }
];

interface ChatHistoryProps {
    className?: string;
    isCollapsed?: boolean;
    onToggle?: () => void;
}

const ChatHistory = ({ className, isCollapsed, onToggle }: ChatHistoryProps) => {
    if (isCollapsed) {
        return (
            <div className={cn("flex flex-col border-r bg-card/50 w-12 transition-all duration-300", className)}>
                <div className="p-2">
                    <Button variant="ghost" size="icon" onClick={onToggle} className="h-8 w-8">
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        );
    }
    return (
        <div className={cn("flex flex-col h-full border-r bg-card/50 w-72 transition-all duration-300", className)}>
            <div className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold">Chat History</h2>
                    <Button variant="ghost" size="icon" onClick={onToggle} className="h-8 w-8">
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                </div>

                <Button className="w-full gap-2 bg-primary/10 text-primary hover:bg-primary/20 border-primary/20">
                    <MessageSquare className="h-4 w-4" />
                    New Chat
                </Button>

                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search chats..."
                        className="pl-9 bg-muted/50 border-none h-9 focus-visible:ring-1 focus-visible:ring-primary/20"
                    />
                </div>
            </div>

            <ScrollArea className="flex-1 px-4">
                <div className="space-y-6 pb-4">
                    {mockHistory.map((group) => (
                        <div key={group.category} className="space-y-2">
                            <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-2">
                                {group.category}
                            </h3>
                            <div className="space-y-1">
                                {group.items.map((item) => (
                                    <button
                                        key={item.id}
                                        className={cn(
                                            "w-full text-left px-2 py-2 rounded-md transition-colors text-sm truncate group flex items-center gap-2",
                                            item.active
                                                ? "bg-primary/10 text-primary font-medium"
                                                : "hover:bg-muted text-muted-foreground hover:text-foreground"
                                        )}
                                    >
                                        <div className="w-4 h-4 rounded-full overflow-hidden flex-shrink-0 bg-background border border-border/50 flex items-center justify-center">
                                            <img src={item.model} alt="" className="w-full h-full object-cover" />
                                        </div>
                                        <span className="truncate">{item.title}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </ScrollArea>
        </div >
    );
};

export default ChatHistory;
