import { IAction } from "./actions";
import { crmActionType } from "./types";
import { ILead } from "./../../models/index";

export interface ICrmState {
  isFetching: boolean;
  stage: ILead[];
  error: string;
}

const initState: ICrmState = {
  isFetching: false,
  stage: [],
  error: "",
};

const crmReducer = (
  state: ICrmState = initState,
  action: IAction
): ICrmState => {
  switch (action.type) {
    case crmActionType.GET_STAGE_BEGIN:
      return { ...state, isFetching: true, stage: [], error: "" };
    case crmActionType.GET_STAGE_SUCCESS:
      return { ...state, isFetching: false, stage: action.stage, error: "" };
    case crmActionType.GET_STAGE_ERROR:
      return { ...state, isFetching: false, stage: [], error: action.error };
    default:
      return state;
  }
};

export default crmReducer;
