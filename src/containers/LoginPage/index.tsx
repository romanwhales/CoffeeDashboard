import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Logo from 'assets/login-logo.png';
import { AppStore } from 'models/store';
import { signIn } from 'redux/actions';
import { withRouter, RouteComponentProps } from 'react-router';
import { compose } from 'redux';
import Button from '@atlaskit/button';
import { FieldTitle } from 'styledComponents/globals';
import { MainContainer } from 'styledComponents/login';
import TextField from '@atlaskit/textfield';
import { cloneDeep } from 'lodash';
import Styles from './Styles';
import Message from 'components/Message';
import Spinner from 'components/Spinner';

interface LoginContainerProps extends RouteComponentProps {
  error?: string;
  isLoading: boolean;
  isAuthenticated: boolean;
  authError: any;
  signIn(data): void;
}

const initialState = {
  email: '',
  password: ''
}

const initialStateError = {
  email: '',
  password: ''
}

const initialToast = {
  text: '',
  type: '',
  show: false,
  time: ''
}

const ERROR_COLOR = '#EF6749';

const LoginContainer: React.FunctionComponent<LoginContainerProps> = props => {
  const [data, setData] = useState(initialState);
  const [error, setError] = useState(initialStateError);
  const [toast, setToast] = useState(initialToast);

  useEffect(() => {
    if (props.isAuthenticated){
      props.history.push('/lots');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.isAuthenticated])

  useEffect(() => {
    if (props.authError){
      let cloneToast = cloneDeep(toast);
      cloneToast.show = true;
      cloneToast.text = props.authError.data.error.replace('-', ' ').toUpperCase();
      cloneToast.type = 'error';
      cloneToast.time = new Date().toUTCString();
      setToast(cloneToast);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.authError])

  useEffect(() => {
    const loginEmail = document.getElementById('loginEmail');
    if (loginEmail){
      loginEmail.parentElement.style.borderColor = error['email'] ? ERROR_COLOR : '';
    }
    const loginPassword = document.getElementById('loginPassword');
    if (loginPassword){
      loginPassword.parentElement.style.borderColor = error['password'] ? ERROR_COLOR : '';
    }
  }, [error])

  const handleOnChange = (event, id) => {
    const cloneError = cloneDeep(error);
    setError(cloneError);
    
    const cloneData = cloneDeep(data);
    cloneData[id] = event.target.value;
    setData(cloneData);
  }

  const validate = () => {
    let valid = true;
    let cloneError = cloneDeep(error);
    for (let key in error){
      if (data[key] === ''){
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

  const handleOnKeyPress = (event) => {
    if(event.key === 'Enter'){
      login();
    }
  }

  const login = () => {
    if (validate()){
      props.signIn(data);
    }
  }

  const forgotPassword = () => {
    props.history.push('/forgot');
  }

  return (
    <MainContainer>
      <Message show={toast.show} text={toast.text} type={toast.type} time={toast.time} />
      <div style={Styles.row}>
        <div style={Styles.column}>
          <div style={Styles.logoContainer}> 
            <img src={Logo} alt="Bellwether Coffee" style={Styles.logo} />
          </div>
        </div>
      </div>
      <div style={Styles.row}>
        <div style={Styles.column}>
          <FieldTitle>Email</FieldTitle>
          <TextField
            id='loginEmail'
            placeholder='you@youremail.com'
            onChange={(event: any) => handleOnChange(event, 'email')}
            onKeyPress={handleOnKeyPress}
            style={Styles.textField}
          />
        </div>
      </div>
      <div style={Styles.row}>
        <div style={Styles.column}>
          <FieldTitle>Password</FieldTitle>
          <TextField
            id='loginPassword'
            placeholder='Insert your password'
            type='password'
            onChange={(event: any) => handleOnChange(event, 'password')}
            onKeyPress={handleOnKeyPress}
            style={Styles.textField}
          />
        </div>
      </div>
      <div style={Styles.row}>
        <div style={Styles.column}>
          {props.isLoading &&
            <div style={Styles.spinnerContainer}>
              <Spinner size={40} />
            </div>
          }
          {!props.isLoading &&
            <Button 
              appearance='primary'
              style={Styles.button} 
              onClick={login} 
            >
              Log In
            </Button>
          }
        </div>
      </div>
      <div style={Styles.row}>
        <div style={Styles.column}>
          <div style={Styles.forgot} onClick={forgotPassword}>Forgot your password?</div>
        </div>
      </div>
    </MainContainer>
  )
}

const mapStateToProps = (state: AppStore) => ({
  isLoading: state.auth.isLoading,
  isAuthenticated: state.auth.isAuthenticated,
  authError: state.auth.error
});
const mapDispatchToProps = dispatch => ({
  signIn: (data: { email: string, password: string }) => dispatch(signIn(data.email, data.password)),
});
const enhance = compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)
export default enhance(LoginContainer);
