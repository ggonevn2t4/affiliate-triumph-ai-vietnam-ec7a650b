
import { ReactNode } from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  icon: ReactNode;
  change?: number;
  changeText?: string;
  bgColor?: string;
}

const StatCard = ({ title, value, icon, change = 0, changeText, bgColor = 'bg-white' }: StatCardProps) => {
  const isPositive = change >= 0;
  
  return (
    <div className={`${bgColor} rounded-xl p-6 shadow-sm border border-gray-100`}>
      <div className="flex justify-between items-start mb-4">
        <div className="text-gray-500 font-medium">{title}</div>
        <div className="p-2 rounded-lg bg-gray-50">{icon}</div>
      </div>
      <div className="text-2xl font-semibold mb-2">{value}</div>
      {(change !== undefined || changeText) && (
        <div className="flex items-center">
          <span className={`flex items-center text-sm font-medium ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
            {change !== undefined && (
              <>
                {isPositive ? <ArrowUpRight className="w-4 h-4 mr-1" /> : <ArrowDownRight className="w-4 h-4 mr-1" />}
                {Math.abs(change)}%
              </>
            )}
            {changeText && <span className="text-gray-500 text-sm ml-1">{changeText}</span>}
          </span>
        </div>
      )}
    </div>
  );
};

export default StatCard;
