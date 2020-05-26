import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import { AppStore, BaseProducer } from 'models';
import { getProducers, archiveProducer } from 'redux/actions/producers';
import { connect } from 'react-redux';
import { Heading, Title, SectionTitle } from 'styledComponents/globals';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Button from '@atlaskit/button';
import ProducerCard from './ProducerCard';
import Styles from './Styles';

export interface ProducersContainerProps extends RouteComponentProps {
  isLoading: boolean;
  producers: BaseProducer[];
  getProducers: () => void;
  archiveProducer: (producerId: string) => void;
}

const ProducersContainer: React.FunctionComponent<ProducersContainerProps> = props => {

  useEffect(() => {
    props.getProducers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleAdd = () => {
    props.history.push(`/producers/new`);
  }

  return (
    <>
      <div style={{ overflowY: 'auto' }}>
        <Heading>
          <Title>Producers</Title>
          <div style={{ display: 'flex', flex: 1, justifyContent: 'flex-end' }}>
            <SectionTitle>Create New Producer</SectionTitle>
          </div>
          <Button style={Styles.addButton} onClick={handleAdd}>
            <div style={{ width: 35, height: 35, lineHeight: '40px' }}>
              <FontAwesomeIcon
                icon={faPlus}
                style={{fontSize: 24, color: '#FFF' }}
              />
            </div>
          </Button>
        </Heading>
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', marginTop: 15 }}>
          {props.producers.map((producer, index) => 
            <ProducerCard key={index} producer={producer} />
          )}
        </div>
      </div>
    </>
  )
}
const mapStateToProps = (state: AppStore) => ({
  isLoading: state.producers.isLoading,
  producers: state.producers.producers,
})
const mapDispatchToProps = dispatch => ({
  getProducers: () => dispatch(getProducers()),
  archiveProducer: (producerId: string) => dispatch(archiveProducer(producerId)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ProducersContainer) as React.ComponentType<any>;

