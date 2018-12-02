const login = (state = {}, action) => {
  switch(action.type) {
    case 'SET_USERNAME':
      return {
        ...state,
        username: action.username
      }
    case 'SET_PASSWORD':
      return {
        ...state,
        password: action.password
      }
    case 'SET_LOGGED_IN':
    return {
      ...state,
      isLoggedIn: action.boolean
    }
    default:
      return state;
  }
}

export default login