import React, { useState, useEffect } from 'react';

export const SelectBox = ({
  label,
  name,
  value,
  onChange,
  options,
  required,
}) => {
  const [inputVal, setInputVal] = useState(value);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    setInputVal(value);
  }, [value]);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    if (inputVal === '') {
      setIsFocused(false);
    }
  };

  return (
    <div className='relative w-[300px] h-10'>
      <label
        htmlFor={name}
        className={`absolute opacity-0 left-4 top-2 transition-all duration-200 ease-in-out bg-primary-blue px-0.5 bg-left bg-no-repeat ${
            isFocused || inputVal
              ? 'opacity-100 top-[-8px] text-xs text-secondary-green glow-text bg-[length:100%_100%]'
              : 'top-2 text-base text-secondary-gray cursor-text bg-[length:0%_100%]'
          }`}
      >
        {label}
      </label>
      <select
        className="peer border-2 w-[300px] h-10 bg-transparent border-secondary-gray cursor-text
          caret-[#C5C5C5] text-[#C5C5C5] pl-[12px] pr-[12px] rounded-[6px] outline-none transition-all
          duration-300 focus:ring-secondary-green hover:border-secondary-green focus:border-secondary-green
          glow-effect focus:transition-all focus:duration-300"
        name={name}
        value={inputVal}
        onChange={(e) => {
          setInputVal(e.target.value);
          onChange(e);
        }}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...(required && { required })}
      >
        <option value="">{label}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
