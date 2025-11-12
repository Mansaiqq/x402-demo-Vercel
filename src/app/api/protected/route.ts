import { NextRequest, NextResponse } from 'next/server'
import { Network, Resource } from 'x402/types'
import { getX402Version, createExactPaymentRequirement } from '@/lib/x402/utils'
import { verifyMessage } from 'viem'

/**
 * Protected route
 * Receives request and returns data if payment is made.
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
  // Set price
  const multiplier = parseInt(
    (request.nextUrl.searchParams.get('multiplier') as string) ?? '1'
  )
  const price = 0.001 * multiplier

  const resource = 'http://localhost:3000/api/protected' as Resource

  const paymentRequirements = createExactPaymentRequirement(
    price,
    'base-sepolia' as Network,
    resource,
    'Access to premium content'
  )

  // Get payment payload from headers
  const paymentHeader = request.headers.get('x-payment')

  if (!paymentHeader) {
    // No payment provided, return 402 Payment Required
    return NextResponse.json(
      {
        x402Version: getX402Version(),
        error: 'Payment required',
        accepts: [paymentRequirements],
      },
      { status: 402 }
    )
  }

  try {
    const paymentPayload = JSON.parse(paymentHeader)
    console.log('Payment payload received:', paymentPayload)

    // Verify signature locally (without facilitator)
    const { signature, message, from } = paymentPayload

    if (!signature || !message || !from) {
      return NextResponse.json(
        {
          x402Version: getX402Version(),
          error: 'Invalid payment payload',
          accepts: [paymentRequirements],
        },
        { status: 402 }
      )
    }

    // Verify the signature
    const isValid = await verifyMessage({
      address: from as `0x${string}`,
      message,
      signature: signature as `0x${string}`,
    })

    console.log('Signature verification:', { isValid, from, message })

    if (!isValid) {
      return NextResponse.json(
        {
          x402Version: getX402Version(),
          error: 'Invalid signature',
          accepts: [paymentRequirements],
        },
        { status: 402 }
      )
    }

    // In a real implementation, you would verify the transaction on-chain here
    // For demo purposes, we'll accept the payment if signature is valid

    // Return protected content
    return NextResponse.json(
      {
        success: true,
        message: 'Payment verified successfully',
        content: {
          title: 'Premium Content',
          description: 'This is exclusive content available only after payment.',
          data: {
            secret: 'You have successfully accessed the protected content!',
            timestamp: new Date().toISOString(),
            txHash: paymentPayload.txHash,
          },
        },
      },
      {
        status: 200,
      }
    )
  } catch (e) {
    console.error('Payment verification error:', e)
    return NextResponse.json(
      {
        x402Version: getX402Version(),
        error: 'Payment verification failed',
        accepts: [paymentRequirements],
      },
      { status: 402 }
    )
  }
}
