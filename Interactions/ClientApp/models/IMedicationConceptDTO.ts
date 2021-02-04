export class IMedicationConceptDTO {
  sys: string;
  codeString: string;
  text: string;
  fhirType: string;
  resourceId: string;
  prescriber: string;
  rxCui: string;
  timeOrdered: Date; //TODO: How to convert from/to datetime
}
