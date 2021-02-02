import 'reflect-metadata';
import { jsonObject, jsonMember, jsonArrayMember, jsonSetMember, jsonMapMember, TypedJSON } from 'typedjson';

@jsonObject
export class IInteractionDetail {
  @jsonMember
  interactionAssertion: string;
  @jsonMember
  severity: string;
  @jsonMember
  description: string;
  @jsonMapMember(String, URL)
  linkTupList: { item1: string; item2: URL; }[];
}
@jsonObject
export class IMedicationInteractionViewModel {
  @jsonMember
  interactionId: string;
  @jsonMember
  displayName: string;
  @jsonMember 
  rxCui: string;
  @jsonMember 
  fhirType: string;
  @jsonMember 
  timeOrdered: string | null;
  @jsonMember 
  resourceId: string;
  @jsonMember 
  prescriber: string;
}

@jsonObject
export class IMedicationInteractionPair {
  @jsonMember
  interactionId: string;
  @jsonMember
  comment: string;
  @jsonMapMember(IMedicationInteractionViewModel,IMedicationInteractionViewModel)
  medicationPair: { item1: IMedicationInteractionViewModel; item2: IMedicationInteractionViewModel; };
  @jsonArrayMember(IInteractionDetail)
  drugInteractionDetails: IInteractionDetail[];
}