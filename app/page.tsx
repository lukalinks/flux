'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, DollarSign, Smartphone, Zap } from 'lucide-react';
import USDCSpender from '@/components/USDCSpender';
import TransactionHistory from '@/components/TransactionHistory';
import DemoMode from '@/components/DemoMode';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function Home() {
  const [isDemoMode, setIsDemoMode] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Base USDC Spender</h1>
                <p className="text-sm text-gray-500">Fast USDC payments on Base</p>
              </div>
            </div>
            <ConnectButton />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Send USDC Instantly
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Transfer USDC on Base blockchain directly to any mobile number. 
            Fast, secure, and seamless payments powered by Farcaster and Base.
          </p>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Lightning Fast</h3>
            <p className="text-gray-600">Base blockchain ensures instant transactions with minimal fees</p>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
              <Smartphone className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Mobile First</h3>
            <p className="text-gray-600">Send to any mobile number, no wallet address needed</p>
          </div>
          
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
              <DollarSign className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Base Powered</h3>
            <p className="text-gray-600">Built on Base L2 for ultra-fast, low-cost transactions</p>
          </div>
        </motion.div>

        {/* USDC Spender Component */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-8"
        >
          <USDCSpender />
        </motion.div>

        {/* Transaction History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <TransactionHistory />
        </motion.div>
      </main>

      {/* Demo Mode Toggle */}
      <DemoMode onToggle={setIsDemoMode} isEnabled={isDemoMode} />
    </div>
  );
}
