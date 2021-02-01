import { createSlice, PayloadAction, Dispatch } from "@reduxjs/toolkit";
import { IPatientModel as IPatientModel } from "@Models/IPatientModel";
import { IMedicationInteractionPair as IMedicationInteractionPair } from "@Models/IMedicationInteractionPair";
import InteractionService from "@Services/InteractionService";

// Declare an interface of the store's state.
export interface IInteractionStoreState {
    isFetching: boolean;
  interactions: IMedicationInteractionPair[];
}

// Create the slice.
const slice = createSlice({
  name: "interaction",
  initialState: {
    isFetching: false,
    interactions: [],
  } as IInteractionStoreState,

  reducers: {
    setFetching: (state, action: PayloadAction<boolean>) => {
      state.isFetching = action.payload;
    },
    setData: (state, action: PayloadAction<IMedicationInteractionPair[]>) => {
      state.interactions = action.payload
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
      dispatch(slice.actions.setData(result.value));
    }

    dispatch(slice.actions.setFetching(false));

    return result;
  },
 
};
