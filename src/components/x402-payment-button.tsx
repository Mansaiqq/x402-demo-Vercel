'use client'

import { useState } from 'react'
import { useSignMessage, useSendTransaction, useAccount, useConnect } from 'wagmi'
import { injected } from 'wagmi/connectors'

interface X402PaymentButtonProps {
  onSuccess?: (content: any) => void
}

export function X402PaymentButton({ onSuccess }: X402PaymentButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [paymentRequirements, setPaymentRequirements] = useState<any>(null)

  const { address, isConnected } = useAccount()
  const { connectAsync } = useConnect()
  const { signMessageAsync } = useSignMessage()
  const { sendTransactionAsync } = useSendTransaction()

  const handlePayment = async () => {

    try {
      setIsLoading(true)
      setError(null)

      // Step 0: Connect wallet if not connected
      let currentAddress = address
      if (!isConnected || !currentAddress) {
        console.log('Step 0: Connecting wallet...')
        const result = await connectAsync({ connector: injected() })
        currentAddress = result.accounts[0]
        console.log('Connected with address:', currentAddress)
      }

      // Step 1: Request the protected resource to get payment requirements
      console.log('Step 1: Requesting protected resource...')
      const initialResponse = await fetch('/api/protected')

      if (initialResponse.status === 402) {
        const x402Response = await initialResponse.json()
        console.log('Received 402 Payment Required:', x402Response)
        setPaymentRequirements(x402Response.accepts[0])

        // Step 2: Create payment payload
        const requirement = x402Response.accepts[0]
        const amount = requirement.maxAmountRequired // atomic amount in wei

        // Step 3: Sign payment authorization message
        console.log('Step 2: Signing payment authorization...')
        const message = `x402 Payment Authorization

I authorize payment for:
Resource: ${requirement.resource}
Amount: ${amount} wei
Recipient: ${requirement.payTo}
Network: ${requirement.network}
Description: ${requirement.description}

Signing this message authorizes the payment but does not execute the transaction.`

        const signature = await signMessageAsync({ message })
        console.log('Signature obtained:', signature)

        // Step 4: Send transaction
        console.log('Step 3: Sending transaction...')
        const txHash = await sendTransactionAsync({
          to: requirement.payTo as `0x${string}`,
          value: BigInt(amount),
        })
        console.log('Transaction sent:', txHash)

        // Step 5: Create payment payload
        const paymentPayload = {
          txHash,
          from: currentAddress,
          to: requirement.payTo,
          amount: amount.toString(),
          network: requirement.network,
          signature,
          message,
        }

        // Step 6: Wait for transaction confirmation (simplified for demo)
        console.log('Step 4: Waiting for transaction confirmation...')
        await new Promise(resolve => setTimeout(resolve, 10000))

        // Step 7: Request protected resource with payment proof
        console.log('Step 5: Requesting protected resource with payment...')
        const verifyResponse = await fetch('/api/protected', {
          headers: {
            'x-payment': JSON.stringify(paymentPayload),
          },
        })

        if (verifyResponse.ok) {
          const content = await verifyResponse.json()
          console.log('✅ Payment verified! Content accessed:', content)
          if (onSuccess) {
            onSuccess(content)
          }
        } else {
          const errorData = await verifyResponse.json()
          throw new Error(errorData.error || 'Payment verification failed')
        }
      } else {
        throw new Error('Expected 402 response but got: ' + initialResponse.status)
      }
    } catch (err) {
      console.error('Payment failed:', err)
      setError(err instanceof Error ? err.message : 'Payment failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-4">
      {paymentRequirements && (
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h4 className="font-semibold text-blue-900 mb-2">Payment Required</h4>
          <p className="text-sm text-blue-700">
            <strong>Amount:</strong> {(parseInt(paymentRequirements.maxAmountRequired) / 1e18).toFixed(4)} ETH
          </p>
          <p className="text-sm text-blue-700">
            <strong>Recipient:</strong> {paymentRequirements.payTo?.slice(0, 10)}...{paymentRequirements.payTo?.slice(-8)}
          </p>
          <p className="text-sm text-blue-700">
            <strong>Network:</strong> {paymentRequirements.network}
          </p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 p-4 rounded-lg border border-red-200">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      <button
        onClick={handlePayment}
        disabled={isLoading}
        className="w-full px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 disabled:bg-gray-300 transition-colors"
      >
        {isLoading ? 'Processing Payment...' : 'Pay with x402'}
      </button>
    </div>
  )
}
