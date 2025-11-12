'use client'

import { useState } from 'react'
import { ConnectWalletButton } from '@/components/connect-wallet-button'
import { X402PaymentButton } from '@/components/x402-payment-button'
import { useAccount } from 'wagmi'

export default function X402DemoPage() {
  const [content, setContent] = useState<any>(null)
  const { isConnected } = useAccount()

  const handlePaymentSuccess = (data: any) => {
    setContent(data)
  }

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            x402 Protocol Demo
          </h1>
          <p className="text-gray-600">
            Official x402 Payment Protocol Implementation
          </p>
        </div>

        {/* Main Content */}
        <div className="flex flex-col items-center gap-8">
          {/* Connect Wallet Section */}
          {!isConnected && !content && (
            <div className="w-full max-w-md p-6 bg-gray-50 rounded-lg border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 text-center">
                Connect Wallet
              </h2>
              <p className="text-sm text-gray-600 mb-4 text-center">
                Connect your wallet to access protected content
              </p>
              <ConnectWalletButton />
            </div>
          )}

          {/* Payment Section */}
          {isConnected && !content && (
            <div className="w-full max-w-md p-6 bg-gray-50 rounded-lg border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 text-center">
                Access Protected Content
              </h2>
              <p className="text-sm text-gray-600 mb-4 text-center">
                This content requires payment via the x402 protocol
              </p>
              <X402PaymentButton onSuccess={handlePaymentSuccess} />
            </div>
          )}

          {/* Content Display */}
          {content && (
            <div className="w-full max-w-3xl">
              {/* Success Header */}
              <div className="p-8 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg border-2 border-green-200 mb-6">
                <div className="text-center mb-6">
                  <div className="text-6xl mb-4">✅</div>
                  <h2 className="text-3xl font-bold text-green-700 mb-2">
                    Payment Successful!
                  </h2>
                  <p className="text-gray-600 text-lg">
                    You now have access to the premium content
                  </p>
                </div>

                {/* Transaction Details */}
                {content.content?.data?.txHash && (
                  <div className="bg-white p-6 rounded-lg shadow-sm mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Transaction Details
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Transaction Hash:</span>
                        <a
                          href={`https://sepolia.etherscan.io/tx/${content.content.data.txHash}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-mono text-blue-600 hover:text-blue-800 underline"
                        >
                          {content.content.data.txHash.slice(0, 10)}...{content.content.data.txHash.slice(-8)}
                        </a>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Network:</span>
                        <span className="text-sm font-semibold text-gray-800">Sepolia Testnet</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Timestamp:</span>
                        <span className="text-sm text-gray-800">
                          {new Date(content.content.data.timestamp).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Premium Content */}
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {content.content?.title}
                  </h3>
                  <p className="text-gray-700 mb-4">
                    {content.content?.description}
                  </p>

                  {content.content?.data && (
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg border-2 border-purple-200">
                      <div className="text-center">
                        <p className="text-lg font-semibold text-purple-900 mb-2">
                          🎉 Exclusive Content Unlocked
                        </p>
                        <p className="text-md text-gray-800 font-mono bg-white px-4 py-3 rounded">
                          {content.content.data.secret}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex gap-4 justify-center">
                  <a
                    href={`https://sepolia.etherscan.io/tx/${content.content?.data?.txHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    View on Etherscan
                  </a>
                  <button
                    onClick={() => setContent(null)}
                    className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    Start Over
                  </button>
                </div>
              </div>

              {/* Additional Info */}
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="text-sm font-semibold text-blue-900 mb-2">
                  How x402 Protocol Works
                </h4>
                <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
                  <li>Client requests protected resource → Server returns 402 Payment Required</li>
                  <li>User signs payment authorization message (no gas required)</li>
                  <li>User sends ETH transaction to recipient address</li>
                  <li>Server verifies signature and payment → Grants access to content</li>
                </ol>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-16 text-center text-sm text-gray-500">
          <p>x402 Protocol Demo - Official Implementation</p>
          <p>Using Sepolia Testnet for payments</p>
        </div>
      </div>
    </div>
  )
}
