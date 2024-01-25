import React, { FC, createContext, useContext, useState } from 'react';
import { LegoMinifig } from '../common/interfaces/Api';
import { IPersonalDetails } from '../common/interfaces/Common';

interface MinifigContext {
  chosenMinifig: LegoMinifig | null;
  personalDetails: IPersonalDetails | null;
}

interface GlobalContextProps {
  state: MinifigContext;
  setChosenMinifig: (minifig: LegoMinifig | null) => void;
  setPersonalDetails: (details: IPersonalDetails | null) => void;
}

const initialState: MinifigContext = { chosenMinifig: null, personalDetails: null };

const GlobalContext = createContext<GlobalContextProps>({
  state: initialState,
  setChosenMinifig: () => {},
  setPersonalDetails: () => {},
});

const GlobalProvider: FC<any> = ({ children }) => {
  const [state, setState] = useState<MinifigContext>(initialState);

  const setChosenMinifig = (minifig: LegoMinifig | null) => {
    setState((prevState) => ({ ...prevState, chosenMinifig: minifig }));
  };

  const setPersonalDetails = (details: IPersonalDetails | null) => {
    setState((prevState) => ({ ...prevState, personalDetails: details }));
  };

  return (
    <GlobalContext.Provider value={{ state, setChosenMinifig, setPersonalDetails }}>
      {children}
    </GlobalContext.Provider>
  );
};

const useGlobal = () => useContext(GlobalContext);

export { GlobalProvider, useGlobal };
