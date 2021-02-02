import { IMedicationConceptDTO } from "./IMedicationConceptDTO";
import 'reflect-metadata';
import { jsonObject, jsonMember, jsonArrayMember, jsonSetMember, jsonMapMember, TypedJSON } from 'typedjson';

@jsonObject
export class IPatientModel {
    @jsonMember
    id: string;
    @jsonMember
    firstName: string;
    @jsonMember
    lastName: string;
    // @jsonArrayMember(IMedicationConceptDTO)
    // medications?: IMedicationConceptDTO[] | null;
    @jsonMember
    roomId: number;
}
