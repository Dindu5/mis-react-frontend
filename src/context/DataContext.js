import React, { useState, createContext } from 'react';

const DataContext = createContext();

export { DataContext };

function DataContextProvider(props) {
  const { children } = props;
  const [count, setCount] = useState(0);
  const [students, setStudents] = useState({});

  return (
    <DataContext.Provider
      value={{
        count,
        setCount,
        students,
        setStudents
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export default DataContextProvider;
