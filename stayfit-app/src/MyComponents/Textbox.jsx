import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const Textbox = ({ label, type, id, value, onChange, ...props }) => {
  const [inputVal, setInputVal] = useState(value || '');
  const [isFocused, setIsFocused] = useState(false);


  useEffect(() => {
    setInputVal(value || '');
  }, [value]);

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
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className="peer border-2 w-[300px] h-10 bg-transparent border-secondary-gray cursor-text
        caret-[#C5C5C5] text-[#C5C5C5] pl-[12px] pr-[12px] rounded-[6px] outline-none transition-all
        duration-300 focus:ring-secondary-green hover:border-secondary-green focus:border-secondary-green
        glow-effect focus:transition-all focus:duration-300"
        {...props}
      />
      <label
        htmlFor={id}
        className={`absolute left-3 top-2 transition-all duration-200 ease-in-out bg-primary-blue px-0.5 bg-left bg-no-repeat ${
          isFocused || inputVal
            ? 'top-[-8px] text-xs text-secondary-green glow-text bg-[length:100%_100%]'
            : 'top-2 text-base text-secondary-gray cursor-text bg-[length:0%_100%]'
        }`}
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
