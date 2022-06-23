import React, { useReducer, useEffect } from 'react';
import { AuthContext, AuthDispatchContext } from '../contexts/context'
import { initialState,  AuthReducer } from '../reducer/reducer'


const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState)

  return (
    <AuthContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthContext.Provider>
  )
}

export { AuthProvider }