import { Dispatch } from "redux";
import { crmActionType } from "./types";
import { ILead } from "./../../models/index";

export interface IGetStageBegin {
  type: crmActionType.GET_STAGE_BEGIN;
}

export interface IGetStageSuccess {
  type: crmActionType.GET_STAGE_SUCCESS;
  stage: any[];
}

export interface IGetStageError {
  type: crmActionType.GET_STAGE_ERROR;
  error: string;
}

export type IAction = IGetStageBegin | IGetStageSuccess | IGetStageError;

const getStageBegin = (): IGetStageBegin => ({
  type: crmActionType.GET_STAGE_BEGIN,
});

const getStageSuccess = (stage: any[]): IGetStageSuccess => ({
  type: crmActionType.GET_STAGE_SUCCESS,
  stage,
});

const getStageError = (error: string): IGetStageError => ({
  type: crmActionType.GET_STAGE_ERROR,
  error,
});

export const getStage = () => {
  return async (dispatch: Dispatch) => {
    dispatch(getStageBegin());
    try {
      const resultPromise: any = await fetch(
        "https://601af1050ee87c001706ac7c.mockapi.io/api/v1/leads"
      );
      const result = (await resultPromise.json()) as Array<any>;
      const leadsResult: ILead[] = result.map((lead) => {
        return {
          id: lead.id,
          firstName: lead.firstName,
          lastName: lead.lastName,
          birthday: new Date(lead.birthday).toISOString(),
          email: lead.email,
        };
      });
      dispatch(getStageSuccess(leadsResult));
      return Promise.resolve(result);
    } catch (error) {
      dispatch(getStageError(error));
      return Promise.reject(error);
    }
  };
};
