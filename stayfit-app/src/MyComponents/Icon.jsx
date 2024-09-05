import React from 'react';

const iconPaths = {
  payment: '/src/assets/img/icons/payment-card.svg',
};

export const Icon = ({ type, className, ...props }) => {
  const iconPath = iconPaths[type];

  if (!iconPath) {
    return null;
  }

  return <img src={iconPath} alt={type} className={className} {...props} />;
};
