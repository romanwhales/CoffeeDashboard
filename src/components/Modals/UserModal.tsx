import React, { useState, CSSProperties, useEffect } from 'react';
import { connect } from 'react-redux';
import { AppStore, BaseCreate, UserInfo, BaseEdit, BaseStore } from 'models';
import { withRouter, RouteComponentProps } from 'react-router';
import Modal from '@atlaskit/modal-dialog';
import Button from '@atlaskit/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import UserForm from 'components/Forms/UserForm';
import { cloneDeep } from 'lodash';
import { createUser, getUsersByOrganization, getUserById, editUser } from 'redux/actions/users';
import Spinner from 'components/Spinner';
import { permissions } from 'helpers/permissions';
import { getStoresByOrganization } from 'redux/actions/stores';
import { isPhone, isEmail } from 'helpers/formats';

export interface UserModalProps extends RouteComponentProps {
  isLoading: boolean;
  open: boolean;
  create: BaseCreate;
  edit: BaseEdit;
  userInfo: UserInfo;
  data: {};
  user: any;
  stores: BaseStore[];
  close: () => void;
  createUser: (user) => void;
  editUser: (userId, user) => void;
  getUsersByOrganization: (organizationId) => void;
  getUserById: (userId) => void;
  getStoresByOrganization: (organizationId) => void;
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
  buttonCancel: {
    display: 'flex', 
    justifyContent: 'center', 
    width: '100%',
    background: '#F4F5F9',
    fontSize: 16,
    fontWeight: 500,
    border: '1px solid #3B3B3B'
  } as CSSProperties,
  icon: {
    fontSize: 16, 
    color: '#000'
  } as CSSProperties,
  title: {
    fontSize: 18, 
    marginTop: 33,
  } as CSSProperties,
}

const initialState = {
  name: '',
  email: '',
  phone: '',
  permissions: '',
  store: [],
  password: '',
  cafe: '',
  profilePhoto: '',
  permissionSelected: {},
  storeSelected: {},
  action: 'create',
  passwordChanged: false,
  
}

const initialStateError = {
  name: '',
  email: '',
  phone: '',
  permissions: '',
  store: '',
  password: '',
  
}

const UserModal: React.FunctionComponent<UserModalProps> = props => {
  const [user, setUser] = useState(initialState);
  const [error, setError] = useState(initialStateError);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let cloneUser = cloneDeep(initialState);
    cloneUser.cafe = props.userInfo.currentProfile ? props.userInfo.currentProfile.cafe : props.userInfo.cafes[0];
    setUser(cloneUser);
    setError(initialStateError);
    setOpen(props.open);
    setTimeout(() => { setStyles(); }, 100);
    if (props.data){
      let organizationId = props.userInfo.currentProfile ? props.userInfo.currentProfile.cafe : props.userInfo.cafes[0];
      props.getStoresByOrganization(organizationId);
      props.getUserById(props.data['_id']);
    }
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

  useEffect(() => {
    if (props.edit){
      if (props.edit._id){
        handleClose();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.edit])

  useEffect(() => {
    if (props.user && props.stores.length > 0){
      setUserToEdit(props.user);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.user, props.stores.length])

  const setUserToEdit = (user) => {
    let clonedStores:any[] = [...props.stores];
    // let mappedStores = clonedStores.forEach(item => {
    //   item.label = item.name;
    //   item.value = item._id
    // })
    
    let cloneUser = cloneDeep(initialState);
    cloneUser['_id'] = user._id;
    cloneUser.name = user.name ? user.name : '';
    cloneUser.email = user.email ? user.email : '';
    cloneUser.phone = user.phone ? user.phone : '';
    cloneUser.password = user.password ? user.password.substring(0, 6) : '';
    cloneUser.permissionSelected = user.permissions.length > 0 ? permissions.find(p => p._id === user.permissions[0]) : null;
    cloneUser.permissions = cloneUser.permissionSelected ? cloneUser.permissionSelected['value'] : '';
    // cloneUser.storeSelected = user.storeSelected;
    // cloneUser.store = 
    // if (user.stores.length > 0){
    //   debugger;
    //   let store = null;
    //   let storeSelected = null;
    //   for (let i = 0; i < user.stores.length; i++){
    //     if (user.stores[i]){
    //       if (typeof user.stores[i] === 'object' && user.stores[i].constructor === Array){
    //         for (let x = 0; x < user.stores[i].length; x++){
    //           store = props.stores.find(s => s._id === user.stores[i][x]);
    //           storeSelected = {label: store.name, value: store._id};
    //           cloneUser.storeSelected.push(storeSelected);
    //           cloneUser.store.push(storeSelected.value);
    //         }
    //       }else{
    //         store = props.stores.find(s => s._id === user.stores[i]);
    //         storeSelected = {label: store.name, value: store._id};
    //         cloneUser.storeSelected.push(storeSelected);
    //         cloneUser.store.push(storeSelected.value);
    //       }
    //     }
    //   }
    // }
    cloneUser.storeSelected = user.stores.length > 0 ? props.stores.find(p => p._id === user.stores[0]) : null;
    cloneUser.store = user.stores[0];
    // cloneUser.store = props.stores.find(p => p._id === user.stores[0][0]);
    cloneUser.cafe = user.cafes.length > 0 ? user.cafes[0] : '';
    
    
    // cloneUser.storeSelected = user.stores.length > 0 ? props.stores.find(p => p._id === user.stores[0][0]):null;
    
    // cloneUser.storeSelected2 = user.stores[0][0].length > 0 ? 
    cloneUser.profilePhoto = user.profilePhoto ? user.profilePhoto : '';
    cloneUser.action = 'edit';
    setUser(cloneUser);
  }

  const setStyles = () => {
    const modal = document.getElementsByClassName('css-1q892yz');
    if (modal.length > 0){
      modal[0]['style']['backgroundColor'] = '#F4F5F9';
    }
  }

  const handleClose = () => {
    props.close();
  }
  
  const handleOnChange = (event: any, id: string) => {
    const cloneError = cloneDeep(error);
    cloneError[id] = '';
    setError(cloneError);
    const cloneUser = cloneDeep(user);
    switch (id) {
      case 'permissions':
        cloneUser.permissions = event.value;
        cloneUser.permissionSelected = permissions.find(p => p.value === event.value);
        
        break;
      case 'store':

        cloneUser.store = [event.value];

        cloneUser.storeSelected = event;
        
        // debugger;
        // if (event && event.length > 0){
        //   const index = event.length - 1;
        //   if (cloneUser.store.indexOf(event[index].value) === -1){
        //     cloneUser.store.push(event[index].value);
        //     cloneUser.storeSelected.push(event[index]);
        //   }else{
        //     cloneUser.store.splice(index, 1);
        //     cloneUser.storeSelected.splice(index, 1);
        //   }
        // }else{
        //   cloneUser.store = [];
        //   cloneUser.storeSelected = [];
        // }
        break;
      case 'email':
        cloneUser.email = event.target.value;
        if (isEmail(cloneUser.email)){
          cloneError.email = '';
          setError(cloneError);
        }else{
          cloneError.email = 'Invalid format';
          setError(cloneError);
        }
        break;
      case 'phone':
        cloneUser.phone = event.target.value;
        if (isPhone(cloneUser.phone)){
          cloneError.phone = '';
          setError(cloneError);
        }else{
          cloneError.phone = 'Invalid format';
          setError(cloneError);
        }
        break;
      default:
        cloneUser[id] = event.target.value;
        if (id === 'password'){
          cloneUser.passwordChanged = true;
        }
        break;
    }
    
    setUser(cloneUser);
  }

  const validate = () => {
    let valid = true;
    let cloneError = cloneDeep(error);
    
    for (let key in error){
      
      if (typeof user[key] === 'string' && key !== 'phone' && user[key].trim() === ''){
        valid = false;
        cloneError[key] = 'Required';
        
        setError(cloneError);
        break;
      }else  if (typeof user[key] === 'object' && user[key].constructor === Array && user[key].length === 0){
        valid = false;
        cloneError[key] = 'Required';
        
        setError(cloneError);
        break;
      }else if (typeof user[key] === 'object' && user[key]._id === ''){
        valid = false;
        cloneError[key] = 'Required';
        
        setError(cloneError);
        break;
      }else if (typeof user[key] === 'undefined'){
        valid = false;
        cloneError[key] = 'Required';
        setError(cloneError);
        break;
      }else{
        if (cloneError[key].length > 0){
          valid = false;
          let errMsg = cloneError[key];
          cloneError[key] = errMsg;
          setError(cloneError);
          
          break;
        }else{
          valid = true;
          cloneError[key] = '';
          
          setError(cloneError);
        }
      }
    }
    return valid;
  }

  const save = () => {
    
    if (validate()){
      let userToDb = {
        name: user.name,
        email: user.email,
        phone: user.phone,
        permissions: user.permissions,
        store: user.store,
        cafe: user.cafe,
        profilePhoto: user.profilePhoto
      }
      if (user.passwordChanged){
        userToDb['password'] = user.password;
      }
      if (user.action === 'create'){
        props.createUser(userToDb);
      }else{
        props.editUser(user['_id'], userToDb);
      }
    }
  }

  const handleGetProfileImage = (urlProfileImage) => {
    const cloneUser = cloneDeep(user);
    cloneUser.profilePhoto = urlProfileImage;
    setUser(cloneUser);
  }

  return (
    <>
      
      {open &&
        <Modal onClose={() => props.close()} width={700} height={550} scrollBehavior='outside'>
          {props.isLoading &&
            <Spinner size={80} />
          }
          {!props.isLoading &&
            <div>
              <div style={{ background: '#F4F5F9' }}>
                <div style={styles.row}>
                  <div style={styles.title}>{user && user['_id'] ? 'Edit User' : 'New User'}</div>
                  <div style={styles.close} onClick={() => handleClose()}>
                    <FontAwesomeIcon
                      icon={faTimes}
                      style={styles.icon}
                    />
                  </div>
                </div>
              </div>
              <div style={{ background: '#F4F5F9' }}>
                <div style={{ marginTop: 10 }}>
                  <UserForm 
                    handleOnChange={handleOnChange} 
                    data={user} 
                    stores3 ={props.stores}
                    error={error} 
                    getProfileImage={(urlProfileImage) => handleGetProfileImage(urlProfileImage)}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <div style={{ marginTop: 25, marginBottom: 37, width: 311, marginRight: 15 }}>
                    <Button style={styles.buttonCancel} onClick={() => handleClose()}>Cancel</Button>
                  </div>
                  <div style={{ marginTop: 25, marginBottom: 37, width: 311 }}>
                    <Button appearance='primary' style={styles.button} onClick={() => save()}>Save</Button>
                  </div>
                </div>
              </div>
            </div>
          }
        </Modal>
      }
    </>
  );
};


const mapStateToProps = (state: AppStore) => ({
  create: state.users.create,
  edit: state.users.edit,
  userInfo: state.auth.userInfo,
  isLoading: state.users.isLoading,
  user: state.users.user,
  stores: state.stores.stores
})
const mapDispatchToProps = dispatch => ({
  createUser: (user) => dispatch(createUser(user)),
  editUser: (userId, user) => dispatch(editUser(userId, user)),
  getUsersByOrganization: (organizationId) => dispatch(getUsersByOrganization(organizationId)), 
  getUserById: (userId) => dispatch(getUserById(userId)),  
  getStoresByOrganization: (organizationId) => dispatch(getStoresByOrganization(organizationId)),
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserModal));
