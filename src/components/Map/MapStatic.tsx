import 'mapbox-gl/dist/mapbox-gl.css'
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css'
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Pin from './Pin';
import { AppStore } from 'models';
import { withRouter, RouteComponentProps } from 'react-router';
import { StaticMap, Marker } from 'react-map-gl';

export interface MapStaticProps extends RouteComponentProps {
  width: number;
  height: number;
  latitude: number;
  longitude: number;
  zoom: number;
}

const LAT_DEFAULT = 37.7520182;
const LON_DEFAULT = -122.4603106;

const MapStatic: React.FunctionComponent<MapStaticProps> = props => {

  useEffect(() => {
    setStyles();
  }, [])

  const setStyles = () => {
    const mapboxglCtrl = document.getElementsByClassName('mapboxgl-control-container');
    if (mapboxglCtrl.length > 0){
      for (let i = 0; i < mapboxglCtrl.length; i++){
        mapboxglCtrl[i]['style']['display'] = 'none';
      }
    }
  }

  return (
    <>
      <StaticMap
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        width={props.width}
        height={props.height}
        latitude={props.latitude ? props.latitude : LAT_DEFAULT}
        longitude={props.longitude ? props.longitude : LON_DEFAULT}
        zoom={props.zoom} 
        attributionControl={false}
      >
        <Marker
          latitude={props.latitude ? props.latitude : LAT_DEFAULT}
          longitude={props.longitude ? props.longitude : LON_DEFAULT}
          offsetLeft={-18} 
          offsetTop={-15}
        >
          <Pin size={30} />
        </Marker>
      </StaticMap>
    </>
  );
};


const mapStateToProps = (state: AppStore) => ({
  
})
const mapDispatchToProps = dispatch => ({
  
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MapStatic) as React.ComponentType<any>);
