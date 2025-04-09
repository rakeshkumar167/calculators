import React, { useState } from 'react';
import { Calculator, DollarSign, Coins } from 'lucide-react';
import CompoundInterestCalculator from './components/CompoundInterestCalculator';
import EMICalculator from './components/EMICalculator';
import SIPCalculator from './components/SIPCalculator';

type TabType = 'compound' | 'emi' | 'sip';

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('compound');

  const tabs = [
    {
      id: 'compound',
      label: 'Compound Interest',
      icon: Calculator,
      color: 'blue',
    },
    {
      id: 'emi',
      label: 'EMI Calculator',
      icon: DollarSign,
      color: 'green',
    },
    {
      id: 'sip',
      label: 'SIP Calculator',
      icon: Coins,
      color: 'purple',
    },
  ] as const;

  return (
    <div className="min-h-screen bg-gray-100 py-8 sm:py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Financial Calculator
          </h1>
          <p className="text-base sm:text-lg text-gray-600">
            Calculate compound interest, EMI payments, and SIP returns with ease
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex" aria-label="Tabs">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      flex-1 flex items-center justify-center gap-1 sm:gap-2 py-3 sm:py-4 px-2 sm:px-6 
                      text-xs sm:text-sm font-medium border-b-2 transition-colors duration-200
                      ${isActive 
                        ? `border-${tab.color}-600 text-${tab.color}-600` 
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                    `}
                  >
                    <Icon className={`w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 ${isActive ? `text-${tab.color}-600` : 'text-gray-400'}`} />
                    <span className="whitespace-nowrap">{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="p-4 sm:p-6">
            {activeTab === 'compound' && <CompoundInterestCalculator />}
            {activeTab === 'emi' && <EMICalculator />}
            {activeTab === 'sip' && <SIPCalculator />}
          </div>
        </div>
      </div>

      <footer className="mt-16 bg-gray-800 text-gray-300 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm">
            Built with React and Tailwind CSS
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;