import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { Link } from "react-router-dom";
import SupersideLogo from "@/components/SupersideLogo";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <SupersideLogo className="w-8 h-8" />
          <span className="font-bold text-lg">Superside</span>
          <span className="text-xs bg-muted px-2 py-0.5 rounded-full text-muted-foreground">
            Chrome Extension
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Features
          </a>
          <a href="#languages" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Languages
          </a>
          <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            How it Works
          </a>
          <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Pricing
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-primary">Free</span>
          <Button size="sm" className="gap-2">
            <SupersideLogo className="w-4 h-4" />
            Add to Chrome
          </Button>
          <Link to="/login">
            <Button variant="ghost" size="sm">Login</Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
