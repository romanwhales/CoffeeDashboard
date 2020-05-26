import React, { useState, CSSProperties, useEffect } from 'react';
import { connect } from 'react-redux';
import { AppStore } from 'models';
import { withRouter, RouteComponentProps } from 'react-router';
import Modal from '@atlaskit/modal-dialog';
import Button from '@atlaskit/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import InventoryForm from 'components/Forms/InventoryForm';
import { cloneDeep, isNumber } from 'lodash';

export interface InventoryModalProps extends RouteComponentProps {
  open: boolean;
  close: () => void;
  add: (inventory) => void;
  data: {};
}

const styles = {
  row: {
    display: 'flex', 
    flexDirection: 'row'
  } as CSSProperties,
  close: {
    position: 'absolute', 
    right: 18, 
    cursor: 'pointer', 
    marginTop: 21
  } as CSSProperties,
  button: {
    display: 'flex', 
    justifyContent: 'center', 
    width: '100%',
    background: '#7876E0',
    fontSize: 16,
    fontWeight: 500
  } as CSSProperties,
  icon: {
    fontSize: 16, 
    color: '#000'
  } as CSSProperties,
  title: {
    fontSize: 18, 
    marginTop: 33
  } as CSSProperties,
}

const InventoryModal: React.FunctionComponent<InventoryModalProps> = props => {
  const [inventory, setInventory] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(props.open);
    setInventory(props.data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.open])
  
  const handleOnChange = (event: any, id: string) => {
    let value = +event.target.value;
    let isNum = isNumber(value);
    if (isNum && !isNaN(value)){
      const cloneInventory = cloneDeep(inventory);
      cloneInventory[id] = event.target.value;
      setInventory(cloneInventory);
    }
  }

  const add = () => {
    props.add(inventory);
  }

  return (
    <>
    {open && 
      <Modal onClose={() => props.close()}>
        <div style={styles.row}>
          <div style={styles.title}>Add Inventory</div>
          <div style={styles.close} onClick={() => props.close()}>
            <FontAwesomeIcon
              icon={faTimes}
              style={styles.icon}
            />
          </div>
        </div>
        <div style={{ marginTop: 20 }}>
          <InventoryForm handleOnChange={handleOnChange} data={inventory} />
        </div>
        <div style={{ marginTop: 36, marginBottom: 38 }}>
          <Button appearance='primary' style={styles.button} onClick={() => add()}>Add</Button>
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
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(InventoryModal));
