import React, { useState } from 'react';
import { connect } from 'react-redux';
import { AppStore } from 'models';
import { withRouter, RouteComponentProps } from 'react-router';
import Button from '@atlaskit/button';
import Styles from './Styles';
import Modal from '@atlaskit/modal-dialog';
import ReactCrop from "react-image-crop";
import "./ReactCrop.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Message from 'components/Message';
import { cloneDeep } from 'lodash';

export interface LogoCropProps extends RouteComponentProps {
  close: () => void;
  getCroppedFile: (croppedFile) => void;
}

const initialStateCrop = {
  unit: 'px',
  width: 200,
  height: 200
}

const initialToast = {
  text: '',
  type: '',
  show: false,
  time: ''
}

const LogoCrop: React.FunctionComponent<LogoCropProps> = props => {
  const [src, setSrc] = useState(null);
  const [crop, setCrop] = useState(initialStateCrop);
  const [imageRef, setImageRef] = useState(null); 
  const [file, setFile] = useState(null);
  const [croppedFile, setCroppedFile] = useState(null);
  const [toast, setToast] = useState(initialToast);

  const handleUploadLogo = () => {
    setImageRef(null);
    const uploadLogo = document.getElementById('uploadLogo')
    uploadLogo.click();
  }

  const handleChangeLogo = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      let size = e.target.files[0].size / 1024 / 1024;
      let type = e.target.files[0].type.split('/')[0];
      let format = e.target.files[0].type.split('/')[1];
      if (type === 'image' && format === 'png'){
        let upload = false;
        if (type === 'image' && size <= 5){
          upload = true;
        }
        if (upload){
          const reader = new FileReader();
          reader.addEventListener('load', () => {
            setSrc(reader.result);
          });
          setFile(e.target.files[0]);
          reader.readAsDataURL(e.target.files[0]);
        }else{
          let cloneToast = cloneDeep(toast);
          cloneToast.show = true;
          cloneToast.text = `File size exceeds 5 MB`;
          cloneToast.type = 'error';
          cloneToast.time = new Date().toUTCString();
          setToast(cloneToast);
        }
      }else{
        let cloneToast = cloneDeep(toast);
        cloneToast.show = true;
        cloneToast.text = `File is not an image with png format`;
        cloneToast.type = 'error';
        cloneToast.time = new Date().toUTCString();
        setToast(cloneToast);
      }
    }
  }

  const onImageLoaded = image => {
    setImageRef(image);
  };

  const onCropComplete = crop => {
    makeClientCrop(crop);
  };

  const onCropChange = (crop, percentCrop) => {
    setCrop(crop);
  };

  const makeClientCrop = async (crop) => {
    if (imageRef && crop.width && crop.height) {
      const croppedFileAux = await getCroppedFile(
        imageRef,
        crop,
        file
      );
      setCroppedFile(croppedFileAux);
    }
  }

  const getCroppedFile = (image, crop, file) => {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob(blob => {
        if (!blob) {
          console.error('Canvas is empty');
          return;
        }
        blob['name'] = file.name;
        let newFile = new File([blob], file.name, {type: file.type});
        resolve(newFile);
      }, file.type);
    });
  }

  const handleClickSave = (file) => {
    props.getCroppedFile(croppedFile);
  }

  return (
    <Modal onClose={() => props.close()}>
      <Message show={toast.show} text={toast.text} type={toast.type} time={toast.time} />
      <div style={{ height: 66, fontSize: 18, display: 'flex', alignItems: 'center' }}>
        <div>Upload Logo</div>
        <div style={{ position: 'absolute', right: 24, cursor: 'pointer' }} onClick={() => props.close()}>
          <FontAwesomeIcon
            icon={faTimes}
            style={{ fontSize: 16, color: '#000' }}
          />
        </div>
      </div>
      <div style={{ height: !src && 330, maxHeight: '100%', border: '1px dashed #000000', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 20 }}>
        {!src && 
          <div style={{ width: 150 }}>
            <Button 
              onClick={handleUploadLogo}
              appearance='primary'
              style={Styles.button} 
            >
              Upload
            </Button>
          </div>
        }
        <div>
          {src && file.type.indexOf('image') > -1 &&
            <div>
              <ReactCrop
                src={src}
                crop={crop}
                onImageLoaded={onImageLoaded}
                onComplete={onCropComplete}
                onChange={onCropChange}
                locked={true}
              />
            </div>
          }
        </div>
      </div>
      <div style={{ marginTop: 25, marginBottom: 25 }}>
        {src && 
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: 190, marginRight: 25 }}>
              <Button 
                onClick={handleUploadLogo}
                style={Styles.buttonWhite} 
              >
                Upload New Image
              </Button>
            </div>
            <div style={{ width: 150 }}>
              <Button 
                onClick={() => handleClickSave(file)}
                appearance='primary'
                style={Styles.button} 
                isDisabled={!croppedFile && file.type.indexOf('image') > -1}
              >
                Save
              </Button>
            </div>
          </div>
        }
      </div>
      <input 
        id='uploadLogo'
        type='file'
        style={{ display: 'none' }}
        onChange={event => handleChangeLogo(event)} 
      />
    </Modal>
  );
};

const mapStateToProps = (state: AppStore) => ({
  
})
const mapDispatchToProps = dispatch => ({
  
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LogoCrop));
