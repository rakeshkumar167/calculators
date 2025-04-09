import { CompoundingFrequency, CompoundInterestInputs, EMIInputs, SIPInputs, CompoundInterestResult, EMIResult, SIPResult } from '../types/calculator';

export const calculateCompoundInterest = (inputs: CompoundInterestInputs): CompoundInterestResult => {
  const { principal, annualRate, years, frequency } = inputs;
  const rate = annualRate / 100;
  
  const frequencyMap: Record<CompoundingFrequency, number> = {
    annually: 1,
    'semi-annually': 2,
    quarterly: 4,
    monthly: 12,
    daily: 365,
  };

  const n = frequencyMap[frequency];
  const totalAmount = principal * Math.pow(1 + rate / n, n * years);
  const interestEarned = totalAmount - principal;

  const growthData = Array.from({ length: years + 1 }, (_, index) => {
    const yearAmount = principal * Math.pow(1 + rate / n, n * index);
    return {
      year: index,
      principal: principal,
      interest: yearAmount - principal,
      total: yearAmount,
    };
  });

  return {
    totalAmount,
    interestEarned,
    growthData,
  };
};

export const calculateEMI = (inputs: EMIInputs): EMIResult => {
  const { loanAmount, annualRate, tenure } = inputs;
  const monthlyRate = (annualRate / 12) / 100;
  
  const monthlyEMI = loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenure) / 
    (Math.pow(1 + monthlyRate, tenure) - 1);
  
  const totalAmount = monthlyEMI * tenure;
  const totalInterest = totalAmount - loanAmount;

  const amortizationSchedule = [];
  let remainingBalance = loanAmount;

  for (let month = 1; month <= tenure; month++) {
    const interest = remainingBalance * monthlyRate;
    const principal = monthlyEMI - interest;
    remainingBalance -= principal;

    amortizationSchedule.push({
      month,
      emi: monthlyEMI,
      principal,
      interest,
      balance: remainingBalance > 0 ? remainingBalance : 0,
    });
  }

  return {
    monthlyEMI,
    totalInterest,
    totalAmount,
    amortizationSchedule,
  };
};

export const calculateSIP = (inputs: SIPInputs): SIPResult => {
  const { monthlyInvestment, annualRate, years } = inputs;
  const monthlyRate = (annualRate / 12) / 100;
  const months = years * 12;
  
  const maturityValue = monthlyInvestment * 
    ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * 
    (1 + monthlyRate);
  
  const totalInvestment = monthlyInvestment * months;
  const totalReturns = maturityValue - totalInvestment;

  const growthData = Array.from({ length: years + 1 }, (_, index) => {
    const monthsTillNow = index * 12;
    const investmentTillNow = monthlyInvestment * monthsTillNow;
    const totalTillNow = monthsTillNow === 0 ? 0 : monthlyInvestment * 
      ((Math.pow(1 + monthlyRate, monthsTillNow) - 1) / monthlyRate) * 
      (1 + monthlyRate);
    
    return {
      year: index,
      investment: investmentTillNow,
      returns: totalTillNow - investmentTillNow,
      total: totalTillNow,
    };
  });

  return {
    totalInvestment,
    totalReturns,
    maturityValue,
    growthData,
  };
};