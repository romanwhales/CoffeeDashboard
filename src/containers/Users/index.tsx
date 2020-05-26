import React, { useEffect, useState } from 'react';
import { AppStore, UserInfo, BaseEdit, BaseCreate } from 'models';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import Table from 'components/Table';
import { getUsersByOrganization } from 'redux/actions/users';
import Button from '@atlaskit/button';
import Styles from './Styles';
import UserModal from 'components/Modals/UserModal';

export interface UsersContainerProps extends RouteComponentProps {
  isLoading: boolean;
  users: UserInfo[];
  userInfo: UserInfo;
  edit: BaseEdit,
  create: BaseCreate,
  getUsersByOrganization: (organizationId) => void;
}

const UsersContainer: React.FunctionComponent<UsersContainerProps> = props => {
  const [usersData, setUsersData] = useState([]);
  const [openUserModal, setOpenUserModal] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    let organizationId = props.userInfo.currentProfile ? props.userInfo.currentProfile.cafe : props.userInfo.cafes[0];
    props.getUsersByOrganization(organizationId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (props.create){
      if (props.create._id){
        let organizationId = props.userInfo.currentProfile ? props.userInfo.currentProfile.cafe : props.userInfo.cafes[0];
        props.getUsersByOrganization(organizationId);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.create])

  useEffect(() => {
    if (props.edit){
      if (props.edit._id){
        let organizationId = props.userInfo.currentProfile ? props.userInfo.currentProfile.cafe : props.userInfo.cafes[0];
        props.getUsersByOrganization(organizationId);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.edit])

  useEffect(() => {
    createDataTable(props.users);
  }, [props.users])

  const createDataTable = (users) => {
    let usersList = [];
    let user = null;
    for (let i = 0; i < users.length; i++){
      user = {};
      user._id = users[i]._id;
      user.name = users[i].name;
      user.email = users[i].email;
      user.phone = users[i].phone ? users[i].phone : '---';
      user.profilePhoto = users[i].profilePhoto ? users[i].profilePhoto : '';
      usersList.push(user);
    }
    setUsersData(usersList);
  }

  const handleCreate = () => {
    setOpenUserModal(true);
  }

  const closeUserModal = () => {
    setData(null);
    setOpenUserModal(false);
  }

  const handleEdit = (user) => {
    setData(user);
    setOpenUserModal(true);
  }

  return (
    <>
      <div style={Styles.buttonContainer}>
        <Button 
          appearance='primary'
          style={Styles.button} 
          onClick={handleCreate}
        >
            Create New
        </Button>
      </div>
      <div style={Styles.tableContainer}>
        <Table 
          headers={['Name', 'Email', 'Phone']}
          data={usersData}
          handleEdit={(item) => handleEdit(item)}
        />
      </div>
      <UserModal 
        open={openUserModal}
        close={closeUserModal}
        data={data} 
      />
    </>
  )
}
const mapStateToProps = (state: AppStore) => ({
  isLoading: state.users.isLoading,
  users: state.users.users,
  userInfo: state.auth.userInfo,
  edit: state.users.edit, 
  create: state.users.create, 
})
const mapDispatchToProps = dispatch => ({
  getUsersByOrganization: (organizationId) => dispatch(getUsersByOrganization(organizationId)),
});
export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer) as React.ComponentType<any>;

