import Home from "./../pages/home";

import { IAppState } from "./../store";
import { ThunkDispatch } from "redux-thunk";
import { connect } from "react-redux";

import {
  getStage,
  createStage,
  deleteStage,
  runQualification,
} from "./../store/crm/actions";

function mapDispatchToProps(dispatch: ThunkDispatch<any, any, any>) {
  return {
    onGetStage: () => dispatch(getStage()),
    onCreateStage: (data: any) => dispatch(createStage(data)),
    onDeleteStage: (id: string) => dispatch(deleteStage(id)),
    onRunQualification: (id: string) => dispatch(runQualification(id)),
  };
}

const mapStateToProps = (state: IAppState) => ({
  crm: state.crmReducer,
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
