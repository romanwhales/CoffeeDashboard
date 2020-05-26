import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router';
import { AppStore, BaseStore, UserInfo } from 'models';
import TextField from '@atlaskit/textfield';
import Select from '@atlaskit/select';
import { FieldTitle } from 'styledComponents/globals';
import { getStoresByOrganization } from 'redux/actions/stores';
import { permissions } from 'helpers/permissions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { BW } from 'api';
import { Progress } from 'reactstrap';
import Spinner from 'components/Spinner';
import styles from './Styles';
import Message from 'components/Message';
import { cloneDeep } from 'lodash';
import '../../../progress.css';

export interface UserFormProps extends RouteComponentProps {
  token: string;
  data: {};
  error: {};
  stores: BaseStore[];
  userInfo: UserInfo;
  handleOnChange: (event: any, id: string) => void;
  getStoresByOrganization: (organizationId: string) => void;
  getProfileImage: (urlProfileImage) => void;
}

const ERROR_COLOR = '#EF6749';

const initialToast = {
  text: '',
  type: '',
  show: false,
  time: ''
}

const UserForm: React.FunctionComponent<UserFormProps> = props => {
  
  const [stores, setStores] = useState([]);
  // const [stores2, setStores2] = useState([]);
  const [permissionsList, setPermissionsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState('');
  const [toast, setToast] = useState(initialToast);
  const [progressPercentage,setProgressPercentage] = useState(0);

  useEffect(() => {
    let organizationId = props.userInfo.currentProfile ? props.userInfo.currentProfile.cafe : props.userInfo.cafes[0];
    props.getStoresByOrganization(organizationId);
    setStyles();
    createPermissionsList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (props.data['profilePhoto'] && profilePhoto === ''){
      setTimeout(async () => {
        if (props.data['profilePhoto'].indexOf('s3.amazonaws.com') > -1){
          let id = props.data['profilePhoto'].split('/')[5].split('?')[0];
          let image = await download_file(id);
          setProfilePhoto(image);
        }else{
          setProfilePhoto(props.data['profilePhoto']);
        }
      }, 1000)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.data['profilePhoto']])

  useEffect(() => {
    createList('stores');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.stores.length])

  useEffect(() => {
    const userName = document.getElementById('userName');
    if (userName){
      userName.parentElement.style.borderColor = props.error['name'] ? ERROR_COLOR : '';
    }
    const userEmail = document.getElementById('userEmail');
    if (userEmail){
      userEmail.parentElement.style.borderColor = props.error['email'] ? ERROR_COLOR : '';
    }
    const userPhone = document.getElementById('userPhone');
    if (userPhone){
      userPhone.parentElement.style.borderColor = props.error['phone'] ? ERROR_COLOR : '';
    }
    const userPassword = document.getElementById('userPassword');
    if (userPassword){
      userPassword.parentElement.style.borderColor = props.error['password'] ? ERROR_COLOR : '';
    }
    const userPermissions = document.getElementById('react-select-userPermissions-input');
    if (userPermissions){
      userPermissions.parentElement.parentElement.parentElement.parentElement.style.borderColor = props.error['permissions'] ? ERROR_COLOR : '';
    }
    const userStore = document.getElementById('react-select-userStore-input');
    if (userStore){
      userStore.parentElement.parentElement.parentElement.parentElement.style.borderColor = props.error['store'] ? ERROR_COLOR : '';
    }
  }, [props.error])

  const createPermissionsList = () => {
    let list = [];
    for (let i = 0; i < permissions.length; i++){
      if (permissions[i].visible){
        list.push(permissions[i]);
      }
    }
    
    
    setPermissionsList(list);
  }

  const createList = (type) => {
    let list = [];
    let obj = null;
    if (props[type]){
      for (let i = 0; i < props[type].length; i++){
        
        obj = {label: props[type][i].name, value: props[type][i]._id};
        list.push(obj);
        
      }
    }
    
    switch (type) {
      case 'stores':
        setStores(list);
        
        break;
      default:
        break;
    }
  }

  const setStyles = () => {
    const userPermissions = document.getElementById('react-select-userPermissions-input');
    if (userPermissions){
      userPermissions.parentElement.parentElement.parentElement.parentElement.style.background = '#FFF';
    }
    const userStore = document.getElementById('react-select-userStore-input');
    if (userStore){
      userStore.parentElement.parentElement.parentElement.parentElement.style.background = '#FFF';
      userStore.parentElement.parentElement.parentElement.style.height = '38px'; 
      userStore.parentElement.parentElement.parentElement.style.overflowY = 'auto'; 
    }
  }

  const handleClickUpload = () => {
    const uploadProfileImage = document.getElementById('uploadProfileImage')
    uploadProfileImage.click();
  }

  const uploadFile = async (file, putUrl) => {
    let request_promise = new Promise(async (resolve, reject) => {
      // let request = new Request(putUrl, 
      //   {
      //     method: 'PUT',
      //     body: file,
      //     headers: {
      //       'Content-Type':  file.type
      //     }
      //   }
      // );
      let options = {
        headers: {
          'Content-Type': file.type
        },
        onUploadProgress: function(progressEvent) {
          
          var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          // console.log('Completed is ',percentCompleted)
          setProgressPercentage(percentCompleted);
        }
      };
      try {
        // let output = await fetch(request);
        let output = axios.put(putUrl,file, options)
        resolve(output);
      } catch(err) {
        reject(err);
      }
    });

    try {
      await request_promise;
      let id = putUrl.split('/')[5].split('?')[0];
      await download_file(id);
    } catch(err) {
      console.log('uploadFile:', err);
    }
  }

  const download_file = async (id) => {
    let url = `${BW.baseUrl}/upload/download_signed_url`;
    let config = {
      url: `${url}/${id}`,
      method: 'get',
      headers: {
        'Authorization': props.token
      }
    };

    try {
      let output = await axios(config);
      props.getProfileImage(output.data.url);
      setIsLoading(false);
      return output.data.url;
    } catch(err) {
      console.log('download_file:', err);
    }
  }

  const load = async (event) => {
    if (event.target.files.length > 0){
      let type = event.target.files[0].type.split('/')[0];
      if (type === 'image'){
        let size = event.target.files[0].size / 1024 / 1024;
        const imageLimit = 20;
        if (size <= imageLimit){
          setIsLoading(true);
          let file = event.target.files[0];
          let url = `${BW.baseUrl}/upload/upload_signed_url`;
          let config = {
            url: url,
            method: 'get',
            headers: {
              'Authorization': props.token,
              'Accept': file.type
            }
          };
      
          try {
            let output = await axios(config);
            uploadFile(file, output.data.putURL);
          } catch(err) {
            console.log('load:', err);
          }
        }else{
          let cloneToast = cloneDeep(toast);
          cloneToast.show = true;
          cloneToast.text = `File size exceeds ${imageLimit} MB`;
          cloneToast.type = 'error';
          cloneToast.time = new Date().toUTCString();
          setToast(cloneToast);
        }
      }else{
        let cloneToast = cloneDeep(toast);
        cloneToast.show = true;
        cloneToast.text = `File is not an image`;
        cloneToast.type = 'error';
        cloneToast.time = new Date().toUTCString();
        setToast(cloneToast);
      }
    }
  }
  
  return (
    
    <>
     
      <Message show={toast.show} text={toast.text} type={toast.type} time={toast.time} />
      <div style={styles.row}>
        <div style={styles.mainUpload}>
          {isLoading &&
            // <Spinner size={100} />
            <Progress value={progressPercentage} style={{width: '100%',height:'20px'}} animated/>
          }
          {!isLoading &&
            <div style={styles.containerUpload} onClick={handleClickUpload}>
              {props.data['profilePhoto'] && profilePhoto ? 
                <img src={profilePhoto} style={styles.profileImage} alt='' /> : 
                <div>
                  <div style={styles.iconContainer}>
                    <FontAwesomeIcon
                      icon={faUpload}
                      style={styles.icon}
                    />
                  </div>
                  <div style={styles.textUpload}>
                    Click to upload
                  </div>
                </div>
              }
            </div>
          }
          <input 
            id='uploadProfileImage'
            type='file'
            style={{ display: 'none' }}
            onChange={event => load(event)} 
          />
        </div>
      </div>
      <div style={styles.row}>
        <div style={styles.column}>
          <FieldTitle error={props.error['name']} color='#3B3B3B' noBold={true}>Name <span style={styles.errorMessage}>{props.error['name'] ? props.error['name'] : ''}</span></FieldTitle>
          <TextField
            id='userName'
            placeholder='Enter a Name'
            onChange={(event: any) => props.handleOnChange(event, 'name')}
            style={styles.textField}
            value={props.data['name']}
          />
        </div>
        <div style={styles.column}>
          <FieldTitle error={props.error['email']} color='#3B3B3B' noBold={true}>Email <span style={styles.errorMessage}>{props.error['email'] ? props.error['email'] : ''}</span></FieldTitle>
          <TextField
            id='userEmail'
            placeholder='Enter an Email'
            onChange={(event: any) => props.handleOnChange(event, 'email')}
            style={styles.textField}
            value={props.data['email']}
          />
        </div>
      </div>
      <div style={styles.row}>
        <div style={styles.column}>
          <FieldTitle error={props.error['phone']} color='#3B3B3B' noBold={true}>Phone <span style={styles.errorMessage}>{props.error['phone'] ? props.error['phone'] : ''}</span></FieldTitle>
          <TextField
            id='userPhone'
            placeholder='Enter a Phone'
            onChange={(event: any) => props.handleOnChange(event, 'phone')}
            style={styles.textField}
            value={props.data['phone']}
          />
        </div>
        <div style={styles.column}>
          <FieldTitle error={props.error['permissions']} color='#3B3B3B' noBold={true}>Permissions <span style={styles.errorMessage}>{props.error['permissions'] ? props.error['permissions'] : ''}</span></FieldTitle>
          <Select
            instanceId='userPermissions'
            menuPortalTarget={document.body}
            styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
            placeholder='Choose a Permission'
            options={permissionsList}
            onChange={(event: any) => props.handleOnChange(event, 'permissions')}
            value={props.data['permissionSelected']}
          />
        </div>
      </div>
      <div style={styles.row}>
        <div style={styles.column}>
          <FieldTitle error={props.error['password']} color='#3B3B3B' noBold={true}>Password <span style={styles.errorMessage}>{props.error['password'] ? props.error['password'] : ''}</span></FieldTitle>
          <TextField
            id='userPassword'
            type='password'
            placeholder='Enter a Password'
            onChange={(event: any) => props.handleOnChange(event, 'password')}
            style={styles.textField}
            value={props.data['password']}
          />
        </div>
        <div style={styles.column}>
          <FieldTitle error={props.error['store']} color='#3B3B3B' noBold={true}>Store Assignment <span style={styles.errorMessage}>{props.error['store'] ? props.error['store'] : ''}</span></FieldTitle>
          <Select
            instanceId='userStore'
            menuPortalTarget={document.body}
            styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
            placeholder='Choose a Store'
            options={stores}
            onChange={(event: any) => props.handleOnChange(event, 'store')}
            value={props.data['storeSelected']}
          />
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state: AppStore) => ({
  
  stores: state.stores.stores,
  userInfo: state.auth.userInfo,
  token: state.auth.token
})
const mapDispatchToProps = dispatch => ({
  getStoresByOrganization: (organizationId) => dispatch(getStoresByOrganization(organizationId)),
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserForm) as React.ComponentType<any>);
