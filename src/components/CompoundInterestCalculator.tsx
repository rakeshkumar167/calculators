import React, { useState } from 'react';
import { Calculator, TrendingUp } from 'lucide-react';
import { CompoundingFrequency, CompoundInterestInputs, CompoundInterestResult } from '../types/calculator';
import { calculateCompoundInterest } from '../utils/calculators';
import { formatIndianCurrency } from '../utils/formatters';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CompoundInterestCalculator: React.FC = () => {
  const [inputs, setInputs] = useState<CompoundInterestInputs>({
    principal: 10000,
    annualRate: 5,
    years: 5,
    frequency: 'annually',
  });

  const [result, setResult] = useState<CompoundInterestResult | null>(null);

  const handleCalculate = () => {
    const calculatedResult = calculateCompoundInterest(inputs);
    setResult(calculatedResult);
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Principal Amount
          </label>
          <input
            type="number"
            value={inputs.principal}
            onChange={(e) => setInputs({ ...inputs, principal: Number(e.target.value) })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Time Period (Years)
          </label>
          <input
            type="number"
            value={inputs.years}
            onChange={(e) => setInputs({ ...inputs, years: Number(e.target.value) })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Compounding Frequency
          </label>
          <select
            value={inputs.frequency}
            onChange={(e) => setInputs({ ...inputs, frequency: e.target.value as CompoundingFrequency })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="annually">Annually</option>
            <option value="semi-annually">Semi-Annually</option>
            <option value="quarterly">Quarterly</option>
            <option value="monthly">Monthly</option>
            <option value="daily">Daily</option>
          </select>
        </div>

        <button
          onClick={handleCalculate}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
        >
          <TrendingUp className="w-5 h-5" />
          Calculate
        </button>
      </div>

      {result && (
        <div className="space-y-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Results</h3>
            <div className="space-y-2">
              <p className="flex justify-between">
                <span className="text-gray-600">Total Amount:</span>
                <span className="font-semibold">{formatIndianCurrency(result.totalAmount)}</span>
              </p>
              <p className="flex justify-between">
                <span className="text-gray-600">Interest Earned:</span>
                <span className="font-semibold">{formatIndianCurrency(result.interestEarned)}</span>
              </p>
            </div>
          </div>

          <div className="h-96">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Growth Over Time</h3>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={result.growthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis tickFormatter={(value) => formatIndianCurrency(value)} />
                <Tooltip formatter={(value) => formatIndianCurrency(Number(value))} />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="total" 
                  stackId="1"
                  stroke="#2563eb" 
                  fill="#3b82f6" 
                  name="Total Amount" 
                />
                <Area 
                  type="monotone" 
                  dataKey="interest" 
                  stackId="1"
                  stroke="#16a34a" 
                  fill="#22c55e" 
                  name="Interest" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompoundInterestCalculator;