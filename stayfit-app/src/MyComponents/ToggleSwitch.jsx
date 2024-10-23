import React, { useState } from 'react';
import Alimentazione from './Alimentazione';
import Esercizio from './Esercizio'

export const ToggleSwitch = () => {
  const [toggled, setToggled] = useState(false);

  return (
    <div className='flex flex-col items-center py-6 w-screen'>
      <div className="flex flex-col items-center gap-2">
        <button
          className={`w-28 h-16 rounded-full flex items-center justify-start p-1 ${
            toggled ? 'bg-secondary-green' : 'bg-hover-buttons-shadow'
          }`}
          onClick={() => setToggled(!toggled)}
        >
          <div
            className={`h-14 w-14 rounded-full flex justify-center items-center transition-all ease-in-out ${
              toggled ? 'translate-x-12 bg-red-600' : 'bg-[#333]'
            }`}
          >
            <div
              className={`h-12 w-12 rounded-full flex justify-center items-center ${
                toggled ? 'bg-red-600' : 'bg-[#555]'
              }`}
            >
              <div
                className={`rounded-full flex justify-center items-center ${
                  toggled
                    ? '-translate-y-7 h-3 w-1 bg-[#59351D]'
                    : 'h-6 w-6 bg-[#333]'
                }`}
              >
                <div
                  className={`flex ${
                    toggled
                      ? 'rotate-[60deg] origin-bottom h-3 w-2 rounded-[50%] bg-[#5B8B2F]'
                      : 'h-4 w-4 bg-hover-buttons-shadow rounded-full'
                  }`}
                ></div>
              </div>
            </div>
          </div>
        </button>
        <h2 className={`mt-8 text-2xl font-bold text-white mb-6`}>
          {toggled ? 'Scheda Alimentare' : 'Scheda di Allenamento'}
        </h2>
      </div>
      {toggled ? <Alimentazione /> : <Esercizio />}
    </div>
  );
};
