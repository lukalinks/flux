'use client';

import * as React from 'react';
import {
  RainbowKitProvider,
  getDefaultWallets,
  darkTheme,
} from '@rainbow-me/rainbowkit';
import { createConfig, WagmiConfig } from 'wagmi';
import { mainnet, baseGoerli } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createPublicClient, http, Chain } from 'viem';
import { OnchainKitProvider } from '@coinbase/onchainkit';

const projectId = 'YOUR_WALLETCONNECT_PROJECT_ID';

// Define supported chains
const chains = [mainnet, baseGoerli] as const;

// Get wallets
const { wallets } = getDefaultWallets({
  appName: 'FLUX',
  projectId: projectId,
});

// Create wagmi config
const wagmiConfig = createConfig({
  chains,
  transports: {
    [mainnet.id]: http(),
    [baseGoerli.id]: http(),
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
          theme={darkTheme()}
          modalSize="compact"
        >
          <OnchainKitProvider
            config={{
              appearance: {
                name: 'FLUX',
                mode: 'dark',
                theme: 'default',
              },
            }}
            chain={baseGoerli as Chain}
          >
            {children}
          </OnchainKitProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiConfig>
  );
}
