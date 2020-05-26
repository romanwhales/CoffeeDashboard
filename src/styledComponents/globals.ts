import styled from '../helpers/styled';

export const Heading = styled.div`
display: flex;
flex-direction: row;
align-items: center;
justify-content: space-between;
margin-right: 60px;
`;

export const Title = styled.h1`
font-size: 25px;
color: #3B3B3B;
font-weight: bold;
`;

export const SectionTitle = styled.div`
font-size: 16px;
color: #7876E0;
font-weight: bold;
margin-right: 16px;
`;

export const FieldTitle = styled.div<{ error?: string, color?: string, noBold?: boolean }>`
font-size: 14px;
color: ${props => props.error ? '#EF6749' : props.color ? props.color : '#7876E0'};
font-weight: ${props => !props.noBold ? 600 : 500};
margin-right: 16px;
margin-bottom: 4px;
`;