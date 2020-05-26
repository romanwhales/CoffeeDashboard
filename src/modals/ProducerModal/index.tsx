import React from 'react';
import { get } from 'lodash';
import ModalDialog from '@atlaskit/modal-dialog';
import ProducerForm from 'components/Forms/ProducerForm';
import { BaseProducer, AppStore } from 'models';
import { BW } from 'api';
import { getProducers } from 'redux/actions/producers';
import { connect } from 'react-redux';
import { closeModal } from 'redux/actions';

interface ProducerModalProps {
  isLoadingProducers: boolean;
  initialName?: string;
  cafe: string;
  closeModal: () => void;
  getProducers: () => void;
}

const ProducerModal: React.FunctionComponent<ProducerModalProps> = props => {
  const [isLoading, setLoading] = React.useState(false);
  const createProducer = (producer: Partial<BaseProducer>) => {
    const { cafe } = props;
    if (!cafe) {
      return;
    }
    setLoading(true);
    BW.post<string>('/producers/create', { cafe, ...producer })
      .then(id => {
        setLoading(false);
        props.getProducers();
      })
      .catch(err => setLoading(false));
  };
  return (
    <ModalDialog heading="Create Producer">
      <ProducerForm onCancel={props.closeModal} isDisabled={isLoading || props.isLoadingProducers} onSubmit={createProducer} initialName={props.initialName} />
    </ModalDialog>
  )
};
const mapStateToProps = (state: AppStore) => ({
  cafe: get(state.auth.userInfo.currentProfile, 'cafe', get(state.auth.userInfo, 'cafes[0]')),
  isLoadingProducers: state.producers.isLoading,
})
const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(closeModal()),
  getProducers: () => dispatch(getProducers()),
})
export default connect(mapStateToProps, mapDispatchToProps)(ProducerModal);
