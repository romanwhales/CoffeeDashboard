import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { find } from 'lodash';
import { AppStore, BaseBean, BaseArchive, BaseCreate } from 'models';
import { CardContent } from 'components/Card';
import { StyledCard, Heading } from 'styledComponents/cards';
import beanPhoto from 'helpers/beanPhoto';
import { withRouter, RouteComponentProps } from 'react-router';
import { CheckboxIcon } from '@atlaskit/checkbox';
import Button from '@atlaskit/button';
import Styles from './Styles';
import { createBean, getBeans } from 'redux/actions/beans';
import { cloneDeep } from 'lodash';
import { BW } from 'api';
import axios from 'axios';

export interface LotCardProps extends RouteComponentProps {
  token: string;
  lot: BaseBean;
  producers: [],
  archive: BaseArchive;
  create: BaseCreate;
  beans: [],
  onCheck: (lot: BaseBean, checked) => void;
  createBean: (bean) => void;
  getBeans: () => void;
}

const LotCard: React.FunctionComponent<LotCardProps> = props => {
  const [producer, setProducer] = useState(null);
  const [hover, setHover] = useState(false);
  const [checked, setCheck] = useState(false);
  const [isDuplicated, setIsDuplicated] = useState(false);
  const [showCheckbox, setShowCheckbox] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (props.lot.photos.length > 0){
      if ((props.lot.photos[0].indexOf('s3.amazonaws.com') > -1) && (props.lot.photos[0].indexOf('placeholder-header.png') === -1)){
        downloadFile(props.lot.photos[0], (result) => {
          setImageUrl(result);
        })
      }else{
        setImageUrl(props.lot.photos[0]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.lot])

  useEffect(() => {
    const checkboxCard = document.getElementById(`checkboxCard_${props.lot._id}`);
    if (checkboxCard){
      const rects = checkboxCard.getElementsByTagName('rect');
      if (rects.length > 0){
        rects[0].style.width = '15px';
        rects[0].style.height = '15px';
        rects[0].style.stroke = '#7876E0';
        rects[0].style['x'] = '5';
        rects[0].style['y'] = '5';
        setShowCheckbox(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hover])

  useEffect(() => {
    if (props.archive){
      if (props.archive._id){
        setHover(false);
        setCheck(false);
      }
    }
  }, [props.archive])

  useEffect(() => {
    getProducerById(props.lot.producer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.producers.length])

  useEffect(() => {
    if (props.create){
      if (props.create._id){
        props.getBeans();
        if (isDuplicated){
          localStorage.setItem('action', 'duplicate');
          props.history.push(`/lots/${props.create._id}`);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.create])

  useEffect(() => {
    getProducerById(props.lot.producer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.beans.length])

  const downloadFile = async (urlImage, callback) => {
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
      callback(output.data.url);
    } catch(err) {
      // console.log('download_file:', err);
    }
  }

  const getProducerById = (producerId: string) => {
    let producer = find(props.producers, { '_id': producerId });
    setProducer(producer);
  }

  const navigateToLot = () => {
    localStorage.setItem('action', 'edit');
    props.history.push(`/lots/${props.lot._id}`);
  }

  const handleOnMouseEnter = () => {
    setHover(true);
  }

  const handleOnMouseLeave = () => {
    if (!checked){
      setHover(false);
      setShowCheckbox(false);
    }
  }

  const handleOnClickCheckbox = () => {
    let auxChecked = !checked;
    setCheck(auxChecked);
    props.onCheck(props.lot, auxChecked);
  }

  const handleDuplicate = () => {
    const lotDuplicated = cloneDeep(props.lot);
    let bean = null;
    let copies = [];
    for (let i = 0; i < props.beans.length; i++){
      bean = props.beans[i];
      if (bean.name.indexOf('[COPY') > -1){
        copies.push(bean);
      }
    }
    let copyNum = copies.length + 1;
    let auxName = lotDuplicated.name.indexOf('[COPY') > - 1 ? lotDuplicated.name.split('_')[1] : lotDuplicated.name;
    lotDuplicated.name = `[COPY${copyNum}]_${auxName}`;
    lotDuplicated.isPublished = false;
    lotDuplicated.farm = props.lot.farm ? props.lot.farm : '';
    lotDuplicated.lot = props.lot.lot ? props.lot.lot : '';
    lotDuplicated.price = props.lot.price ? props.lot.price : 0;
    lotDuplicated.amount = props.lot.amount ? props.lot.amount : 0;
    lotDuplicated.story = props.lot.story ? props.lot.story : '';
    lotDuplicated.highlight = props.lot.highlight ? props.lot.highlight : '';
    lotDuplicated.grower = props.lot.grower ? props.lot.grower : '';
    lotDuplicated.tastingNotes = props.lot.tastingNotes ? props.lot.tastingNotes : '';
    lotDuplicated.roastProfiles = props.lot.roastProfiles ? props.lot.roastProfiles : '';
    lotDuplicated.location = props.lot.location ? props.lot.location : '';
    lotDuplicated.certification = props.lot.certification ? props.lot.certification : '';
    lotDuplicated.photos = props.lot.photos.length > 0 ? props.lot.photos : [];
    lotDuplicated.cuppingNotes1 = props.lot.cuppingNotes1 ? props.lot.cuppingNotes1 : '';
    lotDuplicated.cuppingNotes2 = props.lot.cuppingNotes2 ? props.lot.cuppingNotes2 : '';
    lotDuplicated.cuppingNotes3 = props.lot.cuppingNotes3 ? props.lot.cuppingNotes3 : '';
    lotDuplicated.impact = props.lot.impact ? props.lot.impact : '';
    lotDuplicated.variety = props.lot.variety ? props.lot.variety : '';
    lotDuplicated.process = props.lot.process ? props.lot.process : '';
    lotDuplicated.elevation = props.lot.elevation ? props.lot.elevation : '';
    lotDuplicated.whyWeLoveIt = props.lot.whyWeLoveIt ? props.lot.whyWeLoveIt : '';
    lotDuplicated.sku = props.lot.sku ? props.lot.sku : '';
    props.createBean(lotDuplicated);
    setIsDuplicated(true);
  }

  return (
    <StyledCard 
      onMouseEnter={handleOnMouseEnter}
      onMouseLeave={handleOnMouseLeave}
    >
      {hover && 
        <div style={Styles.hoverContainer}>
          <div id={`checkboxCard_${props.lot._id}`} style={showCheckbox ? Styles.hoverCheckboxContainer : Styles.hoverCheckboxContainerHidden} onClick={handleOnClickCheckbox}>
            <CheckboxIcon
              isChecked={checked}
              label=''
              primaryColor={checked ? '#7876E0' : 'transparent'}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 64 }}>
            <div style={{ width: 105, marginBottom: 9 }}>
              <Button 
                appearance='primary'
                style={Styles.hoverButton} 
                onClick={navigateToLot} 
              >
                Edit
              </Button>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: 105, marginBottom: 9 }}>
              <Button 
                appearance='primary'
                style={Styles.hoverButton} 
                onClick={handleDuplicate} 
              >
                Duplicate
              </Button>
            </div>
          </div>
        </div>
      }
      <div>
        <Heading image={beanPhoto(imageUrl)}>
          <div className="band">
            <span>{props.lot ? props.lot.name : '---'}</span>
          </div>
        </Heading>
        <CardContent>
          <div style={{ display: 'flex', flexDirection: 'column', marginBottom: 10 }}>
            <label>Producer:</label>
            <label>{producer && producer.name ? producer.name : '---'}</label>
          </div>
          <label>Inventory:</label>
          <label>{props.lot.amount}</label>
        </CardContent>
      </div>
    </StyledCard>
  );
};


const mapStateToProps = (state: AppStore) => ({
  producers: state.producers.producers,
  archive: state.beans.archive,
  create: state.beans.create,
  beans: state.beans.beans,
  token: state.auth.token
})
const mapDispatchToProps = dispatch => ({
  createBean: (bean) => dispatch(createBean(bean)),
  getBeans: () => dispatch(getBeans()),
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LotCard));
