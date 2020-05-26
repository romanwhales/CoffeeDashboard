import React, { useState, CSSProperties, useEffect } from 'react';
import { connect } from 'react-redux';
import { AppStore } from 'models';
import { withRouter, RouteComponentProps } from 'react-router';
import Modal from '@atlaskit/modal-dialog';
import Button from '@atlaskit/button';

export interface ConfirmationModalProps extends RouteComponentProps {
  open: number; // value -1 closes the modal
  text: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const styles = {
  rowConfirm: {
    display: 'flex', 
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between'
  } as CSSProperties,
  buttonCancel: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    height: 40,
    background: '#F4F5F9',
    border: '1px solid rgba(59,59,59,0.5)',
    fontSize: 16
  } as CSSProperties,
  textConfirm: {
    display: 'flex',
    justifyContent: 'center',
    flex: 1,
    fontSize: 18,
    color: '#3B3B3B',
    fontWeight: 'bold'
  } as CSSProperties,
  buttonDelete: {
    display: 'flex', 
    justifyContent: 'center', 
    width: '100%',
    background: '#EF6749',
    fontSize: 16,
    fontWeight: 500,
    marginTop: 21,
  } as CSSProperties,
}

const ConfirmationModal: React.FunctionComponent<ConfirmationModalProps> = props => {
  const [open, setOpen] = useState(-1); // value -1 closes the modal

  useEffect(() => {
    setOpen(props.open);
  }, [props.open])

  const handleConfirm = () => {
    props.onConfirm();
    props.onCancel();
  }

  return (
    <>
      {open > -1 &&
        <Modal width={554} height={146}>
          <div style={{ marginTop: 26 }}>
            <div style={styles.rowConfirm}>
              <div style={styles.textConfirm}>{props.text}</div>
            </div>
            <div style={styles.rowConfirm}>
              <div style={{ width: 246 }}>
                <Button 
                  tabIndex={-1}
                  style={styles.buttonCancel} 
                  onClick={() => props.onCancel()} 
                >
                  Cancel
                </Button>
              </div>
              <div style={{ width: 246 }}>
                <Button 
                  tabIndex={-1}
                  appearance='primary'
                  style={styles.buttonDelete} 
                  onClick={handleConfirm} 
                >
                  Confirm
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      }
    </>
  );
};


const mapStateToProps = (state: AppStore) => ({
  
})
const mapDispatchToProps = dispatch => ({
  
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ConfirmationModal));
