import { Button } from "@/components/ui/button";
import { WalletConnection } from "./WalletConnection";
import { Home, Image, Send, Upload, Download, Settings } from "lucide-react";

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navigation = ({ activeTab, setActiveTab }: NavigationProps) => {
  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "nfts", label: "My NFTs", icon: Image },
    { id: "transfers", label: "Transfers", icon: Send },
    { id: "upload", label: "IPFS Upload", icon: Upload },
    { id: "download", label: "IPFS Download", icon: Download },
    { id: "debug", label: "Debug Contracts", icon: Settings },
  ];

  return (
    <nav className="bg-primary text-primary-foreground px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-foreground/20 rounded-lg flex items-center justify-center">
              <span className="text-lg font-bold">N</span>
            </div>
            <div>
              <h1 className="font-bold text-lg">NFT Platform</h1>
              <p className="text-xs text-primary-foreground/70">Simple NFT Example</p>
            </div>
          </div>
          
          <div className="flex items-center gap-1">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <Button
                  key={item.id}
                  variant={activeTab === item.id ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 ${
                    activeTab === item.id 
                      ? "bg-primary-foreground/20 text-primary-foreground" 
                      : "text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
                  }`}
                >
                  <IconComponent className="h-4 w-4" />
                  {item.label}
                </Button>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-sm text-primary-foreground/70">
            0.9892 SUI
          </div>
          <WalletConnection />
        </div>
      </div>
    </nav>
  );
};