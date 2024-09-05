import React from 'react';
import { Icon } from './Icon';

export const Card = ({ title, description, icon }) => {
  return (
    <button className='flex flex-col p-4 card-shadow rounded-xl w-56 h-72 text-[#fff] text-left'>
      <h3 className='text-4xl font-bold m-0 p-0 pb-4'>{title}</h3>
      <p className='font-light'>{description}</p>
      <div className='mt-auto '>
        <span>{icon && <Icon type={icon} className={`text-secondary-green w-16`} />}</span>
      </div>
    </button>
  );
};
