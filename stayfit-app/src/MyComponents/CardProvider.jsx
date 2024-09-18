import { createContext, useState } from 'react';

export const CardContext = createContext();

export const CardProvider = ({ children }) => {
  const [isSelected, setIsSelected] = useState(null);

  const handleClick = (idx) => {
    isSelected === idx ? setIsSelected(null) : setIsSelected(idx);
  };

  return (
    <CardContext.Provider value={{ isSelected, handleClick }}>
      {children}
    </CardContext.Provider>
  );
};
