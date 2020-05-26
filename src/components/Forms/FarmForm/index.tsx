import * as React from 'react';
import Select from '@atlaskit/select';
import Textfield from '@atlaskit/textfield';
import Button, { ButtonGroup } from '@atlaskit/button';
import { RadioGroup } from '@atlaskit/radio';
import { Checkbox } from '@atlaskit/checkbox';

import Form, { Field, FormHeader, FormSection, FormFooter } from '@atlaskit/form';
import { BW } from 'api';

type ProducerFormProps = {
  showHeader?: boolean;
  isDisabled?: boolean;
  initialName?: string;
  onCancel: () => void;
  onSubmit: (producer: { name: string, type: 'co-op' | 'independent' }) => void;
};


const ProducerForm: React.FunctionComponent<ProducerFormProps> = props => {
  const submitHandler = (data: { name: string, type: { value: 'independent' | 'co-op' } }) => props.onSubmit({ name: data.name, type: data.type.value })
  return (
    <div
      style={{
        display: 'flex',
        width: '400px',
        margin: '0 auto',
        minHeight: '60vh',
        flexDirection: 'column',
      }}
    >
      <Form isDisabled={props.isDisabled} onSubmit={submitHandler}>
        {({ formProps }) => (
          <form
            {...formProps}
            name="create-producer-form"
          >
            {props.showHeader && <FormHeader title="Create Producer" />}
            <FormSection>
              <Field name="name" label="Name" autoFocus={!!props.initialName} defaultValue={props.initialName || ''} isRequired>
                {({ fieldProps }) => <Textfield {...fieldProps} />}
              </Field>
              <Field
                label="Type"
                name="type"
                id="type"
                isRequired
                defaultValue={{
                  label: 'Independent',
                  value: 'independent',
                }}
              >
                {({ fieldProps: { id, ...rest } }) => (
                  <Select
                    id={`${id}-select`}
                    isSearchable={false}
                    options={[
                      { label: 'Independent', value: 'independent' },
                      { label: 'Co-Op', value: 'co-op' },
                    ]}
                    {...rest}
                  />
                )}
              </Field>
            </FormSection>

            <FormFooter>
              <ButtonGroup>
                <Button onClick={props.onCancel} appearance="subtle" id="create-repo-cancel">
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
export default ProducerForm;
