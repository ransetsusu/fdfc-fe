import React from 'react';
import {
  FormGroup,
  TextField,
  Box } from '@mui/material';

import { styled } from '@mui/material/styles'


const StepsTextField = styled(TextField)`
  margin: 7px;
  & .MuiOutlinedInput-root {
    borderRadius: 23px !important;
    '& fieldset': {
      borderColor: #38ABF2;
    }
    & .MuiOutlinedInput-input: {
      padding: 12px !important
      &::placeholder: {
        textAlign: center,
        fontSize: 0.875rem
      },
    }
  }
},
`

export default function StepThree(props) {
  const { form, setFormValues } = props;

  const handleChange = (value) => {
    setFormValues({ ...form, email: value })
  }

  return (
    <Box>
      <FormGroup>
        <StepsTextField
          type="text"
          variant="outlined"
          onChange={e => handleChange(e.target.value)}
          value={form.email}
        />
      </FormGroup>
    </Box>
  )
}