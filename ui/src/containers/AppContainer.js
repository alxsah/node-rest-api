import { connect } from 'react-redux'
import App from '../components/App/App'
import { setLoggedIn } from '../actions'

const mapStateToProps = state => {
  return {
  isLoggedIn: state.login.isLoggedIn
  }
};

const mapDispatchToProps = dispatch => ({
  setLoggedIn: boolean => dispatch(setLoggedIn(boolean))
})

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(App)

export default AppContainer