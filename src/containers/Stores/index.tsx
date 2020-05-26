import React, { useEffect, useState } from 'react';
import { AppStore, BaseStore, UserInfo, BaseEdit } from 'models';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { getStoresByOrganization } from 'redux/actions/stores';
import StoreCard from './StoreCard';
import Styles from './Styles';
import Textfield from '@atlaskit/textfield';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Message from 'components/Message';

export interface StoresContainerProps extends RouteComponentProps {
  isLoading: boolean;
  stores: BaseStore[];
  userInfo: UserInfo;
  edit: BaseEdit;
  getStoresByOrganization: (organizationId) => void;
}

const initialToast = {
  text: '',
  type: '',
  show: false
}

const StoresContainer: React.FunctionComponent<StoresContainerProps> = props => {
  const [stores, setStores] = useState([]);
  const [toast, setToast] = useState(initialToast);

  useEffect(() => {
    getStoresByOrganization();
    setStyles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setStores(props.stores);
  }, [props.stores])

  useEffect(() => {
    if (props.edit){
      if (props.edit._id){
        getStoresByOrganization();
        setToast({show: true, text: 'Store edited', type: 'success'});
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.edit])

  const getStoresByOrganization = () => {
    let organizationId = props.userInfo.currentProfile ? props.userInfo.currentProfile.cafe : props.userInfo.cafes[0];
    props.getStoresByOrganization(organizationId);
  }

  const setStyles = () => {
    const searchStores = document.getElementById('searchStores');
    if (searchStores){
      searchStores.parentElement.style.borderStyle = 'unset';
      searchStores.parentElement.style.borderWidth = 'unset';
      searchStores.parentElement.style.borderRadius = '0';
      searchStores.parentElement.style.borderBottom = '2px solid #3B3B3B';
      searchStores.parentElement.style.backgroundColor = '#FFF';
    }
  }

  const handleChangeSearch = (event) => {
    if (event.target.value === ''){
      setStores(props.stores);
    }else{
      let foundStores = props.stores.filter(store => store.name.toLowerCase().indexOf(event.target.value) > -1);
      setStores(foundStores);
    }
  }

  return (
    <>
      <Message show={toast.show} text={toast.text} type={toast.type} />
      {!props.isLoading &&
        <div style={{ overflowY: 'auto' }}>
          <div style={{ display: 'flex', width: '95%', justifyContent: 'flex-end', marginBottom: 20 }}>
            <div style={{ width: '25%' }}>
              <Textfield
                id="searchStores"
                placeholder="Search"
                onChange={(event) => handleChangeSearch(event)}
                elemAfterInput={
                  <div style={{ paddingRight: '6px', lineHeight: '100%' }}>
                    <FontAwesomeIcon
                      icon={faSearch}
                      style={Styles.icon}
                    />
                  </div>
                }
              />
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
            {stores.map((store, index) => 
              <StoreCard key={index} storeData={store} />
            )}
          </div>
        </div>
      }
    </>
  )
}
const mapStateToProps = (state: AppStore) => ({
  stores: state.stores.stores,
  userInfo: state.auth.userInfo,
  edit: state.stores.edit,
  isLoading: state.stores.isLoading
})
const mapDispatchToProps = dispatch => ({
  getStoresByOrganization: (organizationId) => dispatch(getStoresByOrganization(organizationId)),
});
export default connect(mapStateToProps, mapDispatchToProps)(StoresContainer) as React.ComponentType<any>;

