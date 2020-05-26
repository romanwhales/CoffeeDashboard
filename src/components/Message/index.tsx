import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { AppStore } from 'models';
import { withRouter, RouteComponentProps } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import './ReactToastify.css';

export interface MessageProps extends RouteComponentProps {
  text: string;
  type: string;
  show: boolean;
  time?: string;
}

const Message: React.FunctionComponent<MessageProps> = props => {

  useEffect(() => {
    if (props.show){
      switch (props.type) {
        case 'success':
          toast.success(props.text);
          break;
        case 'error':
          toast.error(props.text);
          break;
        case 'warning':
          toast.warn(props.text);
          break;
        case 'info':
          toast.info(props.text);
          break;
        default:
          toast(props.text);
          break;
      }
    }
  }, [props.show, props.text, props.type, props.time])

  return (
    <ToastContainer 
      position={toast.POSITION.TOP_RIGHT} 
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      draggable
      pauseOnHover
    />
  );
};

const mapStateToProps = (state: AppStore) => ({
  
})
const mapDispatchToProps = dispatch => ({
  
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Message));
