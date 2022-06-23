import React, { useEffect, useState } from 'react'
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  TableHead,
  Paper
} from '@mui/material'
import { useAuthDispatch, useAuth } from '../../contexts/context'
import { logout, getUserDetails } from '../../actions/actions'

import GetStartedModal from '../../components/Modals/GetStartedModal';
import styled from '@emotion/styled';
import { styled as muiStyled} from '@mui/material/styles'
import colors from '../../constants/colors';


const HomeContainer = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '& .MuiBox-root': {
    borderRadius: '20px'
  },
  padding: '80px'
})

const ProfileDivContainer = styled.div({
  display: 'block',
  margin: 'auto',
  marginTop: '15px',
  width: '100%',
  '> h4': {
    textAlign: 'center'
  },
  '> div': {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '10px'
  }
})

const LogoutButton = muiStyled(Button)`
  height: 48px;
  // padding: 11px;
  margin-top: 20px !important;
  color: white !important;
  font-size: 17px;
  borderRadius: 23px !important;
  width: 200px;
  background: transparent linear-gradient(90deg, #06D7A0 0%, #38ABF2 100%) 0% 0% no-repeat padding-box;
`


const Home = () => {
  const { user, loading } = useAuth()
  const [open, setOpen] = useState(true)
  const dispatch = useAuthDispatch()

  useEffect(() => {
    if (!loading) {
      onLoad()
    };
  })

  const onLoad = async () => {
    if (user) {
       if (user.first_name || user.last_name || user.email) setOpen(false)
    } else {
      try {
        await getUserDetails(dispatch)
      } catch (error) {
        console.log(error)
      }
    }
  }

  const handleLogout = () => {
    logout(dispatch)
  }

  const renderHome = () => {
    return (
      <HomeContainer>
        <Box
          sx={{
            width: '100%',
            height: 500,
            backgroundColor: colors.White,
            padding: '25px'
          }}>
        <Typography variant="h2" sx={{ textAlign: 'center', margin: '40px 0' }}>Welcome!</Typography>
        <ProfileDivContainer>
          <Typography variant='h4'>Hi, {user.username} &nbsp;</Typography>
          <div>
            <Typography sx={{  marginBottom: '15px' }} variant='h4'>Your details:</Typography>
            <div>
            <TableContainer component={Paper}>
              <Table sx={{ maxWidth: 500}} size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell align="right">First Name</TableCell>
                    <TableCell align="right">Last Name</TableCell>
                    <TableCell align="right">Email</TableCell>
                    <TableCell align="right">Date Joined</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                      <TableCell align="right">{user.first_name}</TableCell>
                      <TableCell align="right">{user.last_name}</TableCell>
                      <TableCell align="right">{user.email}</TableCell>
                      <TableCell align="right">{user.date_joined}</TableCell>
                    </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            </div>
          </div>
          <div>
          <LogoutButton
            onClick={handleLogout}
            variant="contained"
          >
            Logout
          </LogoutButton>
          </div>

        </ProfileDivContainer>
        </Box>
      </HomeContainer>
    )
  }

  return (
    <div>
      { (!loading && user) && <GetStartedModal open={open} setOpen={setOpen} />}
      { (!loading && user) && renderHome()}
    </div>
  )
}

export default Home;