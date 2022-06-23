import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  Grid,
  MobileStepper,
  Button,
  Typography,
  Box
} from '@mui/material';
import { styled as muiStyled } from '@mui/material/styles';
import styled from '@emotion/styled';
import CloseIcon from '@mui/icons-material/Close';

import colors from '../../constants/colors';
import StepOne from '../Steps/StepOne';
import StepTwo from '../Steps/StepTwo';
import StepThree from '../Steps/StepThree';

import { useAuth, useAuthDispatch } from '../../contexts/context';
import { updateUser } from '../../actions/actions';


const ModalGrid = muiStyled(Grid)`
  justify-content: center;
  width: 450px !important;
  padding: 30px 35px;
`

const ModalMobileStepper = muiStyled(MobileStepper)`
  width: 100%;
  flex-grow: 1;
  justify-content: center;
  padding: 12px;
  & .MuiMobileStepper-dot {
    borderRadius: 23px !important;
    width: 24px;
    height: 10px;
    margin: 0 10px;
    backgroundColor: rgba(56, 171, 242, 0.4);
  }
  & .MuiMobileStepper-dotActive {
    backgroundColor: #38ABF2
  }
`

const TextTitle = muiStyled(Typography)`
  width: 100%;
  font-weight: bold !important;
`

const ModalButton = muiStyled(Button)`
  background: transparent linear-gradient(90deg, #06D7A0 0%, #38ABF2 100%) 0% 0% no-repeat padding-box;
  padding: 11px;
  width: 85%;
`

const IconWrapper = styled.div({
  position: 'absolute',
  right: '35px',
  top: '30px'
})


const StepperContent = styled.div({
  margin: '50px 0',
  width: 'inherit'
})

const steps = [
  {
    label: 'Enter your First Name',
    component: 'stepone',
  },
  {
    label: 'Enter your Last Name',
    component: 'steptwo'
  },
  {
    label: 'Enter your Email',
    component: 'stepthree'
  },
]

const formFieldMapping = [
  'first_name', 'last_name', 'email'
]


const GetStartedModal = props => {
  const auth = useAuth()
  const dispatch = useAuthDispatch()
  const { open, setOpen } = props
  const [activeStep, setActiveStep] = useState(0);
  const [formValues, setFormValues] = useState({
    first_name: auth.user.first_name,
    last_name: auth.user.last_name,
    email: auth.user.email,
  })
  const [error, setError] = useState('')

  const getStepperComponent = (component) => {
    const stepperComponentMapping = {
      'stepone': StepOne,
      'steptwo': StepTwo,
      'stepthree': StepThree,
    }
    return React.createElement(
      stepperComponentMapping[component], { form: formValues, setFormValues })
  }

  const handleSubmit = async () => {
    let payload = formValues
    try {
      let response = await updateUser(dispatch, payload)
      if (response) setOpen(false)
    } catch (err) {
      console.log(err)
    }
  }

  const handleNext = () => {
    let hasError = false
    let current_field = formFieldMapping[activeStep]
    if (activeStep === 2 && formValues[current_field]) {
      handleSubmit()
      return
    }
    if ((activeStep === 2 && !formValues[current_field])
      || !formValues[current_field]) {
          setError('This field is required.')
    } else {
      setError('')
      setActiveStep(prevActiveStep => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <Dialog
      open={open}
      scroll="body"
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      <DialogContent dividers>
        <ModalGrid align='center' container>
            <IconWrapper>
              <CloseIcon sx={{ cursor: 'pointer', color: 'rgba(0, 0, 0, 0.60)'}} onClick={handleClose} />
            </IconWrapper>
          <ModalMobileStepper
            variant="dots"
            steps={3}
            position="static"
            activeStep={activeStep}
          />
          <Typography sx={{ color: colors.Blue }} variant="body2" gutterBottom >
            Let's get to know you better
          </Typography>
          <StepperContent>
            <TextTitle variant='h6'>{steps[activeStep].label}</TextTitle>
            <Box sx={{ minHeight: 255, width: '100%', marginTop: '20px' }}>
              {getStepperComponent(steps[activeStep].component)}
              {error && <p className='form-error'>{error}</p>}
            </Box>
          </StepperContent>

          <ModalButton
            variant="contained"
            fullWidth
            onClick={handleNext}
          >
            {activeStep === 2 ? 'Submit' : 'Next'}
          </ModalButton>

          <ModalButton
            variant="contained"
            sx={{ marginTop: '10px' }}
            fullWidth
            onClick={handleBack}
            disabled={activeStep === 0}
          >
            Back
          </ModalButton>
        </ModalGrid>
      </DialogContent>
    </Dialog>
  )
}

export default GetStartedModal;
