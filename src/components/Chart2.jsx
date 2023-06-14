import React, { PureComponent } from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

const data = [
  {
    name: 'Epoch 1',
    APR: 590,
    DUES_CIRCULATING_SUPPLY: 800,
    TVL: 1400,
  },
  {
    name: 'Epoch 2',
    APR: 868,
    DUES_CIRCULATING_SUPPLY: 967,
    TVL: 1506,
  },
  {
    name: 'Epoch 3',
    APR: 1397,
    DUES_CIRCULATING_SUPPLY: 1098,
    TVL: 989,
  },
  {
    name: 'Epoch 4',
    APR: 1480,
    DUES_CIRCULATING_SUPPLY: 1200,
    TVL: 1228,
  },
  {
    name: 'Epoch 5',
    APR: 1520,
    DUES_CIRCULATING_SUPPLY: 1108,
    TVL: 1100,
  },
  {
    name: 'Epoch 6',
    APR: 1400,
    DUES_CIRCULATING_SUPPLY: 680,
    TVL: 1700,
  },
];


const CustomTooltip = ({ active, payload, label }) => {
  if (active) {
    return (
      <div className="custom-tooltip bg-white p-2">
        <p className="label">{`${label} :`}</p>
        <p className="label">{`APR : ${payload[0].value} %`}</p>
        <p className="label">{`APR : ${payload[1].value} %`}</p>
        <p className="label">{`TVL : $ ${payload[2].value} `}</p>
      </div>
    );
  }

  return null;
  
};

export default class ExampleC extends PureComponent {
  static demoUrl = 'https://codesandbox.io/s/composed-chart-in-responsive-container-pkqmy';

  render() {
    return (
        <div style={{ width: '100%' }}>
        <ResponsiveContainer width="100%" height={350}>
          <ComposedChart
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
            <XAxis dataKey="name" scale="band" />
            <YAxis />
            
            <Legend />
            <Area unit='$' type="monotone" dataKey="TVL" fill="#fff" stroke="#666" strokeWidth={4}/>
            <Bar  dataKey="DUES_CIRCULATING_SUPPLY" barSize={20} fill="#fff" />
            <Line unit='%' type="monotone" dataKey="APR" stroke="#fff" />
            <Tooltip  content={<CustomTooltip />} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
