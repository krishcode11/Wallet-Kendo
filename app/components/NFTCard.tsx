import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@progress/kendo-react-buttons';
import { Dialog } from '@progress/kendo-react-dialogs';
import Image from 'next/image';

interface NFTMetadata {
  name: string;
  description: string;
  image: string;
  attributes: {
    trait_type: string;
    value: string;
  }[];
  tokenId: string;
  contractAddress: string;
  network: string;
}

interface NFTCardProps {
  nft: NFTMetadata;
  onTransfer?: (nft: NFTMetadata) => void;
  onView?: (nft: NFTMetadata) => void;
}

const NFTCard: React.FC<NFTCardProps> = ({ nft, onTransfer, onView }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleFlip();
    }
  };

  return (
    <>
      <motion.div
        className="relative w-64 h-96 cursor-pointer perspective-1000"
        whileHover={{ scale: 1.02 }}
        onClick={handleFlip}
        onKeyPress={handleKeyPress}
        tabIndex={0}
        role="button"
        aria-label={`NFT Card: ${nft.name}`}
      >
        <motion.div
          className={`w-full h-full rounded-xl shadow-xl transform-style-3d transition-transform duration-500 ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
        >
          {/* Front of card */}
          <motion.div
            className="absolute w-full h-full backface-hidden bg-white rounded-xl p-4"
            initial={false}
            animate={{ opacity: isFlipped ? 0 : 1 }}
          >
            <div className="relative w-full h-48 mb-4">
              <Image
                src={nft.image}
                alt={nft.name}
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
                priority
              />
            </div>
            <h3 className="text-lg font-bold mb-2">{nft.name}</h3>
            <p className="text-sm text-gray-600 line-clamp-2">{nft.description}</p>
          </motion.div>

          {/* Back of card */}
          <motion.div
            className="absolute w-full h-full backface-hidden bg-white rounded-xl p-4 rotate-y-180"
            initial={false}
            animate={{ opacity: isFlipped ? 1 : 0 }}
          >
            <h4 className="text-md font-semibold mb-2">Attributes</h4>
            <div className="space-y-2">
              {nft.attributes.map((attr, index) => (
                <div
                  key={index}
                  className="bg-gray-100 p-2 rounded-md"
                  role="listitem"
                >
                  <span className="text-sm font-medium">{attr.trait_type}: </span>
                  <span className="text-sm text-gray-600">{attr.value}</span>
                </div>
              ))}
            </div>
            <div className="absolute bottom-4 left-4 right-4 flex gap-2">
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  onView?.(nft);
                }}
                className="flex-1"
                fillMode="flat"
                aria-label={`View details of ${nft.name}`}
              >
                View
              </Button>
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  onTransfer?.(nft);
                }}
                className="flex-1"
                fillMode="flat"
                themeColor="info"
                aria-label={`Transfer ${nft.name}`}
              >
                Transfer
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {showDetails && (
          <Dialog
            title={nft.name}
            onClose={() => setShowDetails(false)}
            className="max-w-2xl"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="p-6"
            >
              <div className="grid grid-cols-2 gap-6">
                <div className="relative aspect-square">
                  <Image
                    src={nft.image}
                    alt={nft.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-4">{nft.name}</h3>
                  <p className="text-gray-600 mb-4">{nft.description}</p>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Token ID</h4>
                      <code className="bg-gray-100 p-2 rounded block">
                        {nft.tokenId}
                      </code>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Contract Address</h4>
                      <code className="bg-gray-100 p-2 rounded block">
                        {nft.contractAddress}
                      </code>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Network</h4>
                      <span className="text-gray-600">{nft.network}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </Dialog>
        )}
      </AnimatePresence>
    </>
  );
};

export default NFTCard; 