import React from 'react';
import { Icon } from './Icon';

export const Card = ({ title, description, icon, status, onSelect }) => {

  return (
    <div className='h-auto'>
      <button
        onClick={onSelect}
        className={`group flex md:flex-col justify-between items-center md:items-start p-4 active:shadow-card-click transition-all transition-origin-center rounded-xl w-52 lg:w-56 h-28 md:h-52 lg:h-64 text-[#fff] text-left ${
          status ? 'scale-110 z-10 bg-activated-card shadow-[0_0px_6px_#C1FF72]' : 'shadow-card'
        }`}
      >
        <h3 className="text-[1.3rem] md:text-[2rem] w-full text-center lg:text-left font-bold m-0 p-0 lg:pb-4">{title}</h3>
        <p className="font-light text-sm text-center lg:text-left hidden md:block">{description}</p>
        <div className="w-full flex justify-center lg:mt-auto lg:ml-auto lg:w-fit">
          <span>
            {icon && (
              <Icon
                type={icon}
                className={`text-secondary-green w-16 transition duration-500 ease-in-out group-hover:drop-shadow-[0px_0px_2px_#C1FF72]`}
              />
            )}
          </span>
        </div>
      </button>
    </div>
  );
};
