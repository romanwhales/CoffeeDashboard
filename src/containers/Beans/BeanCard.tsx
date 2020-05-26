import * as React from 'react';
import { get } from 'lodash';
import { BaseBean } from 'models';
import { Card, CardHeading, CardContent } from 'components/Card';
import styled from 'helpers/styled';
import beanPhoto from 'helpers/beanPhoto';
import { withRouter, RouteComponentProps } from 'react-router';

export interface BeanCardProps extends RouteComponentProps {
  bean: BaseBean;
}

const StyledCard = styled(Card)`
cursor: pointer;
`;

const Heading = styled(CardHeading)`
height: 150px;
width: 100%;
text-align: center;
position: relative;
background-color: #3B3B3B;
background-repeat: no-repeat;
background-size: contain;
background-position: center;
.band {
  box-sizing: border-box;
  position: absolute;
  width: 100%;
  bottom: 0;
  height: 34px;
  padding: 6px 10px;
  color: white;
  background: #3B3B3B;
  font-size: 14px;
  line-height: 24px;
  overflow: hidden;
  span {
    text-overflow: ellipsis;
  }
}
`;

const BeanCard: React.FunctionComponent<BeanCardProps> = props => {
  const navigateToBean = () => props.history.push(`/beans/${props.bean._id}`);
  return (
    <StyledCard onClick={navigateToBean}>
      <Heading>
        <div className="band">
          <span>{props.bean.name}</span>
        </div>
      </Heading>
      <CardContent>
        <label>Name</label>
        <label>{props.bean.name}</label>
        <label>Farm</label>
        <label>{props.bean.farm}</label>
      </CardContent>
    </StyledCard>
  );
};
export default withRouter(BeanCard);
