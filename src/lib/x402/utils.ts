import { Network, PaymentRequirements, Resource } from 'x402/types'
import { parseEther } from 'viem'

/**
 * Get the x402 protocol version
 */
export function getX402Version(): string {
  return '0.1.0'
}

/**
 * Get the recipient address for payments
 */
export function getRecipientAddress(): string {
  return process.env.NEXT_PUBLIC_FIXED_ADDRESS || ''
}

/**
 * Create an exact payment requirement
 */
export function createExactPaymentRequirement(
  priceInEth: number,
  network: Network,
  resource: Resource,
  description?: string
): PaymentRequirements {
  const amountInWei = parseEther(priceInEth.toString())

  return {
    scheme: 'exact' as const,
    network,
    maxAmountRequired: amountInWei.toString(),
    resource,
    description: description || 'Payment required for access',
    mimeType: 'application/json',
    payTo: getRecipientAddress(),
    maxTimeoutSeconds: 300, // 5 minutes
    asset: 'ETH',
  }
}
