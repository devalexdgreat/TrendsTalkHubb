'use client';
import React from 'react';
import { LineChart, CartesianGrid, XAxis, YAxis, Legend, Tooltip, Line, BarChart, Bar } from 'recharts';

const SimpleLineChart = ({ data }) => {
    return (
        <LineChart className='w-full' width={600} height={350} data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
        <XAxis dataKey="name" />
        <Tooltip />
        <CartesianGrid stroke="#f5f5f5" />
        <Line type="monotone" dataKey="expenses" stroke="#ff7300" yAxisId={0} />
        <Line type="monotone" dataKey="sales" stroke="#387908" yAxisId={1} />
        </LineChart>
    );
};

export default SimpleLineChart;
