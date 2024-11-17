'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { BaseBadge } from './BaseBadge';
import { motion } from 'framer-motion';

export function Navigation() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed w-full z-50 bg-gradient-to-r from-gray-900/95 to-black/95 backdrop-blur-xl border-b border-gray-800/50 shadow-lg"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <motion.div 
            className="flex items-center space-x-6"
            whileHover={{ scale: 1.02 }}
          >
            <span className="text-3xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent hover:from-blue-500 hover:to-purple-600 transition-all duration-300">
              FLUX
            </span>
            <div className="hidden md:flex items-center space-x-6">
              <BaseBadge />
              <a href="/dashboard" className="text-gray-300 hover:text-white transition-colors duration-200">Dashboard</a>
              <a href="/explore" className="text-gray-300 hover:text-white transition-colors duration-200">Explore</a>
              <a href="/docs" className="text-gray-300 hover:text-white transition-colors duration-200">Docs</a>
            </div>
          </motion.div>

          <div className="flex items-center space-x-6">
            <ConnectButton.Custom>
              {({ account, chain, openConnectModal, mounted }) => {
                return (
                  <div>
                    {!mounted || !account ? (
                      <motion.button 
                        onClick={openConnectModal}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium
                          hover:from-blue-600 hover:to-purple-600 transition-all duration-300
                          shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_25px_rgba(79,70,229,0.45)]"
                      >
                        Connect Wallet
                      </motion.button>
                    ) : (
                      <ConnectButton />
                    )}
                  </div>
                );
              }}
            </ConnectButton.Custom>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}