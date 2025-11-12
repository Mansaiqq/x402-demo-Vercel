# x402 Payment Protocol Demo

x402 Payment Protocolの公式実装 - HTTP 402ステータスコードを使用したWeb3決済システム

## 🚀 機能

- **x402プロトコル実装**: HTTP 402 Payment Requiredの完全実装
- **MetaMask統合**: 署名ベースの支払い承認
- **ETH決済**: Sepolia Testnetでの実際のトランザクション
- **署名検証**: 二要素認証（署名 + トランザクション）
- **トランザクション追跡**: Etherscanで支払いを確認
- **モダンUI**: Tailwind CSSによるクリーンでレスポンシブなインターフェース

## 🛠️ 技術スタック

- **Next.js 15.5.6** - App Routerを使用したReactフレームワーク
- **wagmi v2** - Ethereum用Reactフック
- **viem v2** - TypeScript Ethereumライブラリ
- **x402 Package** - x402プロトコルの公式型定義
- **Tailwind CSS v3** - ユーティリティファーストCSSフレームワーク
- **TypeScript** - 型安全な開発

## 📋 必要要件

- Node.js 18以上とnpm
- MetaMaskウォレット拡張機能
- Sepolia Testnet ETH（[Sepolia Faucet](https://sepoliafaucet.com/)から入手）
- WalletConnect Project ID（[WalletConnect Cloud](https://cloud.walletconnect.com)から取得）

## 🔧 インストール

1. リポジトリをクローン：
```bash
git clone <repository-url>
cd x402-demo-Vercel
```

2. 依存関係をインストール：
```bash
npm install
```

3. `.env.local`ファイルを作成：
```bash
cp .env.example .env.local
```

4. `.env.local`で環境変数を設定：
```env
NEXT_PUBLIC_FIXED_ADDRESS=0xYourWalletAddress
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id
```

5. 開発サーバーを起動：
```bash
npm run dev
```

6. [http://localhost:3000](http://localhost:3000)を開く

## 🌐 Vercelへのデプロイ

### 方法1: Vercel CLIでデプロイ

1. Vercel CLIをインストール：
```bash
npm i -g vercel
```

2. デプロイ：
```bash
vercel
```

3. Vercelダッシュボードで環境変数を追加：
   - `NEXT_PUBLIC_FIXED_ADDRESS`
   - `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`

### 方法2: GitHub経由でデプロイ

1. GitHubにプッシュ：
```bash
git add .
git commit -m "Add x402 protocol implementation"
git push origin main
```

2. [vercel.com](https://vercel.com)にアクセス
3. "New Project"をクリック
4. GitHubリポジトリをインポート
5. 環境変数を追加
6. "Deploy"をクリック

## 🔄 x402プロトコルの仕組み

1. **クライアントが保護されたリソースをリクエスト** → サーバーが`402 Payment Required`を返す
2. **ユーザーが支払い承認メッセージに署名** （ガス代不要）
3. **ユーザーがETHトランザクションを送信** 受取アドレスへ
4. **サーバーが署名と支払いを検証** → コンテンツへのアクセスを許可

## 📁 プロジェクト構造

```
src/
├── app/
│   ├── api/
│   │   └── protected/         # x402保護エンドポイント
│   ├── x402-demo/            # デモページ
│   ├── layout.tsx            # プロバイダー付きルートレイアウト
│   └── page.tsx              # ホームページ（デモへリダイレクト）
├── components/
│   ├── connect-wallet-button.tsx  # ウォレット接続
│   └── x402-payment-button.tsx    # 支払いフロー
├── lib/
│   ├── providers.tsx         # wagmi/WalletConnectプロバイダー
│   └── x402/
│       └── utils.ts          # x402ユーティリティ関数
└── wagmi.ts                  # wagmi設定
```

## 🔑 主要ファイル

- **[/src/app/api/protected/route.ts](src/app/api/protected/route.ts)** - x402プロトコル実装
- **[/src/components/x402-payment-button.tsx](src/components/x402-payment-button.tsx)** - 支払いフロー
- **[/src/lib/x402/utils.ts](src/lib/x402/utils.ts)** - Payment Requirements生成

## 🧪 テスト方法

1. MetaMaskをSepolia Testnetに接続
2. [Sepolia Faucet](https://sepoliafaucet.com/)からテストETHを入手
3. デモページにアクセス
4. "Connect Wallet"をクリック
5. "Pay with x402"をクリック
6. 承認メッセージに署名
7. ETHトランザクションを確認
8. 確認を待つ
9. プレミアムコンテンツにアクセス！

## 📝 環境変数

| 変数名 | 説明 | 必須 |
|----------|-------------|----------|
| `NEXT_PUBLIC_FIXED_ADDRESS` | 支払いを受け取るウォレットアドレス | はい |
| `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` | WalletConnectプロジェクトID | はい |
| `X402_FACILITATOR_URL` | x402ファシリテーターURL（オプション） | いいえ |

## 🐛 トラブルシューティング

### トランザクション失敗
- Sepolia ETHが十分にあることを確認
- MetaMaskがSepolia Testnetに接続されているか確認

### 署名検証失敗
- ページをリフレッシュして最初からやり直す
- 同じウォレットで署名とトランザクション送信を行っているか確認

### ビルドエラー
- `.next`フォルダと`node_modules`を削除
- `npm install`を再実行
- `npm run build`を試す

## 📄 ライセンス

MIT

## 🤝 コントリビューション

コントリビューションを歓迎します！IssueやPull Requestをお気軽にどうぞ。

## 🔗 リンク

- [x402プロトコルドキュメント](https://x402.org)
- [wagmiドキュメント](https://wagmi.sh)
- [Next.jsドキュメント](https://nextjs.org/docs)
- [Sepolia Faucet](https://sepoliafaucet.com/)

---

x402 Protocolで❤️を込めて開発
