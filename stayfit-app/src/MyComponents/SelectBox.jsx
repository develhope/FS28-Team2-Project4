import React, { useState } from 'react';

export const SelectBox = ({
  label,
  name,
  value,
  onChange,
  options,
  required,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);

  const handleBlur = () => {
    if (!value) {
      setIsFocused(false);
    }
  };

  return (
    <div className="relative w-[300px] h-10">
      <label
        htmlFor={name}
        className={`absolute opacity-0 left-4 top-2 transition-all duration-200 ease-in-out bg-primary-blue px-0.5 bg-left bg-no-repeat ${
          isFocused || value
            ? 'opacity-100 top-[-8px] left-[0.75rem] text-xs text-secondary-green glow-text bg-[length:100%_100%]'
            : 'top-2 text-base text-secondary-gray cursor-text bg-[length:0%_100%]'
        }`}
      >
        {label}
      </label>
      <select
        className="custom-select peer border-2 w-[300px] h-10 bg-transparent border-secondary-gray cursor-text
          caret-[#C5C5C5] text-[#C5C5C5] pl-[12px] pr-[12px] rounded-[6px] outline-none transition-all
          duration-300 focus:ring-secondary-green hover:border-secondary-green focus:border-secondary-green
          glow-effect focus:transition-all focus:duration-300"
        name={name}
        value={value}
        onChange={onChange}
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
