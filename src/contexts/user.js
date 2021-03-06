import React, { createContext, useState } from 'react';

const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    userId: 0,
    name: '',
    nickname: '',
    phone: 0,
    age: 0,
  });
  const [isLoggedin, setIsLoggedin] = useState(false);

  const value = {
    state: { user, isLoggedin },
    actions: { setUser, setIsLoggedin },
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export { UserProvider };

export default UserContext;
