import React from 'react';
import { get } from 'lodash';
import ModalDialog, { ModalFooter } from '@atlaskit/modal-dialog';
import Textfield from '@atlaskit/textfield';
import Button from '@atlaskit/button';
import Form, { Field, FormSection } from '@atlaskit/form';
import { BaseFarm, AppStore } from 'models';
import { BW } from 'api';
import { getFarms } from 'redux/actions/farms';
import { connect } from 'react-redux';
import getOptionValue from 'helpers/getOptionValue';
import { closeModal } from 'redux/actions';
import ProducerSelectField from 'components/Forms/Fields/ProducerSelectField';

interface FarmModalProps {
  isLoadingFarms: boolean;
  initialName?: string;
  cafe: string;
  closeModal: () => void;
  getFarms: () => void;
}

const FarmModal: React.FunctionComponent<FarmModalProps> = props => {
  const [isLoading, setLoading] = React.useState(false);
  const createFarm = (farm: Partial<BaseFarm>) => {
    const { cafe } = props;
    if (!cafe) {
      return;
    }
    setLoading(true);
    BW.post<string>('/farms/create', {
      cafe,
      ...farm,
      producer: getOptionValue(farm.producer as any),
    })
      .then(id => {
        setLoading(false);
        props.closeModal();
        props.getFarms();
      })
      .catch(err => setLoading(false));
  };
  return (
    <ModalDialog
      onClose={props.closeModal}
      heading="Create Farm"
      components={{
        Container: ({ children, className }) => (
          <Form isDisabled={props.isLoadingFarms || isLoading} onSubmit={createFarm}>
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
            <Button appearance="primary" type="submit">Create Farm</Button>
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
          label="Producer"
          name="producer"
          id="producer"
        >
          {({ fieldProps }) => (
            <ProducerSelectField {...fieldProps} menuPosition="fixed" />
          )}
        </Field>
        <Field name="latitude" label="Latitude" isRequired>
          {({ fieldProps }) => <Textfield {...fieldProps} />}
        </Field>
        <Field name="longitude" label="Longitude" isRequired>
          {({ fieldProps }) => <Textfield {...fieldProps} />}
        </Field>
        <Field name="city" label="City" isRequired>
          {({ fieldProps }) => <Textfield {...fieldProps} />}
        </Field>
        <Field name="country" label="Country" isRequired>
          {({ fieldProps }) => <Textfield {...fieldProps} />}
        </Field>
      </FormSection>
    </ModalDialog>
  )
};
const mapStateToProps = (state: AppStore) => ({
  cafe: get(state.auth.userInfo.currentProfile, 'cafe', get(state.auth.userInfo, 'cafes[0]')),
  isLoadingFarms: state.farms.isLoading,
})
const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(closeModal()),
  getFarms: () => dispatch(getFarms()),
})
export default connect(mapStateToProps, mapDispatchToProps)(FarmModal);
