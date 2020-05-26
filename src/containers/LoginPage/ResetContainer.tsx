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
import { forgetPassword } from 'redux/actions/auth';
import Message from 'components/Message';
import Spinner from 'components/Spinner';
import CryptoJS from 'crypto-js';

export interface ResetContainerProps extends RouteComponentProps {
  isLoading: boolean;
  forget: any;
  forgetPassword: (email, password) => void;
}

const initialState = {
  email: '',
  newPassword: '',
  confirmPassword: ''
}

const initialStateError = {
  newPassword: '',
  confirmPassword: ''
}

const initialToast = {
  text: '',
  type: '',
  show: false
}

const ERROR_COLOR = '#EF6749';

const ResetContainer: React.FunctionComponent<ResetContainerProps> = props => {
  const [reset, setReset] = useState(initialState);
  const [error, setError] = useState(initialStateError);
  const [toast, setToast] = useState(initialToast);
  
  useEffect(() => {
    checkParams();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const resetNewPassword = document.getElementById('resetNewPassword');
    if (resetNewPassword){
      resetNewPassword.parentElement.style.borderColor = error['newPassword'] ? ERROR_COLOR : '';
    }
    const resetConfirmPassword = document.getElementById('resetConfirmPassword');
    if (resetConfirmPassword){
      resetConfirmPassword.parentElement.style.borderColor = error['confirmPassword'] ? ERROR_COLOR : '';
    }
  }, [error])

  useEffect(() => {
    if (props.forget){
      if (props.forget.ok && props.forget.ok === 1){
        setToast({show: true, text: 'Password reset', type: 'success'});
        setTimeout(function(){ goToLogin(); }, 2000);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.forget])

  const checkParams = () => {
    if (window.location.search !== ''){
      let paramsList = window.location.search.split('?');
      if (paramsList.length > 0){
        let params = paramsList[1].split('=');
        if (params.length > 0){
          if (params[0] === 'token'){
            const bytes = CryptoJS.AES.decrypt(params[1], process.env.REACT_APP_CRYPTOJS_SECRET_KEY);
            const email = bytes.toString(CryptoJS.enc.Utf8);
            const cloneReset = cloneDeep(reset);
            cloneReset.email = email;
            setReset(cloneReset);
          }else{
            goToLogin();
          }
        }else{
          goToLogin();
        }
      }else{
        goToLogin();
      }
    }else{
      goToLogin();
    }
  }

  const goToLogin = () => {
    props.history.push('/login');
  }

  const handleOnChange = (event, id) => {
    const cloneError = cloneDeep(initialState);
    setError(cloneError);

    const cloneReset = cloneDeep(reset);
    cloneReset[id] = event.target.value;
    setReset(cloneReset);
  }

  const validate = () => {
    let valid = true;
    let cloneError = cloneDeep(error);
    for (let key in error){
      if (reset[key] === ''){
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
    
    if (reset.newPassword !== reset.confirmPassword){
      valid = false;
      cloneError.newPassword = 'New password and confirm password are not equals';
      cloneError.confirmPassword = 'New password and confirm password are not equals';
      setError(cloneError);
    }
    return valid;
  }

  const handleReset = () => {
    if (validate()){
      props.forgetPassword(reset.email, reset.newPassword);
    }
  }

  return (
    <MainContainer>
      <Message show={toast.show} text={toast.text} type={toast.type} />
      <div style={Styles.row}>
        <div style={Styles.column}>
          <div style={Styles.logoContainer}> 
            <img src={Logo} alt="Bellwether Coffee" style={Styles.logo} />
          </div>
        </div>
      </div>
      <div style={Styles.row}>
        <div style={Styles.column}>
          <FieldTitle>New Password</FieldTitle>
          <TextField
            id='resetNewPassword'
            placeholder='Insert your new password'
            type='password'
            onChange={(event: any) => handleOnChange(event, 'newPassword')}
            style={Styles.textField}
          />
          {error.newPassword && <div style={{ color: ERROR_COLOR }}>{error.newPassword}</div>}
        </div>
      </div>
      <div style={Styles.row}>
        <div style={Styles.column}>
          <FieldTitle>Confirm New Password</FieldTitle>
          <TextField
            id='resetConfirmPassword'
            placeholder='Confirm your new password'
            type='password'
            onChange={(event: any) => handleOnChange(event, 'confirmPassword')}
            style={Styles.textField}
          />
          {error.confirmPassword && <div style={{ color: ERROR_COLOR }}>{error.confirmPassword}</div>}
        </div>
      </div>
      <div style={Styles.row}>
        <div style={Styles.column}>
          {props.isLoading &&
            <Spinner size={20} />
          }
          {!props.isLoading &&
            <Button 
              appearance='primary'
              style={Styles.button} 
              onClick={handleReset} 
            >
              Reset
            </Button>
          }
        </div>
      </div>
    </MainContainer>
  )
}
const mapStateToProps = (state: AppStore) => ({
  forget: state.auth.forget,
  isLoading: state.auth.isLoading
})
const mapDispatchToProps = dispatch => ({
  forgetPassword: (email, password) => dispatch(forgetPassword(email, password))
});
export default connect(mapStateToProps, mapDispatchToProps)(ResetContainer) as React.ComponentType<any>;

