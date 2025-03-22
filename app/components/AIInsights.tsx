import { useEffect, useState } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  CardActions
} from '@progress/kendo-react-layout';
import { Button } from '@progress/kendo-react-buttons';
import { Chart, ChartSeries, ChartSeriesItem } from '@progress/kendo-react-charts';
import { Loader } from '@progress/kendo-react-indicators';
import { Badge, BadgeProps } from '@progress/kendo-react-indicators';
import { useTheme } from '../contexts/ThemeContext';
import { motion } from 'framer-motion';

interface AIInsight {
  spendingPatterns: {
    highestSpending: {
      category: string;
      amount: string;
      percentage: number;
    };
    monthlyAverage: string;
    unusualActivity: boolean;
    topRecipients: Array<{
      address: string;
      frequency: number;
      totalAmount: string;
    }>;
  };
  riskAssessment: {
    riskScore: number;
    flaggedTransactions: any[];
    securitySuggestions: string[];
  };
  recommendations: {
    defi: string[];
    savings: string[];
    security: string[];
  };
  gasOptimization: {
    averageGasUsed: string;
    potentialSavings: string;
    bestTimes: string[];
    optimizationTips: string[];
  };
  networkActivity: {
    mostUsedNetworks: Array<{
      name: string;
      percentage: number;
    }>;
    costComparison: {
      ethereum: string;
      polygon: string;
      arbitrum: string;
    };
  };
}

export function AIInsights({ walletAddress, transactions }: { walletAddress: string; transactions: any[] }) {
  const [insights, setInsights] = useState<AIInsight | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const fetchInsights = async () => {
      if (!walletAddress || !transactions.length) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch('/api/insights', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ walletAddress, transactions })
        });
        
        if (!response.ok) throw new Error('Failed to fetch insights');
        
        const data = await response.json();
        setInsights(data.insights);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load insights');
      } finally {
        setLoading(false);
      }
    };

    fetchInsights();
  }, [walletAddress, transactions]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader size="large" type="pulsing" />
      </div>
    );
  }

  if (error) {
    return (
      <Card className="bg-red-50 dark:bg-red-900 p-4 rounded-lg">
        <CardBody>
          <p className="text-red-600 dark:text-red-200">{error}</p>
        </CardBody>
      </Card>
    );
  }

  if (!insights) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Risk Score Card */}
        <Card className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white'} rounded-xl shadow-lg`}>
          <CardHeader>
            <CardTitle>Risk Assessment</CardTitle>
          </CardHeader>
          <CardBody>
            <div className="flex items-center justify-center mb-4">
              <div className="relative">
                <Chart style={{ height: 150 }}>
                  <ChartSeries>
                    <ChartSeriesItem
                      type="donut"
                      data={[
                        { category: 'Risk Score', value: insights.riskAssessment.riskScore },
                        { category: 'Remaining', value: 100 - insights.riskAssessment.riskScore }
                      ]}
                      categoryField="category"
                      field="value"
                    />
                  </ChartSeries>
                </Chart>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <span className="text-2xl font-bold">{insights.riskAssessment.riskScore}</span>
                </div>
              </div>
            </div>
            <ul className="space-y-2">
              {insights.riskAssessment.securitySuggestions.map((suggestion, index) => (
                <li key={index} className="flex items-center">
                  <Badge themeColor="info" className="mr-2" />
                  {suggestion}
                </li>
              ))}
            </ul>
          </CardBody>
        </Card>

        {/* Network Activity Card */}
        <Card className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white'} rounded-xl shadow-lg`}>
          <CardHeader>
            <CardTitle>Network Activity</CardTitle>
          </CardHeader>
          <CardBody>
            <Chart style={{ height: 200 }}>
              <ChartSeries>
                <ChartSeriesItem
                  type="pie"
                  data={insights.networkActivity.mostUsedNetworks}
                  categoryField="name"
                  field="percentage"
                />
              </ChartSeries>
            </Chart>
            <div className="mt-4">
              <h4 className="font-semibold mb-2">Cost Comparison</h4>
              <div className="space-y-2">
                {Object.entries(insights.networkActivity.costComparison).map(([network, cost]) => (
                  <div key={network} className="flex justify-between">
                    <span className="capitalize">{network}</span>
                    <span>{cost}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Recommendations Card */}
        <Card className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white'} rounded-xl shadow-lg`}>
          <CardHeader>
            <CardTitle>Smart Recommendations</CardTitle>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">DeFi Opportunities</h4>
                <ul className="list-disc list-inside">
                  {insights.recommendations.defi.map((rec, index) => (
                    <li key={index}>{rec}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Gas Optimization</h4>
                <ul className="list-disc list-inside">
                  {insights.gasOptimization.optimizationTips.map((tip, index) => (
                    <li key={index}>{tip}</li>
                  ))}
                </ul>
              </div>
            </div>
          </CardBody>
          <CardActions>
            <Button
              themeColor="primary"
              fillMode="solid"
              rounded="full"
              className="w-full"
            >
              Apply Recommendations
            </Button>
          </CardActions>
        </Card>
      </div>
    </motion.div>
  );
} 