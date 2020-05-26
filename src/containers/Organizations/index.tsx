import React, { useEffect, useState } from 'react';
import { AppStore, UserInfo, BaseOrganization } from 'models';
import { getOrganizations } from 'redux/actions/organizations';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Heading, Title } from 'styledComponents/globals';
import Button from '@atlaskit/button';
import Styles from './Styles';
import Stores from 'containers/Stores';
import Users from 'containers/Users';

export interface OrganizationsContainerProps extends RouteComponentProps {
  isLoading: boolean;
  userInfo: UserInfo;
  organizations: BaseOrganization[];
  getOrganizations: () => void;
}

const OrganizationsContainer: React.FunctionComponent<OrganizationsContainerProps> = props => {
  const [organization, setOrganization] = useState(null);
  const [showStores, setShowStores] = useState(true);

  useEffect(() => {
    props.getOrganizations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    let organizationId = props.userInfo.currentProfile ? props.userInfo.currentProfile.cafe : props.userInfo.cafes[0];
    getOrganizationById(organizationId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.organizations.length])

  const getOrganizationById = (organizationId) => {
    for (let i = 0; i < props.organizations.length; i++){
      if (props.organizations[i]._id === organizationId){
        setOrganization(props.organizations[i]);
        break;
      }
    }
  }

  const goTo = (screen) => {
    switch (screen) {
      case 'stores':
        setShowStores(true);
        break;
      case 'users':
        setShowStores(false);
        break;
      default:
        break;
    }
  }

  return (
    <>
      <div>
        <Heading>
          <Title>{organization ? organization.name : ''}</Title>
        </Heading>
        <div style={Styles.buttonsContainer}>
          <div style={{ width: '100%', marginRight: 22, border: showStores && '2px solid #7876E0', borderRadius: 3 }}>
            <Button 
              onClick={() => goTo('stores')} 
              style={Styles.button}
            >
              Stores
            </Button>
          </div>
          <div style={{ width: '100%', border: !showStores && '2px solid #7876E0', borderRadius: 3 }}>
            <Button 
              onClick={() => goTo('users')} 
              style={Styles.button}
            >
              Users
            </Button>
          </div>
        </div>
        {showStores &&
          <div style={{ marginTop: 27 }}>
            <Stores />
          </div>
        }
        {!showStores &&
          <div style={{ marginTop: 27 }}>
            <Users />
          </div>
        }
      </div>
    </>
  )
}
const mapStateToProps = (state: AppStore) => ({
  userInfo: state.auth.userInfo,
  isLoading: state.organizations.isLoading,
  organizations: state.organizations.organizations
})
const mapDispatchToProps = dispatch => ({
  getOrganizations: () => dispatch(getOrganizations()),
});
export default connect(mapStateToProps, mapDispatchToProps)(OrganizationsContainer);

