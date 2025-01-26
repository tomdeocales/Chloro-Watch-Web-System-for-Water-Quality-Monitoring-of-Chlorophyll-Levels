import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

/**
 * Chartsre component displays a line chart using Recharts library.
 *
 * @param {Object} props - Component properties.
 * @param {Array} props.data - Data array for the chart.
 * @param {string} props.parameter - Parameter to be displayed on the Y-axis.
 * @returns {JSX.Element} Line chart component.
 */
const Chartsre = ({ data, parameter }) => {
  return (
    <div>
      {data && (
        <LineChart
          width={700}
          height={400}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          {/* Displaying Cartesian Grid with strokeDasharray */}
          <CartesianGrid strokeDasharray="5 5" />

          {/* X-axis configuration */}
          <XAxis
            dataKey="Date"
            height={60}
            axisLine={false}
            tickLine={false}
          />

          {/* Y-axis configuration */}
          <YAxis
            domain={["dataMin", "dataMax"]}
            allowDataOverflow={true}
            axisLine={false}
            tickLine={false}
            tickCount={8}
          />

          {/* Tooltip for data points */}
          <Tooltip />

          {/* Legend for the chart */}
          <Legend />

          {/* Line configuration for the chart */}
          <Line
            type="monotone"
            dataKey={parameter}
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      )}
    </div>
  );
};

export default Chartsre;
