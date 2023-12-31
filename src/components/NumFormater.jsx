import React from 'react';

function NumberFormat(props) {
  const formatNumber = (number) => {
    if (Math.abs(number) < 1000) {
      return Number(number).toFixed(3).toString();
    }

    const units = ['', 'k', 'm', 'b', 't'];
    const unitIndex = Math.floor(Math.log10(Math.abs(number)) / 3);

    let formattedNumber = (number / Math.pow(1000, unitIndex)).toFixed(1);
    if (formattedNumber.endsWith('.0')) {
      formattedNumber = formattedNumber.slice(0, -2);
    }

    return `${formattedNumber}${units[unitIndex]}`;
  };

  return <span>{formatNumber(props.number)}</span>;
}

export default NumberFormat;