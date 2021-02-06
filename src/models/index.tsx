export interface IForm {
  nationalId: string;
  firstName: string;
  lastName: string;
  birthday: number;
  email: string;
}

export interface IQualification {
  isInNationalRegistry: boolean;
  isInNationalArchive: boolean;
  score: number;
  isProspect: boolean;
}

export interface ILead {
  id: string;
  firstName: string;
  lastName: string;
  birthday: string;
  email: string;
  nationalId: string;
  qualification?: IQualification;
}
