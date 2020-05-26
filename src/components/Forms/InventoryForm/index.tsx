import React, { CSSProperties } from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router';
import { AppStore } from 'models';

import TextField from '@atlaskit/textfield';
import { FieldTitle } from 'styledComponents/globals';

export interface InventoryFormProps extends RouteComponentProps {
  handleOnChange: (event: any, id: string) => void;
  data: {}
}

const styles = {
  row: {
    display: 'flex',
    flexDirection: 'row'
  } as CSSProperties,
  column: {
    display: 'flex',
    flexDirection: 'column',
    width: 340,
    marginRight: 11
  } as CSSProperties,
  textField: {
    background: '#F4F5F9'
  } as CSSProperties,
}

const InventoryForm: React.FunctionComponent<InventoryFormProps> = props => {
  return (
    <div style={styles.row}>
      <div style={styles.column}>
        <FieldTitle>Amount (lb)</FieldTitle>
        <TextField
          onChange={(event: any) => props.handleOnChange(event, 'amount')}
          style={styles.textField}
          placeholder='Add amount (lb)'
          value={props.data['amount'] ? props.data['amount'] : ''}
        />
      </div>
      <div style={styles.column}>
        <FieldTitle>Green Cost</FieldTitle>
        <TextField
          onChange={(event: any) => props.handleOnChange(event, 'price')}
          style={styles.textField}
          placeholder='Insert green cost for amount'
          value={props.data['price'] ? props.data['price'] : ''}
        />
      </div>
    </div>
  );
}

const mapStateToProps = (state: AppStore) => ({

})
const mapDispatchToProps = dispatch => ({

});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(InventoryForm));
