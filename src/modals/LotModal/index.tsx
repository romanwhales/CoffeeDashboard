import React from 'react';
import { get } from 'lodash';
import ModalDialog, { ModalFooter } from '@atlaskit/modal-dialog';
import Textfield from '@atlaskit/textfield';
import Button from '@atlaskit/button';
import Form, { Field, FormSection } from '@atlaskit/form';
import { BaseLot, AppStore, BaseFarm } from 'models';
import { BW } from 'api';
import { getLots } from 'redux/actions/lots';
import { connect } from 'react-redux';
import getOptionValue from 'helpers/getOptionValue';
import { closeModal } from 'redux/actions';
import FarmSelectField from 'components/Forms/Fields/FarmSelectField';

interface LotModalProps {
  isLoadingLots: boolean;
  initialName?: string;
  cafe: string;
  farms: BaseFarm[];
  closeModal: () => void;
  getLots: () => void;
}

const LotModal: React.FunctionComponent<LotModalProps> = props => {
  const [isLoading, setLoading] = React.useState(false);
  const createLot = (lot: Partial<BaseLot>) => {
    const { cafe } = props;
    if (!cafe) {
      return;
    }
    const farm = getOptionValue(lot.farm as any);
    const farmObject = props.farms.find(f => f._id === farm);
    setLoading(true);
    BW.post<string>('/lots/create', {
      ...lot,
      cafe,
      farm,
      producer: farmObject.producer,
    })
      .then(id => {
        setLoading(false);
        props.closeModal();
        props.getLots();
      })
      .catch(err => setLoading(false));
  };
  return (
    <ModalDialog
      onClose={props.closeModal}
      heading="Create Lot"
      components={{
        Container: ({ children, className }) => (
          <Form isDisabled={props.isLoadingLots || isLoading} onSubmit={createLot}>
            {({ formProps }) => (
              <form {...formProps} className={className}>
                {children}
              </form>
            )}
          </Form>
        ),
        Footer: ({ showKeyline }: { showKeyline: boolean }) => (
          <ModalFooter showKeyline={showKeyline}>
            <Button appearance="default" onClick={props.closeModal}>Cancel</Button>
            <Button appearance="primary" type="submit">Create Lot</Button>
          </ModalFooter>
        )
      }}
    >
      <FormSection>
        <Field name="name" label="Name" autoFocus={!!props.initialName} defaultValue={props.initialName || ''} isRequired>
          {({ fieldProps }) => <Textfield {...fieldProps} />}
        </Field>
        <Field
          isRequired
          label="Farm"
          name="farm"
          id="farm"
        >
          {({ fieldProps }) => (
            <FarmSelectField {...fieldProps} menuPosition="fixed" />
          )}
        </Field>
        <Field name="ico" label="ICO" isRequired>
          {({ fieldProps }) => <Textfield {...fieldProps} />}
        </Field>
      </FormSection>
    </ModalDialog>
  )
};
const mapStateToProps = (state: AppStore) => ({
  cafe: get(state.auth.userInfo.currentProfile, 'cafe', get(state.auth.userInfo, 'cafes[0]')),
  farms: state.farms.farms,
  isLoadingLots: state.lots.isLoading,
})
const mapDispatchToProps = dispatch => ({
  getLots: () => dispatch(getLots()),
  closeModal: () => dispatch(closeModal()),
})
export default connect(mapStateToProps, mapDispatchToProps)(LotModal);
