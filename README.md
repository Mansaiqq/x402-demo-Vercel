# x402 Payment Protocol Demo

Official implementation of the x402 Payment Protocol - a Web3 payment system using HTTP 402 status codes for payment requirements.

## 🚀 Features

- **x402 Protocol Implementation**: Full implementation of HTTP 402 Payment Required
- **MetaMask Integration**: Signature-based payment authorization
- **ETH Payments**: Real Sepolia Testnet transactions
- **Signature Verification**: Two-factor authentication (signature + transaction)
- **Transaction Tracking**: View payments on Etherscan
- **Modern UI**: Clean, responsive interface with Tailwind CSS

## 🛠️ Tech Stack

- **Next.js 15.5.6** - React framework with App Router
- **wagmi v2** - React Hooks for Ethereum
- **viem v2** - TypeScript Ethereum library
- **x402 Package** - Official x402 protocol types
- **Tailwind CSS v3** - Utility-first CSS framework
- **TypeScript** - Type-safe development

## 📋 Prerequisites

- Node.js 18+ and npm
- MetaMask wallet extension
- Sepolia Testnet ETH (get from [Sepolia Faucet](https://sepoliafaucet.com/))
- WalletConnect Project ID (get from [WalletConnect Cloud](https://cloud.walletconnect.com))

## 🔧 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd x402-demo-Vercel
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env.local` file:
```bash
cp .env.example .env.local
```

4. Configure environment variables in `.env.local`:
```env
NEXT_PUBLIC_FIXED_ADDRESS=0xYourWalletAddress
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id
```

5. Run development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000)

## 🌐 Deploying to Vercel

### Option 1: Deploy with Vercel CLI

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

3. Add environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_FIXED_ADDRESS`
   - `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`

### Option 2: Deploy via GitHub

1. Push to GitHub:
```bash
git add .
git commit -m "Add x402 protocol implementation"
git push origin main
```

2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Add environment variables
6. Click "Deploy"

## 🔄 How x402 Protocol Works

1. **Client requests protected resource** → Server returns `402 Payment Required`
2. **User signs payment authorization message** (no gas required)
3. **User sends ETH transaction** to recipient address
4. **Server verifies signature and payment** → Grants access to content

## 📁 Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── protected/         # x402 protected endpoint
│   ├── x402-demo/            # Demo page
│   ├── layout.tsx            # Root layout with providers
│   └── page.tsx              # Home page (redirects to demo)
├── components/
│   ├── connect-wallet-button.tsx  # Wallet connection
│   └── x402-payment-button.tsx    # Payment flow
├── lib/
│   ├── providers.tsx         # wagmi/WalletConnect providers
│   └── x402/
│       └── utils.ts          # x402 utility functions
└── wagmi.ts                  # wagmi configuration
```

## 🔑 Key Files

- **[/src/app/api/protected/route.ts](src/app/api/protected/route.ts)** - x402 protocol implementation
- **[/src/components/x402-payment-button.tsx](src/components/x402-payment-button.tsx)** - Payment flow
- **[/src/lib/x402/utils.ts](src/lib/x402/utils.ts)** - Payment requirements creation

## 🧪 Testing

1. Connect MetaMask to Sepolia Testnet
2. Get test ETH from [Sepolia Faucet](https://sepoliafaucet.com/)
3. Visit the demo page
4. Click "Connect Wallet"
5. Click "Pay with x402"
6. Sign the authorization message
7. Confirm the ETH transaction
8. Wait for confirmation
9. Access premium content!

## 📝 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_FIXED_ADDRESS` | Wallet address for receiving payments | Yes |
| `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` | WalletConnect project ID | Yes |
| `X402_FACILITATOR_URL` | x402 Facilitator URL (optional) | No |

## 🐛 Troubleshooting

### Transaction Failed
- Make sure you have enough Sepolia ETH
- Check MetaMask is connected to Sepolia Testnet

### Signature Verification Failed
- Refresh the page and start over
- Make sure the same wallet signs and sends transaction

### Build Errors
- Delete `.next` folder and `node_modules`
- Run `npm install` again
- Try `npm run build`

## 📄 License

MIT

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## 🔗 Links

- [x402 Protocol Documentation](https://x402.org)
- [wagmi Documentation](https://wagmi.sh)
- [Next.js Documentation](https://nextjs.org/docs)
- [Sepolia Faucet](https://sepoliafaucet.com/)

---

Built with ❤️ using x402 Protocol
