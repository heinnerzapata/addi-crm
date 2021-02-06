import { Dispatch } from "redux";
import { crmActionType } from "./types";
import { ILead, IQualification } from "./../../models/index";

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

export interface ICreateStageBegin {
  type: crmActionType.CREATE_STAGE_BEGIN;
}

export interface ICreateStageSuccess {
  type: crmActionType.CREATE_STAGE_SUCCESS;
  lead: ILead;
}

export interface ICreateStageError {
  type: crmActionType.CREATE_STAGE_ERROR;
  error: string;
}

export interface IDeleteStageBegin {
  type: crmActionType.DELETE_STAGE_BEGIN;
}

export interface IDeleteStageSuccess {
  type: crmActionType.DELETE_STAGE_SUCCESS;
  id: string;
}

export interface IDeleteStageError {
  type: crmActionType.DELETE_STAGE_ERROR;
  error: string;
}

export interface IRunQualificationBegin {
  type: crmActionType.RUN_QUALIFICATION_BEGIN;
}

export interface IRunQualificationSuccess {
  type: crmActionType.RUN_QUALIFICATION_SUCCESS;
  qualification: IQualification;
  id: string;
}

export interface IRunQualificationError {
  type: crmActionType.RUN_QUALIFICATION_ERROR;
  error: string;
}

export type IAction =
  | IGetStageBegin
  | IGetStageSuccess
  | IGetStageError
  | ICreateStageBegin
  | ICreateStageSuccess
  | ICreateStageError
  | IDeleteStageBegin
  | IDeleteStageSuccess
  | IDeleteStageError
  | IRunQualificationBegin
  | IRunQualificationSuccess
  | IRunQualificationError;

const runQualificationBegin = (): IRunQualificationBegin => ({
  type: crmActionType.RUN_QUALIFICATION_BEGIN,
});

const runQualificationSuccess = (
  qualification: IQualification,
  id: string
): IRunQualificationSuccess => ({
  type: crmActionType.RUN_QUALIFICATION_SUCCESS,
  qualification,
  id,
});

const runQualificationError = (error: string): IRunQualificationError => ({
  type: crmActionType.RUN_QUALIFICATION_ERROR,
  error,
});

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

const createStageBegin = (): ICreateStageBegin => ({
  type: crmActionType.CREATE_STAGE_BEGIN,
});

const createStageSuccess = (lead: ILead): ICreateStageSuccess => ({
  type: crmActionType.CREATE_STAGE_SUCCESS,
  lead,
});

const createStageError = (error: string): ICreateStageError => ({
  type: crmActionType.CREATE_STAGE_ERROR,
  error,
});

const deleteStageBegin = (): IDeleteStageBegin => ({
  type: crmActionType.DELETE_STAGE_BEGIN,
});

const deleteStageSuccess = (id: string): IDeleteStageSuccess => ({
  type: crmActionType.DELETE_STAGE_SUCCESS,
  id,
});

const deleteStageError = (error: string): IDeleteStageError => ({
  type: crmActionType.DELETE_STAGE_ERROR,
  error,
});

export const runQualification = (id: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(runQualificationBegin());
    try {
      let [nationalRegistry, nationalAchives] = await Promise.all([
        fetch(
          "https://601af1050ee87c001706ac7c.mockapi.io/api/v1/national-registry"
        ),
        fetch(
          "https://601af1050ee87c001706ac7c.mockapi.io/api/v1/national-archives"
        ),
      ]);

      const registry = (await nationalRegistry.json()) as Array<any>;
      const archives = (await nationalAchives.json()) as Array<any>;

      const isInNationalRegistry = registry.some((item) => item.id === id);
      const isInNationalArchive = archives.some((item) => item.id === id);
      const score =
        !isInNationalArchive && isInNationalRegistry ? Math.random() * 100 : 0;

      const result: IQualification = {
        isInNationalArchive,
        isInNationalRegistry,
        score,
        isProspect: score > 60 && !isInNationalArchive && isInNationalRegistry,
      };

      dispatch(runQualificationSuccess(result, id));
      return Promise.resolve(result);
    } catch (error) {
      dispatch(runQualificationError(error));
      return Promise.reject(error);
    }
  };
};

export const deleteStage = (id: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(deleteStageBegin());
    try {
      const resultPromise: any = await fetch(
        `https://601af1050ee87c001706ac7c.mockapi.io/api/v1/leads/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const result = (await resultPromise.json()) as any;
      dispatch(deleteStageSuccess(result.id));
      return Promise.resolve(result.id);
    } catch (error) {
      dispatch(deleteStageError(error));
      return Promise.reject(error);
    }
  };
};

export const createStage = (data: any) => {
  return async (dispatch: Dispatch) => {
    dispatch(createStageBegin());
    try {
      const resultPromise: any = await fetch(
        "https://601af1050ee87c001706ac7c.mockapi.io/api/v1/leads",
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const result = (await resultPromise.json()) as any;

      const leadResult: ILead = {
        id: result.id,
        nationalId: result.nationalId,
        firstName: result.firstName,
        lastName: result.lastName,
        birthday: new Date(result.birthday).toISOString(),
        email: result.email,
      };

      dispatch(createStageSuccess(leadResult));
      return Promise.resolve(leadResult);
    } catch (error) {
      dispatch(createStageError(error));
      return Promise.reject(error);
    }
  };
};

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
          nationalId: lead.nationalId,
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
