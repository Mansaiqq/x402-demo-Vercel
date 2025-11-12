'use client'

import { WagmiProvider, createConfig, http } from 'wagmi'
import { sepolia } from 'wagmi/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { injected } from 'wagmi/connectors'
import { ReactNode } from 'react'

// Configure wagmi with Sepolia testnet
const config = createConfig({
  chains: [sepolia],
  connectors: [
    injected(), // MetaMask and other injected wallets
  ],
  transports: {
    [sepolia.id]: http(), // Default HTTP transport
  },
})

// Create a client
const queryClient = new QueryClient()

export function WalletProvider({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  )
}
