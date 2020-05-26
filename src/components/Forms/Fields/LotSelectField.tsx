import * as React from 'react';
import { get, includes } from 'lodash';
import { CreatableSelect, SelectProps } from '@atlaskit/select';
import { AppStore, BaseProducer } from 'models';
import { connect } from 'react-redux';

import { lotsSelectOptions } from 'redux/selectors';
import { getLots, openCreateLotModal } from 'redux/actions/lots';

interface LotSelectFieldPropsProps {
  isLoading: boolean;
  selectedProducer?: string | null;
  options: { value: string, label: string, producer: string }[];
  onCreate: (name: string) => void;
  getLots: () => void;
}

const LotSelectField: React.FunctionComponent<LotSelectFieldPropsProps> = props => {
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
      placeholder="Select a Lot"
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
  options: lotsSelectOptions(state),
});
const mapDispatchToProps = dispatch => ({
  onCreate: (name: string) => dispatch(openCreateLotModal(name)),
  getLots: () => dispatch(getLots()),
})
export default connect(mapStateToProps, mapDispatchToProps)(LotSelectField);

