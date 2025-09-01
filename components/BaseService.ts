// Base SDK service for blockchain operations
export interface BaseTransaction {
  hash: string;
  from: string;
  to: string;
  value: string;
  gasUsed: string;
  gasPrice: string;
  status: 'pending' | 'confirmed' | 'failed';
  blockNumber: number;
  timestamp: number;
}

export interface USDCBalance {
  balance: string;
  decimals: number;
  symbol: string;
  address: string;
}

class BaseService {
  private rpcUrl = process.env.NEXT_PUBLIC_BASE_RPC_URL || 'https://mainnet.base.org';
  private usdcContract = '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913';

  // Get USDC balance for an address
  async getUSDCBalance(address: string): Promise<USDCBalance> {
    try {
      const response = await fetch(this.rpcUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: 'eth_call',
          params: [
            {
              to: this.usdcContract,
              data: '0x70a08231' + '000000000000000000000000' + address.slice(2),
            },
            'latest',
          ],
          id: 1,
        }),
      });

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error.message);
      }

      const balance = parseInt(data.result, 16);
      const balanceInUSDC = (balance / Math.pow(10, 6)).toFixed(2);

      return {
        balance: balanceInUSDC,
        decimals: 6,
        symbol: 'USDC',
        address: this.usdcContract,
      };
    } catch (error) {
      console.error('Error getting USDC balance:', error);
      throw error;
    }
  }

  // Get recent transactions for an address
  async getRecentTransactions(address: string, limit: number = 10): Promise<BaseTransaction[]> {
    try {
      const response = await fetch(this.rpcUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: 'eth_getLogs',
          params: [
            {
              address: this.usdcContract,
              topics: [
                '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef', // Transfer event
                '0x000000000000000000000000' + address.slice(2), // From address
              ],
              fromBlock: 'latest',
              toBlock: 'latest',
            },
          ],
          id: 1,
        }),
      });

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error.message);
      }

      // For demo purposes, return mock transactions
      // In production, you'd parse the actual logs
      const mockTransactions: BaseTransaction[] = [
        {
          hash: '0x' + Math.random().toString(16).slice(2, 66),
          from: address,
          to: '0x' + '1'.repeat(40),
          value: '50.00',
          gasUsed: '21000',
          gasPrice: '2000000000',
          status: 'confirmed',
          blockNumber: 12345678,
          timestamp: Date.now() - 3600000,
        },
        {
          hash: '0x' + Math.random().toString(16).slice(2, 66),
          from: '0x' + '2'.repeat(40),
          to: address,
          value: '25.50',
          gasUsed: '21000',
          gasPrice: '2000000000',
          status: 'confirmed',
          blockNumber: 12345677,
          timestamp: Date.now() - 7200000,
        },
      ];

      return mockTransactions.slice(0, limit);
    } catch (error) {
      console.error('Error getting recent transactions:', error);
      return [];
    }
  }

  // Get gas price estimate
  async getGasPrice(): Promise<string> {
    try {
      const response = await fetch(this.rpcUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: 'eth_gasPrice',
          params: [],
          id: 1,
        }),
      });

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error.message);
      }

      const gasPrice = parseInt(data.result, 16);
      return (gasPrice / Math.pow(10, 9)).toFixed(2); // Convert to Gwei
    } catch (error) {
      console.error('Error getting gas price:', error);
      return '2.0'; // Default fallback
    }
  }

  // Get Base network status
  async getNetworkStatus(): Promise<{ chainId: number; blockNumber: number; isHealthy: boolean }> {
    try {
      const response = await fetch(this.rpcUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: 'eth_chainId',
          params: [],
          id: 1,
        }),
      });

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error.message);
      }

      const chainId = parseInt(data.result, 16);
      
      return {
        chainId,
        blockNumber: 0, // Would get from eth_blockNumber in production
        isHealthy: chainId === 8453, // Base mainnet
      };
    } catch (error) {
      console.error('Error getting network status:', error);
      return {
        chainId: 0,
        blockNumber: 0,
        isHealthy: false,
      };
    }
  }
}

export const baseService = new BaseService();