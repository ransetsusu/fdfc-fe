import {
  Routes,
  Route,
  BrowserRouter,
  useLocation, Navigate } from "react-router-dom";

import Home from './screens/Home/Home';
import SignUp from './screens/SignUp/SignUp';
import Login from './screens/Login/Login';

import styled from '@emotion/styled'
import colors from './constants/colors'

import { useAuth } from './contexts/context'


const MainDiv = styled.div({
  background: colors.Background,
  flexGrow: '1',
  minHeight: '100vh',
  width: '100%',
})


function App() {
  return (
    <MainDiv>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          />
          <Route path="login" element={ <Login/>} />
          <Route path="signup" element={ <SignUp/>} />
        </Routes>
      </BrowserRouter>
    </MainDiv>
  );
}

function RequireAuth({ children }) {
  const auth = useAuth()
  const location = useLocation()

  if (localStorage.getItem('_AccessToken') || auth.token) {
    return children
  }
  return <Navigate to="/login" state={{ from: location }} />;
}

export default App;
