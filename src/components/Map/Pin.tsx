import React from 'react';
import { connect } from 'react-redux';
import { AppStore } from 'models';
import { withRouter, RouteComponentProps } from 'react-router';
import PinPurple from '../../assets/purple_pin.svg';
import PinBlack from '../../assets/black_pin.png';

export interface PinProps extends RouteComponentProps {
  size: number;
  isBlack: Boolean;
}

const Pin: React.FunctionComponent<PinProps> = props => {
  return (
    <img src={props.isBlack ? PinBlack : PinPurple} style={{ width: props.size, height: props.size }} alt='' />
  );
};

const mapStateToProps = (state: AppStore) => ({
  
})
const mapDispatchToProps = dispatch => ({
  
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Pin) as React.ComponentType<any>);
