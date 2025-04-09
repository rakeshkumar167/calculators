import React, { useState } from 'react';
import { Calculator, Coins } from 'lucide-react';
import { SIPInputs, SIPResult } from '../types/calculator';
import { calculateSIP } from '../utils/calculators';
import { formatIndianCurrency } from '../utils/formatters';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const SIPCalculator: React.FC = () => {
  const [inputs, setInputs] = useState<SIPInputs>({
    monthlyInvestment: 5000,
    annualRate: 12,
    years: 10,
  });

  const [result, setResult] = useState<SIPResult | null>(null);

  const handleCalculate = () => {
    const calculatedResult = calculateSIP(inputs);
    setResult(calculatedResult);
  };

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Monthly Investment
          </label>
          <input
            type="number"
            value={inputs.monthlyInvestment}
            onChange={(e) => setInputs({ ...inputs, monthlyInvestment: Number(e.target.value) })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Expected Return Rate (% per year)
          </label>
          <input
            type="number"
            value={inputs.annualRate}
            onChange={(e) => setInputs({ ...inputs, annualRate: Number(e.target.value) })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Investment Period (Years)
          </label>
          <input
            type="number"
            value={inputs.years}
            onChange={(e) => setInputs({ ...inputs, years: Number(e.target.value) })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <button
          onClick={handleCalculate}
          className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
        >
          <Calculator className="w-5 h-5" />
          Calculate Returns
        </button>
      </div>

      {result && (
        <div className="space-y-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Investment Summary</h3>
            <div className="space-y-2">
              <p className="flex justify-between">
                <span className="text-gray-600">Total Investment:</span>
                <span className="font-semibold">{formatIndianCurrency(result.totalInvestment)}</span>
              </p>
              <p className="flex justify-between">
                <span className="text-gray-600">Total Returns:</span>
                <span className="font-semibold">{formatIndianCurrency(result.totalReturns)}</span>
              </p>
              <p className="flex justify-between">
                <span className="text-gray-600">Maturity Value:</span>
                <span className="font-semibold">{formatIndianCurrency(result.maturityValue)}</span>
              </p>
            </div>
          </div>

          <div className="h-[400px] min-h-[400px]">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Growth Projection</h3>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={result.growthData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 30
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="year" 
                  label={{ 
                    value: 'Years', 
                    position: 'bottom',
                    offset: 0
                  }}
                />
                <YAxis 
                  tickFormatter={(value) => formatIndianCurrency(value)}
                  width={100}
                  label={{ 
                    value: 'Amount (₹)', 
                    angle: -90, 
                    position: 'insideLeft',
                    offset: 10
                  }}
                />
                <Tooltip 
                  formatter={(value) => formatIndianCurrency(Number(value))}
                  labelFormatter={(label) => `Year ${label}`}
                />
                <Legend 
                  verticalAlign="top" 
                  height={36}
                />
                <Line 
                  type="monotone" 
                  dataKey="total" 
                  stroke="#9333ea" 
                  name="Total Value"
                  strokeWidth={2}
                />
                <Line 
                  type="monotone" 
                  dataKey="investment" 
                  stroke="#4f46e5" 
                  name="Investment"
                  strokeWidth={2}
                />
                <Line 
                  type="monotone" 
                  dataKey="returns" 
                  stroke="#16a34a" 
                  name="Returns"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default SIPCalculator;