import messages from '../../constants/messages';

const loginSchema = {
  fields: [
    {
      name: 'username',
      class: 'inputField',
      props: {
        id:"_loginusername",
        placeholder:'Username',
        type:"text",
        variant:"outlined",
        fullWidth:true,
        autoComplete:'off'
      },
      html_element: 'text',
      rules: {
        required: { value: true, message: messages.REQUIRED }
      },
    },
    {
      name: 'password',
      class: 'inputField',
      props: {
        id:"_loginpw",
        placeholder:'Password',
        type:"password",
        variant:"outlined",
        fullWidth:true,
        autoComplete:'off'
      },
      html_element: 'text',
      rules: {
        required: { value: true, message: messages.REQUIRED }
      }
    }
  ]
}

const signupSchema = {
  fields: [
    {
      name: 'username',
      class: 'inputField',
      props: {
        id:"_signupUsername",
        placeholder:'Username',
        type:"text", // change to email
        variant:"outlined",
        fullWidth:true,
        autoComplete:'off'
      },
      html_element: 'text',
      rules: {
        required: { value: true, message: messages.REQUIRED }
      }
    },
    {
      name: 'password1',
      class: 'inputField',
      props: {
        id:"_signuppw",
        placeholder:'Password',
        type:"password",
        variant:"outlined",
        fullWidth:true,
        autoComplete:'off'
      },
      html_element: 'text',
      rules: {
        required: { value: true, message: messages.REQUIRED },
        minLength: { value: 8, message: messages.MIN_LENGTH_PASSWORD_ERROR },
      }
    },
    {
      name: 'password2',
      class: 'inputField',
      props: {
        id:"_singupConfirmPw",
        placeholder:'Confirm Password',
        type:"password",
        variant:"outlined",
        fullWidth:true,
        autoComplete:'off'
      },
      html_element: 'text',
      rules: {
        required: { value: true, message: messages.REQUIRED }
      }
    }
  ]
}

export { loginSchema, signupSchema }