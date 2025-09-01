'use client';

import * as React from 'react';
import {
  RainbowKitProvider,
  getDefaultWallets,
  lightTheme,
} from '@rainbow-me/rainbowkit';
import { createConfig, WagmiConfig } from 'wagmi';
import { base } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createPublicClient, http, Chain } from 'viem';
import { OnchainKitProvider } from '@coinbase/onchainkit';

const projectId = 'YOUR_WALLETCONNECT_PROJECT_ID';

// Define supported chains - using Base mainnet
const chains = [base] as const;

// Get wallets
const { wallets } = getDefaultWallets({
  appName: 'Base USDC Spender',
  projectId: projectId,
});

// Create wagmi config
const wagmiConfig = createConfig({
  chains,
  transports: {
    [base.id]: http(),
  },
});

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <WagmiConfig config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={lightTheme({
            accentColor: '#3B82F6',
            accentColorForeground: 'white',
            borderRadius: 'medium',
            fontStack: 'system',
            overlayBlur: 'small',
          })}
          modalSize="compact"
          chains={chains}
        >
          <OnchainKitProvider
            config={{
              appearance: {
                name: 'Base USDC Spender',
                mode: 'light',
                theme: 'default',
              },
            }}
            chain={base as Chain}
          >
            {children}
          </OnchainKitProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiConfig>
  );
}
