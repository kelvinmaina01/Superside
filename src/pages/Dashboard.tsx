import { useState } from "react";
import { ThemeProvider } from "next-themes";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import ChatInterface from "@/components/dashboard/ChatInterface";
import SettingsPanel from "@/components/dashboard/SettingsPanel";
import { cn } from "@/lib/utils";

const Dashboard = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("chat");

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <ThemeProvider attribute="class" forcedTheme="light">
      <div className="flex h-screen bg-background overflow-hidden">
        {/* Primary Navigation Sidebar */}
        <DashboardSidebar
          isCollapsed={isSidebarCollapsed}
          setIsCollapsed={setIsSidebarCollapsed}
          activeTab={activeTab}
          setActiveTab={handleTabChange}
        />

        <div className="flex-1 flex overflow-hidden relative">
          {/* Main Content Area */}

          {/* Main Content Area */}
          {activeTab === 'settings' ? (
            <SettingsPanel onClose={() => setActiveTab('chat')} />
          ) : (
            <ChatInterface onOpenSettings={() => setActiveTab('settings')} />
          )}
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Dashboard;
