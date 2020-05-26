import styled from '../helpers/styled';
import { Card, CardHeading } from 'components/Card';

export const StyledCard = styled(Card)<{ height?: string }>`
cursor: pointer;
margin-left: 0px;
margin-right: 35px;
margin-top: 0px;
margin-bottom: 30px;
height: ${props => props.height ? props.height : '261px'};
position: relative;
`;

export const Heading = styled(CardHeading)<{ image?: string, height?: string, noBottom?: boolean }>`
height: ${props => props.height ? props.height : '150px'};
width: 100%;
text-align: center;
position: relative;
background-color: #3B3B3B;
background-image: ${props => props.image ? `url(${props.image})` : ''};
background-size: cover;
background-position: center -12px;
background-repeat: no-repeat;
display: flex;
align-items: center;
.band {
  text-align: left;
  box-sizing: border-box;
  position: absolute;
  width: 100%;
  bottom: ${props => props.noBottom ? 'unset' : '0'};
  height: 34px;
  padding: 6px 10px;
  color: #FFFFFF;
  background-color: ${props => props.noBottom ? '' : '#3B3B3B'};
  font-size: 14px;
  line-height: 24px;
  overflow: hidden;
  span {
    text-overflow: ellipsis;
  }
}
`;