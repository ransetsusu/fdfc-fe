import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography } from '@mui/material';
import styled from '@emotion/styled';
import colors from '../../constants/colors';

import SignUpForm from '../../components/Forms/SignupForm'


const SignUpContainer = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '& .MuiBox-root': {
    borderRadius: '20px'
  },
  padding: '80px'
})

const LoginDivContainer = styled.div({
  display: 'flex',
  justifyContent: 'center',
  marginTop: '15px'
})


const SignUp = () => {
  const navigate = useNavigate()

  const handleRedirect = () => {
    navigate('/login', {replace: true})
  }

  return(
    <SignUpContainer>
      <Box
        sx={{
          width: 400,
          height: 600,
          backgroundColor: colors.White,
          padding: '25px'
        }}>
        <Typography variant="h5" sx={{ textAlign: 'center', margin: '40px 0' }}>Sign Up</Typography>
        <SignUpForm />
        <LoginDivContainer>
          <Typography variant="subtitle2"> Already have an account? &nbsp;</Typography>
          <Typography
            sx={{ textDecoration: 'underline', cursor: 'pointer', color: '#4dc3ff' }}
            variant="subtitle2"
            onClick={handleRedirect}>
              Login
            </Typography>
        </LoginDivContainer>
      </Box>
    </SignUpContainer>
  )
}

export default SignUp;