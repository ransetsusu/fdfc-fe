import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton
} from '@mui/material';
import { styled } from '@mui/material/styles'

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { signupSchema } from './schema';
import { useAuthDispatch, useAuth } from '../../contexts/context'
import { login, register } from '../../actions/actions'

import { actionTypes } from '../../constants/actionTypes';
import messages from '../../constants/messages';


const SubmitButton = styled(Button)`
  height: 48px;
  // padding: 11px;
  margin-top: 20px !important;
  color: white !important;
  font-size: 17px;
  borderRadius: 23px !important;
  background: transparent linear-gradient(90deg, #06D7A0 0%, #38ABF2 100%) 0% 0% no-repeat padding-box;
`
const FormTextField = styled(TextField)`
  margin: 10px 0 !important;
  & .MuiOutlinedInput-root {
    borderRadius: 23px !important;
  }
`



const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAuthDispatch()
  const { loading, errorMessage } = useAuth()
  const { control, formState: { errors }, handleSubmit } = useForm({
    defaultValues: {
      username: '', password1: '', password2: ''
    }
  })

  const onSubmit = data => {
    const { username, password1, password2 } = data
    if (password1 !== password2) {
      dispatch({
        type: actionTypes.REGISTER_ERR,
        payload: { errMsg: messages.CONFIRM_PASSWORD_NOTMATCH }
      })
    }
  }

  return (
    <form autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
      {errorMessage && <p className='form-error'>{errorMessage}</p>}
      {signupSchema.fields.map( (_field, idx) => {
        return (
          <React.Fragment key={idx}>
            <Controller
              name={_field.name}
              control={control}
              rules={{ ..._field.rules }}
              render={({ field }) => {
                let props = { ...field, ..._field.props }
                let InputProps = {}
                if (props.type === 'password') {
                  InputProps.endAdornment = <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(previousVal => !previousVal)}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                }
                props.type = showPassword ? 'text' : props.type
                return <FormTextField {...props} InputProps={InputProps} />
              }}
            />
            {Object.keys(errors).length > 0 && <span className='field-errors'>
              <Typography variant="caption" sx={{ color: 'red' }}>
                {errors[_field.name]?.message}
              </Typography>
            </span>}
          </React.Fragment>
        )
      })}
      <SubmitButton
        type='submit'
        variant="contained"
        fullWidth
        disabled={loading}>
        Sign Up
      </SubmitButton>
    </form>
  )
}

export default SignUpForm