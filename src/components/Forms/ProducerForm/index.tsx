import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router';
import { AppStore } from 'models';
import TextField from '@atlaskit/textfield';
import Select from '@atlaskit/select';
import { FieldTitle } from 'styledComponents/globals';
import styles from './Styles';

export interface ProducerFormProps extends RouteComponentProps {
  error: {};
  handleOnChange: (event: any, id: string) => void;
}

const ERROR_COLOR = '#EF6749';

const ProducerForm: React.FunctionComponent<ProducerFormProps> = props => {

  useEffect(() => {
    const producerName = document.getElementById('producerName');
    if (producerName){
      producerName.parentElement.style.borderColor = props.error && props.error['name'] ? ERROR_COLOR : '';
    }
    const producerType = document.getElementById('react-select-producerType-input');
    if (producerType){
      producerType.parentElement.parentElement.parentElement.parentElement.style.borderColor = props.error && props.error['type'] ? ERROR_COLOR : '';
    }
  }, [props.error])
  
  return (
    <div style={styles.row}>
      <div style={styles.column}>
        <FieldTitle error={props.error ? props.error['name'] : ''}>Name <span style={styles.errorMessage}>{props.error && props.error['name'] ? props.error['name'] : ''}</span></FieldTitle>
        <TextField
          id='producerName'
          placeholder='Name of Producer'
          onChange={(event: any) => props.handleOnChange(event, 'name')}
          style={styles.textField}
        />
      </div>
      <div style={styles.column}>
        <FieldTitle error={props.error ? props.error['type'] : ''}>Type <span style={styles.errorMessage}>{props.error && props.error['type'] ? props.error['type'] : ''}</span></FieldTitle>
        <Select
          instanceId='producerType'
          menuPortalTarget={document.body}
          styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
          placeholder='Choose Producer Type'
          options={[
            {label: 'Co-Op', value: 'co-op'},
            {label: 'Independent', value: 'independent'},
            {label: 'Group', value: 'group'}
          ]}
          onChange={(event: any) => props.handleOnChange(event, 'type')}
        />
      </div>
    </div>
  );
}

const mapStateToProps = (state: AppStore) => ({

})
const mapDispatchToProps = dispatch => ({

});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProducerForm) as React.ComponentType<any>);
