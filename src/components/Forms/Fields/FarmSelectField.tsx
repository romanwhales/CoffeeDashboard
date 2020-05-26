import * as React from 'react';
import { CreatableSelect } from '@atlaskit/select';
import { AppStore } from 'models';
import { connect } from 'react-redux';

import { farmsSelectOptions } from 'redux/selectors';
import { getFarms, openCreateFarmModal } from 'redux/actions/farms';

interface FarmSelectFieldPropsProps {
  isLoading: boolean;
  selectedProducer?: string | null;
  options: { value: string, label: string, producer: string }[];
  onCreate: (name: string) => void;
  getFarms: () => void;
}

const FarmSelectFieldProps: React.FunctionComponent<FarmSelectFieldPropsProps> = props => {
  const loadOptions = (inputValue: string, callback: (opts: any[]) => void) => {
    callback(
      inputValue.length > 0
        ? props.options.filter(opt => opt.label.toLowerCase().includes(inputValue.toLowerCase()))
        : props.options,
    );
  };
  const filter = props.selectedProducer ? ({ value, data }: any) => {
    console.log({ value, data });
  } : undefined;
  return (
    <CreatableSelect
      placeholder="Select a Farm"
      {...props}
      isSearchable
      allowCreateWhileLoading
      loadOptions={loadOptions}
      filterOption={filter}
      onCreateOption={props.onCreate}
      createOptionPosition="first"
    />
  );
};
const mapStateToProps = (state: AppStore) => ({
  isLoading: state.producers.isLoading,
  options: farmsSelectOptions(state),
});
const mapDispatchToProps = dispatch => ({
  onCreate: (name: string) => dispatch(openCreateFarmModal(name)),
  getFarms: () => dispatch(getFarms()),
})
export default connect(mapStateToProps, mapDispatchToProps)(FarmSelectFieldProps);

