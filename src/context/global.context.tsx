import React, { FC, createContext, useContext, useState } from 'react';
import { LegoMinifig } from '../common/interfaces/Api';
import { IPersonalDetails } from '../common/interfaces/Common';

interface MinifigContext {
  choosenMinifig: LegoMinifig | null;
  personalDetails: IPersonalDetails | null;
}

interface GlobalContextProps {
  state: MinifigContext;
  setChoosenMinifig: (minifig: LegoMinifig | null) => void;
  setPersonalDetails: (details: IPersonalDetails | null) => void;
}

const initialState: MinifigContext = { choosenMinifig: null, personalDetails: null };

const GlobalContext = createContext<GlobalContextProps>({
  state: initialState,
  setChoosenMinifig: () => {},
  setPersonalDetails: () => {},
});

const GlobalProvider: FC<any> = ({ children }) => {
  const [state, setState] = useState<MinifigContext>(initialState);

  const setChoosenMinifig = (minifig: LegoMinifig | null) => {
    setState((prevState) => ({ ...prevState, choosenMinifig: minifig }));
  };

  const setPersonalDetails = (details: IPersonalDetails | null) => {
    setState((prevState) => ({ ...prevState, personalDetails: details }));
  };

  return (
    <GlobalContext.Provider value={{ state, setChoosenMinifig, setPersonalDetails }}>
      {children}
    </GlobalContext.Provider>
  );
};

const useGlobal = () => useContext(GlobalContext);

export { GlobalProvider, useGlobal };
