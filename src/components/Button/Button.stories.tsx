import * as React from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';
import Button from '.';

const Container = styled.div`
width: 500px;
display: flex;
flex-direction: row;
align-items: center;
justify-content: space-between;
`;

storiesOf('Components|Button', module)
  .add(
    '<Button />',
    () => (
      <Container>
        <Button>Test Button</Button>
        <Button disabled>Disabled Button</Button>
      </Container>
    )
  );