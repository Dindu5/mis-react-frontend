import React, { useState, createContext } from 'react';

const UserContext = createContext();

export { UserContext };

function UserContextProvider(props) {
  const { children } = props;
  const [authenticated, setAuthenticated] = useState(true);
  const [user, setUser] = useState({});

  return (
    <UserContext.Provider
      value={{
        authenticated,
        setAuthenticated,
        user,
        setUser
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
