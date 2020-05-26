import React from 'react';
import { connect } from 'react-redux';
import { AppStore, BaseStore } from 'models';
import { CardContent } from 'components/Card';
import { StyledCard } from 'styledComponents/cards';
import { withRouter, RouteComponentProps } from 'react-router';
import MapStatic from 'components/Map/MapStatic';
import Styles from './Styles';

export interface StoreCardProps extends RouteComponentProps {
  storeData: BaseStore;
}

const StoreCard: React.FunctionComponent<StoreCardProps> = props => {

  const navigateToStore = () => {
    props.history.push(`/organizations/stores/${props.storeData._id}`);
  }

  return (
    <StyledCard height='171px' onClick={navigateToStore}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div>
          <MapStatic 
            width={200}
            height={80}
            latitude={props.storeData.latitude}
            longitude={props.storeData.longitude}
            zoom={14}
          />
        </div>
        <div style={Styles.cardTitle}>
          <span>{props.storeData ? props.storeData.name : '---'}</span>
        </div>
        <div>
          <CardContent>
            <div style={{ display: 'flex', flexDirection: 'column', marginBottom: 10 }}>
              <label>Location:</label>
              {props.storeData.city && props.storeData.state ?
                <label>{props.storeData.city}, {props.storeData.state}</label> : <label>---</label>
              }
            </div>
          </CardContent>
        </div>
      </div>
    </StyledCard>
  );
};


const mapStateToProps = (state: AppStore) => ({

})
const mapDispatchToProps = dispatch => ({

});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(StoreCard));