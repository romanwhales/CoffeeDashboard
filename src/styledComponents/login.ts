import styled, { css } from '../helpers/styled';

export const MainContainer = styled.div`
flex: 1;
display: flex;
flex-direction: column;
position: relative;
padding: 20px 0;
align-items: center;
justify-content: center;
overflow: hidden;
`;

export const StyledInput = styled.input<{ hasError?: boolean }>`
width: 100%;
box-sizing: border-box;
padding: 8px 10px;
border: 2px solid ${props => props.hasError ? '#EF6749' : '#EDEAE4'};
border-radius: 3px;
line-height: 24px;
font-size: 14px;
font-weight: 500;
color: #3A3333;
margin-bottom: 19px;
:disabled,
::placeholder,
::-webkit-input-placeholder,
:-ms-input-placeholder {
  opacity: .4;
}
`;

export const StyledLabel = styled.label<{ hasError?: boolean }>`
display: inline-block;
text-align: left;
font-size: 12px;
line-height: 16px;
color: ${props => props.hasError ? '#EF6749' : '#3A3333'};
font-weight: 600;
margin-bottom: 4px;
`;

export const StyledForm = styled.form`
z-index: 10;
min-width: 320px;
max-width: 360px;
width: 100%;
box-sizing: border-box;
padding: 0 10px;
display: flex;
flex-direction: column;
justify-content: stretch;
img {
  width: 203px;
  height: 111px;
  margin-bottom: 29px;
  align-self: center;
}
div.forgot {
  display: flex;
  justify-content: center;
  color: #3B3B3B;
  font-size: 14px;
  line-height: 19px;
  background: transparent;
  border: none;
  text-decoration: underline;
  cursor: pointer;
}
`;

export const Oval = styled.div<{ isBottom?: boolean }>`
height: 882px;
width: 882px;
border-radius: 50%;
position: absolute;
${props => {
    return props.isBottom ? css`
bottom: 54%;
right: 57%;
` : css`
top: 80%;
left: 50%;
`
  }}
z-index: 5;
background-color: #3B3B3B;
`;