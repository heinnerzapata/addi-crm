import Home from "./../pages/home";

import { IAppState } from "./../store";
import { ThunkDispatch } from "redux-thunk";
import { connect } from "react-redux";

import { getStage } from "./../store/crm/actions";

function mapDispatchToProps(dispatch: ThunkDispatch<any, any, any>) {
  return {
    onGetStage: () => dispatch(getStage()),
  };
}

const mapStateToProps = (state: IAppState) => ({
  crm: state.crmReducer,
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
