import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy } from "lucide-react";
import { toast } from "sonner";

interface NFTCardProps {
  id: string;
  name: string;
  description: string;
  attributes: { trait_type: string; value: string; }[];
  owner: string;
  typography: string;
}

export const NFTCard = ({ id, name, description, attributes, owner, typography }: NFTCardProps) => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  return (
    <Card className="w-full max-w-sm mx-auto bg-card border border-border">
      <CardHeader className="text-center">
        <div className="w-full h-48 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg overflow-hidden mb-4">
          <img 
            src={typography} 
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">#{id}</span>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div>
          <CardTitle className="text-lg">{name}</CardTitle>
          <CardDescription className="mt-2">{description}</CardDescription>
        </div>

        <div className="flex flex-wrap gap-2">
          {attributes.map((attr, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {attr.value}
            </Badge>
          ))}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Owner:</span>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground font-mono">
                {owner.slice(0, 6)}...{owner.slice(-4)}
              </span>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => copyToClipboard(owner)}
                className="h-6 w-6"
              >
                <Copy className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Transfer To:</label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Recipient address"
              className="flex-1 px-3 py-2 text-sm border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <Button size="sm" variant="outline">
              Transfer
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};