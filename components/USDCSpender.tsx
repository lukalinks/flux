'use client';

import { useState, useEffect } from 'react';
import { useAccount, useBalance, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther, formatEther } from 'viem';
import { motion } from 'framer-motion';
import { Send, DollarSign, Smartphone, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import PhoneInput from './PhoneInput';
import toast, { Toaster } from 'react-hot-toast';

// Base USDC contract address
const USDC_CONTRACT = '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913' as const;
const USDC_ABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "transfer",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
] as const;

import { lensService, type LensProfile } from './LensService';

export default function USDCSpender() {
  const { address, isConnected } = useAccount();
  const [amount, setAmount] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [recipientAddress, setRecipientAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isResolving, setIsResolving] = useState(false);

  // Get USDC balance
  const { data: usdcBalance } = useBalance({
    address,
    token: USDC_CONTRACT,
    watch: true,
  });

  // Contract write
  const { data: hash, writeContract, isPending } = useWriteContract();

  // Wait for transaction
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  // Resolve phone number to wallet address using Lens Protocol
  const resolvePhoneNumber = async (phone: string) => {
    if (!phone) return;
    
    setIsResolving(true);
    try {
      const result = await lensService.searchByPhoneNumber(phone);
      
      if (result.success && result.address) {
        setRecipientAddress(result.address);
        toast.success(`Found recipient: ${result.profile?.metadata?.displayName || result.profile?.handle || 'Unknown'}`);
      } else {
        toast.error(result.error || 'Could not resolve phone number');
      }
    } catch (error) {
      console.error('Error resolving phone number:', error);
      toast.error('Could not resolve phone number. Please try again.');
    } finally {
      setIsResolving(false);
    }
  };

  // Handle phone number change
  const handlePhoneChange = (value: string | undefined) => {
    setPhoneNumber(value || '');
    setRecipientAddress(''); // Clear previous recipient
  };

  // Handle send transaction
  const handleSend = async () => {
    if (!isConnected) {
      toast.error('Please connect your wallet first');
      return;
    }

    if (!amount || !recipientAddress) {
      toast.error('Please enter amount and recipient');
      return;
    }

    if (!usdcBalance || parseFloat(amount) > parseFloat(formatEther(usdcBalance.value))) {
      toast.error('Insufficient USDC balance');
      return;
    }

    try {
      setIsLoading(true);
      
      // Convert amount to USDC (6 decimals)
      const amountInWei = parseEther(amount);
      
      writeContract({
        address: USDC_CONTRACT,
        abi: USDC_ABI,
        functionName: 'transfer',
        args: [recipientAddress, amountInWei],
      });
      
    } catch (error) {
      console.error('Error sending transaction:', error);
      toast.error('Transaction failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle successful transaction
  useEffect(() => {
    if (isSuccess) {
      toast.success('USDC sent successfully!');
      setAmount('');
      setPhoneNumber('');
      setRecipientAddress('');
    }
  }, [isSuccess]);

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-8">
      <Toaster position="top-right" />
      
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Send className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Send USDC</h3>
        <p className="text-gray-600">Transfer USDC instantly on Base blockchain</p>
      </div>

      {/* Balance Display */}
      {isConnected && usdcBalance && (
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <DollarSign className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-medium text-gray-700">USDC Balance</span>
            </div>
            <span className="text-lg font-bold text-gray-900">
              {parseFloat(formatEther(usdcBalance.value)).toFixed(2)} USDC
            </span>
          </div>
        </div>
      )}

      {/* Phone Number Input */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Recipient Phone Number
        </label>
        <div className="relative">
          <PhoneInput
            value={phoneNumber}
            onChange={handlePhoneChange}
            placeholder="Enter phone number"
            className="w-full"
          />
          {phoneNumber && !recipientAddress && (
            <button
              onClick={() => resolvePhoneNumber(phoneNumber)}
              disabled={isResolving}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-600 disabled:opacity-50"
            >
              {isResolving ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                'Resolve'
              )}
            </button>
          )}
        </div>
      </div>

      {/* Recipient Address Display */}
      {recipientAddress && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mb-6"
        >
          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium text-green-800">Recipient Found</span>
            </div>
            <p className="text-xs text-green-700 mt-1 font-mono">
              {recipientAddress}
            </p>
          </div>
        </motion.div>
      )}

      {/* Amount Input */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Amount (USDC)
        </label>
        <div className="relative">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            step="0.01"
            min="0"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12"
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <DollarSign className="w-5 h-5 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Send Button */}
      <button
        onClick={handleSend}
        disabled={!isConnected || !amount || !recipientAddress || isLoading || isPending || isConfirming}
        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2"
      >
        {isLoading || isPending || isConfirming ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>
              {isConfirming ? 'Confirming...' : 'Sending...'}
            </span>
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            <span>Send USDC</span>
          </>
        )}
      </button>

      {/* Transaction Status */}
      {hash && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-xl"
        >
          <div className="flex items-center space-x-2">
            <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
            <span className="text-sm text-blue-800">
              Transaction Hash: {hash.slice(0, 10)}...{hash.slice(-8)}
            </span>
          </div>
        </motion.div>
      )}

      {/* Success Message */}
      {isSuccess && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl"
        >
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-sm font-medium text-green-800">
              Transaction successful! USDC has been sent.
            </span>
          </div>
        </motion.div>
      )}

      {/* Connect Wallet Prompt */}
      {!isConnected && (
        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-5 h-5 text-yellow-600" />
            <span className="text-sm text-yellow-800">
              Please connect your wallet to send USDC
            </span>
          </div>
        </div>
      )}
    </div>
  );
}