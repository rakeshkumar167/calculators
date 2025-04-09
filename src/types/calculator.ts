export type CompoundingFrequency = 'annually' | 'semi-annually' | 'quarterly' | 'monthly' | 'daily';

export interface CompoundInterestInputs {
  principal: number;
  annualRate: number;
  years: number;
  frequency: CompoundingFrequency;
}

export interface EMIInputs {
  loanAmount: number;
  annualRate: number;
  tenure: number;
  startDate?: Date;
}

export interface SIPInputs {
  monthlyInvestment: number;
  annualRate: number;
  years: number;
}

export interface CompoundInterestResult {
  totalAmount: number;
  interestEarned: number;
  growthData: Array<{
    year: number;
    principal: number;
    interest: number;
    total: number;
  }>;
}

export interface EMIResult {
  monthlyEMI: number;
  totalInterest: number;
  totalAmount: number;
  amortizationSchedule: Array<{
    month: number;
    emi: number;
    principal: number;
    interest: number;
    balance: number;
  }>;
}

export interface SIPResult {
  totalInvestment: number;
  totalReturns: number;
  maturityValue: number;
  growthData: Array<{
    year: number;
    investment: number;
    returns: number;
    total: number;
  }>;
}