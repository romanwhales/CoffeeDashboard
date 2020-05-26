import React from 'react';
import { AppStore } from 'models';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';

export interface TipsContainerProps extends RouteComponentProps {
  
}

const TipsContainer: React.FunctionComponent<TipsContainerProps> = props => {
  return (
    <>
      Tips
    </>
  )
}
const mapStateToProps = (state: AppStore) => ({

})
const mapDispatchToProps = dispatch => ({
 
});
export default connect(mapStateToProps, mapDispatchToProps)(TipsContainer);

