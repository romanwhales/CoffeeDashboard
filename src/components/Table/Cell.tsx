import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { AppStore } from 'models';
import { withRouter, RouteComponentProps } from 'react-router';
import Styles from './Styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { BW } from 'api';

export interface CellProps extends RouteComponentProps {
  header: string;
  item: any;
  token: string;
}

const Cell: React.FunctionComponent<CellProps> = props => {
  const [imageError, setImageError] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState('');

  useEffect(() => {
    if (props.item.profilePhoto){
      if (props.item.profilePhoto.indexOf('s3.amazonaws.com') > -1){
        setTimeout(async () => {
          let id = props.item.profilePhoto.split('/')[5].split('?')[0];
          let image = await download_file(id);
          setProfilePhoto(image);
        }, 1000)
      }else{
        setProfilePhoto(props.item.profilePhoto);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.item.profilePhoto])

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
      return output.data.url;
    } catch(err) {
      console.log('download_file:', err);
      return '';
    }
  }

  const handleImageError = () => {
    setImageError(true);
  }

  const renderCell = (header, item) => {
    const key = header.toLowerCase();
    let value = null;
    if (key === 'name'){
      value = (
        <div style={Styles.nameColumn}>
          {(!profilePhoto || imageError) && 
            <div style={Styles.photo}>
              <FontAwesomeIcon
                icon={faUser}
                style={Styles.icon}
              />
            </div>
          }
          {(profilePhoto && !imageError) && <img src={profilePhoto} style={Styles.photo} alt='' onError={handleImageError} />}
          <div style={Styles.subItem} title={item[key]}>{item[key]}</div>
        </div>
      );
    }else{
      value = (<div style={Styles.item}><div style={Styles.subItem} title={item[key]}>{item[key]}</div></div>);
    }
    return value;
  }

  return (
    <>
      {renderCell(props.header, props.item)}
    </>
  );
};

const mapStateToProps = (state: AppStore) => ({
  token: state.auth.token
})
const mapDispatchToProps = dispatch => ({
  
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Cell));
