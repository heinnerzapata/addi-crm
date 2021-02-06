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
    case crmActionType.CREATE_STAGE_BEGIN:
      return { ...state, isFetching: true, error: "" };
    case crmActionType.CREATE_STAGE_SUCCESS:
      let newStage = [...state.stage];
      newStage.push(action.lead);
      return { ...state, isFetching: false, error: "", stage: newStage };
    case crmActionType.CREATE_STAGE_ERROR:
      return { ...state, isFetching: false, error: "" };
    case crmActionType.DELETE_STAGE_BEGIN:
      return { ...state, isFetching: true, error: "" };
    case crmActionType.DELETE_STAGE_SUCCESS:
      let newStageOnDelete = [...state.stage].filter(
        (lead) => lead.id !== action.id
      );
      return {
        ...state,
        isFetching: false,
        error: "",
        stage: newStageOnDelete,
      };
    case crmActionType.DELETE_STAGE_ERROR:
      return { ...state, isFetching: true, error: action.error };
    case crmActionType.RUN_QUALIFICATION_BEGIN:
      return { ...state, isFetching: true, error: "" };
    case crmActionType.RUN_QUALIFICATION_SUCCESS:
      let newStageOnQualifications = [...state.stage].map((lead) => {
        return {
          ...lead,
          qualification:
            lead.nationalId === action.id ? action.qualification : undefined,
        };
      });
      return {
        ...state,
        isFetching: true,
        error: "",
        stage: newStageOnQualifications,
      };
    default:
      return state;
  }
};

export default crmReducer;
