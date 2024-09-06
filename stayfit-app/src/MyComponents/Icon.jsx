import React from 'react';

const iconPaths = {
  payment: '/src/assets/img/icons/payment-card.svg',
  customer: '/src/assets/img/icons/customer.svg',
  plans: '/src/assets/img/icons/plans.svg',
  myAccount: '/src/assets/img/icons/myAccount.svg',
  support: '/src/assets/img/icons/support.svg',
  stats: '/src/assets/img/icons/stats.svg',
};

export const Icon = ({ type, className, ...props }) => {
  const iconPath = iconPaths[type];

  if (!iconPath) {
    return null;
  }

  return <img src={iconPath} alt={type} className={className} {...props} />;
};
