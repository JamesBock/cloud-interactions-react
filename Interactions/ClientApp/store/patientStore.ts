import { createSlice, PayloadAction, Dispatch } from "@reduxjs/toolkit";
import { IPatientModel as IPatientModel } from "@Models/IPatientModel";
import { IPatientListModel as IPatientListModel } from "@Models/IPatientListModel";
import PatientService from "@Services/PatientService";
import { IMedicationInteractionPair } from "@Models/IMedicationInteractionPair";
import { IMedicationConceptDTO } from "@Models/IMedicationConceptDTO";
import InteractionService from "@Services/InteractionService";

// Declare an interface of the store's state.
export interface IPatientStoreState {
  isFetching: boolean;
  patients: IPatientModel[];
  firstLink: string;
  lastLink: string;
  nextLink: string;
  previousLink: string;
  total: number;
  interactions: IMedicationInteractionPair[];
  activePatient: IPatientModel;
  medications: IMedicationConceptDTO[]
}

// Create the slice.
const slice = createSlice({
  name: "patient",
  initialState: {
    isFetching: false,
    // patients: {
    //     firstLink: "",
    //     previousLink: "",
    //     nextLink: "",
    //     lastLink: "",
    patients: [],
    //}, //as IPatientListModel,
    firstLink: "",
    lastLink: "",
    nextLink: "",
    previousLink: "",
    total: 0,
    interactions: [],
    activePatient: {},
    medications: [],
  } as IPatientStoreState,
  reducers: {
    setFetching: (state, action: PayloadAction<boolean>) => {
      state.isFetching = action.payload;
    },
    setData: (state, action: PayloadAction<IPatientListModel>) => {
      const pats: IPatientModel[] = action.payload.patients.map((p) => p);
      (state.patients = pats),
        (state.firstLink = action.payload.firstLink),
        (state.lastLink = action.payload.lastLink),
        (state.nextLink = action.payload.nextLink),
        (state.previousLink = action.payload.previousLink),
        (state.total = action.payload.total);
    },
    setInteractions: (state, action: PayloadAction<IMedicationInteractionPair[]>) => {
      state.interactions = action.payload;
    },
    setMedications: (state, action: PayloadAction<IMedicationConceptDTO[]>) => {
      state.medications = action.payload;
    },
    setActivePatient:(state, action: PayloadAction<IPatientModel>)=>{
      state.activePatient = action.payload
    }
  },
});

// Export reducer from the slice.
export const { reducer } = slice;

// Define action creators.
export const actionCreators = {
  setPatient:(patient: IPatientModel)=> (dispatch) => {
    dispatch(slice.actions.setActivePatient(patient))
    return patient
  },
  searchAction: (limitTo: number, firstName?: string) => async (
    dispatch: Dispatch
  ) => {
    dispatch(slice.actions.setFetching(true));

    const service = new PatientService();

    const result = await service.search(limitTo, firstName); //API call

    if (!result.hasErrors) {
      dispatch(slice.actions.setData(result.value));
    }

    dispatch(slice.actions.setFetching(false));

    return result;
  },

  loadNext: (nextLink: string, count: number) => (dispatch) => {
    dispatch(slice.actions.setFetching(true));

    const service = new PatientService();

    const result = service
      .next(nextLink, count)
      .then((patientList) => {
        dispatch(slice.actions.setData(patientList.value));
      })
      .catch((error) => {
        throw error;
      });
    return result;
  },
  getInteractions: (id: string) => async (dispatch: Dispatch) => {
    dispatch(slice.actions.setFetching(true));
   
    const service = new InteractionService();

    const result = await service.getInteractions(id);

    if (!result.hasErrors) {
      dispatch(slice.actions.setInteractions(result.value));
    }

    dispatch(slice.actions.setFetching(false));

    return result;
  },
  getMedications: (id: string) => async (dispatch: Dispatch) => {
    dispatch(slice.actions.setFetching(true));

    const service = new InteractionService();

    const result = await service.getMedications(id);

    if (!result.hasErrors) {
      dispatch(slice.actions.setMedications(result.value));
    }

    dispatch(slice.actions.setFetching(false));

    return result;
  },
 
  // read: (id: string) => async (dispatch: Dispatch) => {
  //     dispatch(slice.actions.setFetching(true));

  //     const service = new PatientService();

  //     const result = await service.read(id);//API call

  //     if (!result.hasErrors) {
  //         dispatch(slice.actions.setData(result.value));
  //     }

  //     dispatch(slice.actions.setFetching(false));

  //     return result;
  // }
};
