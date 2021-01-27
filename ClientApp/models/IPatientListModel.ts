import { IPatientModel } from "@Models/IPatientModel";

export interface IPatientListModel {
    patients: IPatientModel[];
    firstLink: string;
    lastLink: string;
    nextLink: string;
    previousLink: string;

}