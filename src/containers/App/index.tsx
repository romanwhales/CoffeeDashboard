import React, { useState, useEffect } from 'react';
import { RouteComponentProps, withRouter, Route } from 'react-router';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { ModalTransition } from '@atlaskit/modal-dialog';
import {
  HeaderSection,
  Item,
  LayoutManager,
  MenuSection,
  NavigationProvider,
  modeGenerator,
  ThemeProvider,
  Wordmark,
} from '@atlaskit/navigation-next';
import { Link } from 'react-router-dom';
import { ReactComponent as NavLogo } from 'assets/Logo_brown.svg';
import { UserInfo, AppStore } from 'models';
import { signInByToken, signOut } from 'redux/actions';
import routes from 'constants/routes';
import styled from 'helpers/styled';
import { BW } from 'api';
import axios from 'axios';
import LogoSpinner from 'assets/logo_spinner.png';

const LinkItem = ({ to, ...props }) => {
  const styles = { 
    display: 'flex', 
    justifyContent: 'flex-start', 
    alignItems: 'center', 
    height: 46, width: '100%', 
    fontSize: 18, 
    color: '#F4F5F9', 
    textDecoration: 'none', 
    borderBottom: '1px solid #F4F5F9',
    marginBottom: 15,
    paddingLeft: 13
  };

  return (
    <Route
      render={({ location: { pathname } }) => (
        <Item
          component={({ children, className }) => (
            <Link 
              to={to} 
              style={styles}>
              {children}
            </Link>
          )}
          isSelected={pathname === to}
          {...props}
        />
      )}
    />
  );
};

const ProductNavigation: React.FunctionComponent<{ signOut: () => void; name: string; profilePhoto: string; organization: string; token: string; }> = props => {
  const [profileImage, setProfileImage] = useState('');

  useEffect(() => {
    if (props.profilePhoto){
      downloadFile(props.profilePhoto);
    }else{
      setProfileImage(LogoSpinner);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.profilePhoto])

  const downloadFile = async (urlImage) => {
    try {
      let id = urlImage.split('/')[5].split('?')[0];
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
        setProfileImage(output.data.url);
      } catch(err) {
        setProfileImage(LogoSpinner);
      }
    }catch(err){
      setProfileImage(LogoSpinner);
    }
  }

  return (
    <>
      <HeaderSection>
        {({ className }) => (
          <div style={{ marginTop: 27, marginBottom: 40 }}>
            <Wordmark wordmark={NavLogo} />
          </div>
        )}
      </HeaderSection>
      <MenuSection>
        {({ className }) => (
          <div style={{ position: 'relative', overflowY: 'hidden', flex: '1 1 100%', boxSizing: 'border-box', paddingLeft: 25, paddingRight: 25, paddingBottom: 12, minHeight: 400 }}>
            {
              routes.map(route => !!route.sidebar && (
                <LinkItem
                  key={`ProductNavigationItem_${route.id}`}
                  id={route.id}
                  text={route.label}
                  to={route.path}
                />
              ))
            }
            <div style={{ position: 'absolute', bottom: 10 }}>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <div>
                  {profileImage && <img src={profileImage} style={{ width: 60, height: 60, borderRadius: '50%' }} alt='' />}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 13, cursor: 'pointer' }} onClick={props.signOut}>
                  <div style={{ fontSize: 14, color: '#FFF', marginBottom: 4 }}>{props.name}</div>
                  <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.55)' }}>{props.organization}</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </MenuSection>
    </>
  )
};

const PageWrapper = styled.div`
  padding-top: 29px;
`;

const customThemeMode = modeGenerator({
  product: {
    text: '#F4F5F9',
    background: '#3B3B3B',
  },
});

const App: React.FunctionComponent<Props> = props => {

  return (
    <NavigationProvider initialUIController={{ isResizeDisabled: true }}>
      <ThemeProvider
        theme={theme => ({
          ...theme,
          mode: customThemeMode,
        })}
      >
        <LayoutManager
          style={{ flex: 1 }}
          globalNavigation={() => null}
          productNavigation={() => (
            <ProductNavigation
              name={props.userInfo.name}
              profilePhoto={props.userInfo.profilePhoto}
              organization="Signout"
              signOut={props.signOut}
              token={props.token}
            />
          )}
        >
          <ModalTransition>
            {
              // @ts-ignore
              !!props.openModal && <props.openModal />
            }
          </ModalTransition>
          <PageWrapper>
            {
              routes.map(route => (
                <Route
                  exact={true}
                  path={route.path}
                  component={route.container}
                  key={`DashboardLayout_${route.id}`}
                />
              ))
            }
          </PageWrapper>
        </LayoutManager>
      </ThemeProvider>
    </NavigationProvider>
  );
};

interface Props extends RouteComponentProps {
  token: string;
  userInfo: UserInfo;
  isLoading: boolean;
  isAuthenticated: boolean;
  openModal: React.ReactNode;
  signOut: () => void;
  refreshToken: () => void;
}
const mapStateToProps = (state: AppStore) => ({
  isLoading: state.auth.isLoading,
  isAuthenticated: state.auth.isAuthenticated,
  userInfo: state.auth.userInfo,
  openModal: state.ui.openModal,
  token: state.auth.token
});
const mapDispatchToProps = dispatch => ({
  refreshToken: () => dispatch(signInByToken()),
  signOut: () => dispatch(signOut()),
});
const enhance = compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)
export default enhance(App);