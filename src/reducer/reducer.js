
import { actionTypes } from '../constants/actionTypes';
import messages from '../constants/messages';

let token = localStorage.getItem('_AccessToken')

export const initialState = {
  user: "",
  token: "" || token,
  loading: false,
  errorMessage: ''
}

export const AuthReducer = (initialState, action) => {
  switch(action.type) {
    case actionTypes.LOGIN_REQUEST:
      return {
        ...initialState,
        loading: true
      }
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...initialState,
        loading: false,
        token: action.payload.token
      }
    case actionTypes.LOGIN_ERR:
      return {
        ...initialState,
        loading: false,
        errorMessage: messages.INVALID_CREDENTIALS
      }
    case actionTypes.LOGOUT:
      return {
        ...initialState,
        user: '',
        token: ''
      }
    case actionTypes.REGISTER_REQUEST:
      return {
        ...initialState,
        loading: true,
      }
    case actionTypes.REGISTER_SUCCESS:
      return {
        ...initialState,
        loading: false
      }
    case actionTypes.REGISTER_ERR:
      return {
        ...initialState,
        loading: false,
        errorMessage: action.payload?.errMsg || messages.REGISTRATION_ERROR
      }
    case actionTypes.USER_DETAIL_REQUEST:
      return {
        ...initialState,
        loading: true
      }
    case actionTypes.USER_DETAIL_SUCCESS:
      return {
        ...initialState,
        user: action.payload.user,
        loading: false
      }
    case actionTypes.USER_DETAIL_ERR:
      return {
        ...initialState,
        user: '',
        loading: false
      }
    case actionTypes.UPDATE_USER_DETAIL_REQUEST:
      return {
        ...initialState,
        loading: true
      }
    case actionTypes.UPDATE_USER_DETAIL_SUCCESS:
      return {
        ...initialState,
        user: action.payload.user,
        loading: false
      }
    case actionTypes.UPDATE_USER_DETAIL_ERR:
      return {
        ...initialState,
        loading: false
      }
    case 'LOADING':
      return {
        ...initialState,
        loading: true
      }
    case 'UNLOADING':
      return {
        ...initialState,
        loading: true
      }
    default:
      throw new Error(`Unkown action type: ${action.type}`)
  }
}
