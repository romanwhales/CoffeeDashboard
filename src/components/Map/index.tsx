import 'mapbox-gl/dist/mapbox-gl.css'
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css'
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import ReactMapGL, { Marker } from 'react-map-gl';
import Pin from './Pin';
import { AppStore } from 'models';
import { withRouter, RouteComponentProps } from 'react-router';
import Geocoder from 'react-map-gl-geocoder';
import { cloneDeep } from 'lodash';

export interface MapProps extends RouteComponentProps {
  markers: [],
  inputValue: string;
  hasError?: boolean;
  onLocation: (location) => void;
  handleOnClear: () => void;
  hideGeocoder:false
}

const initialViewport = {
  latitude: 37.7520182,
  longitude: -122.4603106,
  zoom: 12,
  bearing: 0,
  pitch: 0,
  
}

const ERROR_COLOR = '#EF6749';

const Map: React.FunctionComponent<MapProps> = props => {
  const [viewport, setViewport] = useState(initialViewport);
  const [markers, setMarkers] = useState(props.markers);
  const [events, setEvents] = useState({}); // eslint-disable-line
  const [mapRef, setMapRef] = useState(null);
  const [isDragPan, setIsDragPan] = useState(true);
  const [hideGeocoder,setHideGeocoder] = useState(props.hideGeocoder)


  useEffect(() => {
    setMapRef(React.createRef());
  }, [])

  useEffect(() => {
    let newViewport = cloneDeep(initialViewport);
    let auxMarkers = props.markers as any;
    if (props.markers.length > 0){
      newViewport.latitude = auxMarkers[0].latitude ? auxMarkers[0].latitude : initialViewport.latitude;
      newViewport.longitude = auxMarkers[0].longitude ? auxMarkers[0].longitude : initialViewport.longitude;
      setViewport(newViewport);
      setMarkers(auxMarkers);
    }
  }, [props.markers])

  useEffect(() => {
    const ctrlTopLeft = document.getElementsByClassName('mapboxgl-ctrl-top-left');
    if (ctrlTopLeft.length > 0){
      const ctrlGeocoder = document.getElementsByClassName('mapboxgl-ctrl-geocoder');
      if (ctrlGeocoder.length > 0){
        if (props.hasError){
          ctrlGeocoder[0]['style'].border = `2px solid ${ERROR_COLOR}`;
        }else{
          ctrlGeocoder[0]['style'].border = 'none';
        }
      }
    }
  }, [props.hasError])

  const handleFocus = (event) => {
    if (event.target.className === 'mapboxgl-ctrl-geocoder--input'){
      setIsDragPan(false);
    }else{
      setIsDragPan(true);
    }
  }

  const geocoderStyles = () => {
    const ctrlTopLeft = document.getElementsByClassName('mapboxgl-ctrl-top-left');
    if (ctrlTopLeft.length > 0){
      ctrlTopLeft[0]['style'].width = '98%';
      ctrlTopLeft[0]['style'].zIndex = 1;
      const ctrlGeocoder = document.getElementsByClassName('mapboxgl-ctrl-geocoder');
      if (ctrlGeocoder.length > 0){
        ctrlGeocoder[0]['style'].width = '100%';
        ctrlGeocoder[0]['style'].maxWidth = 'none';
      }
      const inputs = ctrlTopLeft[0].getElementsByClassName('mapboxgl-ctrl-geocoder--input');
      if (inputs.length > 0){
        inputs[0].addEventListener("focus", handleFocus, true);
      }
    }
  }

  const handleUpdateViewport = viewport => {
    setViewport(viewport);
  }

  const handleLogDragEvent = (name, event) => {
    setEvents({[name]: event.lngLat});
  }

  const handleOnMarkerDragStart = (event) => {
    handleLogDragEvent('onDragStart', event);
  }

  const handleOnMarkerDrag = (event, index) => {
    handleLogDragEvent('onDrag', event);
    let auxMarkers = markers as any;
    auxMarkers[index]['latitude'] = event.lngLat[1];
    auxMarkers[index]['longitude'] = event.lngLat[0];
    setMarkers(auxMarkers);
  }

  const handleOnInitGeocoder = event => {
    geocoderStyles();
  }

  const handleGeocoderViewportChange = viewport => {
    setViewport(viewport);
  }

  const handleOnResult = event => {
    if (props.onLocation){
      props.onLocation(event.result);
    }
  };

  const handleOnClear = () => {
    if (props.handleOnClear){
      props.handleOnClear();
    }
  }

  return (
    <>
      {mapRef &&
        <ReactMapGL
          ref={mapRef}
          {...viewport}
          width='100%'
          height='100%'
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          onViewportChange={viewport => handleUpdateViewport(viewport)}
          dragPan={isDragPan}
          onClick={handleFocus}
          
          
        >
          {markers.map((item, index) => 
            <Marker
              key={`bw-marker-${index}`}
              latitude={item['latitude'] ? item['latitude'] : initialViewport.latitude}
              longitude={item['longitude'] ? item['longitude'] : initialViewport.longitude}
              draggable
              onDragStart={event => handleOnMarkerDragStart(event)}
              onDrag={event => handleOnMarkerDrag(event, index)}
            >
              <Pin size={20} />
            </Marker>
          )}
          {!hideGeocoder?<Geocoder
            mapRef={mapRef}
            onInit={event => handleOnInitGeocoder(event)}
            onResult={event => handleOnResult(event)}
            onViewportChange={viewport => handleGeocoderViewportChange(viewport)}
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
            placeholder='Type in Location'
            position='top-left'
            inputValue={props.inputValue ? props.inputValue : ''}
            
            onClear={handleOnClear}
          />:''}
        </ReactMapGL>
      }
    </>
  );
};


const mapStateToProps = (state: AppStore) => ({
  
})
const mapDispatchToProps = dispatch => ({
  
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Map) as React.ComponentType<any>);
