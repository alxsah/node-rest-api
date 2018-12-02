const registration = (state = {}, action) => {
  switch(action.type) {
    case 'SET_REGISTERING':
      return {
        ...state,
        isRegistering: action.boolean
      }
    default:
      return state;
  }
}

export default registration