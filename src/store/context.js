import { createContext, useContext, useState } from 'react';

export const MyContext = createContext();

export const useStoreMyContext = () => {
  const [data, setData] = useState('true');
  const changeSetData = () => setData(data + 1);
  return {
    data,
    changeSetData,
  };
};

export const useMyContext = () => useContext(MyContext);
