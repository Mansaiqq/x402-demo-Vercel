import { NextRequest, NextResponse } from 'next/server'
import { getTransactionStatus } from '@/lib/etherscan'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const txHash = searchParams.get('txHash')

  if (!txHash) {
    return NextResponse.json(
      { error: 'Transaction hash is required' },
      { status: 400 }
    )
  }

  try {
    const success = await getTransactionStatus(txHash)
    return NextResponse.json({ success })
  } catch (error) {
    console.error('Error checking transaction status:', error)
    return NextResponse.json(
      { error: 'Failed to check transaction status' },
      { status: 500 }
    )
  }
}
