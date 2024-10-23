import { createContext, useState } from 'react';

export const CardContext = createContext();

export const CardProvider = ({ children }) => {
  const [isSelected, setIsSelected] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedCardIndex, setSelectedCardIndex] = useState(null);

  const handleClick = (idx) => {
    isSelected === idx ? setIsSelected(null) : setIsSelected(idx);
    setSelectedCardIndex(idx);
  };

  const selectClient = (idCliente) => {
    setSelectedClient(idCliente);
    handleClick(1);
  }

  return (
    <CardContext.Provider value={{ isSelected, handleClick, selectedClient, selectClient, selectedCardIndex }}>
      {children}
    </CardContext.Provider>
  );
};
