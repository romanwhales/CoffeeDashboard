import * as React from 'react';
import { get, includes } from 'lodash';
import { ButtonGroup } from '@atlaskit/button';
import { Button as AKButton } from '@atlaskit/button/dist/cjs/components/Button';
import styled from 'helpers/styled';

interface ButtonGroupFieldProps {
  multi?: boolean;
  selected: any[];
  toggle: (option: any) => void;
  options: { label: string; value: any }[];
}

const Group = styled.div`
display: flex;
flex-flow: row wrap;
align-items: center;
justify-content: flex-start;
`;

const Button = styled(AKButton)`
margin: 6px;

flex: none !important;
`;

const ButtonGroupField: React.FunctionComponent<ButtonGroupFieldProps> = props => {
  const onChange = value => e => {
    e.preventDefault();
    if (!includes(props.selected, value)) {
      props.toggle([...props.selected, value]);
    } else {
      const index = props.selected.findIndex(itm => itm === value);
      if (index >= 0) {
        const newList = [...props.selected];
        newList.splice(index, 1);
        props.toggle(newList);
      }
    }
  }
  return (
    <Group>
      {
        props.options.map(({ label, value }) => {
          const isSelected = includes(props.selected, value);
          return (
            <Button
              css={{ flex: 'none'}}
              isSelected={isSelected}
              appearance="default"
              onClick={onChange(value)}
            >{label}</Button>
          )
        })
      }
    </Group>
  );
};
export default ButtonGroupField;
