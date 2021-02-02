import { createSlice, PayloadAction, Dispatch } from "@reduxjs/toolkit";
import { IPatientModel as IPatientModel } from "@Models/IPatientModel";
import { IMedicationInteractionPair as IMedicationInteractionPair, IInteractionDetail, IMedicationInteractionViewModel } from "@Models/IMedicationInteractionPair";
import InteractionService from "@Services/InteractionService";
import { IMedicationConceptDTO } from "@Models/IMedicationConceptDTO";

// Declare an interface of the store's state.
export interface IInteractionStoreState {
    isFetching: boolean;
  interactions: IMedicationInteractionPair[];
  activePatient: IPatientModel;
  medications: IMedicationConceptDTO[]
}

// Create the slice.
const slice = createSlice({
  name: "interaction",
  initialState: {
    isFetching: false,
    interactions: [],
    activePatient: {},
    medications: []
  } as IInteractionStoreState,

  reducers: {
    setFetching: (state, action: PayloadAction<boolean>) => {
      state.isFetching = action.payload;
    },
    setInteractions: (state, action: PayloadAction<IMedicationInteractionPair[]>) => {
        state.interactions = action.payload;
    },
    setMedications: (state, action: PayloadAction<IMedicationConceptDTO[]>) => {
        state.medications = action.payload;
    },
  },
});

// Export reducer from the slice.
export const { reducer } = slice;

// Define action creators.
export const actionCreators = {
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
 
};
