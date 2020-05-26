import styled from 'helpers/styled';

const Button = styled.button`
padding: 10px;
border-radius: 3px;
background-color: #7876E0;
color: #FFFFFF;
font-size: 16px;
font-weight: 500;
line-height: 22px;
text-align: center;
margin-bottom: 14px;
&:disabled {
  background-color: rgba(58,51,51, .4);
}
`;
export default Button;