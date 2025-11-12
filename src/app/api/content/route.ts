import { NextRequest, NextResponse } from 'next/server'
import { verifyAccessToken, generateX402Response } from '@/lib/x402'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const txHash = searchParams.get('txHash')

  // Check if payment proof exists
  if (!txHash || !verifyAccessToken(txHash)) {
    // Return 402 Payment Required response
    const x402Response = generateX402Response('premium-content')
    return NextResponse.json(x402Response, { status: 402 })
  }

  // Payment verified - return content
  return NextResponse.json({
    success: true,
    content: {
      title: 'Congratulations! 🎉',
      message: 'You have successfully unlocked this premium content!',
      details: 'This content is now available because you completed the payment.',
      timestamp: new Date().toISOString(),
    },
  })
}
