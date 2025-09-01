'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw } from 'lucide-react';

interface DemoModeProps {
  onToggle: (enabled: boolean) => void;
  isEnabled: boolean;
}

export default function DemoMode({ onToggle, isEnabled }: DemoModeProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleToggle = () => {
    onToggle(!isEnabled);
    if (!isEnabled) {
      setIsPlaying(true);
      // Auto-stop demo after 30 seconds
      setTimeout(() => {
        setIsPlaying(false);
        onToggle(false);
      }, 30000);
    } else {
      setIsPlaying(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-6 right-6 z-50"
    >
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${isEnabled ? 'bg-green-500' : 'bg-gray-300'}`} />
            <span className="text-sm font-medium text-gray-700">
              {isEnabled ? 'Demo Mode' : 'Live Mode'}
            </span>
          </div>
          
          <button
            onClick={handleToggle}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              isEnabled
                ? 'bg-red-100 text-red-700 hover:bg-red-200'
                : 'bg-green-100 text-green-700 hover:bg-green-200'
            }`}
          >
            {isEnabled ? (
              <div className="flex items-center space-x-1">
                <Pause className="w-3 h-3" />
                <span>Stop</span>
              </div>
            ) : (
              <div className="flex items-center space-x-1">
                <Play className="w-3 h-3" />
                <span>Demo</span>
              </div>
            )}
          </button>
        </div>
        
        {isEnabled && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-3 pt-3 border-t border-gray-200"
          >
            <div className="text-xs text-gray-500 space-y-1">
              <p>• Simulated USDC transfers</p>
              <p>• Mock phone number resolution</p>
              <p>• Demo transaction history</p>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}