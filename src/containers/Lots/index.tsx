import React, { useEffect, useState } from 'react';
import { AppStore, BaseBean, BaseArchive, BaseEdit, BaseCreate } from 'models';
import { getBeans, getBeanRelatedData, archiveBean } from 'redux/actions/beans';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Heading, Title, SectionTitle } from 'styledComponents/globals';
import Button from '@atlaskit/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import LotCard from './LotCard';
import Styles from './Styles';
import { cloneDeep, find } from 'lodash';
import Message from 'components/Message';
import ConfirmationModal from 'components/Modals/ConfirmationModal';

export interface LotsContainerProps extends RouteComponentProps {
  isLoading: boolean;
  lots: BaseBean[];
  archive: BaseArchive;
  edit: BaseEdit;
  create: BaseCreate;
  getBeans: () => void;
  getBeanRelatedData: () => void;
  archiveBean: (beanId: string) => void;
}

const initialToast = {
  text: '',
  type: '',
  show: false,
  time: ''
}

const LotsContainer: React.FunctionComponent<LotsContainerProps> = props => {
  const [toast, setToast] = useState(initialToast);
  const [lotsChecked, setLotChecked] = useState([]);
  const [openConfirmPopup, setOpenConfirmPopup] = useState(-1);

  useEffect(() => {
    props.getBeans();
    props.getBeanRelatedData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.lots.length])

  useEffect(() => {
    if (props.archive){
      if (props.archive._id){
        let lot = find(props.lots, { '_id': props.archive._id });
        let cloneToast = cloneDeep(toast);
        if (lot.isPublished){
          cloneToast.show = true;
          cloneToast.text = 'Published Lot Deleted';
          cloneToast.type = 'success';
          cloneToast.time = new Date().toUTCString();
          setToast(cloneToast);
        }else{
          cloneToast.show = true;
          cloneToast.text = 'Draft Lot Deleted';
          cloneToast.type = 'success';
          cloneToast.time = new Date().toUTCString();
          setToast(cloneToast);
        }
        setLotChecked([]);
        props.getBeans();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.archive])

  useEffect(() => {
    if (props.create){
      if (props.create._id){
        let publish = localStorage.getItem('publish');
        let cloneToast = cloneDeep(toast);
        if (publish === 'true'){
          cloneToast.show = true;
          cloneToast.text = 'New Lot Created';
          cloneToast.type = 'success';
          cloneToast.time = new Date().toUTCString();
          setToast(cloneToast);
        }else{
          cloneToast.show = true;
          cloneToast.text = 'New Draft Lot Created';
          cloneToast.type = 'success';
          cloneToast.time = new Date().toUTCString();
          setToast(cloneToast);
        }
        localStorage.removeItem('publish');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.create])

  useEffect(() => {
    if (props.edit){
      if (props.edit._id && props.create === null){
        props.getBeans();
        let lot = find(props.lots, { '_id': props.edit._id });
        let cloneToast = cloneDeep(toast);
        if (lot && lot.isPublished){
          cloneToast.show = true;
          cloneToast.text = 'Published Lot Edited';
          cloneToast.type = 'success';
          cloneToast.time = new Date().toUTCString();
          setToast(cloneToast);
        }else{
          cloneToast.show = true;
          cloneToast.text = 'Draft Lot Edited';
          cloneToast.type = 'success';
          cloneToast.time = new Date().toUTCString();
          setToast(cloneToast);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.edit])

  const handleAdd = () => {
    props.history.push(`/lots/new`);
  }

  const handleDelete = () => {
    for (let i = 0; i < lotsChecked.length; i++){
      props.archiveBean(lotsChecked[i]._id);
    }
  }

  const handleCheck = (lot, checked) => {
    let cloneLotsChecked = cloneDeep(lotsChecked);
    if (checked){
      cloneLotsChecked.push(lot);
    }else{
      const index = cloneLotsChecked.findIndex(obj => obj._id === lot._id);
      cloneLotsChecked.splice(index, 1);
    }
    setLotChecked(cloneLotsChecked)
  }

  const handleOpenConfirmPopup = (open) => {
    setOpenConfirmPopup(open);
  }
  
  return (
    <>
      <Message show={toast.show} text={toast.text} type={toast.type} time={toast.time} />
      <div style={{ overflowY: 'auto' }}>
        <Heading>
          <Title>Lots</Title>
          <div style={{ display: 'flex', flex: 1, justifyContent: 'flex-end' }}>
            <SectionTitle>Create New Lot</SectionTitle>
          </div>
          <Button style={Styles.addButton} onClick={handleAdd}>
            <div style={{ width: 35, height: 35, lineHeight: '40px' }}>
              <FontAwesomeIcon
                icon={faPlus}
                style={{fontSize: 24, color: '#FFF' }}
              />
            </div>
          </Button>
        </Heading>
        <div style={{ display: 'flex', flex: 1, marginBottom: 12 }}>
          <SectionTitle>Drafts</SectionTitle>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
          {props.lots.map((lot, index) => 
            !lot.isPublished && <LotCard key={index} lot={lot} onCheck={(lot, checked) => handleCheck(lot, checked)} />
          )}
        </div>
        <div style={{ display: 'flex', flex: 1, marginBottom: 12 }}>
          <SectionTitle>Lots</SectionTitle>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
          {props.lots.map((lot, index) => 
            lot.isPublished && <LotCard key={index} lot={lot} onCheck={(lot, checked) => handleCheck(lot, checked)} />
          )}
        </div>
        {lotsChecked.length > 0 &&
          <div style={Styles.buttonsContainer}>
            <div style={{ width: '100%' }}>
              <Button 
                appearance='primary'
                style={Styles.buttonDelete} 
                onClick={() => handleOpenConfirmPopup(0)} 
              >
                DELETE
              </Button>
            </div>
          </div>
        }
      </div>
      <ConfirmationModal 
        open={openConfirmPopup} 
        text={lotsChecked.length === 1 ? 'Would you like to delete the lot?' : 'Would you like to delete the lots?'}
        onCancel={() => handleOpenConfirmPopup(-1)}
        onConfirm={() => handleDelete()} 
      />
    </>
  )
}
const mapStateToProps = (state: AppStore) => ({
  isLoading: state.beans.isLoading,
  lots: state.beans.beans,
  archive: state.beans.archive,
  edit: state.beans.edit,
  create: state.beans.create
})
const mapDispatchToProps = dispatch => ({
  getBeans: () => dispatch(getBeans()),
  getBeanRelatedData: () => dispatch(getBeanRelatedData()),
  archiveBean: (beanId: string) => dispatch(archiveBean(beanId)),
});
export default connect(mapStateToProps, mapDispatchToProps)(LotsContainer);

