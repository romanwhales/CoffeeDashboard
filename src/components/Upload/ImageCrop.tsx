import React, { useState } from 'react';
import { connect } from 'react-redux';
import { AppStore } from 'models';
import { withRouter, RouteComponentProps } from 'react-router';
import Button from '@atlaskit/button';
import Styles from './Styles';
import Modal from '@atlaskit/modal-dialog';
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Message from 'components/Message';
import { cloneDeep } from 'lodash';

export interface ImageCropProps extends RouteComponentProps {
  close: () => void;
  getCroppedFile: (croppedFile) => void;
}

const initialStateCrop = {
  unit: 'px',
  width: 306,
  height: 172,
  aspect: 16 / 9,
  x: 0,
  y: 1
}

const initialToast = {
  text: '',
  type: '',
  show: false,
  time: ''
}

const ImageCrop: React.FunctionComponent<ImageCropProps> = props => {
  const [src, setSrc] = useState(null);
  const [crop, setCrop] = useState(initialStateCrop);
  const [imageRef, setImageRef] = useState(null); 
  const [file, setFile] = useState(null);
  const [croppedFile, setCroppedFile] = useState(null);
  const [toast, setToast] = useState(initialToast);

  const handleClickSelectFile = () => {
    setImageRef(null);
    const uploadSelectFile = document.getElementById('uploadSelectFile')
    uploadSelectFile.click();
  }

  const handleImageCrop = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      let size = e.target.files[0].size / 1024 / 1024;
      let type = e.target.files[0].type.split('/')[0];
      if (type === 'image' || type === 'video' ){
        let upload = false;
        const imageLimit = 20;
        const videoLimit = 500;
        let fileLimit = 0;
        if (type === 'image' && size <= imageLimit){
          upload = true;
        }else if (type === 'video' && size <= videoLimit){
          upload = true;
        }else{
          fileLimit = type === 'image' ? imageLimit : videoLimit;
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
          cloneToast.text = `File size exceeds ${fileLimit} MB`;
          cloneToast.type = 'error';
          cloneToast.time = new Date().toUTCString();
          setToast(cloneToast);
        }
      }else{
        let cloneToast = cloneDeep(toast);
        cloneToast.show = true;
        cloneToast.text = `File is not an image or a video`;
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

  const handleClickSave = async (file) => {
    if (file.type.indexOf('video') > -1){
      props.getCroppedFile(file);
    }else{
      if (croppedFile){
        props.getCroppedFile(croppedFile);
      }else{
        const initCroppedFile = await getCroppedFile(
          imageRef,
          initialStateCrop,
          file
        );
        props.getCroppedFile(initCroppedFile);
      }
    }
  }

  return (
    <Modal onClose={() => props.close()}>
      <Message show={toast.show} text={toast.text} type={toast.type} time={toast.time} />
      <div style={{ height: 66, fontSize: 18, display: 'flex', alignItems: 'center' }}>
        <div>Upload a new image or video</div>
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
              onClick={handleClickSelectFile}
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
              />
            </div>
          }
          {src && file.type.indexOf('video') > -1 &&
            <div>
                <video controls style={{ width: 400, height: 250 }}>
                  <source type={file.type} src={src}></source>
                </video>
            </div>
          }
        </div>
      </div>
      <div style={{ marginTop: 25, marginBottom: 25 }}>
        {src && 
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: 190, marginRight: 25 }}>
              <Button 
                onClick={handleClickSelectFile}
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
              >
                Save
              </Button>
            </div>
          </div>
        }
      </div>
      <input 
        id='uploadSelectFile'
        type='file'
        style={{ display: 'none' }}
        onChange={event => handleImageCrop(event)} 
      />
    </Modal>
  );
};

const mapStateToProps = (state: AppStore) => ({
  
})
const mapDispatchToProps = dispatch => ({
  
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ImageCrop));
