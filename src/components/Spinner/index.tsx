import React from 'react';
import styled, { keyframes } from 'helpers/styled';
import Logo from 'assets/logo_spinner.png';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

// Here we create a component that will rotate everything we pass in over two seconds
export const Rotate = styled.div<{ size?: number }>`
  display: inline-block;
  padding: 0;
  font-size: 0;
  height: ${props => props.size ? props.size : 40}px;
  width: ${props => props.size ? props.size : 40}px;
  overflow: hidden;
  animation: ${rotate} 20s linear infinite;
  img {
    height: 100%;
    width: 100%;
  }
`;

const Spinner = (props) => {
  return (
    <Rotate size={props.size}>
      <img src={Logo} alt='' />
    </Rotate>
  )
}
export default Spinner;
