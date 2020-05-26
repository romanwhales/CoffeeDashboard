import React, { useState, CSSProperties, useEffect } from 'react';
import { connect } from 'react-redux';
import { AppStore, BaseCreate, UserInfo } from 'models';
import { withRouter, RouteComponentProps } from 'react-router';
import Modal from '@atlaskit/modal-dialog';
import Button from '@atlaskit/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import ProducerForm from 'components/Forms/ProducerForm';
import { cloneDeep } from 'lodash';
import { createProducer } from 'redux/actions/producers';

export interface ProducerModalProps extends RouteComponentProps {
  open: boolean;
  create: BaseCreate;
  userInfo: UserInfo;
  close: () => void;
  createProducer: (producer) => void;
}

const styles = {
  row: {
    display: 'flex', 
    flexDirection: 'row'
  } as CSSProperties,
  close: {
    position: 'absolute', 
    right: 18, 
    cursor: 'pointer', 
    marginTop: 21
  } as CSSProperties,
  button: {
    display: 'flex', 
    justifyContent: 'center', 
    width: '100%',
    background: '#7876E0',
    fontSize: 16,
    fontWeight: 500
  } as CSSProperties,
  icon: {
    fontSize: 16, 
    color: '#000'
  } as CSSProperties,
  title: {
    fontSize: 18, 
    marginTop: 33
  } as CSSProperties,
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

const ProducerModal: React.FunctionComponent<ProducerModalProps> = props => {
  const [producer, setProducer] = useState(initialState);
  const [error, setError] = useState(initialStateError);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let cloneProducer = cloneDeep(producer);
    cloneProducer.cafe = props.userInfo.cafes[0];
    setProducer(cloneProducer);
    setOpen(props.open);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.open])

  useEffect(() => {
    if (props.create){
      if (props.create._id){
        handleClose();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.create])

  const handleClose = () => {
    props.close();
  }
  
  const handleOnChange = (event: any, id: string) => {
    const cloneError = cloneDeep(error);
    cloneError[id] = '';
    setError(cloneError);

    const cloneProducer = cloneDeep(producer);
    cloneProducer[id] = id === 'name' ? event.target.value : event.value;
    setProducer(cloneProducer);
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
      {open &&
        <Modal onClose={() => props.close()}>
          <div style={styles.row}>
            <div style={styles.title}>Create a New Producer</div>
            <div style={styles.close} onClick={() => handleClose()}>
              <FontAwesomeIcon
                icon={faTimes}
                style={styles.icon}
              />
            </div>
          </div>
          <div style={{ marginTop: 20 }}>
            <ProducerForm handleOnChange={handleOnChange} data={producer} error={error} />
          </div>
          <div style={{ marginTop: 36, marginBottom: 38 }}>
            <Button appearance='primary' style={styles.button} onClick={() => save()}>Save</Button>
          </div>
        </Modal>
      }
    </>
  );
};


const mapStateToProps = (state: AppStore) => ({
  create: state.producers.create,
  userInfo: state.auth.userInfo
})
const mapDispatchToProps = dispatch => ({
  createProducer: (producer) => dispatch(createProducer(producer)),
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProducerModal));
