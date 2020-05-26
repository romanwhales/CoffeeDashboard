import React, { FunctionComponent } from 'react';
import {
  Route,
  Redirect,
  RouteProps,
  RouteComponentProps
} from 'react-router-dom';
import { AppStore } from 'models/store';
import { connect } from 'react-redux';

interface PrivateRouteProps extends RouteProps {
  isAuthenticated: boolean;
  render?: any;
  component?:
  | React.ComponentType<RouteComponentProps<any>>
  | React.ComponentType<any>;
}

const PrivateRoute: FunctionComponent<PrivateRouteProps> = ({
  component: Component,
  isAuthenticated,
  ...rest
}) => {
  const renderRoute = props => {
    if (isAuthenticated) {
      return !!props.render ? () => props.render(props) : (
        <Component {...props} />
      );
    }
    return (
      <Redirect
        to={{
          pathname: '/login'
        }}
      />
    );
  };
  return (
    <Route
      {...rest}
      render={renderRoute}
    />
  );
};

const mapStateToProps = (state: AppStore) => ({
  isAuthenticated: state.auth.isAuthenticated,
})
export default connect(mapStateToProps)(PrivateRoute);