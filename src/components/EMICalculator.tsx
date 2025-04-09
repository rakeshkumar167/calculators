import React, { useState } from 'react';
import { Calculator, DollarSign } from 'lucide-react';
import { EMIInputs, EMIResult } from '../types/calculator';
import { calculateEMI } from '../utils/calculators';
import { formatIndianCurrency } from '../utils/formatters';

const EMICalculator: React.FC = () => {
  const [inputs, setInputs] = useState<EMIInputs>({
    loanAmount: 100000,
    annualRate: 8,
    tenure: 60,
  });

  const [result, setResult] = useState<EMIResult | null>(null);

  const handleCalculate = () => {
    const calculatedResult = calculateEMI(inputs);
    setResult(calculatedResult);
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Loan Amount
          </label>
          <input
            type="number"
            value={inputs.loanAmount}
            onChange={(e) => setInputs({ ...inputs, loanAmount: Number(e.target.value) })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Annual Interest Rate (%)
          </label>
          <input
            type="number"
            value={inputs.annualRate}
            onChange={(e) => setInputs({ ...inputs, annualRate: Number(e.target.value) })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Loan Tenure (Months)
          </label>
          <input
            type="number"
            value={inputs.tenure}
            onChange={(e) => setInputs({ ...inputs, tenure: Number(e.target.value) })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <button
          onClick={handleCalculate}
          className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
        >
          <Calculator className="w-5 h-5" />
          Calculate EMI
        </button>
      </div>

      {result && (
        <div className="space-y-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Loan Summary</h3>
            <div className="space-y-2">
              <p className="flex justify-between">
                <span className="text-gray-600">Monthly EMI:</span>
                <span className="font-semibold">{formatIndianCurrency(result.monthlyEMI)}</span>
              </p>
              <p className="flex justify-between">
                <span className="text-gray-600">Total Interest:</span>
                <span className="font-semibold">{formatIndianCurrency(result.totalInterest)}</span>
              </p>
              <p className="flex justify-between">
                <span className="text-gray-600">Total Amount:</span>
                <span className="font-semibold">{formatIndianCurrency(result.totalAmount)}</span>
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">EMI Schedule</h3>
            <div className="overflow-auto max-h-[calc(100vh-24rem)] border border-gray-200 rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 sticky top-0">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Month</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">EMI</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Principal</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Interest</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balance</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {result.amortizationSchedule.map((payment) => (
                    <tr key={payment.month}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.month}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatIndianCurrency(payment.emi)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatIndianCurrency(payment.principal)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatIndianCurrency(payment.interest)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatIndianCurrency(payment.balance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EMICalculator;