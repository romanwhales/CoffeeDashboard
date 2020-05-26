
import * as React from 'react';
import { get } from 'lodash';
import styled from 'helpers/styled';
import Axios from 'axios';
import { BW } from 'api';

const MediaGroup = styled.div`
display: flex;
align-items: row;
align-items: center;
justify-content: flex-start;
flex-wrap: wrap;
margin: 15px 0;
`;

const MediaGroupContainer = styled.div``;

const MediaContainer = styled.div`
width: 280px;
display: flex;
flex-direction: column;
align-items: center;
justify-content: stretch;
margin-bottom: 5px;
:not(:last-child) {
  margin-right: 10px;
}
img, video {
  width: 280px;
  height: 160px;
}
.button {
  width: 100%;
  bottom: 0;
  cursor: pointer;
  text-align: center;
  height: 44px;
  line-height: 44px;
  color: white;
  text-transform: uppercase;
  background-color: rgb(245, 73, 73);
  font-family: Montserrat, sans-serif;
  font-weight: 600;
  font-size: 13px;
}
`;

const Media = props => {
  let Component = () => null;
  if (get(props, 'type') === 'photo') {
    Component = () => <img src={props.src} />;
  } else if (get(props, 'type') === 'movie') {
    Component = () => (
      <video controls>
        <source src={props.src}></source>
      </video>
    );
  }
  return (
    <MediaContainer>
      <Component />
      <div className="button" onClick={props.onDelete}>Delete</div>
    </MediaContainer>
  )
}

const LoadingAlert = styled.p`
font-family: Montserrat;
font-size: 12px;
padding: 12px;
border: 2px solid rgb(236, 236, 236);
margin: 8px 0;
color: rgb(70, 70, 70);
font-size: 16px;
font-weight: 500;
button {
  color: red;
  font-weight: bold;
  background: transparent;
  border: 1px solid red;
  border-radius: 2px;
  padding: 4px;
  box-sizing: border-box;
}
`;

interface MediaUploadProps {
  value: {
    photos: string[];
    movies: string[];
  };
  onChange: (data: { photos: string[], movies: string[] }) => void;
}
class MediaUpload extends React.Component<MediaUploadProps> {
  fileInput: React.Ref<HTMLInputElement> = React.createRef()
  request = null;
  state = {
    s3Url: null,
    isLoading: false,
    isUploading: false,
    isUploadError: false,
    uploadPercentage: 0,
  }

  abortRequest = () => {
    if (this.request) {
      this.request.abort();
      this.request = null;
      this.setState({
        s3Url: null,
        isLoading: false,
        isUploading: false,
        isUploadError: false,
        uploadPercentage: 0,
      });
    }
  }

  onDelete = type => index => (e) => {
    e.preventDefault();
    e.stopPropagation();
    const indexFilter = (o, i) => i !== index;
    const photos = type === 'photos'
      ? [...this.props.value.photos].filter(indexFilter)
      : [...this.props.value.photos];
    const movies = type === 'movies'
      ? [...this.props.value.movies].filter(indexFilter)
      : [...this.props.value.movies];
    this.props.onChange({ photos, movies });
  }

  beginProcess = files => {
    this.setState({
      s3Url: null,
      isLoading: true,
      isUploading: false,
      isUploadError: false,
      uploadPercentage: 0,
    }, () => {
      BW.get<{ success: boolean, putURL: string, publicURL: string }>('/upload/signed_url')
        .then((urlObj) => {
          if (urlObj && urlObj.success) {
            this.setState({ isLoading: false }, () => this.handleUpload(files, urlObj.putURL, urlObj.publicURL))
          }
        })
        .catch(error => {
          alert('Could not fetch S3 URL');
          return this.setState({ isLoading: false });
        })
    })
  }

  updateUploadProgress = (evt: { loaded: number, total: number, lengthComputable: boolean }) => {
    if (evt.lengthComputable) {
      const uploadPercentage = (evt.loaded / evt.total) * 100;
      this.setState({ uploadPercentage });
    }
  }

  handleUpload = (files, putUrl, publicUrl) => {
    this.setState({ isUploading: true }, () => {
      let file = files[0];
      // Split the filename to get the name and type
      let fileParts = files[0].name.split('.');
      let fileName = fileParts[0];
      let fileType = fileParts[fileParts.length - 1];
      const formData = new FormData()
      formData.append('file', file)
      Axios.put(putUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: console.log,
      })
        .then(res => {
          this.setState({ isUploading: false, isUploadError: false })
        })
        .catch(e => {
          this.setState({ isUploading: false, isUploadError: true })
        })
    })
  }

  render() {
    const uploadPercentage = this.state.uploadPercentage.toFixed(0);
    return (
      <div className="FormUploadTextEntry">
        <span style={{ fontFamily: 'Montserrat', fontSize: '12px' }}>Maximum file size: 20mb for photos / 500mb for movies</span>
        {
          this.state.isUploading
            ? (
              <LoadingAlert>{
                this.state.uploadPercentage >= 100
                  ? 'Uploading...'
                  : `Loading... ${uploadPercentage}%`
              } <button onClick={this.abortRequest}>Cancel</button></LoadingAlert>
            ) : (
              <input
                type="file"
                name="file"
                onChange={(e) => this.beginProcess(e.target.files)}
                ref={this.fileInput}
              />
            )
        }
        <MediaGroupContainer>
          <p style={{ fontFamily: 'Montserrat', fontSize: '12px' }}>MOVIES</p>
          <MediaGroup>
            {this.props.value.movies.map((url, index) => {
              return (<Media key={`bean_movie_${index}`} src={url} type="movie" onDelete={this.onDelete('movies')(index)} />)
            })}
          </MediaGroup>
          <p style={{ fontFamily: 'Montserrat', fontSize: '12px' }}>PHOTOS</p>
          <MediaGroup>
            {this.props.value.photos.map((url, index) => {
              return (<Media key={`bean_photo_${index}`} src={url} type="photo" onDelete={this.onDelete('photos')(index)} />)
            })}
          </MediaGroup>
        </MediaGroupContainer>
      </div>
    )
  }

}

export default MediaUpload;
