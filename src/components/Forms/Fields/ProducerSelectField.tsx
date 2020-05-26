import React from 'react';
import  { CreatableSelect } from '@atlaskit/select';
import { AppStore } from 'models';
import { connect } from 'react-redux';

import { producerSelectOptions } from 'redux/selectors';
import { getProducers, openCreateProducerModal } from 'redux/actions/producers';

interface ProducerSelectFieldProps {
  isLoading: boolean;
  menuPosition?: 'fixed' | 'absolute';
  options: { value: string, label: string}[];
  onCreate: (name: string) => void;
  getProducers: () => void;
}

const ProducerSelectField: React.FunctionComponent<ProducerSelectFieldProps> = props => {
  const loadOptions = (inputValue: string, callback: (opts: any[]) => void) => {
      callback(
        inputValue.length > 0
        ? props.options.filter(opt => opt.label.toLowerCase().includes(inputValue.toLowerCase()))
        : props.options,
      );
  };
  return (
    <CreatableSelect
      placeholder="Select a Producer"
      {...props}
      isSearchable
      allowCreateWhileLoading
      loadOptions={loadOptions}
      onCreateOption={props.onCreate}
      createOptionPosition="first"
    />
  );
};
const mapStateToProps = (state: AppStore) => ({
  isLoading: state.producers.isLoading,
  options: producerSelectOptions(state),
});
const mapDispatchToProps = dispatch => ({
  onCreate: (name: string) => dispatch(openCreateProducerModal(name)),
  getProducers: () => dispatch(getProducers()),
})
export default connect(mapStateToProps, mapDispatchToProps)(ProducerSelectField);

