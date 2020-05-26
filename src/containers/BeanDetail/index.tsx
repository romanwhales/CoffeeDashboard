import * as React from 'react';
import * as _ from 'lodash';
import { RouteComponentProps, withRouter } from 'react-router';
import { BaseBean, AppStore } from 'models';
import { compose } from 'redux';
import { connect } from 'react-redux';
import BeanForm from 'components/Forms/BeanForm';
import { BW } from 'api';
import getOptionValue from 'helpers/getOptionValue';
import beanPhoto from 'helpers/beanPhoto';

interface BeanContainerProps extends RouteComponentProps<{ beanId: string }> {
  isLoading: boolean;
  cafe: string;
  beans: BaseBean[];
  bean: BaseBean;
}

const BeanDetail: React.FunctionComponent<BeanContainerProps> = props => {
  const bean = props.beans.find(b => b._id === props.match.params.beanId);
  const [isLoading, setLoading] = React.useState(false);
  const createBean = (bean: Partial<BaseBean>) => {
    const { cafe } = props;
    if (!cafe) {
      return;
    }
    const producer = getOptionValue(bean.producer as any);
    const farm = getOptionValue(bean.farm as any);
    const lot = getOptionValue(bean.lot as any);
    const photos = [beanPhoto(null)];
    const movies = [];
    const cuppingNotes1 = bean.cuppingNotes1.split(', ');
    const cuppingNotes2 = bean.cuppingNotes2.split(', ');
    const cuppingNotes3 = bean.cuppingNotes3.split(', ');
    const certification = bean.certification.split(', ');
    const roastProfiles = bean.roastProfiles.split(', ');
    const process = bean.process.split(', ');
    const variety = bean.variety.split(', ');
    const beanObject = {
      ...bean,
      cafe,
      producer,
      farm,
      lot,
      photos,
      movies,
      cuppingNotes1,
      cuppingNotes2,
      cuppingNotes3,
      certification,
      roastProfiles,
      process,
      variety,
    };
    setLoading(true);
    const successCallback = id => {
      setLoading(false);
      props.history.push('/beans');
    };
    const errorCallback = err => setLoading(false);
    if (props.bean) {
      BW.put<string>(`/beans/${props.bean._id}`, beanObject)
        .then(successCallback)
        .catch(errorCallback);
    } else {
      BW.post<string>(`/beans/create`, beanObject)
        .then(successCallback)
        .catch(errorCallback);
    }
  };
  return (
    <>
      {/* <h1>{bean.name}</h1> */}
      <BeanForm bean={bean} isDisabled={isLoading || props.isLoading} onSubmit={createBean} />
    </>
  );
};
const mapStateToProps = (state: AppStore) => ({
  isLoading: state.beans.isLoading,
  cafe: _.get(state.auth.userInfo.currentProfile, 'cafe', _.get(state.auth.userInfo, 'cafes[0]')),
  beans: state.beans.beans,
});
const mapDispatchToProps = dispatch => ({
});
const enhance = compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)
export default enhance(BeanDetail);