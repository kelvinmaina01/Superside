import { useState } from "react";
import { User, Shield, CreditCard, Bell, Palette, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const tabs = [
    { id: 'basic', icon: User, label: 'Basic Info' },
    { id: 'security', icon: Shield, label: 'Security & Password' },
    { id: 'billing', icon: CreditCard, label: 'Billing & Usage' },
    { id: 'preferences', icon: Bell, label: 'Preferences' },
];

const SettingsPanel = ({ onClose }: { onClose: () => void }) => {
    const [activeTab, setActiveTab] = useState('basic');
    const [notifications, setNotifications] = useState(true);

    return (
        <div className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-sm flex">
            {/* Settings Sidebar */}
            <div className="w-64 border-r bg-card p-4 flex flex-col">
                <div className="mb-6">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start gap-2 text-muted-foreground hover:text-foreground"
                        onClick={onClose}
                    >
                        <X className="w-4 h-4" />
                        Back to Chat
                    </Button>
                </div>
                <div className="flex-1 space-y-2">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={cn(
                                "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left",
                                activeTab === tab.id
                                    ? "bg-primary text-primary-foreground"
                                    : "hover:bg-muted text-muted-foreground"
                            )}
                        >
                            <tab.icon className="w-5 h-5" />
                            <span className="font-medium">{tab.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Settings Content */}
            <div className="flex-1 overflow-auto">
                <div className="max-w-3xl mx-auto p-8">
                    {activeTab === 'basic' && (
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-2xl font-bold">Profile</h2>
                                <p className="text-muted-foreground">Manage your profile settings</p>
                            </div>

                            <Separator />

                            {/* Profile Picture Section */}
                            <div className="space-y-4">
                                <div className="flex items-start gap-6">
                                    <div className="relative">
                                        <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-2xl border-2 border-primary/20">
                                            KM
                                        </div>
                                        <Button
                                            size="sm"
                                            variant="secondary"
                                            className="absolute bottom-0 right-0 rounded-full h-8 w-8 p-0"
                                        >
                                            <User className="h-4 w-4" />
                                        </Button>
                                    </div>
                                    <div className="flex-1 space-y-2">
                                        <Label>Profile Picture</Label>
                                        <div className="flex gap-2">
                                            <Button variant="outline" size="sm">Upload new picture</Button>
                                        </div>
                                        <p className="text-xs text-muted-foreground">JPG, PNG, or GIF. Max size 2MB.</p>
                                    </div>
                                </div>
                            </div>

                            <Separator />

                            {/* Profile Information */}
                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input id="name" placeholder="Enter your name" defaultValue="kelvin maina" />
                                </div>

                                <div>
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" type="email" placeholder="your@email.com" defaultValue="kelvin.reallife8@gmail.com" />
                                </div>

                                <div>
                                    <Label htmlFor="phone">Phone Number</Label>
                                    <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" defaultValue="0741076474" />
                                </div>

                                <div>
                                    <Label htmlFor="country">Country</Label>
                                    <Input id="country" placeholder="Enter your country" defaultValue="Kenya" />
                                </div>
                            </div>

                            <Button>Save Changes</Button>
                        </div>
                    )}

                    {activeTab === 'security' && (
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-2xl font-bold">Security & Password</h2>
                                <p className="text-muted-foreground">Manage your account security and authentication</p>
                            </div>

                            <Separator />

                            <div className="space-y-6">
                                <div className="p-6 border rounded-lg space-y-4">
                                    <div className="flex items-start gap-3">
                                        <Shield className="w-5 h-5 text-primary mt-0.5" />
                                        <div className="flex-1">
                                            <h3 className="font-semibold">Change Password</h3>
                                            <p className="text-sm text-muted-foreground">Update your account password for better security</p>
                                        </div>
                                    </div>

                                    <div className="space-y-4 mt-4">
                                        <div>
                                            <Label htmlFor="old-password">Old Password</Label>
                                            <Input id="old-password" type="password" placeholder="Enter old password" />
                                        </div>

                                        <div>
                                            <Label htmlFor="new-password">New Password</Label>
                                            <Input id="new-password" type="password" placeholder="Enter new password" />
                                        </div>

                                        <div>
                                            <Label htmlFor="confirm-password">Re-enter New Password</Label>
                                            <Input id="confirm-password" type="password" placeholder="Re-enter new password" />
                                        </div>
                                    </div>

                                    <Button>Update Password</Button>
                                </div>

                                <div className="p-6 border rounded-lg">
                                    <div className="flex items-start gap-3">
                                        <div className="flex-1">
                                            <h3 className="font-semibold">Account Actions</h3>
                                            <p className="text-sm text-muted-foreground mb-4">Manage your account session and data</p>
                                            <Button variant="destructive" className="gap-2">
                                                <ChevronRight className="w-4 h-4" />
                                                Log out of your account
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'billing' && (
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-2xl font-bold">Billing & Usage</h2>
                                <p className="text-muted-foreground">Manage your plan, billing details, and track your credit usage</p>
                            </div>

                            <Separator />

                            <div className="space-y-6">
                                <div className="p-6 border rounded-lg space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="font-semibold">Credits Remaining</h3>
                                            <p className="text-sm text-muted-foreground">Daily credits reset at midnight UTC</p>
                                        </div>
                                        <Button variant="link" size="sm">Top up</Button>
                                    </div>
                                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                                        <div className="h-full bg-primary" style={{ width: '72%' }}></div>
                                    </div>
                                    <p className="text-sm font-medium">466/500</p>
                                </div>

                                <div className="p-6 border rounded-lg space-y-4">
                                    <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">Individual</Badge>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-muted-foreground">Your current subscription plan</p>
                                            <p className="text-xs text-muted-foreground">Active</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-2xl font-bold text-primary">$25.00</p>
                                            <p className="text-xs text-muted-foreground">per month</p>
                                        </div>
                                    </div>
                                    <Button className="w-full gap-2">
                                        <ChevronRight className="w-4 h-4" />
                                        Upgrade Plan
                                    </Button>
                                </div>

                                <div className="p-6 border rounded-lg">
                                    <h3 className="font-semibold mb-2">Billing history</h3>
                                    <p className="text-sm text-muted-foreground">Download your previous plan receipts and usage details</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'preferences' && (
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-2xl font-bold">Preferences</h2>
                                <p className="text-muted-foreground">Customize your experience</p>
                            </div>

                            <Separator />

                            <div className="flex items-center justify-between p-6 border rounded-lg">
                                <div className="flex items-start gap-3 flex-1">
                                    <Bell className="w-5 h-5 text-primary mt-0.5" />
                                    <div>
                                        <h3 className="font-semibold">Notifications</h3>
                                        <p className="text-sm text-muted-foreground">Receive updates about your chats and account</p>
                                    </div>
                                </div>
                                <Switch checked={notifications} onCheckedChange={setNotifications} />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SettingsPanel;
