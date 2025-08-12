import { Button } from "@/components/ui/button";
import { Wallet, LogOut } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const WalletConnection = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState("");

  const connectWallet = async () => {
    try {
      // Simulate wallet connection - in real app, use Slush or SUI wallet adapter
      const mockAddress = "0x" + Math.random().toString(16).substr(2, 40);
      setAddress(mockAddress);
      setIsConnected(true);
      toast.success("Wallet connected successfully!");
    } catch (error) {
      toast.error("Failed to connect wallet");
    }
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    setAddress("");
    toast.success("Wallet disconnected");
  };

  return (
    <div className="flex items-center gap-4">
      {isConnected ? (
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-2 bg-secondary rounded-lg">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <span className="text-sm font-mono">
              {address.slice(0, 6)}...{address.slice(-4)}
            </span>
          </div>
          <Button
            size="sm"
            variant="ghost"
            onClick={disconnectWallet}
            className="text-muted-foreground hover:text-foreground"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <Button onClick={connectWallet} className="flex items-center gap-2">
          <Wallet className="h-4 w-4" />
          Connect Wallet
        </Button>
      )}
    </div>
  );
};