import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Camera, 
  MessageSquare, 
  Bookmark, 
  Settings, 
  LogOut, 
  Zap, 
  Brain,
  Maximize2,
  Minimize2,
  Send,
  Chrome,
  ChevronRight
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const mockHighlights = [
  {
    id: 1,
    title: "React Performance Optimization",
    summary: "Key techniques for optimizing React applications including memoization, code splitting, and virtual scrolling.",
    date: "2 hours ago",
    mode: "fast",
  },
  {
    id: 2,
    title: "Machine Learning Basics",
    summary: "Introduction to supervised and unsupervised learning, neural networks, and common ML algorithms.",
    date: "Yesterday",
    mode: "thinking",
  },
  {
    id: 3,
    title: "CSS Grid Layout Guide",
    summary: "Complete guide to CSS Grid including grid-template-areas, auto-fill, minmax, and responsive patterns.",
    date: "3 days ago",
    mode: "fast",
  },
];

const Dashboard = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isThinkingMode, setIsThinkingMode] = useState(false);
  const [selectedHighlight, setSelectedHighlight] = useState<number | null>(null);
  const [chatMessage, setChatMessage] = useState("");
  const [screenshotsToday] = useState(3);
  const [isPremium] = useState(false);

  const maxScreenshots = isPremium ? "∞" : 5;

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-background border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Chrome className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold">WebClipInsights</span>
          </Link>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm">
              <Camera className="w-4 h-4 text-muted-foreground" />
              <span className="font-medium">{screenshotsToday}/{maxScreenshots}</span>
              <span className="text-muted-foreground">today</span>
            </div>

            {!isPremium && (
              <Button size="sm" variant="outline" className="gap-2">
                <Zap className="w-4 h-4" />
                Upgrade
              </Button>
            )}

            <Button variant="ghost" size="icon">
              <Settings className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className={`flex ${isFullScreen ? "" : "container mx-auto px-4 py-6 gap-6"}`}>
        {/* Highlights Sidebar */}
        {!isFullScreen && (
          <aside className="w-80 flex-shrink-0">
            <Card className="h-[calc(100vh-8rem)] flex flex-col">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Bookmark className="w-5 h-5" />
                    Highlights
                  </CardTitle>
                  <Badge variant="secondary">{mockHighlights.length}</Badge>
                </div>
              </CardHeader>
              <CardContent className="flex-1 overflow-hidden p-0">
                <ScrollArea className="h-full px-4 pb-4">
                  <div className="space-y-3">
                    {mockHighlights.map((highlight) => (
                      <button
                        key={highlight.id}
                        onClick={() => setSelectedHighlight(highlight.id)}
                        className={`w-full text-left p-3 rounded-lg border transition-colors ${
                          selectedHighlight === highlight.id
                            ? "bg-primary/10 border-primary"
                            : "bg-card hover:bg-muted"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h4 className="font-medium text-sm line-clamp-1">{highlight.title}</h4>
                          {highlight.mode === "thinking" ? (
                            <Brain className="w-4 h-4 text-purple-500 flex-shrink-0" />
                          ) : (
                            <Zap className="w-4 h-4 text-yellow-500 flex-shrink-0" />
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-2">{highlight.summary}</p>
                        <span className="text-xs text-muted-foreground mt-2 block">{highlight.date}</span>
                      </button>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </aside>
        )}

        {/* Main Chat Area */}
        <main className={`flex-1 ${isFullScreen ? "h-screen" : ""}`}>
          <Card className={`flex flex-col ${isFullScreen ? "h-full rounded-none border-0" : "h-[calc(100vh-8rem)]"}`}>
            {/* Chat Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Label htmlFor="thinking-mode" className="text-sm text-muted-foreground">
                    Fast
                  </Label>
                  <Switch
                    id="thinking-mode"
                    checked={isThinkingMode}
                    onCheckedChange={setIsThinkingMode}
                  />
                  <Label htmlFor="thinking-mode" className="text-sm text-muted-foreground">
                    Thinking
                  </Label>
                </div>
                <Badge variant={isThinkingMode ? "default" : "secondary"} className="gap-1">
                  {isThinkingMode ? (
                    <>
                      <Brain className="w-3 h-3" /> DeepSeek
                    </>
                  ) : (
                    <>
                      <Zap className="w-3 h-3" /> Groq
                    </>
                  )}
                </Badge>
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsFullScreen(!isFullScreen)}
              >
                {isFullScreen ? (
                  <Minimize2 className="w-4 h-4" />
                ) : (
                  <Maximize2 className="w-4 h-4" />
                )}
              </Button>
            </div>

            {/* Chat Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="max-w-3xl mx-auto space-y-4">
                {selectedHighlight ? (
                  <>
                    <div className="bg-muted rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline">Screenshot Analysis</Badge>
                        <span className="text-xs text-muted-foreground">
                          {mockHighlights.find(h => h.id === selectedHighlight)?.date}
                        </span>
                      </div>
                      <h3 className="font-semibold mb-2">
                        {mockHighlights.find(h => h.id === selectedHighlight)?.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {mockHighlights.find(h => h.id === selectedHighlight)?.summary}
                      </p>
                    </div>

                    {isThinkingMode && (
                      <div className="bg-purple-50 dark:bg-purple-950/30 rounded-lg p-4 border border-purple-200 dark:border-purple-800">
                        <div className="flex items-center gap-2 mb-2">
                          <Brain className="w-4 h-4 text-purple-600" />
                          <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
                            Thought Process
                          </span>
                        </div>
                        <p className="text-sm text-purple-700/80 dark:text-purple-300/80">
                          Analyzing the content structure... Identifying key concepts and relationships...
                          Cross-referencing with related topics... Generating comprehensive summary with actionable insights...
                        </p>
                      </div>
                    )}

                    <div className="bg-card border rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <MessageSquare className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium">AI Response</span>
                      </div>
                      <div className="prose prose-sm dark:prose-invert">
                        <p>
                          Based on my analysis of your screenshot, here are the key takeaways:
                        </p>
                        <ul>
                          <li>The main topic covers {mockHighlights.find(h => h.id === selectedHighlight)?.title.toLowerCase()}</li>
                          <li>Key concepts include fundamental principles and best practices</li>
                          <li>Practical applications are demonstrated through examples</li>
                        </ul>
                        <p>
                          Would you like me to explain any of these points in more detail?
                        </p>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-20 text-muted-foreground">
                    <Camera className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <h3 className="text-lg font-medium mb-2">No conversation yet</h3>
                    <p className="text-sm">
                      Take a screenshot or select a highlight to start analyzing
                    </p>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Chat Input */}
            <div className="p-4 border-t">
              <div className="max-w-3xl mx-auto flex gap-2">
                <Input
                  placeholder="Ask a follow-up question..."
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  className="flex-1"
                />
                <Button size="icon">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
