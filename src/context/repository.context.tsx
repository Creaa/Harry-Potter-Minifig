import { AxiosInstance } from 'axios';
import { axios } from '../common/utils/';
import React, { createContext, FC, useContext } from 'react';
import MinifigRepository from '../common/repositories/minifig.repository';

const getRepositories = (axios: AxiosInstance) => ({
  minifigRepository: new MinifigRepository(axios),
});

const RepositoryContext = createContext(getRepositories(axios));

interface IRepositoryProvider {
  axios: AxiosInstance;
  children: any;
}

const RepositoryProvider: FC<IRepositoryProvider> = ({ children, axios }) => {
  return (
    <RepositoryContext.Provider value={getRepositories(axios)}>
      {children}
    </RepositoryContext.Provider>
  );
};

const useRepository = () => useContext(RepositoryContext);

export { RepositoryProvider, useRepository };
