import { actionTypes } from '../constants/actionTypes'

const API_BASE_URL = process.env.REACT_APP_API_LINK

const login = async (dispatch, payload) => {
  const requestOpts = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(payload)
  }

  try {
    dispatch({ type: actionTypes.LOGIN_REQUEST })
    let response = await fetch(`${API_BASE_URL}/auth/login/`, requestOpts)
    let data = await response.json()

    if (data.token) {
      dispatch({ type: actionTypes.LOGIN_SUCCESS, payload: {token: data.token} })
      localStorage.setItem('_AccessToken', data.token)
      return data
    }

    dispatch({ type: actionTypes.LOGIN_ERR  })
    return
  } catch (err) {
    dispatch({ type: actionTypes.LOGIN_ERR })
  }
}

const logout = (dispatch) => {
  dispatch({ type: actionTypes.LOGOUT })
  localStorage.removeItem('_AccessToken')
}

const register = async (dispatch, payload) => {
  const requestOpts = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('_AccessToken')}`,
    },
    body: JSON.stringify(payload)
  }

  try {
    dispatch({ type: actionTypes.REGISTER_REQUEST })
    let response = await fetch(`${API_BASE_URL}/users/register/`, requestOpts)
    let data = await response.json()

    if (data) {
      dispatch({ type: actionTypes.REGISTER_SUCCESS })
      return data
    }
    dispatch({ type: actionTypes.REGISTER_ERR  })
    return
  } catch (err) {
    dispatch({ type: actionTypes.REGISTER_ERR })
  }
}


export { login, logout, register }
