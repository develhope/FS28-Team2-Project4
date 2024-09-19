import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const Textbox = ({ label, type, id, name, hasError, onChange }) => {
  const [inputVal, setInputVal] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    if (inputVal === '') {
      setIsFocused(false);
    }
  };

  const handleChange = (e) => {
    setInputVal(e.target.value);
    if (onChange) {
      onChange(e);
    }
  };

  return (
      <div className="relative w-[300px] h-10">
        <input
          id={id}
          type={type}
          value={inputVal}
          name={name}
          onChange={(e) => {
            setInputVal(e.target.value);
            onChange(e);
          }}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={`peer border-2 w-[300px] h-10 bg-transparent border-secondary-gray cursor-text
          caret-[#C5C5C5] text-[#C5C5C5] pl-[12px] pr-[12px] rounded-[6px] outline-none transition-all
          duration-300 focus:ring-secondary-green hover:border-secondary-green focus:border-secondary-green
          glow-effect focus:transition-all focus:duration-300 ${hasError ? `border-red-700` : `border-secondary-gray`}`}
        />
        <label
          htmlFor={id}
          className={`absolute left-3 top-2 transition-all duration-200 ease-in-out bg-primary-blue px-0.5 bg-left bg-no-repeat ${
            isFocused || inputVal
              ? 'top-[-8px] text-xs text-secondary-green glow-text bg-[length:100%_100%]'
              : 'top-2 text-base  cursor-text bg-[length:0%_100%]'
          } ${hasError && !isFocused ? `text-red-700` : `text-secondary-gray`}`}
        >
          {label}
        </label>
      </div>
  );
};

Textbox.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default Textbox;
