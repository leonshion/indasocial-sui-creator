import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { NFTCard } from "@/components/NFTCard";
import { MintNFT } from "@/components/MintNFT";

const Index = () => {
  const [activeTab, setActiveTab] = useState("nfts");
  const [nfts, setNfts] = useState([
    {
      id: "1",
      name: "INDA NFT",
      description: "NFT that gives access to benefits, events and exclusive content to our platform",
      typography: "/lovable-uploads/53535500-77bd-4101-a8fd-55b65d7d3f07.png",
      attributes: [
        { trait_type: "color", value: "purple" },
        { trait_type: "rarity", value: "rare" },
        { trait_type: "style", value: "emoji" }
      ],
      owner: "0xA0b5...5B3D",
    }
  ]);

  const handleMintNFT = (newNFT: any) => {
    setNfts(prev => [...prev, newNFT]);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return (
          <div className="text-center py-16">
            <h1 className="text-4xl font-bold mb-4">Welcome to SUI NFT Platform</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Create and manage typography-based NFTs on the SUI blockchain
            </p>
            <div className="max-w-2xl mx-auto">
              <MintNFT onMint={handleMintNFT} />
            </div>
          </div>
        );
      
      case "nfts":
        return (
          <div className="py-8">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold">My NFTs</h1>
              <div className="max-w-xs">
                <MintNFT onMint={handleMintNFT} />
              </div>
            </div>
            
            {nfts.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-muted-foreground">No NFTs found. Mint your first NFT!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {nfts.map((nft) => (
                  <NFTCard key={nft.id} {...nft} />
                ))}
              </div>
            )}
          </div>
        );
      
      default:
        return (
          <div className="text-center py-16">
            <h2 className="text-2xl font-semibold mb-4">{activeTab.toUpperCase()}</h2>
            <p className="text-muted-foreground">Feature coming soon...</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="container mx-auto px-6">
        {renderContent()}
      </div>
    </div>
  );
};

export default Index;
