
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface MacroData {
  carbs: number;
  protein: number;
  fat: number;
}

interface MacroPieChartProps {
  data: MacroData;
}

const COLORS = ['#8884d8', '#82ca9d', '#ffc658'];

const MacroPieChart: React.FC<MacroPieChartProps> = ({ data }) => {
  const chartData = [
    { name: 'Carbs', value: data.carbs, color: COLORS[0] },
    { name: 'Protein', value: data.protein, color: COLORS[1] },
    { name: 'Fat', value: data.fat, color: COLORS[2] }
  ];

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => [`${value}g`, '']} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MacroPieChart;
