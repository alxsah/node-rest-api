import { connect } from 'react-redux'
import { setRegistering } from '../actions'
import Register from '../components/Register/Register'

const mapStateToProps = state => {
  return {
  isLoggedIn: state.login.isLoggedIn,
  isRegistering: state.isRegistering
  }
};

const mapDispatchToProps = dispatch => ({
  setRegistering: boolean => dispatch(setRegistering(boolean)),
})

const RegisterContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Register)

export default RegisterContainer