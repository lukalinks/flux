'use client';

import { 
  Swap, 
  SwapAmountInput, 
  SwapToggleButton, 
  SwapButton, 
  SwapMessage, 
  SwapToast 
} from '@coinbase/onchainkit/swap';
import type { Token } from '@coinbase/onchainkit/token';

// Define Base network tokens
const tokens: Token[] = [
  {
    address: "0x4200000000000000000000000000000000000006",
    chainId: 8453,
    decimals: 18,
    name: "Ethereum",
    symbol: "ETH",
    image: "https://assets.coingecko.com/coins/images/279/small/ethereum.png",
  },
  {
    address: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
    chainId: 8453,
    decimals: 6,
    name: "USD Coin",
    symbol: "USDC",
    image: "https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png",
  }
];

export function SwapInterface() {
  return (
    <div className="p-6 rounded-2xl bg-gray-800/50 backdrop-blur-sm border border-gray-700">
      <Swap>
        <div className="space-y-4">
          {/* From Token Input */}
          <div className="p-4 rounded-lg bg-gray-900/50 border border-gray-700">
            <SwapAmountInput
              label="From"
              type="from"
              swappableTokens={tokens}
              className="w-full bg-transparent"
            />
          </div>

          {/* Swap Direction Button */}
          <div className="flex justify-center">
            <SwapToggleButton className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 border border-gray-600" />
          </div>

          {/* To Token Input */}
          <div className="p-4 rounded-lg bg-gray-900/50 border border-gray-700">
            <SwapAmountInput
              label="To"
              type="to"
              swappableTokens={tokens}
              className="w-full bg-transparent"
            />
          </div>

          {/* Messages and Status */}
          <div className="text-sm text-gray-400">
            <SwapMessage />
          </div>

          {/* Swap Button */}
          <SwapButton className="w-full px-8 py-4 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300" />
        </div>

        <SwapToast />
      </Swap>
    </div>
  );
}