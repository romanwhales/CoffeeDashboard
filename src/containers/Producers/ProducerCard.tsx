import React from 'react';
import { connect } from 'react-redux';
import { AppStore, BaseProducer } from 'models';
import { CardContent } from 'components/Card';
import { StyledCard, Heading } from 'styledComponents/cards';
import { withRouter, RouteComponentProps } from 'react-router';
import ProducerBackgroundImage from 'assets/Producer@1x.png';

export interface ProducerCardProps extends RouteComponentProps {
  producer: BaseProducer;
}

const ProducerCard: React.FunctionComponent<ProducerCardProps> = props => {

  const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
  }

  return (
    <StyledCard height='120px' style={{ cursor: 'default' }}>
      <div>
        <Heading height='60px' image={ProducerBackgroundImage} noBottom={true}>
          <div className="band">
            <span>{props.producer ? props.producer.name : '---'}</span>
          </div>
        </Heading>
        <CardContent>
          <div style={{ display: 'flex', flexDirection: 'column', marginBottom: 10 }}>
            <label>Producer Type:</label>
            <label>{capitalize(props.producer.type)}</label>
          </div>
        </CardContent>
      </div>
    </StyledCard>
  );
};


const mapStateToProps = (state: AppStore) => ({

})
const mapDispatchToProps = dispatch => ({

});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProducerCard));
