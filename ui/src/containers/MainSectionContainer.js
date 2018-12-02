import { connect } from 'react-redux'
import MainSection from '../components/MainSection/MainSection'

const mapStateToProps = state => {
  return {
  isLoggedIn: state.login.isLoggedIn,
  isRegistering: state.registration.isRegistering
  }
};

const MainSectionContainer = connect(
  mapStateToProps,
  null
)(MainSection)

export default MainSectionContainer