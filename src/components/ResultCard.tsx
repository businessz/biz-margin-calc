import React from 'react';

interface ResultCardProps {
  title: string;
  value: number;
  format: 'currency' | 'percentage';
  currency: string;
  icon: React.ReactNode;
}

const ResultCard: React.FC<ResultCardProps> = ({ title, value, format, currency, icon }) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: format === 'currency' ? 'currency' : 'decimal',
    currency,
    minimumFractionDigits: format === 'percentage' ? 1 : 2,
    maximumFractionDigits: format === 'percentage' ? 1 : 2,
  });

  const formattedValue = format === 'percentage' 
    ? `${formatter.format(value)}%`
    : formatter.format(value);

  return (
    <div className="bg-gray-50 rounded-xl p-6 transition-all duration-200 hover:shadow-lg border-2 border-gray-100 hover:border-[#00C16A]">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-lg text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">
            {formattedValue}
          </p>
        </div>
        <div className="h-14 w-14 rounded-full bg-white flex items-center justify-center shadow-sm">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default ResultCard;