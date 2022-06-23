import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography } from '@mui/material';
import styled from '@emotion/styled';
import colors from '../../constants/colors';

import LoginForm from '../../components/Forms/LoginForm'


const LoginContainer = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '& .MuiBox-root': {
    borderRadius: '20px'
  },
  padding: '80px'
})

const SignUpDivContainer = styled.div({
  display: 'flex',
  justifyContent: 'center',
  marginTop: '15px'
})


const Login = (props) => {
  const navigate = useNavigate()

  const handleRedirect = () => {
    navigate('/signup', {replace: true})
  }

  return(
    <LoginContainer>
      <Box
        sx={{
          width: 400,
          height: 500,
          backgroundColor: colors.White,
          padding: '25px'
        }}>
        <Typography variant="h5" sx={{ textAlign: 'center', margin: '40px 0' }}>LOGIN</Typography>
        <LoginForm />
        <SignUpDivContainer>
          <Typography variant="subtitle2"> Don't have an account? &nbsp;</Typography>
          <Typography
            sx={{ textDecoration: 'underline', cursor: 'pointer', color: '#4dc3ff' }}
            variant="subtitle2"
            onClick={handleRedirect}>
              Sign Up
            </Typography>
        </SignUpDivContainer>
      </Box>
    </LoginContainer>
  )
}

export default Login;