import React, {createContext, useContext, useState} from 'react';

const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

const AuthProvider = ({children}) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);

  const singIn = (newUser, callback) => {
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    callback();
  }

  const singOut = (callback) => {
    setUser(null);
    localStorage.removeItem('user');
    callback();
  }

  const val = {
    user,
    singIn,
    singOut,
  }

  return (
    <AuthContext.Provider value={val}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;