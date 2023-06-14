import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Epoch 1 ',
    DUES_PRICE: 4000,
    DUES_LOCKED: 2400,
    amt: 2400,
  },
  {
    name: 'Epoch 2',
    DUES_PRICE: 3000,
    DUES_LOCKED: 1398,
    amt: 2210,
  },
  {
    name: 'Epoch 3',
    DUES_PRICE: 2000,
    DUES_LOCKED: 9800,
    amt: 2290,
  },
  {
    name: 'Epoch 4',
    DUES_PRICE: 2780,
    DUES_LOCKED: 3908,
    amt: 2000,
  },
  {
    name: 'Epoch 5',
    DUES_PRICE: 1890,
    DUES_LOCKED: 4800,
    amt: 2181,
  },
  {
    name: 'Epoch 6',
    DUES_PRICE: 2390,
    DUES_LOCKED: 3800,
    amt: 2500,
  },
  {
    name: 'Epoch 7',
    DUES_PRICE: 3490,
    DUES_LOCKED: 4300,
    amt: 2100,
  },
];

export default class Example extends PureComponent {
  static demoUrl = 'https://codesandbox.io/s/simple-line-chart-kec3v';

  render() {
    return (
      <div style={{ width: '100%' }}>
      <ResponsiveContainer width="100%" height={350}>
        <LineChart
          width={500}
          height={350}
          data={data}
          margin={{
            top: 30,
            right: 0,
            left: -10,
            bottom: 0,
          }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line  type="monotone" dataKey="DUES_LOCKED" stroke="#fff" strokeWidth={4} activeDot={{ r: 8  }} />
          <Line unit="$" type="monotone" dataKey="DUES_PRICE" stroke="#C0C0C0" />
        </LineChart>
      </ResponsiveContainer>
      </div>
    );
  }
}
