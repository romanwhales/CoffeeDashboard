import * as React from 'react';
import * as _ from 'lodash';
import Textfield from '@atlaskit/textfield';
import Button, { ButtonGroup } from '@atlaskit/button';
import FieldTextArea from '@atlaskit/field-text-area';
import Form, { Field, FormHeader, FormSection, FormFooter, Fieldset } from '@atlaskit/form';
import { BW } from 'api';
import { BaseBean } from 'models';
import styled from 'helpers/styled';
import ButtonGroupField from '../Fields/ButtonGroupField';
import * as options from './options';
import ProducerSelectField from '../Fields/ProducerSelectField';
import { getBeanRelatedData } from 'redux/actions/beans';
import { connect } from 'react-redux';
import FarmSelectField from '../Fields/FarmSelectField';
import LotSelectField from '../Fields/LotSelectField';
import MediaUpload from '../Fields/MediaUpload';
import beanPhoto from 'helpers/beanPhoto';

type BeanFormProps = {
  isDisabled?: boolean;
  bean?: BaseBean;
  onSubmit: (data) => void;
  getBeanRelatedData: () => void;
};

const Row = styled.div`
width: 100%;
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
flex-wrap: wrap;
`;

const Half = styled.div`
width: 49%;
`;

const BeanForm: React.FunctionComponent<BeanFormProps> = props => {
  React.useEffect(() => {
    props.getBeanRelatedData();
  }, [])
  const title = props.bean ? props.bean.name : 'Create Bean';
  return (
    <div
      style={{
        display: 'flex',
        width: '700px',
        // margin: '0 auto',
        minHeight: '60vh',
        flexDirection: 'column',
      }}
    >
      <Form isDisabled={props.isDisabled} onSubmit={props.onSubmit}>
        {({ formProps }) => (
          <form
            {...formProps}
            name="create-producer-form"
          >
            <FormHeader title={title} />
            <FormSection>
              <Field name="name" label="Name" defaultValue={_.get(props.bean, 'name', '')} isRequired>
                {({ fieldProps }) => <Textfield {...fieldProps} />}
              </Field>
              <Row>

                <Half>
                  <Field
                    label="Producer"
                    name="producer"
                    id="producer"
                    isRequired
                    defaultValue={
                      props.bean ? {
                        value: props.bean.producer,
                      } : undefined
                    }
                  >
                    {({ fieldProps: { ...rest } }) => (
                      <ProducerSelectField
                        {...rest}
                      />
                    )}
                  </Field>
                </Half>
                <Half>
                  <Field name="sku" label="SKU" defaultValue={_.get(props.bean, 'sku', '')} isRequired>
                    {({ fieldProps }) => <Textfield {...fieldProps} />}
                  </Field>
                </Half>
              </Row>
              <Row>
                <Half>
                  <Field
                    label="Farm"
                    name="farm"
                    id="farm"
                    isRequired
                    defaultValue={
                      props.bean ? {
                        value: props.bean.farm,
                      } : undefined
                    }
                  >
                    {({ fieldProps }) => (
                      <FarmSelectField {...fieldProps} />
                    )}
                  </Field>
                </Half>
                <Half>
                  <Field
                    label="Lot"
                    name="lot"
                    id="lot"
                    isRequired
                    defaultValue={
                      props.bean ? {
                        value: props.bean.lot,
                      } : undefined
                    }
                  >
                    {({ fieldProps }) => (
                      <LotSelectField {...fieldProps} />
                    )}
                  </Field>
                </Half>
              </Row>
              <Field
                label="Story"
                isRequired
                id="story"
                name="story"
                defaultValue={_.get(props.bean, 'story', '')}
              >
                {({ fieldProps: { id, ...rest } }) => (
                  <FieldTextArea
                    {...rest}
                    shouldFitContainer
                    compact={false}
                    enableResize="vertical"
                    minimumRows={4}
                  />
                )}
              </Field>
              <Fieldset>
                <Field name="tastingNotes" label="Tasting Notes" defaultValue={_.get(props.bean, 'tastingNotes')} isRequired>
                  {({ fieldProps }) => <Textfield {...fieldProps} />}
                </Field>
              </Fieldset>
            </FormSection>
            <FormSection title="Roast Profiles">
              <Field name="roastProfiles" defaultValue={props.bean ? props.bean.roastProfiles.split(', ') : []} isRequired>
                {({ fieldProps }) => {
                  return (
                    <ButtonGroupField
                      selected={fieldProps.value}
                      toggle={fieldProps.onChange}
                      options={options.roastProfiles}
                    />
                  )
                }}
              </Field>
            </FormSection>
            <FormSection title="Certification">
              <Field name="certification" defaultValue={props.bean ? props.bean.certification.split(', ') : []} isRequired>
                {({ fieldProps }) => {
                  return (
                    <ButtonGroupField
                      selected={fieldProps.value}
                      toggle={fieldProps.onChange}
                      options={options.certification}
                    />
                  )
                }}
              </Field>
            </FormSection>
            <FormSection title="Photos & Movies">
              <Field id="media" name="media" isRequired defaultValue={{ photos: [''], movies: [] }}>
                {({ fieldProps }) => (
                  <MediaUpload {...fieldProps} />
                )}
              </Field>
            </FormSection>
            <FormSection title="Cupping Notes 1">
              <Field name="cupping1" defaultValue={props.bean ? props.bean.cuppingNotes1.split(', ') : []} isRequired>
                {({ fieldProps }) => {
                  return (
                    <ButtonGroupField
                      selected={fieldProps.value}
                      toggle={fieldProps.onChange}
                      options={options.cupping1}
                    />
                  )
                }}
              </Field>
            </FormSection>
            <FormSection title="Cupping Notes 2">
              <Field name="cupping2" defaultValue={props.bean ? props.bean.cuppingNotes2.split(', ') : []} isRequired>
                {({ fieldProps }) => {
                  return (
                    <ButtonGroupField
                      selected={fieldProps.value}
                      toggle={fieldProps.onChange}
                      options={options.cupping2}
                    />
                  )
                }}
              </Field>
            </FormSection>
            <FormSection title="Cupping Notes 3">
              <Field name="cupping3" defaultValue={props.bean ? props.bean.cuppingNotes3.split(', ') : []} isRequired>
                {({ fieldProps }) => {
                  return (
                    <ButtonGroupField
                      selected={fieldProps.value}
                      toggle={fieldProps.onChange}
                      options={options.cupping3}
                    />
                  )
                }}
              </Field>
            </FormSection>
            <FormSection title="Process">
              <Field name="process" defaultValue={props.bean ? props.bean.process.split(', ') : []} isRequired>
                {({ fieldProps }) => {
                  return (
                    <ButtonGroupField
                      selected={fieldProps.value}
                      toggle={fieldProps.onChange}
                      options={options.process}
                    />
                  )
                }}
              </Field>
            </FormSection>
            <FormSection title="Variety">
              <Field name="variety" defaultValue={props.bean ? props.bean.variety.split(', ') : []} isRequired>
                {({ fieldProps }) => {
                  return (
                    <ButtonGroupField
                      selected={fieldProps.value}
                      toggle={fieldProps.onChange}
                      options={options.variety}
                    />
                  )
                }}
              </Field>
            </FormSection>
            <Field name="impact" label="Impact" defaultValue={_.get(props.bean, 'impact', '')} isRequired>
              {({ fieldProps }) => <Textfield {...fieldProps} />}
            </Field>
            <Field name="whyWeLoveIt" label="Why we love it" defaultValue={_.get(props.bean, 'whyWeLoveIt', '')} isRequired>
              {({ fieldProps }) => <Textfield {...fieldProps} />}
            </Field>
            <FormFooter>
              <ButtonGroup>
                <Button css={{}} appearance="subtle" id="create-repo-cancel">
                  Cancel
                </Button>
                <Button
                  css={{}}
                  appearance="primary"
                  id="create-repo-button"
                  type="submit"
                >
                  Create producer
                </Button>
              </ButtonGroup>
            </FormFooter>
          </form>
        )}
      </Form>
    </div >
  );
}
const mapDispatchToProps = dispatch => ({
  getBeanRelatedData: () => dispatch(getBeanRelatedData()),
});
export default connect(null, mapDispatchToProps)(BeanForm);
