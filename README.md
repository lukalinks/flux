# Base USDC Spender

A fast and user-friendly mini app for sending USDC on the Base blockchain directly to mobile numbers using Lens Protocol integration.

## Features

- 🚀 **Lightning Fast**: Instant USDC transfers on Base blockchain
- 📱 **Mobile First**: Send to any mobile number, no wallet address needed
- 💰 **USDC Stable**: 1:1 USD backed stablecoin for reliable payments
- 🔗 **Farcaster Integration**: Phone number resolution through Farcaster profiles
- ⚡ **Base Powered**: Built on Base L2 for ultra-fast, low-cost transactions
- 📊 **Transaction History**: View all your recent transfers
- 🎨 **Modern UI**: Beautiful, responsive design with smooth animations

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **Blockchain**: Wagmi, Viem, RainbowKit
- **Network**: Base (Coinbase's L2)
- **Protocol**: Farcaster for social profiles and phone number resolution
- **Base Integration**: Base SDK for blockchain operations
- **UI Components**: Lucide React icons, React Hot Toast

## Prerequisites

- Node.js 18+ 
- npm or yarn
- MetaMask or any Web3 wallet
- Base network configured in your wallet

## Setup Instructions

### 1. Clone and Install

```bash
git clone <repository-url>
cd base-usdc-spender
npm install
```

### 2. Environment Variables

Create a `.env.local` file in the root directory:

```env
# WalletConnect Project ID (get from https://cloud.walletconnect.com/)
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id

# Farcaster API Key (get from https://warpcast.com/~/developers)
NEXT_PUBLIC_FARCASTER_API_KEY=your_farcaster_api_key

# Base RPC URL (optional, uses public RPC by default)
NEXT_PUBLIC_BASE_RPC_URL=https://mainnet.base.org
```

### 3. Configure Base Network

Add Base network to your wallet:

- **Network Name**: Base
- **RPC URL**: https://mainnet.base.org
- **Chain ID**: 8453
- **Currency Symbol**: ETH
- **Block Explorer**: https://basescan.org

### 4. Get USDC on Base

You can get USDC on Base through:
- [Coinbase](https://www.coinbase.com/) - Direct purchase
- [Uniswap](https://app.uniswap.org/) - Swap ETH for USDC
- [Base Bridge](https://bridge.base.org/) - Bridge from Ethereum mainnet

### 5. Run the App

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### Sending USDC

1. **Connect Wallet**: Click "Connect Wallet" and approve the connection
2. **Enter Phone Number**: Input the recipient's phone number (international format)
3. **Resolve Address**: Click "Resolve" to find the recipient's wallet address
4. **Enter Amount**: Specify the USDC amount you want to send
5. **Send**: Click "Send USDC" and confirm the transaction in your wallet

### Phone Number Resolution

The app uses Farcaster to resolve phone numbers to wallet addresses:

- Users can associate their phone number with their Farcaster profile
- The app searches Farcaster profiles to find matching phone numbers
- If found, the associated wallet address is used for the transfer

### Transaction History

- View all your recent USDC transfers
- See transaction status (pending, confirmed, failed)
- Click "View" to see transaction details on BaseScan
- Filter by sent/received transactions

## Smart Contract Details

### USDC Contract on Base

- **Address**: `0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913`
- **Decimals**: 6
- **Standard**: ERC-20

### Functions Used

- `transfer(address to, uint256 amount)` - Transfer USDC to another address
- `balanceOf(address account)` - Get USDC balance of an account

## Farcaster Integration

The app integrates with Farcaster for phone number resolution and social features:

### API Endpoints

- **Search Profiles**: Query Farcaster profiles by username or FID
- **Get Profile**: Retrieve profile details and verified addresses
- **Social Features**: Integration with Farcaster's social network

### Profile Structure

```typescript
interface FarcasterProfile {
  fid: number;
  username: string;
  displayName: string;
  pfp: string;
  verifiedAddresses: string[];
  phoneNumber?: string;
}
```

## Development

### Project Structure

```
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Main page
│   └── providers.tsx      # Web3 providers
├── components/            # React components
│   ├── USDCSpender.tsx   # Main USDC transfer interface
│   ├── TransactionHistory.tsx # Transaction history
│   ├── FarcasterService.ts # Farcaster integration
│   └── BaseService.ts    # Base blockchain operations
├── public/               # Static assets
└── package.json          # Dependencies
```

### Key Components

- **USDCSpender**: Main transfer interface with phone number input
- **TransactionHistory**: Displays recent transactions
- **FarcasterService**: Handles phone number resolution via Farcaster
- **BaseService**: Manages Base blockchain operations and USDC interactions

### Adding Features

1. **New Networks**: Add chain configuration in `providers.tsx`
2. **Additional Tokens**: Update contract addresses and ABIs
3. **Enhanced UI**: Modify components in the `components/` directory
4. **Backend Integration**: Add API routes in `app/api/`

## Security Considerations

- Always verify transaction details before confirming
- Use hardware wallets for large amounts
- Keep your private keys secure
- Verify contract addresses on BaseScan
- Be cautious of phishing attempts

## Troubleshooting

### Common Issues

1. **"Insufficient Balance"**
   - Ensure you have enough USDC in your wallet
   - Check that you're on the Base network

2. **"Phone Number Not Found"**
   - Verify the phone number format
   - Check if the recipient has a Farcaster profile
   - Try entering the wallet address directly

3. **"Transaction Failed"**
   - Ensure you have enough ETH for gas fees
   - Check Base network status
   - Verify the recipient address is valid

4. **"Wallet Not Connected"**
   - Refresh the page and reconnect
   - Check if your wallet supports Base network
   - Try a different wallet

### Support

For issues and questions:
- Check the [Base documentation](https://docs.base.org/)
- Visit [Farcaster docs](https://docs.farcaster.xyz/)
- Open an issue in this repository

## License

MIT License - see LICENSE file for details.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

---

Built with ❤️ for the Base ecosystem