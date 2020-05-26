import * as React from 'react';
import ProducerForm from 'components/Forms/ProducerForm';
import { AppStore, BaseBean } from 'models';
import { getBeans } from 'redux/actions/beans';
import { connect } from 'react-redux';
import styled from 'helpers/styled';
import BeanCard from './BeanCard';
import { CardGroup } from 'components/Card';
import { faIcons } from '@fortawesome/free-solid-svg-icons';
import { RouteComponentProps } from 'react-router';

export interface BeansContainerProps extends RouteComponentProps {
  isLoading: boolean;
  beans: BaseBean[];
  drafts: BaseBean[];
  getBeans: () => void;
}

const Heading = styled.div`
display: flex;
flex-direction: row;
align-items: center;
justify-content: space-between;
`;

const Title = styled.h1`
font-size: 25px;
line-height: 34px;
color: #3B3B3B;
`;

const Subtitle = styled.h2<{ bold?: boolean }>`
font-size: 19px;
font-weight: ${props => props.bold ? 'bold' : 600};
color: #7876E0;
line-height: 26px;
`;

const AddButton = styled.button`
height: 60px;
width: 60px;
line-height: 60px;
font-size: 19px;
text-align: center;
background-color: #7876E0;
box-shadow: 0 0 6px 0 rgba(0,0,0,0.12), 0 6px 6px 0 rgba(0,0,0,0.24), 0 0 12px 0 rgba(0,0,0,0.12), 0 12px 12px 0 rgba(0,0,0,0.24);
`;

const TitleWrapper = styled.div`
display: flex;
align-items: center;
flex-direction: row;
align-self: flex-end;
justify-content: space-between;
div.add {
  font-size: 16px;
  line-height: 22px;
  color: #7876E0;
  font-weight: bold;
  text-align: right;
}
`;

class BeansContainer extends React.Component<BeansContainerProps> {
  componentDidMount() {
    this.props.getBeans();
  }

  drafts = () => {
    if (!this.props.drafts.length) {
      return null;
    }
    return (
      <>
        <Subtitle>Drafts</Subtitle>
        <CardGroup>
          {this.props.drafts.map(bean => (
            <BeanCard key={`draft_bean_card_${bean._id}`} bean={bean} />
          ))}
        </CardGroup>
      </>
    )
  }

  createBean = e => {
    e.preventDefault();
    this.props.history.push('/beans/new');
  }

  beans = () => {
    return (
      <>
        <div>
          <Subtitle bold>Bean Inventory</Subtitle>
        </div>
        <CardGroup>
          {this.props.beans.map(bean => (
            <BeanCard key={`bean_card_${bean._id}`} bean={bean} />
          ))}
        </CardGroup>
      </>
    )
  }

  render() {
    return (
      <>
        <Heading>
          <Title>Beans</Title>
          <TitleWrapper>
            <div className="add">Create New Bean <AddButton onClick={this.createBean}>+</AddButton></div>
          </TitleWrapper>
        </Heading>
        {this.drafts()}
        {this.beans()}
      </>
    )
  }
}
const mapStateToProps = (state: AppStore) => ({
  isLoading: state.beans.isLoading,
  beans: state.beans.beans,
  drafts: [],
})
const mapDispatchToProps = dispatch => ({
  getBeans: () => dispatch(getBeans()),
});
export default connect(mapStateToProps, mapDispatchToProps)(BeansContainer);

