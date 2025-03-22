import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { transactions, walletAddress } = await request.json();

    // Generate insights from transaction history
    const insights = {
      spendingPatterns: analyzeSpendingPatterns(transactions),
      riskAssessment: assessTransactionRisks(transactions),
      recommendations: generateRecommendations(transactions),
      gasOptimization: analyzeGasUsage(transactions),
      networkActivity: analyzeNetworkUsage(transactions)
    };

    return NextResponse.json({ insights });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to generate insights' },
      { status: 500 }
    );
  }
}

function analyzeSpendingPatterns(transactions: any[]) {
  return {
    highestSpending: {
      category: 'DeFi',
      amount: '2.5 ETH',
      percentage: 45
    },
    monthlyAverage: '1.8 ETH',
    unusualActivity: false,
    topRecipients: [
      { address: '0x...', frequency: 5, totalAmount: '1.2 ETH' }
    ]
  };
}

function assessTransactionRisks(transactions: any[]) {
  return {
    riskScore: 85, // 0-100, higher is better
    flaggedTransactions: [],
    securitySuggestions: [
      'Consider enabling hardware wallet support',
      'Review permissions granted to DApps'
    ]
  };
}

function generateRecommendations(transactions: any[]) {
  return {
    defi: [
      'Consider yield farming opportunities on Aave',
      'Uniswap liquidity pools showing high APY'
    ],
    savings: [
      'Current gas prices suggest batching transactions',
      'Consider moving to Layer 2 for smaller transactions'
    ],
    security: [
      'Set up multi-sig for large transactions',
      'Regular security audits recommended'
    ]
  };
}

function analyzeGasUsage(transactions: any[]) {
  return {
    averageGasUsed: '0.005 ETH',
    potentialSavings: '0.002 ETH',
    bestTimes: ['Tuesday 2-4 AM UTC', 'Sunday 1-3 AM UTC'],
    optimizationTips: [
      'Batch multiple transactions',
      'Use Layer 2 solutions'
    ]
  };
}

function analyzeNetworkUsage(transactions: any[]) {
  return {
    mostUsedNetworks: [
      { name: 'Ethereum', percentage: 60 },
      { name: 'Polygon', percentage: 30 },
      { name: 'Arbitrum', percentage: 10 }
    ],
    costComparison: {
      ethereum: '0.005 ETH',
      polygon: '0.0001 MATIC',
      arbitrum: '0.0003 ETH'
    }
  };
} 