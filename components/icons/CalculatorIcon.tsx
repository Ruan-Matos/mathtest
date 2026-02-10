
import React from 'react';

const CalculatorIcon: React.FC<{ className?: string }> = ({ className = "w-24 h-24" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008Zm0 3h.008v.008H8.25v-.008Zm0 3h.008v.008H8.25v-.008Zm3-6h.008v.008H11.25v-.008Zm0 3h.008v.008H11.25v-.008Zm0 3h.008v.008H11.25v-.008Zm3-6h.008v.008H14.25v-.008Zm0 3h.008v.008H14.25v-.008Zm-3-3h.008v.008H11.25v-.008Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h18M3 21h18M9 3.75h6M9 20.25h6.75M4.5 9v11.25a.75.75 0 0 0 .75.75h13.5a.75.75 0 0 0 .75-.75V9" />
    </svg>
);

export default CalculatorIcon;
