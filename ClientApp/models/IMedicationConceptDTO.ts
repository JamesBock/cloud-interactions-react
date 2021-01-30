export interface IMedicationConceptDTO {
  Sys: string;
  CodeString: string;
  Text: string;
  FhirType: string;
  ResourceId: string;
  Prescriber: string;
  RxCui: string;
  TimeOrdered: Date; //TODO: How to convert from/to datetime
}
