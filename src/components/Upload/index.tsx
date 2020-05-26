import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { AppStore } from 'models';
import { withRouter, RouteComponentProps } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import Button from '@atlaskit/button';
import Styles from './Styles';
import { Checkbox } from '@atlaskit/checkbox';
import axios from 'axios';
import Spinner from 'components/Spinner';
import ImageCrop from './ImageCrop';
import { BW } from 'api';
import ConfirmationModal from 'components/Modals/ConfirmationModal';

export interface UploadProps extends RouteComponentProps {
  token: string;
  files: any[];
  getUrlImage: (urlImage, type) => void;
  onDelete: (index) => void;
  onCheck: (event, index) => void;
}

const Upload: React.FunctionComponent<UploadProps> = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [openImageCrop, setOpenImageCrop] = useState(false);
  const [files, setFiles] = useState(props.files);
  const [openConfirmPopup, setOpenConfirmPopup] = useState(-1);

  useEffect(() => {
    if (props.files.length > 0 && files.length !== props.files.length){
      getImageFromAws(props.files);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.files])

  const getImageFromAws = (fileList) => {
    setIsLoading(true);
    setTimeout(async () => {
      let id = ''; 
      let auxFileList = [];
      let auxFile = null;
      for (let i = 0; i < fileList.length; i++){
        auxFile = fileList[i];
        auxFile.isCover = i === 0 ? true : false;
        if (auxFile.urlImage.indexOf('s3.amazonaws.com') > -1 && auxFile.urlImage.indexOf('placeholder-header.png') === -1){
          id = auxFile.urlImage.split('/')[5].split('?')[0];
          let newUrl = await download_file(id, auxFile.type, false);
          auxFile.urlImage = newUrl;
          auxFileList.push(auxFile);
        }else{
          auxFileList.push(auxFile);
        }
      }
      setFiles(auxFileList);
      setIsLoading(false);
    }, 3000)
  }

  const handleOpenCropImage = () => {
    setOpenImageCrop(true);
  }

  const handleCloseCropImage = () => {
    setOpenImageCrop(false);
  }

  const uploadFile = async (file, putUrl) => {
    let request_promise = new Promise(async (resolve, reject) => {
      let request = new Request(putUrl, 
        {
          method: 'PUT',
          body: file,
          headers: {
            'Content-Type':  file.type
          }
        }
      );
      try {
        let output = await fetch(request);
        resolve(output);
      } catch(err) {
        reject(err);
      }
    });

    try {
      await request_promise;
      let id = putUrl.split('/')[5].split('?')[0];
      let type = file.type.split('/')[0];
      await download_file(id, type, true);
    } catch(err) {
      console.log('uploadFile:', err);
    }
  }

  const download_file = async (id, type, isUploadFile) => {
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
      if (isUploadFile){
        props.getUrlImage(output.data.url, type);
        setIsLoading(false);
      }else{
        return output.data.url;
      }
    } catch(err) {
      console.log('download_file:', err);
      return '';
    }
  }

  const load = async (file) => {
    setOpenImageCrop(false);
    setIsLoading(true);
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
    }
  }

  const handleGetCroppedFile = (croppedFile) => {
    load(croppedFile);
  }

  const handleOpenConfirmPopup = (index) => {
    setOpenConfirmPopup(index);
  }

  return (
    <>
      <div style={Styles.titleContainer}>
        <div style={Styles.title}>{'Photos & Videos'}</div>
        <div style={Styles.subTitle}>Maximum file size: 20mb for photos / 500mb for videos</div>
      </div>
      <div style={files.length === 0 ? Styles.uploadContainerEmpty : Styles.uploadContainer}>
        <div onClick={handleOpenCropImage} style={Styles.chooseFileContainer}>
          <div style={{ marginLeft: 21, marginRight: 8 }}>
            <FontAwesomeIcon
              icon={faImage}
              style={Styles.icon}
            />
          </div>
          <div style={Styles.chooseFileText}>{files.length === 0 ? 'No file chosen' : 'Choose more files'}</div>
          {isLoading &&
            <div style={{ marginLeft: 10 }}><Spinner size={30} /></div>
          }
        </div>
        <div style={Styles.filesContainer}>
          { files.length > 0 && files.map((item, index) => 
            <div key={index} style={Styles.filesSubContainer}>
              <div style={{ position: 'relative' }}>
                {item['type'] === 'image' && 
                  <div style={Styles.coverContainer}>
                    {item['isCover'] && 'Cover'}
                    <Checkbox
                      isChecked={item['isCover']}
                      onChange={(event: any) => props.onCheck(event, index)}
                    />
                  </div>
                }
                {item['type'] === 'image' ? 
                  <img src={item['urlImage']} alt='' style={Styles.file} /> : 
                  <video controls style={Styles.file}>
                    <source src={item['urlImage']}></source>
                  </video>
                }
                <Button 
                  appearance='primary'
                  style={Styles.deleteButton} 
                  onClick={() => handleOpenConfirmPopup(index)} 
                >
                  DELETE
                </Button>
              </div>
            </div>
          )} 
        </div>
      </div>
      {openImageCrop &&
        <ImageCrop 
          close={() => handleCloseCropImage()} 
          getCroppedFile={(croppedFile) => handleGetCroppedFile(croppedFile) }
        />
      }
      <ConfirmationModal 
        open={openConfirmPopup} 
        text='Would you like to delete the file?'
        onCancel={() => handleOpenConfirmPopup(-1)}
        onConfirm={() => props.onDelete(openConfirmPopup)} 
      />
    </>
  );
};

const mapStateToProps = (state: AppStore) => ({
  token: state.auth.token
})
const mapDispatchToProps = dispatch => ({
  
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Upload));
