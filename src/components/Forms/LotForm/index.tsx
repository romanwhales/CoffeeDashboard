import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  AppStore,
  BaseBean,
  BaseCreate,
  BaseEdit,
  BasePurchase,
  UserInfo,
  BaseProducer,
  BaseSingleOrganization
} from 'models';
import { withRouter, RouteComponentProps } from 'react-router';
import { getBeanRelatedData, getBeanById, createBean, editBean, purchaseBean } from 'redux/actions/beans';
import { getRoastProfiles } from 'redux/actions/roastProfiles';
import { getCertifications } from 'redux/actions/certifications';
import { getProcesses } from 'redux/actions/processes';
import { getVarieties } from 'redux/actions/varieties';
import { getSingleOrganizations } from 'redux/actions/organizations';
import { getCuppingNotes1 } from 'redux/actions/cuppingNotes1';
import { getCuppingNotes2 } from 'redux/actions/cuppingNotes2';
import { getCuppingNotes3 } from 'redux/actions/cuppingNotes3';
import { FieldTitle } from 'styledComponents/globals';
import { cloneDeep, reject, orderBy } from 'lodash';
import TextField from '@atlaskit/textfield';
import Select from '@atlaskit/select';
import Button from '@atlaskit/button';
import TextArea from '@atlaskit/textarea';
import { Checkbox, CheckboxIcon } from '@atlaskit/checkbox';
import ProducerModal from 'components/Modals/ProducerModal';
import { Progress } from 'reactstrap';
import Map from 'components/Map';
import Styles from './Styles';
import Upload from 'components/Upload';
import { find } from 'lodash';
import Spinner from 'components/Spinner';
import InventoryModal from 'components/Modals/InventoryModal';
import ConfirmationModal from 'components/Modals/ConfirmationModal';
import { validateLatLng } from 'helpers/formats';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { BW } from 'api';
import LogoCrop from 'components/Upload/LogoCrop';

export interface LotFormProps extends RouteComponentProps {
  isLoading: Boolean;
  lots: [];
  beans: [];
  bean: BaseBean,
  producers: [],
  farms: [],
  roastProfiles: [],
  certifications: [],
  processes: [],
  varieties: [],
  cuppingNotes1: [],
  cuppingNotes2: [],
  cuppingNotes3: [],
  create: BaseCreate;
  edit: BaseEdit;
  purchase: BasePurchase;
  userInfo: UserInfo;
  producerCreated: BaseProducer;
  token: string;
  cafe: BaseSingleOrganization;
  getBeanRelatedData: () => void;
  getRoastProfiles: () => void;
  getCertifications: () => void;
  getProcesses: () => void;
  getVarieties: () => void;
  getCuppingNotes1: () => void;
  getCuppingNotes2: () => void;
  getCuppingNotes3: () => void;
  getBeanById: (beanId, callback: () => void) => void;
  createBean: (bean) => void;
  editBean: (bean) => void;
  purchaseBean: (beanId, data) => void;
  getSingleOrganizations: (cafeId: string) => void;
}

const initialState = {
  _id: '',
  name: '',
  producer: {_id: '', name: ''},
  farm: {latitude: '', longitude: '', producer: '', name: '', city: '', country: ''},
  sku: '',
  retailPrice: '',
  elevation: '',
  ico: '',
  location: '',
  amount: '',
  story: '',
  tastingNotes: '',
  roastProfiles: [],
  certifications: [],
  files: [],
  cuppingNotes1: [],
  cuppingNotes2: [],
  cuppingNotes3: [],
  processes: [],
  varieties: [],
  impact: '',
  comments: '',
  isDefaultList: false,
  isPublished: false,
  logo: '',
  latitude: 0,
  longitude: 0,
  isPassport: false,
  brandColor: '#7876E0'
}

const initialStateError = {
  name: '',
  producer: '',
  retailPrice: ''
}

const initialStateInventory = {
  amount: 0,
  price: 0
}

const NEW_PRODUCER = {label: 'New Producer +', value: 'new'};

const ERROR_COLOR = '#EF6749';

const LotForm: React.FunctionComponent<LotFormProps> = props => {
  const [lot, setLot] = useState(initialState);
  const [producers, setProducers] = useState([]);
  const [roastProfiles, setRoastProfiles] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [processes, setProcesses] = useState([]);
  const [varieties, setVarieties] = useState([]);
  const [cuppingNotes1, setCuppingNotes1] = useState([]);
  const [cuppingNotes2, setCuppingNotes2] = useState([]);
  const [cuppingNotes3, setCuppingNotes3] = useState([]);
  const [openProducerModal, setOpenProducerModal] = useState(false);
  const [markers, setMarkers] = useState([]);
  const [openInventoryModal, setOpenInventoryModal] = useState(false);
  const [error, setError] = useState(initialStateError);
  const [inventory, setInventory] = useState(initialStateInventory);
  const [openConfirmPopup, setOpenConfirmPopup] = useState(-1);
  const [loadingLogo, setLoadingLogo] = useState(false);
  const [openLogoCrop, setOpenLogoCrop] = useState(false);
  const [loadingBean, setLoadingBean] = useState(true);
  const [cafe, setCafe] = useState<BaseSingleOrganization>(null);
  const [progressPercentage,setProgressPercentage] = useState(0);

  useEffect(() => {
    props.getBeanRelatedData();
    props.getRoastProfiles();
    props.getCertifications();
    props.getProcesses();
    props.getVarieties();
    props.getCuppingNotes1();
    props.getCuppingNotes2();
    props.getCuppingNotes3();
    props.getSingleOrganizations(props.userInfo.cafes[0]);
    hideCheckbox();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    createList('producers');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.producers.length])

  useEffect(() => {
    createList('roastProfiles');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.roastProfiles.length])

  useEffect(() => {
    createList('certifications');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.certifications.length])

  useEffect(() => {
    createList('processes');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.processes.length])

  useEffect(() => {
    createList('varieties');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.varieties.length])

  useEffect(() => {
    createList('cuppingNotes1');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.cuppingNotes1.length])

  useEffect(() => {
    createList('cuppingNotes2');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.cuppingNotes2.length])

  useEffect(() => {
    createList('cuppingNotes3');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.cuppingNotes3.length])

  useEffect(() => {
    checkMode();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.match.params['id']])
  
  useEffect(() => {
    setCafe(props.cafe);
  }, [props.cafe]);

  useEffect(() => {
    if (props.bean && !loadingBean){
      createList('roastProfiles');
      createList('certifications');
      createList('processes');
      createList('varieties');
      createList('cuppingNotes1');
      createList('cuppingNotes2');
      createList('cuppingNotes3');
      hideCheckbox();
      setBean();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.bean, props.farms.length, props.roastProfiles.length, 
    props.certifications.length, props.processes.length, props.varieties.length, 
    props.cuppingNotes1.length, props.cuppingNotes2.length, props.cuppingNotes3.length])

  useEffect(() => {
    if (props.create){
      if (props.create._id){
        let cloneLot = cloneDeep(lot);
        cloneLot._id = props.create._id;
        setLot(cloneLot);
        props.purchaseBean(props.create._id, inventory);
        goToLots();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.create])

  useEffect(() => {
    if (props.edit){
      if (props.edit._id){
        props.purchaseBean(props.edit._id, inventory);
        goToLots();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.edit])

  useEffect(() => {
    if (props.producerCreated){
      if (props.producerCreated._id){
        let cloneLot = cloneDeep(lot);
        cloneLot.producer._id = props.producerCreated._id;
        cloneLot.producer.name = props.producerCreated.name;
        setLot(cloneLot);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.producerCreated])

  const checkMode = () => {
    const beanId = props.match.params['id'];
    if (beanId === 'new'){
      setLot(initialState);
    }else{
      setLoadingBean(true);
      props.getBeanById(beanId, () => {
        setLoadingBean(false);
      });
    }
  }

  useEffect(() => {
    const lotName = document.getElementById('lotName');
    if (lotName){
      lotName.parentElement.style.borderColor = error['name'] ? ERROR_COLOR : '';
    }
    const producer = document.getElementById('react-select-producer-input');
    if (producer){
      producer.parentElement.parentElement.parentElement.parentElement.style.borderColor = error['producer'] ? ERROR_COLOR : '';
    }
    const lotRetailPrice = document.getElementById('lotRetailPrice');
    if (lotRetailPrice){
      lotRetailPrice.parentElement.style.borderColor = error['retailPrice'] ? ERROR_COLOR : '';
    }
  }, [error])

  const setBean = async () => {
    const beanId = props.match.params['id'];
    if (beanId !== 'new'){
      let cloneBean = cloneDeep(initialState);
      cloneBean._id = props.bean._id;
      cloneBean.name = props.bean.name;
      cloneBean.producer = getProducerById(props.bean.producer);
      cloneBean.sku = props.bean.sku;
      cloneBean.amount = props.bean.amount.toString();
      cloneBean.impact = props.bean.impact;
      cloneBean.story = props.bean.story;
      cloneBean.location = props.bean.location;
      cloneBean.comments = props.bean.whyWeLoveIt;
      cloneBean.tastingNotes = props.bean.tastingNotes;
      let action = localStorage.getItem('action');
      if (action === 'edit'){
        cloneBean.ico = props.bean.icoCode ? props.bean.icoCode : '';
      }else{
        cloneBean.ico = '';
      }
      cloneBean.elevation = props.bean.elevation;
      cloneBean.retailPrice = props.bean.price.toString();
      let objFile = null;
      for (let i = 0; i < props.bean.photos.length; i++){
        objFile = { urlImage: props.bean.photos[i], index: props.bean.photos.length, isCover: i === 0 ? true : false, type: 'image' };
        cloneBean.files.push(objFile);
      }
      if (props.bean.movies){
        for (let i = 0; i < props.bean.movies.length; i++){
          objFile = { urlImage: props.bean.movies[i], index: props.bean.movies.length, isCover: false, type: 'video' };
          cloneBean.files.push(objFile);
        }
      }
      if (roastProfiles.length > 0){
        cloneBean.roastProfiles = createSelectedList(props.bean.roastProfiles, 'roastProfiles');
      }
      if (certifications.length > 0){
        cloneBean.certifications = createSelectedList(props.bean.certification, 'certifications');
      }
      if (cuppingNotes1.length > 0){
        cloneBean.cuppingNotes1 = createSelectedList(props.bean.cuppingNotes1, 'cuppingNotes1');
      }
      if (cuppingNotes2.length > 0){
        cloneBean.cuppingNotes2 = createSelectedList(props.bean.cuppingNotes2, 'cuppingNotes2');
      }
      if (cuppingNotes3.length > 0){
        cloneBean.cuppingNotes3 = createSelectedList(props.bean.cuppingNotes3, 'cuppingNotes3');
      }
      if (processes.length > 0){
        cloneBean.processes = createSelectedList(props.bean.process, 'processes');
      }
      if (varieties.length > 0){
        cloneBean.varieties = createSelectedList(props.bean.variety, 'varieties');
      }
      cloneBean.isPublished = props.bean.isPublished;

      cloneBean.latitude = props.bean.latitude ? props.bean.latitude : 0;
      cloneBean.longitude = props.bean.longitude ? props.bean.longitude : 0;
      if (validateLatLng(cloneBean.latitude, cloneBean.longitude)){
        let markersBean = [{latitude: cloneBean.latitude, longitude: cloneBean.longitude}];
        setMarkers(markersBean);
      }else{
        setMarkers([]);
      }

      if (props.bean.logo){
        if (props.bean.logo.indexOf('s3.amazonaws.com') > -1){
          let logoId = props.bean.logo.split('/')[5].split('?')[0];
          cloneBean.logo = await download_file(logoId, 'edit');
        }else{
          cloneBean.logo = props.bean.logo;
        }
      }else{
        cloneBean.logo = '';
      }
      

      cloneBean.isPassport = props.bean.isPassport;
      cloneBean.brandColor = props.bean.brandColor || '#7876E0';

      setLot(cloneBean);
    }
  }

  const createSelectedList = (str, type) => {
    if (props[type].length > 0){
      let selectedList = [];
      let list = str.split(',');
      let item = null;
      for (let i = 0; i < list.length; i++){
        item = find(props[type], { 'name': list[i].trim() });
        if (item && item !== undefined){
          item.selected = true;
          selectedList.push(item);
        }
      }
      return selectedList;
    }
  }

  const getProducerById = (producerId: string) => {
    let auxProducer = null;
    let producer = find(props.producers, { '_id': producerId });
    if (producer){
      auxProducer = {_id: producerId, name: producer['name']};
    }else{
      auxProducer = {_id: '', name: ''};
    }
    return auxProducer;
  }

  const hideCheckbox = () => {
    const checkboxIsDefaultList = document.getElementById('checkboxIsDefaultList');
    if (checkboxIsDefaultList){
      const label = checkboxIsDefaultList.getElementsByTagName('label');
      label[0].style.display = 'none';
    }
  }

  const createList = (type) => {
    let list = [];
    let obj = null;
    if (props[type]){
      for (let i = 0; i < props[type].length; i++){
        if (type === 'producers'){
          obj = {label: props[type][i].name, value: props[type][i]._id};
        }else{
          obj = props[type][i];
          if (type === 'certifications' && props[type][i].name.toLowerCase() === 'conventional'){
            obj.selected = true;
          }else{
            obj.selected = false;
          }
        }
        list.push(obj);
      }
    }
    switch (type) {
      case 'producers':
        list.unshift(NEW_PRODUCER);
        setProducers(list);
        break;
      case 'roastProfiles':
        setRoastProfiles(list);
        break;
      case 'certifications':
        setCertifications(list);
        break;
      case 'processes':
        setProcesses(list);
        break;
      case 'varieties':
        setVarieties(list);
        break;
      case 'cuppingNotes1':
        setCuppingNotes1(list);
        break;
      case 'cuppingNotes2':
        setCuppingNotes2(list);
        break;
      case 'cuppingNotes3':
        setCuppingNotes3(list);
        break;
      default:
        break;
    }
  }

  const handleOnChange = (event, id) => {
    const cloneLot = cloneDeep(lot);
    const cloneError = cloneDeep(error);
    switch (id) {
      case 'producer':
          cloneError.producer = '';
        if (event.value === 'new'){
          setOpenProducerModal(true);
        }else{
          cloneLot.producer = {_id: event.value, name: event.label};
          setLot(cloneLot);
        }
        break;
      default:
        cloneError.name = '';
        cloneError.retailPrice = '';
        cloneLot[id] = event.target.value;
        setLot(cloneLot);
        break;
    }
    setError(cloneError);
  }

  const closeProducerModal = () => {
    props.getBeanRelatedData();
    setOpenProducerModal(false);
  }

  const closeInventoryModal = () => {
    setOpenInventoryModal(false);
  }

  const selectItem = (item, type, list) => {
    const cloneLot = cloneDeep(lot);
    for (let i = 0; i < list.length; i++){
      if (list[i]._id === item._id){
        list[i].selected = !item.selected;
        if (list[i].selected){
          if (cloneLot[type]){
            let obj = find(cloneLot[type], { '_id': list[i]._id });
            if (!obj){
              cloneLot[type].push(list[i]);
            }
          }
        }else{
          cloneLot[type] = reject(cloneLot[type], function(el) { return el._id === item._id; });
        }
        break;
      }
    }
    setLot(cloneLot);
  }

  const addInventory = () => {
    const cloneInventory = cloneDeep(inventory);
    cloneInventory.amount = parseFloat(lot.amount);
    setInventory(cloneInventory);
    setOpenInventoryModal(true);
  }

  const getNamesList = (list) => {
    let strList = '';
    if (list.length > 0){
      let namesList = [];
      for (let i = 0; i < list.length; i++){
        namesList.push(list[i].name);
      }
      strList = namesList.join(', ');
    }
    return strList;
  }

  const validate = () => {
    let valid = true;
    const cloneError = cloneDeep(error);
    for (let key in error){
      if (typeof lot[key] === 'string' && lot[key].trim() === '' && key !== 'retailPrice'){
        valid = false;
        cloneError[key] = 'Required';
        setError(cloneError);
        break;
      }else if (typeof lot[key] === 'object' && lot[key]._id === ''){
        valid = false;
        cloneError[key] = 'Required';
        setError(cloneError);
        break;
      }else if (key === 'retailPrice'){
        let price = +lot[key];
        if (isNaN(price)){
          valid = false;
          cloneError[key] = 'Must be a number';
          setError(cloneError);
          break;
        }else if (price < 0){
          valid = false;
          cloneError[key] = 'Cannot be negative';
          setError(cloneError);
          break;
        }else{
          valid = true;
          cloneError[key] = '';
          setError(cloneError);
        }
      }else{
        valid = true;
        cloneError[key] = '';
        setError(cloneError);
      }
    } 
    return valid;
  }

  const save = (action) => {
    if (validate()){
      const beanId = props.match.params['id'];
      let beanToDB = {
        _id: lot._id,
        producer: lot.producer._id,
        farm: "",
        lot: "",
        name: lot.name.trim(),
        price: +lot.retailPrice,
        amount: 0,
        story: lot.story,
        highlight: "",
        grower: "",
        tastingNotes: lot.tastingNotes,
        roastProfiles: getNamesList(lot.roastProfiles),
        location: lot.location,
        certification: getNamesList(lot.certifications),
        photos: [],
        movies: [],
        cuppingNotes1: getNamesList(lot.cuppingNotes1),
        cuppingNotes2: getNamesList(lot.cuppingNotes2),
        cuppingNotes3: getNamesList(lot.cuppingNotes3),
        impact: lot.impact,
        variety: getNamesList(lot.varieties),
        process: getNamesList(lot.processes),
        elevation: lot.elevation,
        whyWeLoveIt: lot.comments,
        sku: lot.sku,
        isPublished: action === 'publish' ? true : false,
        icoCode: lot.ico,
        logo: lot.logo,
        latitude: lot.latitude,
        longitude: lot.longitude,
        isPassport: lot.isPassport,
        brandColor: lot.brandColor
      }
      lot.files = orderBy(lot.files, ['isCover'], ['desc']);
      for (let i = 0; i < lot.files.length; i++){
        if (lot.files[i].type === 'image'){
          beanToDB.photos.push(lot.files[i].urlImage);
        }else{
          beanToDB.movies.push(lot.files[i].urlImage);
        }
      }
      if (beanId === 'new'){
        beanToDB.amount = 0;
        if (beanToDB.isPublished){
          localStorage.setItem('publish', 'true');
        }else{
          localStorage.setItem('publish', 'false');
        }
        props.createBean(beanToDB);
      }else{
        beanToDB.amount = lot.amount ? parseFloat(lot.amount) : 0;
        props.editBean(beanToDB);
      }
    }
  }

  const goToLots = () => {
    props.history.push(`/lots`);
  }

  const discard = () => {
    goToLots();
  }

  const handleOnLocation = location => {
    let auxMarkers = [];
    let marker = {latitude: location.center[1], longitude: location.center[0]};
    auxMarkers.push(marker);
    setMarkers(auxMarkers);

    const cloneLot = cloneDeep(lot);
    cloneLot.location = location.place_name_en ? location.place_name_en : location.place_name;
    cloneLot.latitude = marker.latitude;
    cloneLot.longitude = marker.longitude;
    setLot(cloneLot);
  }

  const getUrlImage = (urlImage, type) => {
    const cloneLot = cloneDeep(lot);
    let objFile = { urlImage: urlImage, index: lot.files.length, isCover: false, type: type }
    cloneLot.files.push(objFile);
    setLot(cloneLot);
  }

  const handleDeleteFile = (index) => {
    const cloneLot = cloneDeep(lot);
    cloneLot.files.splice(index, 1);
    setLot(cloneLot);
  }

  const handleCheck = (event, index) => {
    const cloneLot = cloneDeep(lot);
    for (let i = 0; i < cloneLot.files.length; i++){
      cloneLot.files[i].isCover = false;
    }
    cloneLot.files[index].isCover = event.target.checked;
    setLot(cloneLot);
  }

  const handleOnClickCheckbox = (type) => {
    const cloneLot = cloneDeep(lot);
    switch (type) {
      case 'isDefaultList':
        cloneLot.isDefaultList = !cloneLot.isDefaultList;
        break;
      case 'isPassport':
        cloneLot.isPassport = !cloneLot.isPassport;
        break;
      default:
        break;
    }
    setLot(cloneLot);
  }

  const handleAddInventory = (objInventory) => {
    const cloneLot = cloneDeep(lot);
    cloneLot.amount = objInventory.amount;
    setLot(cloneLot);

    const cloneInventory = cloneDeep(inventory);
    cloneInventory.amount = parseFloat(objInventory.amount);
    cloneInventory.price = parseFloat(objInventory.price);
    setInventory(cloneInventory);

    setOpenInventoryModal(false);
  }

  const handleOpenConfirmPopup = (open) => {
    setOpenConfirmPopup(open);
  }

  const handleOpenLogoCrop = () => {
    setOpenLogoCrop(true);
  }

  const handleCloseCropLogo = () => {
    setOpenLogoCrop(false);
  }

  const handleGetCroppedFile = (croppedFile) => {
    handleCloseCropLogo();
    load(croppedFile);
  }

  const load = async (file) => {
    setLoadingLogo(true);
    let url = `${BW.baseUrl}/upload/upload_signed_url`;
    let config = {
      url: url,
      method: 'get',
      headers: {
        'Authorization': props.token,
        'Accept': file.type
      }
    };

    try {
      let output = await axios(config);
      uploadFile(file, output.data.putURL);
    } catch(err) {
      console.log('load:', err);
      setLoadingLogo(false);
    }
  }

  const uploadFile = async (file, putUrl) => {
    let request_promise = new Promise(async (resolve, reject) => {
      // let request = new Request(putUrl, 
      //   {
      //     method: 'PUT',
      //     body: file,
      //     headers: {
      //       'Content-Type':  file.type
      //     }
      //   }
      // );
      let options = {
        headers: {
          'Content-Type': file.type
        },
        onUploadProgress: function(progressEvent) {
          
          var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          // console.log('Completed is ',percentCompleted)
          setProgressPercentage(percentCompleted);
        }
      };
      try {
        // let output = await fetch(request);
        let output = axios.put(putUrl,file, options)
        resolve(output);
      } catch(err) {
        setLoadingLogo(false);
        reject(err);
      }
    });

    try {
      await request_promise;
      let id = putUrl.split('/')[5].split('?')[0];
      await download_file(id, 'upload');
    } catch(err) {
      console.log('uploadFile:', err);
    }
  }

  const download_file = async (id, action) => {
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
      if (action === 'edit'){
        return output.data.url;
      }else{
        const cloneLot = cloneDeep(lot);
        cloneLot.logo = output.data.url;
        setLot(cloneLot);
      }
      setLoadingLogo(false);
    } catch(err) {
      console.log('download_file:', err);
      setLoadingLogo(false);
      return '';
    }
  }

  return (
    <>
      {props.isLoading &&
        <Spinner size={80} />
      }
      {!props.isLoading &&
        <>
          <div style={Styles.mainContainer}>
            <div style={{ marginBottom: 28, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '80%' }}>
              <div>
                Lots > {props.match.params['id'] === 'new' ? 'New Lot' : 'Edit Lot'}
              </div>
              {cafe && (cafe.isPassportPublisher && props.userInfo.permissions[0] <= 100) &&
                <div id='checkboxIsPassport' style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }} onClick={() => handleOnClickCheckbox('isPassport')}>
                  <FieldTitle style={{ marginBottom: 0 }}>Passport Lot</FieldTitle>
                  <CheckboxIcon
                    isChecked={lot.isPassport}
                    label=''
                    primaryColor={lot.isPassport ? '#7876E0' : '#FFF'}
                  />
                </div>
              }
            </div>
            <div style={Styles.row}>
              <div style={Styles.columnXL}>
                <FieldTitle error={error['name']}>Name <span style={Styles.errorMessage}>{error['name'] ? error['name'] : ''}</span></FieldTitle>
                <TextField
                  id='lotName'
                  placeholder='Lot Name'
                  onChange={(event: any) => handleOnChange(event, 'name')}
                  style={Styles.textField}
                  value={lot.name}
                />
              </div>
            </div>
            <div style={Styles.row}>
              <div style={Styles.column}>
                <div style={{ zIndex: 3 }}>
                  <FieldTitle error={error['producer']}>Producer <span style={Styles.errorMessage}>{error['producer'] ? error['producer'] : ''}</span></FieldTitle>
                  <Select
                    instanceId='producer'
                    placeholder='Choose or create a new one'
                    options={producers}
                    onChange={(event: any) => handleOnChange(event, 'producer')}
                    value={lot.producer._id && {label: lot.producer.name, value: lot.producer._id}}
                  />
                </div>
              </div>
              <div style={Styles.column}>
                <FieldTitle>SKU</FieldTitle>
                <TextField
                  placeholder='Type in SKU number'
                  onChange={(event: any) => handleOnChange(event, 'sku')}
                  style={Styles.textField}
                  value={lot.sku}
                />
              </div>
            </div>
            <div style={Styles.row}>
              <div style={Styles.columnQuarter}>
                <div>
                  <FieldTitle>Upload Bean Logo</FieldTitle>
                  
                  <div style={Styles.logo}>
                    
                    {loadingLogo &&
                      // <Spinner size={80} />
                      <Progress value={progressPercentage} style={{width: '100%',height:'20px'}} animated/>
                    }
                    {/* <Spinner size={80} /> */}
                    
                    {lot.logo && !loadingLogo &&
                      <img src={lot.logo} alt='' style={Styles.logoImage} onClick={handleOpenLogoCrop} /> 
                    }
                    {!lot.logo && !loadingLogo &&
                      <div style={{ width: '100%' }} onClick={handleOpenLogoCrop}>
                        <div>
                          <FontAwesomeIcon
                            icon={faImage}
                            style={Styles.logoIcon}
                          />
                        </div>
                        <div>200x200px</div>
                        <div>Maximum file size: 5mb</div>
                        
                      </div>
                      
                    }
                    
                  </div>
                  {openLogoCrop &&
                    <LogoCrop 
                      close={() => handleCloseCropLogo()} 
                      getCroppedFile={(croppedFile) => handleGetCroppedFile(croppedFile) }
                    />
                  }
                </div>
              </div>
              <div style={Styles.columnMedium}>
                <div style={{ marginBottom: 28 }}>
                  <FieldTitle>Brand Color</FieldTitle>
                  <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <TextField
                      placeholder='Brand Color'
                      onChange={(event: any) => handleOnChange(event, 'brandColor')}
                      style={Styles.textField}
                      value={lot.brandColor}
                    />
                    <div style={{ backgroundColor: lot.brandColor, width: 39, height: 39, marginLeft: 8, border: '2px solid rgb(223, 225, 230)', borderRadius: 3 }}></div>
                  </div>
                </div>
                <div>
                  <FieldTitle error={error['retailPrice']}>Retail Price <span style={Styles.errorMessage}>{error['retailPrice'] ? error['retailPrice'] : ''}</span></FieldTitle>
                  <TextField
                    id='lotRetailPrice'
                    placeholder='Retail Price'
                    onChange={(event: any) => handleOnChange(event, 'retailPrice')}
                    style={Styles.textField}
                    value={lot.retailPrice}
                  />
                </div>
              </div>
            </div>
            <div style={Styles.row}>
              <div style={Styles.column}>
                <FieldTitle>ICO</FieldTitle>
                <TextField
                  placeholder='Type in ICO number'
                  onChange={(event: any) => handleOnChange(event, 'ico')}
                  style={Styles.textField}
                  value={lot.ico}
                />
              </div>
              <div style={Styles.column}>
                <FieldTitle>Elevation</FieldTitle>
                <TextField
                  placeholder='Elevation'
                  onChange={(event: any) => handleOnChange(event, 'elevation')}
                  style={Styles.textField}
                  value={lot.elevation}
                />
              </div>
            </div>
            <div style={Styles.row}>
              <div style={Styles.columnXL}>
                <FieldTitle>Location's Custom Description</FieldTitle>
                <TextField
                  placeholder='Type in a custom description of your location'
                  onChange={(event: any) => handleOnChange(event, 'location')}
                  style={Styles.textField}
                  value={lot.location}
                />
              </div>
            </div>
            <div style={Styles.row}>
              <div style={Styles.columnXL}>
                <div style={{ height: 300 }}>
                  <Map 
                    markers={markers}
                    onLocation={location => handleOnLocation(location)} 
                  />
                </div>
              </div>
            </div>
            <div style={Styles.row}>
              <div style={Styles.column}> 
                <FieldTitle>Amount (lb)</FieldTitle>
                <TextField
                  isDisabled
                  placeholder='Amount (lb)'
                  onChange={(event: any) => handleOnChange(event, 'amount')}
                  style={Styles.textField}
                  value={lot.amount}
                />
              </div>
              <div style={Styles.column}>
                <Button appearance='primary' style={Styles.button} onClick={() => addInventory()}>Add Inventory</Button>
              </div>
            </div>
            <div style={Styles.row}>
              <div style={Styles.columnXL}>
                <FieldTitle>Story</FieldTitle>
                <TextArea 
                  placeholder='Story'
                  onChange={(event: any) => handleOnChange(event, 'story')}
                  minimumRows={8}
                  value={lot.story}
                />
              </div>
            </div>
            <div style={Styles.row}>
              <div style={Styles.columnXL}>
                <FieldTitle>Tasting Notes</FieldTitle>
                <TextField 
                  placeholder='Tasting Notes'
                  onChange={(event: any) => handleOnChange(event, 'tastingNotes')}
                  style={Styles.textField}
                  value={lot.tastingNotes}
                />
              </div>
            </div>
            <div style={Styles.row}>
              <div style={Styles.columnXL}>
                <FieldTitle>Roast Profiles</FieldTitle>
                <div style={Styles.tagsContainer}>
                  {roastProfiles.map((item, index) => 
                    <Button 
                      key={index} 
                      style={item.selected ? Styles.selectionButtonSelected : Styles.selectionButton} 
                      onClick={() => selectItem(item, 'roastProfiles', roastProfiles)} 
                      title={item.name}
                    >
                      {item.name}
                    </Button>
                  )}
                </div>
              </div>
            </div>
            <div style={Styles.row}>
              <div style={Styles.columnXL}>
                <FieldTitle>Certification</FieldTitle>
                <div style={Styles.tagsContainer}>
                  {certifications.map((item, index) => 
                    <Button 
                      key={index} 
                      style={item.selected ? Styles.selectionButtonSelected : Styles.selectionButton} 
                      onClick={() => selectItem(item, 'certifications', certifications)} 
                      title={item.name}>{item.name}
                    </Button>
                  )}
                </div>
              </div>
            </div>
            <div style={Styles.row}>
              <div style={Styles.columnXL}>
                <Upload 
                  files={lot.files}
                  getUrlImage={(urlImage, type) => getUrlImage(urlImage, type)}
                  onDelete={(index) => handleDeleteFile(index)}
                  onCheck={(event, index) => handleCheck(event, index)}
                />
              </div>
            </div>
            <div style={Styles.row}>
              <div style={Styles.columnXL}>
                <FieldTitle>Cupping Notes 1</FieldTitle>
                <div style={Styles.tagsContainer}>
                  {cuppingNotes1.map((item, index) => 
                    <Button 
                      key={index} 
                      style={item.selected ? Styles.selectionButtonSelected : Styles.selectionButton} 
                      onClick={() => selectItem(item, 'cuppingNotes1', cuppingNotes1)} 
                      title={item.name}>{item.name}
                    </Button>
                  )}
                </div>
              </div>
            </div>
            <div style={Styles.row}>
              <div style={Styles.columnXL}>
                <FieldTitle>Cupping Notes 2</FieldTitle>
                <div style={Styles.tagsContainer}>
                  {cuppingNotes2.map((item, index) => 
                    <Button 
                      key={index} 
                      style={item.selected ? Styles.selectionButtonSelected : Styles.selectionButton} 
                      onClick={() => selectItem(item, 'cuppingNotes2', cuppingNotes2)} 
                      title={item.name}>{item.name}
                    </Button>
                  )}
                </div>
              </div>
            </div>
            <div style={Styles.row}>
              <div style={Styles.columnXL}>
                <FieldTitle>Cupping Notes 3</FieldTitle>
                <div style={Styles.tagsContainer}>
                  {cuppingNotes3.map((item, index) => 
                    <Button 
                      key={index} 
                      style={item.selected ? Styles.selectionButtonSelected : Styles.selectionButton} 
                      onClick={() => selectItem(item, 'cuppingNotes3', cuppingNotes3)} 
                      title={item.name}>{item.name}
                    </Button>
                  )}
                </div>
              </div>
            </div>
            <div style={Styles.row}>
              <div style={Styles.columnXL}>
                <FieldTitle>Process</FieldTitle>
                <div style={Styles.tagsContainer}>
                  {processes.map((item, index) => 
                    <Button 
                      key={index} 
                      style={item.selected ? Styles.selectionButtonSelected : Styles.selectionButton} 
                      onClick={() => selectItem(item, 'processes', processes)} 
                      title={item.name}>{item.name}
                    </Button>
                  )}
                </div>
              </div>
            </div>
            <div style={Styles.row}>
              <div style={Styles.columnXL}>
                <FieldTitle>Variety</FieldTitle>
                <div style={Styles.tagsContainer}>
                  {varieties.map((item, index) => 
                    <Button 
                      key={index} 
                      style={item.selected ? Styles.selectionButtonSelected : Styles.selectionButton} 
                      onClick={() => selectItem(item, 'varieties', varieties)} 
                      title={item.name}>{item.name}
                    </Button>
                  )}
                </div>
              </div>
            </div>
            <div style={Styles.row}>
              <div style={Styles.columnXL}>
                <FieldTitle>Impact</FieldTitle>
                <TextField 
                  placeholder='Impact'
                  onChange={(event: any) => handleOnChange(event, 'impact')}
                  style={Styles.textField}
                  value={lot.impact}
                />
              </div>
            </div>
            <div style={Styles.row}>
              <div style={Styles.columnXL}>
                <FieldTitle>Why we love it</FieldTitle>
                <TextField 
                  placeholder='Show your love!'
                  onChange={(event: any) => handleOnChange(event, 'comments')}
                  style={Styles.textField}
                  value={lot.comments}
                />
              </div>
            </div>
            {props.userInfo.permissions[0] < 100 &&
              <div style={Styles.row}>
                <div style={Styles.columnXL}>
                  <div id='checkboxIsDefaultList' style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: 180 }} onClick={() => handleOnClickCheckbox('isDefaultList')}>
                    <div style={Styles.checkboxLabel}>Assign to Default List</div>
                    <CheckboxIcon
                      isChecked={lot.isDefaultList}
                      label=''
                      primaryColor={lot.isDefaultList ? '#7876E0' : '#FFF'}
                    />
                    <Checkbox
                      label=''
                    />
                  </div>
                </div>
              </div>
            }
          </div>
          <div style={Styles.buttonsContainer}>
            {!lot.isPublished && 
              <div style={{ width: 221 }}>
                <Button 
                  style={Styles.buttonGray} 
                  onClick={() => save('draft')} 
                >
                  Save Draft
                </Button>
              </div>
            }
            {lot.isPublished &&
              <div style={{ width: 221 }}>
                <Button 
                  style={Styles.buttonGray} 
                  onClick={() => save('draft')} 
                >
                  Revert to Draft
                </Button>
              </div>
            }
            <div style={{ width: '40%', display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ width: 221, marginRight: 8 }}>
                <Button 
                  style={Styles.buttonGray} 
                  onClick={() => handleOpenConfirmPopup(0)} 
                >
                  Discard Changes
                </Button>
              </div>
              <div style={{ width: 221 }}>
                <Button 
                  appearance='primary'
                  style={Styles.buttonPublish} 
                  onClick={() => save('publish')} 
                >
                  {lot.isPublished ? 'Save' : 'Publish'}
                </Button>
              </div>
            </div>
          </div>
          <ProducerModal 
            open={openProducerModal}
            close={() => closeProducerModal()} 
          />
          <InventoryModal 
            open={openInventoryModal}
            close={() => closeInventoryModal()} 
            add={(inventory) => handleAddInventory(inventory)} 
            data={inventory}
          />
          <ConfirmationModal 
            open={openConfirmPopup} 
            text='Would you like to discard the changes?'
            onCancel={() => handleOpenConfirmPopup(-1)}
            onConfirm={() => discard()} 
          />
        </>
      }
    </>
  );
};

const mapStateToProps = (state: AppStore) => ({
  lots: state.lots.lots,
  beans: state.beans.beans,
  bean: state.beans.bean,
  producers: state.producers.producers,
  farms: state.farms.farms,
  roastProfiles: state.roastProfiles.roastProfiles,
  certifications: state.certifications.certifications,
  processes: state.processes.processes,
  varieties: state.varieties.varieties,
  cuppingNotes1: state.cuppingNotes1.cuppingNotes1,
  cuppingNotes2: state.cuppingNotes2.cuppingNotes2,
  cuppingNotes3: state.cuppingNotes3.cuppingNotes3,
  isLoading: state.beans.isLoading,
  create: state.beans.create,
  edit: state.beans.edit,
  purchase: state.beans.purchase,
  userInfo: state.auth.userInfo,
  producerCreated: state.producers.create,
  token: state.auth.token,
  cafe: state.organizations.cafe,
});

const mapDispatchToProps = dispatch => ({
  getBeanRelatedData: () => dispatch(getBeanRelatedData()),
  getRoastProfiles: () => dispatch(getRoastProfiles()),
  getCertifications: () => dispatch(getCertifications()),
  getProcesses: () => dispatch(getProcesses()),
  getVarieties: () => dispatch(getVarieties()),
  getCuppingNotes1: () => dispatch(getCuppingNotes1()),
  getCuppingNotes2: () => dispatch(getCuppingNotes2()),
  getCuppingNotes3: () => dispatch(getCuppingNotes3()),
  getBeanById: (beanId, callback) => dispatch(getBeanById(beanId, callback)),
  createBean: (bean) => dispatch(createBean(bean)),
  editBean: (bean) => dispatch(editBean(bean)),
  purchaseBean: (beanId, data) => dispatch(purchaseBean(beanId, data)),
  getSingleOrganizations: (cafeId: string) => dispatch(getSingleOrganizations(cafeId))
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LotForm));
