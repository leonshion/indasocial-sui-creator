import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface MintNFTProps {
  onMint: (nft: any) => void;
}

export const MintNFT = ({ onMint }: MintNFTProps) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    typography: "",
    attributes: "",
  });
  const [isMinting, setIsMinting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.typography) {
      toast.error("Please fill in required fields");
      return;
    }

    setIsMinting(true);
    
    try {
      // Simulate minting process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newNFT = {
        id: Math.floor(Math.random() * 10000).toString(),
        name: formData.name,
        description: formData.description || "A unique typography-based NFT",
        typography: formData.typography,
        attributes: formData.attributes 
          ? formData.attributes.split(",").map(attr => ({
              trait_type: "trait",
              value: attr.trim()
            }))
          : [{ trait_type: "style", value: "typography" }],
        owner: "0x" + Math.random().toString(16).substr(2, 40),
      };

      onMint(newNFT);
      toast.success("NFT minted successfully!");
      
      // Reset form
      setFormData({
        name: "",
        description: "",
        typography: "",
        attributes: "",
      });
    } catch (error) {
      toast.error("Failed to mint NFT");
    } finally {
      setIsMinting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Mint NFT</CardTitle>
          <CardDescription>
            Create your unique typography-based NFT
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                placeholder="Enter NFT name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="typography">Typography Character *</Label>
              <Input
                id="typography"
                placeholder="Enter a single character or emoji"
                value={formData.typography}
                onChange={(e) => setFormData({ ...formData, typography: e.target.value.slice(0, 3) })}
                maxLength={3}
                className="text-center text-2xl"
                required
              />
              <p className="text-xs text-muted-foreground">
                This will be displayed as the main visual element
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe your NFT"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="attributes">Attributes</Label>
              <Input
                id="attributes"
                placeholder="trait1, trait2, trait3"
                value={formData.attributes}
                onChange={(e) => setFormData({ ...formData, attributes: e.target.value })}
              />
              <p className="text-xs text-muted-foreground">
                Comma-separated list of traits
              </p>
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              disabled={isMinting}
            >
              {isMinting ? "Minting..." : "Mint NFT"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};