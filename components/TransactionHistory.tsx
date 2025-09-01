'use client';

import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { motion } from 'framer-motion';
import { Clock, ArrowUpRight, ArrowDownLeft, ExternalLink } from 'lucide-react';

interface Transaction {
  hash: string;
  from: string;
  to: string;
  value: string;
  timestamp: number;
  status: 'pending' | 'confirmed' | 'failed';
  type: 'sent' | 'received';
}

export default function TransactionHistory() {
  const { address } = useAccount();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Mock transaction data - in production, you'd fetch from Base blockchain
  useEffect(() => {
    if (!address) return;

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockTransactions: Transaction[] = [
        {
          hash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
          from: address,
          to: '0x9876543210fedcba9876543210fedcba9876543210',
          value: '50.00',
          timestamp: Date.now() - 3600000, // 1 hour ago
          status: 'confirmed',
          type: 'sent'
        },
        {
          hash: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
          from: '0x1111111111111111111111111111111111111111',
          to: address,
          value: '25.50',
          timestamp: Date.now() - 7200000, // 2 hours ago
          status: 'confirmed',
          type: 'received'
        },
        {
          hash: '0x2222222222222222222222222222222222222222222222222222222222222222',
          from: address,
          to: '0x3333333333333333333333333333333333333333',
          value: '100.00',
          timestamp: Date.now() - 86400000, // 1 day ago
          status: 'confirmed',
          type: 'sent'
        }
      ];
      
      setTransactions(mockTransactions);
      setIsLoading(false);
    }, 1000);
  }, [address]);

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const formatTimestamp = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    
    if (diff < 60000) return 'Just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    return `${Math.floor(diff / 86400000)}d ago`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'failed': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTypeIcon = (type: string) => {
    return type === 'sent' ? (
      <ArrowUpRight className="w-4 h-4 text-red-500" />
    ) : (
      <ArrowDownLeft className="w-4 h-4 text-green-500" />
    );
  };

  if (!address) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <div className="text-center text-gray-500">
          Connect your wallet to view transaction history
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
        <Clock className="w-5 h-5 text-gray-400" />
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="h-16 bg-gray-200 rounded-xl"></div>
            </div>
          ))}
        </div>
      ) : transactions.length === 0 ? (
        <div className="text-center py-8">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Clock className="w-6 h-6 text-gray-400" />
          </div>
          <p className="text-gray-500">No transactions yet</p>
          <p className="text-sm text-gray-400">Your USDC transfers will appear here</p>
        </div>
      ) : (
        <div className="space-y-3">
          {transactions.map((tx, index) => (
            <motion.div
              key={tx.hash}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                  {getTypeIcon(tx.type)}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-gray-900">
                      {tx.type === 'sent' ? 'Sent' : 'Received'}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(tx.status)}`}>
                      {tx.status}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500">
                    {tx.type === 'sent' ? `To: ${formatAddress(tx.to)}` : `From: ${formatAddress(tx.from)}`}
                  </div>
                  <div className="text-xs text-gray-400 flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{formatTimestamp(tx.timestamp)}</span>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className={`font-semibold ${tx.type === 'sent' ? 'text-red-600' : 'text-green-600'}`}>
                  {tx.type === 'sent' ? '-' : '+'}{tx.value} USDC
                </div>
                <a
                  href={`https://basescan.org/tx/${tx.hash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1 text-xs text-blue-600 hover:text-blue-700"
                >
                  <span>View</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {transactions.length > 0 && (
        <div className="mt-6 pt-4 border-t border-gray-200">
          <a
            href={`https://basescan.org/address/${address}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-600 hover:text-blue-700 flex items-center justify-center space-x-1"
          >
            <span>View all transactions on BaseScan</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      )}
    </div>
  );
}