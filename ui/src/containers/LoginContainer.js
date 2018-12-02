import { connect } from 'react-redux'
import { setUsername, setPassword, setLoggedIn, setRegistering } from '../actions'
import Login from '../components/Login/Login'

const mapStateToProps = state => {
  return {
  username: state.login.username,
  password: state.login.password,
  isLoggedIn: state.login.isLoggedIn
  }
}

const mapDispatchToProps = dispatch => ({
  setUsername: username => dispatch(setUsername(username)),
  setPassword: password => dispatch(setPassword(password)),
  setLoggedIn: boolean => dispatch(setLoggedIn(boolean)),
  setRegistering: boolean => dispatch(setRegistering(boolean)),
})

const LoginContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)

export default LoginContainer