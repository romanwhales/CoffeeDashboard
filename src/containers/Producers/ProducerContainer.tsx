import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { AppStore, BaseCreate, UserInfo } from 'models';
import { withRouter, RouteComponentProps } from 'react-router';
import ProducerForm from 'components/Forms/ProducerForm';
import Button from '@atlaskit/button';
import Styles from './Styles';
import { cloneDeep } from 'lodash';
import { createProducer } from 'redux/actions/producers';
import Message from 'components/Message';
import Spinner from 'components/Spinner';

export interface ProducerContainerProps extends RouteComponentProps {
  isLoading: boolean;
  create: BaseCreate;
  userInfo: UserInfo;
  createProducer: (producer) => void;
}

const initialState = {
  name: '',
  type: '',
  cafe: ''
}

const initialStateError = {
  name: '',
  type: ''
}

const initialToast = {
  text: '',
  type: '',
  show: false
}

const ProducerContainer: React.FunctionComponent<ProducerContainerProps> = props => {
  const [producer, setProducer] = useState(initialState);
  const [error, setError] = useState(initialStateError);
  const [toast, setToast] = useState(initialToast);

  useEffect(() => {
    let cloneProducer = cloneDeep(producer);
    cloneProducer.cafe = props.userInfo.cafes[0];
    setProducer(cloneProducer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (props.create){
      if (props.create._id){
        setToast({show: true, text: 'Producer created', type: 'success'});
        setTimeout(function(){ goToProducers(); }, 1000);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.create])

  const handleOnChange = (event: any, id: string) => {
    const cloneError = cloneDeep(error);
    cloneError[id] = '';
    setError(cloneError);

    const cloneProducer = cloneDeep(producer);
    cloneProducer[id] = id === 'name' ? event.target.value : event.value;
    setProducer(cloneProducer);
  }

  const goToProducers = () => {
    props.history.push(`/producers`);
  }

  const discard = () => {
    goToProducers();
  }

  const validate = () => {
    let valid = true;
    let cloneError = cloneDeep(error);
    for (let key in error){
      if (producer[key].trim() === ''){
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

  const save = () => {
    if (validate()){
      props.createProducer(producer);
    }
  }

  return (
    <>
      <Message show={toast.show} text={toast.text} type={toast.type} />
      <div style={{ marginBottom: 10 }}>
        Producers > {props.match.params['id'] === 'new' ? 'New Producer' : 'Edit Producer'}
      </div>
      <div style={{ marginBottom: 16, color: '#3B3B3B', fontSize: 25, fontWeight: 'bold' }}>
        Producers
      </div>
      <div style={{ marginBottom: 35, color: '#7876E0', fontSize: 19, fontWeight: 'bold' }}>
        {props.match.params['id'] === 'new' ? 'Create a New Producer' : 'Edit a Producer'}
      </div>
      {props.isLoading ?
        <Spinner size={80} /> : 
        <ProducerForm handleOnChange={handleOnChange} data={producer} error={error} />
      }
      <div style={Styles.buttonsContainer}>
        <div style={{ width: 201 }}>
          <Button 
            style={Styles.buttonDiscard} 
            onClick={discard} 
          >
            Discard
          </Button>
        </div>
        <div style={{ width: 173 }}>
          <Button 
            appearance='primary'
            style={Styles.buttonSave} 
            onClick={save} 
          >
            Save
          </Button>
        </div>
      </div>
    </>
  );
};


const mapStateToProps = (state: AppStore) => ({
  create: state.producers.create,
  userInfo: state.auth.userInfo,
  isLoading: state.producers.isLoading,
})
const mapDispatchToProps = dispatch => ({
  createProducer: (producer) => dispatch(createProducer(producer)),
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProducerContainer));
