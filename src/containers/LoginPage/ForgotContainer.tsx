import React, { useState, useEffect } from 'react';
import { AppStore } from 'models';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import TextField from '@atlaskit/textfield';
import { FieldTitle } from 'styledComponents/globals';
import { MainContainer } from 'styledComponents/login';
import Styles from './Styles';
import { cloneDeep } from 'lodash';
import Button from '@atlaskit/button';
import Logo from 'assets/login-logo.png';
import { sendForgetPasswordEmail } from 'redux/actions/auth';

export interface ForgotContainerProps extends RouteComponentProps {
  send: any;
  sendForgetPasswordEmail: (email, domain) => void;
}

const initialState = {
  email: ''
}

const initialStateError = {
  email: ''
}

const ERROR_COLOR = '#EF6749';

const ForgotContainer: React.FunctionComponent<ForgotContainerProps> = props => {
  const [forgot, setForgot] = useState(initialState);
  const [error, setError] = useState(initialStateError);
  const [emailSent, setEmailSent] = useState(false);

  useEffect(() => {
    const forgotEmail = document.getElementById('forgotEmail');
    if (forgotEmail){
      forgotEmail.parentElement.style.borderColor = error['email'] ? ERROR_COLOR : '';
    }
  }, [error])

  useEffect(() => {
    if (props.send){
      setEmailSent(true);
    }
  }, [props.send])

  const handleOnChange = (event, id) => {
    const cloneError = cloneDeep(error);
    setError(cloneError);

    const cloneForgot = cloneDeep(forgot);
    cloneForgot[id] = event.target.value;
    setForgot(cloneForgot);
  }

  const validate = () => {
    let valid = true;
    let cloneError = cloneDeep(error);
    for (let key in error){
      if (forgot[key] === ''){
        valid = false;
        cloneError[key] = 'Required';
        setError(cloneError);
        break;
      }else{
        valid = true;
        cloneError[key] = '';
        setError(cloneError);
      }
    }
    return valid;
  }

  const send = () => {
    if (validate()){
      props.sendForgetPasswordEmail(forgot.email, window.location.origin);
    }
  }

  const signIn = () => {
    props.history.push('/login');
  }

  return (
    <MainContainer>
      <div style={Styles.row}>
        <div style={Styles.column}>
          <div style={Styles.logoContainer}> 
            <img src={Logo} alt="Bellwether Coffee" style={Styles.logo} />
          </div>
        </div>
      </div>
      {!emailSent && 
        <>
          <div style={Styles.row}>
            <div style={Styles.column}>
              <FieldTitle>Type in your account email</FieldTitle>
              <TextField
                id='forgotEmail'
                placeholder='you@youremail.com'
                onChange={(event: any) => handleOnChange(event, 'email')}
                style={Styles.textField}
              />
            </div>
          </div>
          <div style={Styles.row}>
            <div style={Styles.column}>
              <Button 
                appearance='primary'
                style={Styles.button} 
                onClick={send} 
              >
                Send Password Reset
              </Button>
            </div>
          </div>
          <div style={Styles.row}>
            <div style={Styles.column}>
              <div style={Styles.forgot} onClick={signIn}>Sign In</div>
            </div>
          </div>
        </>
      }
      {emailSent && 
        <>
          <div style={Styles.row}>
            <div style={Styles.column}>
              <div style={{ textAlign: 'center' }}>
                <FieldTitle>Check your email</FieldTitle>
              </div>
            </div>
          </div>
          <div style={Styles.row}>
            <div style={Styles.column}>
              <div style={{ textAlign: 'center' }}>
                <FieldTitle>Link to reset password has been sent to your email.</FieldTitle>
              </div>
            </div>
          </div>
          <div style={Styles.row}>
            <div style={Styles.column}>
              <Button 
                appearance='primary'
                style={Styles.button} 
                onClick={signIn} 
              >
                Go back to Log In
              </Button>
            </div>
          </div>
        </>
      }
    </MainContainer>
  )
}
const mapStateToProps = (state: AppStore) => ({
  send: state.auth.send
})
const mapDispatchToProps = dispatch => ({
  sendForgetPasswordEmail: (email, domain) => dispatch(sendForgetPasswordEmail(email, domain))
});
export default connect(mapStateToProps, mapDispatchToProps)(ForgotContainer) as React.ComponentType<any>;

