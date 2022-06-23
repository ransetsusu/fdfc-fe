import React from 'react';


const AuthContext = React.createContext()
const AuthDispatchContext = React.createContext()

const useAuth = () => React.useContext(AuthContext)
const useAuthDispatch = () => React.useContext(AuthDispatchContext)


export {
  AuthContext,
  AuthDispatchContext ,
  useAuth,
  useAuthDispatch
}