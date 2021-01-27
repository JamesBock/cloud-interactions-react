import { createSlice, PayloadAction, Dispatch } from '@reduxjs/toolkit';
import { IPatientModel as IPatientModel } from '@Models/IPatientModel';
import { IPatientListModel as IPatientListModel } from '@Models/IPatientListModel';
import PatientService from '@Services/PatientService';

// Declare an interface of the store's state.
export interface IPatientStoreState {
    isFetching: boolean;
    patients: IPatientListModel;
    // firstLink: string;
    // lastLink: string;
    // nextLink: string;
    // previousLink: string;
}

// Create the slice.
const slice = createSlice({
    name: "patient",
    initialState: {
        isFetching: false,
        patients: {
            firstLink:"",
            previousLink:"",
            nextLink:"",
            lastLink:"",
            patients:[],
            
        } //as IPatientListModel,
        // firstLink: "",
        // lastLink: "",
        // nextLink:"",
        // previousLink:""
    } as IPatientStoreState,
    reducers: {
        setFetching: (state, action: PayloadAction<boolean>) => {
            state.isFetching = action.payload;
        },
        setData: (state, action: PayloadAction<IPatientListModel>) => {
             state.patients = action.payload
            // state.firstLink = action.payload.firstLink,
            // state.lastLink = action.payload.lastLink,
            // state.nextLink = action.payload.nextLink,
            // state.previousLink = action.payload.previousLink
            ;
        }
    }
});

// Export reducer from the slice.
export const { reducer } = slice;

// Define action creators.
export const actionCreators = {
    searchAction: (firstName?: string) => async (dispatch: Dispatch) => {
        dispatch(slice.actions.setFetching(true));

        const service = new PatientService();

        const result =  (await service.search(firstName));//API call

        if (!result.hasErrors) {
            dispatch(slice.actions.setData(result.value));
        }

        dispatch(slice.actions.setFetching(false));

        return result;
    }
    // read: (id?: string) => async (dispatch: Dispatch) => {
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
