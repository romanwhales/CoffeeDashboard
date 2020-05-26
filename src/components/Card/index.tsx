import styled from 'helpers/styled';

export const CardGroup = styled.div`
flex: 1;
display: flex;
flex-flow: row wrap;
`;

export const Card = styled.div`
max-width: 200px;
width: 200px;
margin: 10px 17px;
flex: 1 1 200px;
display: flex;
background: #F4F5F9;
border-radius: 3px;
flex-direction: column;
overflow: hidden;
align-items: stretch;
justify-content: stretch;
`;

export const CardHeading = styled.div`
display: flex;
align-self: flex-start;
background: #3B3B3B;
`;

export const CardContent = styled.div`
flex: 1;
display: flex;
flex-direction: column;
align-self: flex-start;
padding: 10px;
box-sizing: border-box;
`;

export const CardFooter = styled.div`
display: flex;
align-self: flex-end;
`;