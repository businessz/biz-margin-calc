import React, { useState, useCallback } from 'react';
import { DollarSign, Users, Calendar, PieChart, Globe2 } from 'lucide-react';
import ResultCard from './ResultCard';
import InputField from './InputField';
import CurrencySelect from './CurrencySelect';

interface CalculationResult {
  revenue: number;
  totalCosts: number;
  grossProfit: number;
  grossMargin: number;
  profitPerEmployee: number;
  dailyRevenue: number;
}

const Calculator: React.FC = () => {
  const [inputs, setInputs] = useState({
    revenue: '',
    costs: '',
    employees: '',
    workingDays: '251', // Default working days in a year (excluding weekends and holidays)
  });

  const [currency, setCurrency] = useState('USD');
  const [results, setResults] = useState<CalculationResult | null>(null);

  const handleInputChange = (name: string, value: string) => {
    setInputs(prev => ({ ...prev, [name]: value }));
    calculateResults({ ...inputs, [name]: value });
  };

  const handleCurrencyChange = (newCurrency: string) => {
    setCurrency(newCurrency);
  };

  const calculateResults = useCallback((values: typeof inputs) => {
    const revenue = parseFloat(values.revenue) || 0;
    const costs = parseFloat(values.costs) || 0;
    const employees = parseInt(values.employees) || 1;
    const workingDays = parseInt(values.workingDays) || 251;

    const grossProfit = revenue - costs;
    const grossMargin = revenue > 0 ? (grossProfit / revenue) * 100 : 0;
    const profitPerEmployee = grossProfit / employees;
    const dailyRevenue = revenue / workingDays;

    setResults({
      revenue,
      totalCosts: costs,
      grossProfit,
      grossMargin,
      profitPerEmployee,
      dailyRevenue,
    });
  }, []);

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white rounded-xl shadow-xl p-8 md:p-10">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">Business Metrics</h2>
              <CurrencySelect
                selectedCurrency={currency}
                onCurrencyChange={handleCurrencyChange}
              />
            </div>
            
            <InputField
              icon={<DollarSign className="text-[#00C16A]" />}
              label={`Annual Revenue (${currency})`}
              name="revenue"
              value={inputs.revenue}
              onChange={handleInputChange}
              placeholder={`Enter annual revenue in ${currency}`}
            />

            <InputField
              icon={<DollarSign className="text-[#00C16A]" />}
              label={`Total Costs (${currency})`}
              name="costs"
              value={inputs.costs}
              onChange={handleInputChange}
              placeholder={`Enter total costs in ${currency}`}
            />

            <InputField
              icon={<Users className="text-[#00C16A]" />}
              label="Number of Employees"
              name="employees"
              value={inputs.employees}
              onChange={handleInputChange}
              placeholder="Enter number of employees"
              type="number"
            />

            <InputField
              icon={<Calendar className="text-[#00C16A]" />}
              label="Working Days per Year"
              name="workingDays"
              value={inputs.workingDays}
              onChange={handleInputChange}
              placeholder="Enter working days"
              type="number"
            />
          </div>

          <div className="space-y-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Results</h2>
            <div className="grid gap-6">
              {results && (
                <>
                  <ResultCard
                    title="Gross Profit"
                    value={results.grossProfit}
                    format="currency"
                    currency={currency}
                    icon={<PieChart className="text-[#00C16A]" />}
                  />
                  <ResultCard
                    title="Gross Margin"
                    value={results.grossMargin}
                    format="percentage"
                    currency={currency}
                    icon={<PieChart className="text-[#00C16A]" />}
                  />
                  <ResultCard
                    title="Profit per Employee"
                    value={results.profitPerEmployee}
                    format="currency"
                    currency={currency}
                    icon={<Users className="text-[#00C16A]" />}
                  />
                  <ResultCard
                    title="Daily Revenue"
                    value={results.dailyRevenue}
                    format="currency"
                    currency={currency}
                    icon={<Calendar className="text-[#00C16A]" />}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;