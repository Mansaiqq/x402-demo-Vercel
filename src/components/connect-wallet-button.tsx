'use client'

import { useAccount, useConnect, useDisconnect } from 'wagmi'

export function ConnectWalletButton() {
  const { address, isConnected } = useAccount()
  const { connect, connectors } = useConnect()
  const { disconnect } = useDisconnect()

  if (isConnected && address) {
    return (
      <div className="flex flex-col items-center gap-4">
        <p className="text-sm text-gray-600">
          Connected: <span className="font-mono font-semibold">{address.slice(0, 6)}...{address.slice(-4)}</span>
        </p>
        <button
          onClick={() => disconnect()}
          className="px-6 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors"
        >
          Disconnect Wallet
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <button
        onClick={() => {
          const injectedConnector = connectors.find(c => c.id === 'injected')
          if (injectedConnector) {
            connect({ connector: injectedConnector })
          }
        }}
        className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors"
      >
        Connect Wallet
      </button>
    </div>
  )
}
