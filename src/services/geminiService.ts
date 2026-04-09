import {
  MOCK_PLATFORM_METRICS,
  MOCK_SPENDING_DISTRIBUTION,
  MOCK_TRANSACTIONS,
  MOCK_USER,
} from '@/src/lib/mockData';

export interface AIInsight {
  title: string;
  description: string;
  category: 'savings' | 'investment' | 'spending' | 'alert';
  impact: string;
}

function buildDynamicInsights(): AIInsight[] {
  const lifestyleBucket = MOCK_SPENDING_DISTRIBUTION.find((item) => item.name === 'Lifestyle');
  const investmentBucket = MOCK_SPENDING_DISTRIBUTION.find((item) => item.name === 'Investments');
  const duplicateSubscriptionCandidates = MOCK_TRANSACTIONS.filter(
    (tx) =>
      tx.type === 'expense' &&
      /prime|subscription|cloud|storage|stream/i.test(tx.name)
  ).length;

  const annualDuplicateSavings = Math.max(180, duplicateSubscriptionCandidates * 60);
  const techExposurePercent = Math.round((investmentBucket?.value ?? 25) * 0.56);
  const discretionarySpend = lifestyleBucket?.amount ?? 0;
  const emergencyGap = Math.max(0, Math.round(MOCK_USER.monthlySpending * 2.5));

  return [
    {
      title: 'Tech Exposure Shift',
      description: `Your tech exposure increased by ${techExposurePercent}% after this month\'s investment allocations. Rebalancing 6-8% into defensive assets can reduce volatility.`,
      category: 'investment',
      impact: `Risk -${Math.max(3, Math.round(techExposurePercent / 4))}%`,
    },
    {
      title: 'Subscription Cleanup',
      description: `You can save $${annualDuplicateSavings} annually by removing duplicate subscriptions and consolidating recurring vendor plans.`,
      category: 'spending',
      impact: `$${annualDuplicateSavings}/year`,
    },
    {
      title: 'Lifestyle Optimization Alert',
      description: `Lifestyle spending is currently $${discretionarySpend.toLocaleString('en-US', { maximumFractionDigits: 0 })} this cycle. Redirecting just 12% could add momentum to your growth bucket.`,
      category: 'alert',
      impact: `+$${Math.round(discretionarySpend * 0.12)}/cycle`,
    },
    {
      title: 'Tax-Advantaged Savings',
      description: `With your current contribution pattern, optimizing tax-efficient vehicles could recover approximately $${Math.round(MOCK_PLATFORM_METRICS.taxHarvestingOpportunity * 0.14).toLocaleString()} yearly in effective savings.`,
      category: 'savings',
      impact: `-$${Math.round(MOCK_PLATFORM_METRICS.taxHarvestingOpportunity * 0.14).toLocaleString()}/year taxes`,
    },
    {
      title: 'Emergency Fund Alert',
      description: `Your emergency reserve target is currently short by about $${emergencyGap.toLocaleString()}. Building this runway will stabilize long-term portfolio decisions.`,
      category: 'alert',
      impact: `Build $${emergencyGap.toLocaleString()} more`,
    },
  ];
}

export async function getFinancialInsights(): Promise<AIInsight[]> {
  const insights = buildDynamicInsights();
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(insights);
    }, 300);
  });
}
