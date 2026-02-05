import {
    MessageSquare,
    Search,
    History,
    Settings,
    CreditCard,
    LayoutDashboard,
    LogOut,
    ChevronLeft,
    ChevronRight,
    Plus,
    Compass,
    Workflow,
    FolderOpen,
    Home,
    PanelLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger
} from "@/components/ui/tooltip";
import { Link, useLocation } from "react-router-dom";
import SupersideLogo from "@/components/SupersideLogo";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

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

interface DashboardSidebarProps {
    isCollapsed: boolean;
    setIsCollapsed: (collapsed: boolean) => void;
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

const DashboardSidebar = ({
    isCollapsed,
    setIsCollapsed,
    activeTab,
    setActiveTab
}: DashboardSidebarProps) => {
    const location = useLocation();

    const navItems = [
        { id: 'home', icon: Home, label: 'Home' },
        { id: 'explore', icon: Compass, label: 'Explore' },
        { id: 'use-cases', icon: Workflow, label: 'Use Cases' },
        { id: 'my-files', icon: FolderOpen, label: 'My Files' },
        { id: 'history', icon: History, label: 'History' },
    ];

    return (
        <aside
            className={cn(
                "flex flex-col border-r bg-card transition-all duration-300 ease-in-out z-50 relative group",
                isCollapsed ? "w-16" : "w-64"
            )}
        >
            <div className="p-4 flex items-center justify-between gap-3">
                <Link to="/" className="flex items-center gap-2 overflow-hidden">
                    <SupersideLogo className="w-8 h-8 flex-shrink-0" />
                    {!isCollapsed && <span className="font-bold text-lg whitespace-nowrap">Superside</span>}
                </Link>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-foreground"
                    onClick={() => setIsCollapsed(!isCollapsed)}
                >
                    <PanelLeft className={cn("h-5 w-5 transition-transform", isCollapsed && "rotate-180")} />
                </Button>
            </div>

            <div className="flex-1 px-2 py-4 space-y-2">
                {navItems.map((item) => (
                    <Tooltip key={item.id} delayDuration={0}>
                        <TooltipTrigger asChild>
                            <Button
                                variant={activeTab === item.id ? "secondary" : "ghost"}
                                className={cn(
                                    "w-full justify-start gap-3 px-3",
                                    activeTab === item.id && "bg-primary/10 text-primary hover:bg-primary/20",
                                    isCollapsed && "justify-center px-0"
                                )}
                                onClick={() => setActiveTab(item.id)}
                            >
                                <item.icon className="w-5 h-5 flex-shrink-0" />
                                {!isCollapsed && <span className="font-medium">{item.label}</span>}
                            </Button>
                        </TooltipTrigger>
                        {isCollapsed && (
                            <TooltipContent side="right">
                                {item.label}
                            </TooltipContent>
                        )}
                    </Tooltip>
                ))}

                {!isCollapsed && (
                    <div className="pt-4 mt-4 border-t space-y-4">
                        <Button className="w-full gap-2 bg-primary/10 text-primary hover:bg-primary/20 border-primary/20 h-9">
                            <Plus className="h-4 w-4" />
                            New Chat
                        </Button>

                        <ScrollArea className="h-[calc(100vh-400px)] -mx-2 px-2">
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
                    </div>
                )}
            </div>

            <div className="p-2 border-t space-y-2">
                <Button
                    variant="ghost"
                    className={cn(
                        "w-full justify-start gap-3 px-3 text-destructive hover:text-destructive hover:bg-destructive/10",
                        isCollapsed && "justify-center px-0"
                    )}
                >
                    <LogOut className="w-5 h-5 flex-shrink-0" />
                    {!isCollapsed && <span>Logout</span>}
                </Button>
            </div>
        </aside>
    );
};

export default DashboardSidebar;
