import React from 'react';

import logoImg from './LOGORUAN.png'; 

const Logo: React.FC<{ className?: string }> = ({ className }) => {
    return (
        <img src={logoImg} alt="Logo" className={className} />
    );
};

export default Logo;
