'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

function ContentPageInner() {
  const searchParams = useSearchParams()
  const txHash = searchParams.get('txHash')
  const [content, setContent] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchContent = async () => {
      if (!txHash) {
        setError('No transaction hash provided')
        setLoading(false)
        return
      }

      try {
        const response = await fetch(`/api/content?txHash=${txHash}`)
        const data = await response.json()

        if (response.status === 402) {
          // Payment required
          setError('Payment required to access this content')
        } else if (data.success) {
          setContent(data.content)
        } else {
          setError('Failed to load content')
        }
      } catch (err) {
        console.error('Error fetching content:', err)
        setError('Failed to load content')
      } finally {
        setLoading(false)
      }
    }

    fetchContent()
  }, [txHash])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading content...</p>
        </div>
      </div>
    )
  }

  if (error || !content) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="text-6xl mb-4">⛔</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors"
          >
            Go to Payment Page
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Main Congrats Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-12 text-center mb-6 transform hover:scale-105 transition-transform duration-300">
          {/* Animated Confetti Icon */}
          <div className="text-8xl mb-6 animate-bounce">
            🎉
          </div>

          {/* Title */}
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600 mb-4">
            {content.title}
          </h1>

          {/* Message */}
          <p className="text-xl text-gray-700 mb-6">
            {content.message}
          </p>

          {/* Details */}
          <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-lg p-6 mb-6">
            <p className="text-gray-800 font-medium">
              {content.details}
            </p>
          </div>

          {/* Transaction Details */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
            <h3 className="text-sm font-semibold text-gray-600 mb-2">Payment Details</h3>
            <div className="space-y-2">
              <div>
                <span className="text-xs text-gray-500">Transaction Hash:</span>
                <a
                  href={`https://sepolia.etherscan.io/tx/${txHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-xs font-mono text-blue-600 hover:text-blue-800 break-all"
                >
                  {txHash}
                </a>
              </div>
              <div>
                <span className="text-xs text-gray-500">Unlocked at:</span>
                <p className="text-sm font-mono text-gray-700">
                  {new Date(content.timestamp).toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          {/* Premium Content Section */}
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-8 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              🔓 Premium Content Unlocked
            </h2>
            <p className="text-gray-700 mb-4">
              You now have access to exclusive content! This is just a demo, but in a real application,
              this could be:
            </p>
            <ul className="text-left space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span>Exclusive articles and tutorials</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span>Premium video courses</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span>Downloadable resources and templates</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span>Access to private community</span>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center">
            <Link
              href="/"
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
            >
              Make Another Payment
            </Link>
          </div>
        </div>

        {/* x402 Protocol Badge */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-white rounded-full px-6 py-3 shadow-md">
            <span className="text-2xl">🔐</span>
            <div className="text-left">
              <p className="text-xs text-gray-500">Powered by</p>
              <p className="text-sm font-bold text-gray-900">x402 Protocol</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ContentPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading content...</p>
        </div>
      </div>
    }>
      <ContentPageInner />
    </Suspense>
  )
}
