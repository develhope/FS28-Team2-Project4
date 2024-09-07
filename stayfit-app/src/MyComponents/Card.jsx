import React from 'react';
import { Icon } from './Icon';

export const Card = ({ title, description, icon, status, onSelect }) => {

  return (
    <div className='h-auto'>
      <button
        onClick={onSelect}
        className={`group flex flex-col p-4 shadow-card active:shadow-card-click transition-all transition-origin-center rounded-xl w-56 min-w-52 h-72 text-[#fff] text-left ${
          status ? 'scale-110 z-10 bg-activated-card shadow-none' : ''
        }`}
      >
        <h3 className="text-[2rem] font-bold m-0 p-0 pb-4">{title}</h3>
        <p className="font-light text-sm">{description}</p>
        <div className="flex mt-auto ml-auto">
          <span>
            {icon && (
              <Icon
                type={icon}
                className={`text-secondary-green w-16 transition duration-500 ease-in-out group-hover:drop-shadow-[0px_0px_4px_#C1FF72]`}
              />
            )}
          </span>
        </div>
      </button>
    </div>
  );
};
