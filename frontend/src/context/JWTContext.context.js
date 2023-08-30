import PropTypes from 'prop-types';
import { createContext, useState } from 'react';

AuthProvider.propTypes = {
  children: PropTypes.node,
};
const AuthContext = createContext();
function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const token = localStorage.getItem('token');

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated, setIsAuthenticated, token
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
