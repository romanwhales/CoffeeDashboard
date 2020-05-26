import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { AppStore, UserInfo } from 'models';
import { signInByToken } from 'redux/actions';
import App from 'containers/App';
import LoginPage from 'containers/LoginPage';
import ForgotContainer from "containers/LoginPage/ForgotContainer";
import ResetContainer from "containers/LoginPage/ResetContainer";
import PrivateRoute from 'components/PrivateRoute';

interface Props {
  isAuthenticated: boolean;
  isLoading: boolean;
  userInfo: UserInfo | null;
  refreshToken: () => void;
};

const AppLoader = ({ isLoading }: { isLoading: boolean }) => {
  if (!isLoading) {
    return <App />
  }
  return <p>Loading...</p>
}

class MainRouter extends React.Component<Props> {
  componentDidMount() {
    if (this.props.isAuthenticated && !this.props.userInfo) {
      this.props.refreshToken();
    }
  }
  
  render() {
    return (
      <Router>
        <Switch>
          <Route component={LoginPage} path="/login" />
          <Route component={ForgotContainer} path="/forgot" />
          <Route component={ResetContainer} path="/reset" />
          <PrivateRoute component={() => <AppLoader isLoading={!this.props.userInfo} />} path="/" />
        </Switch>
      </Router>
    );
  }
}
const mapStateToProps = (state: AppStore) => ({
  isLoading: state.auth.isLoading,
  isAuthenticated: state.auth.isAuthenticated,
  userInfo: state.auth.userInfo
});
const mapDispatchToProps = dispatch => ({
  refreshToken: () => dispatch(signInByToken()),
});
export default connect(mapStateToProps, mapDispatchToProps)(MainRouter);
