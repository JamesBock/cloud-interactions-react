export interface IMedicationInteractionPair {
  interactionId: string;
  comment: string;
  medicationPair: [
    IMedicationInteractionViewModel,
    IMedicationInteractionViewModel
  ];
  drugInteractionDetails: IInteractionDetail[];
}

export interface IInteractionDetail {
  interactionAssertion: string;
  severity: string;
  description: string;
  linkTupList: [string, URL][];
}

export interface IMedicationInteractionViewModel {
  interactionId: string;
  displayName: string;
  rxCui: string;
  fhirType: string;
  timeOrdered: string | null;
  resourceId: string;
  prescriber: string;
}
// c# to ts extension made tuples like below lang reference is different, as implemented above
// linkTupList: { item1: string; item2: URL; }[];
// medicationPair: { item1: MedicationInteractionViewModel; item2: MedicationInteractionViewModel; };
