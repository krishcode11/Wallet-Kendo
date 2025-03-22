import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { motion } from 'framer-motion';
import { Button } from '@progress/kendo-react-buttons';
import { Notification } from '@progress/kendo-react-notification';

interface QRCodeDisplayProps {
  address: string;
  className?: string;
}

const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({ address, className = '' }) => {
  const [showCopied, setShowCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(address);
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy address:', err);
    }
  };

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white p-4 rounded-lg shadow-lg"
      >
        <QRCodeSVG
          value={address}
          size={200}
          level="H"
          includeMargin={true}
          aria-label="QR code containing wallet address"
        />
      </motion.div>
      
      <div className="mt-4 w-full max-w-md">
        <p className="text-sm text-gray-500 mb-2">Your Wallet Address:</p>
        <div className="flex items-center gap-2">
          <code className="bg-gray-100 p-2 rounded flex-1 overflow-x-auto text-sm">
            {address}
          </code>
          <Button
            onClick={handleCopy}
            iconClass="k-icon k-i-copy"
            fillMode="flat"
            className="min-w-[40px]"
            aria-label="Copy address to clipboard"
          />
        </div>
      </div>

      {showCopied && (
        <Notification
          type={{ style: 'success', icon: true }}
          closable={false}
          className="fixed bottom-4 right-4"
        >
          Address copied to clipboard!
        </Notification>
      )}
    </div>
  );
};

export default QRCodeDisplay; 