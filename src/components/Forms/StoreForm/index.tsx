import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router';
import { AppStore, BaseOrganization, UserInfo, BaseStore, BaseEdit } from 'models';
import { getOrganizations } from 'redux/actions/organizations';
import { getStoreById, editStore } from 'redux/actions/stores';
import TextField from '@atlaskit/textfield';
import Select from '@atlaskit/select';
import { FieldTitle } from 'styledComponents/globals';
import Spinner from 'components/Spinner';
import Styles from './Styles';
import Button from '@atlaskit/button';
import Map from 'components/Map';
import { cloneDeep } from 'lodash';
import TagsInput from 'components/TagsInput';

export interface StoreFormProps extends RouteComponentProps {
  isLoading: boolean;
  error: {};
  organizations: BaseOrganization[];
  userInfo: UserInfo;
  store: BaseStore;
  edit: BaseEdit;
  getOrganizations: () => void;
  getStoreById: (storeId) => void;
  editStore: (store) => void;
}

const ERROR_COLOR = '#EF6749';

const initialState = {
  _id: '',
  address1: '',
  address2: '',
  cafe: '',
  value:'',
  city: '',
  fullAddress: '',
  latitude: 0,
  longitude: 0,
  state: '',
  zip: '',
  name: '',
  roaster: '',
  roasters: []
}

const initialStateError = {
  name: '',
  fullAddress: ''
}

const StoreForm: React.FunctionComponent<StoreFormProps> = props => {
  const [organization, setOrganization] = useState(null);
  const [storeData, setStoreData] = useState(initialState);
  const [organizationsList, setOrganizationsList] = useState([]);
  const [markers, setMarkers] = useState([]);
  const [error, setError] = useState(initialStateError);
   
  

  useEffect(() => {
    props.getOrganizations();
    props.getStoreById(props.match.params['id']);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    let organizationId = props.userInfo.currentProfile ? props.userInfo.currentProfile.cafe : props.userInfo.cafes[0];
    getOrganizationById(organizationId);
    createList('organizations');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.organizations.length])

  useEffect(() => {
    if (props.store){
      setStoreData(props.store);
      let markersStore = [{latitude: props.store.latitude, longitude: props.store.longitude}];
      setMarkers(markersStore);
    }
  }, [props.store])

  useEffect(() => {
    const storeName = document.getElementById('storeName');
    if (storeName){
      storeName.parentElement.style.borderColor = error['name'] ? ERROR_COLOR : '';
    }
  }, [error])

  useEffect(() => {
    if (props.edit){
      if (props.edit._id){
        goToOrganizations();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.edit])

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
      case 'organizations':
        setOrganizationsList(list);
        break;
      default:
        break;
    }
  }

  const getOrganizationById = (organizationId) => {
    for (let i = 0; i < props.organizations.length; i++){
      if (props.organizations[i]._id === organizationId){
        setOrganization(props.organizations[i]);
        break;
      }
    }
  }

  const handleOnChange = (event, id) => {
    const cloneStore = cloneDeep(storeData);
    switch (id) {
      case 'name':
        cloneStore.name = event.target.value;
        break;
      case 'organizations':
        cloneStore.cafe = event.target;
        cloneStore.value = event.target;
        break;
      case 'roasters':
        cloneStore.roaster = event.target;
        break;
      default:
        break;
    }
    setStoreData(cloneStore);
  }

  const goToOrganizations = () => {
    props.history.push(`/organizations`);
  }

  const handleOnLocation = (location) => {
    const cloneStore = cloneDeep(storeData);
    for (let i = 0; i < location.context.length; i++){
      if (location.context[i].id.indexOf('place') > -1){
        cloneStore.city = location.context[i].text_en;
      }else if (location.context[i].id.indexOf('postcode') > -1){
        cloneStore.zip = location.context[i].text_en;
      }else if (location.context[i].id.indexOf('region') > -1){
        cloneStore.state = location.context[i].short_code.split('-')[1];
      }
    }
    cloneStore.address1 = location.text_en;
    if (location.properties && location.properties.address){
      cloneStore.address1 = cloneStore.address1 + ', ' + location.properties.address;
    }
    cloneStore.fullAddress = location.place_name_en;
    cloneStore.latitude = location.center[1];
    cloneStore.longitude = location.center[0];
    let markersStore = [{latitude: cloneStore.latitude, longitude: cloneStore.longitude}];
    setMarkers(markersStore);
    setStoreData(cloneStore);
  }

  const discard = () => {
    goToOrganizations();
  }

  const handleOnClearMap = () => {
    const cloneStore = cloneDeep(storeData);
    cloneStore.fullAddress = '';
    setStoreData(cloneStore);

    const cloneError = cloneDeep(error);
    cloneError.fullAddress = '';
    setError(cloneError);
  }

  const validate = () => {
    let valid = true;
    const cloneError = cloneDeep(error);
    for (let key in error){
      if (!storeData[key] || storeData[key].length === 0){
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
      props.editStore(storeData);
    }
  }

  const handleSelectedTags = tags => {
    const cloneStore = cloneDeep(storeData);
    cloneStore.roasters = tags;
    setStoreData(cloneStore);
  };
  
  return (
    <>
      {props.isLoading &&
        <Spinner size={80} />
      }
      {!props.isLoading && organization && storeData &&
        <>
          <div style={{ marginBottom: 24, fontSize: 25, color: '#3B3B3B', fontWeight: 'bold' }}>
            {organization && organization.name} > {organization && organization.name} {props.store && props.store.city} Store
          </div>
          <div style={Styles.row}>
            <div style={Styles.column}>
              <FieldTitle error={error['name']}>Name <span style={Styles.errorMessage}>{error['name'] ? error['name'] : ''}</span></FieldTitle>
              <TextField
                id='storeName'
                onChange={(event: any) => handleOnChange(event, 'name')}
                style={Styles.textField}
                value={storeData.name}
                isDisabled ={true}
              />
            </div>
            <div style={Styles.column}>
              <FieldTitle>Organization</FieldTitle>
              <Select
                instanceId='storeOrganizations'
                menuPortalTarget={document.body}
                styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                placeholder='Choose'
                options={organizationsList}
                onChange={(event: any) => handleOnChange(event, 'organizations')}
                value={{label: organization.name, value: organization._id}}
                // isDisabled={props.userInfo.permissions[0] > 0}
                isDisabled ={true}
              />
            </div>
          </div>
          <div style={Styles.row}>
            <div style={Styles.columnXL}>
              <FieldTitle>Roasters</FieldTitle>
              <TagsInput 
                placeholder='Press enter to add your roasters'
                selectedTags={(tags) => handleSelectedTags(tags)} 
                tags={storeData.roasters}
                // isDisabled={props.userInfo.permissions[0] > 0}
                isDisabled ={true}
              />
            </div>
          </div>
          <div style={Styles.row}>
            <div style={Styles.columnXL}>
              <FieldTitle>Location</FieldTitle>
              <div style={{ height: 300 }}>
                <Map 
                  markers={markers}
                  inputValue={storeData.fullAddress}
                  onLocation={location => handleOnLocation(location)} 
                  handleOnClear={handleOnClearMap}
                  hasError={error['fullAddress'] === '' ? false : true}
                  hideGeocoder ={true}
                  
                
                />
                
              </div>
            </div>
          </div>
          {/* <div style={Styles.buttonsContainer}>
            <div style={{ width: '45%' }}>
              <Button 
                style={Styles.buttonGray} 
                onClick={discard} 
              >
                Discard Changes
              </Button>
            </div>
            <div style={{ width: '45%' }}>
              <Button 
                appearance='primary'
                style={Styles.buttonPublish} 
                onClick={save} 
              >
                Save
              </Button>
            </div>
          </div> */}
        </>
      }
    </>
  );
}

const mapStateToProps = (state: AppStore) => ({
  userInfo: state.auth.userInfo,
  organizations: state.organizations.organizations,
  store: state.stores.store,
  isLoading: state.stores.isLoading,
  edit: state.stores.edit
})
const mapDispatchToProps = dispatch => ({
  getOrganizations: () => dispatch(getOrganizations()),
  getStoreById: (storeId) => dispatch(getStoreById(storeId)),
  editStore: (store) => dispatch(editStore(store)),
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(StoreForm) as React.ComponentType<any>);
