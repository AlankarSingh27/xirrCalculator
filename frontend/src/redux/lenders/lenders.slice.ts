import {createSlice, isRejectedWithValue, SerializedError} from "@reduxjs/toolkit";
import {IContactView} from "../../modules/contacts/models/IContactView";
import * as lenderActions from "./lenders.actions";
import {ToastUtil} from "../../util/ToastUtil";

export const lenderFeatureKey = "lenderFeature";

export interface InitialState {
    loading: boolean;
    error: SerializedError;
    lenders: IContactView[];
    lender: IContactView;
}

const initialState: InitialState = {
    loading: false,
    error: {} as SerializedError,
    lenders: [] as IContactView[],
    lender: {} as IContactView,
};

export const lenderSlice = createSlice({
    name: 'lenderSlice',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        // getAllContactsAction
        builder.addCase(lenderActions.getAllLendersAction.pending, (state, action) => {
            state.loading = true;
        }).addCase(lenderActions.getAllLendersAction.fulfilled, (state, action) => {
            state.loading = false;
            state.lenders = action.payload;
        }).addCase(lenderActions.getAllLendersAction.rejected, (state, action) => {
            state.loading = false;
            ToastUtil.displayErrorToast("Unable to get lenders from server");
            if (isRejectedWithValue(action)) {
                state.error = action.error
            }
        })

        // getContactAction
        builder.addCase(lenderActions.getLenderAction.pending, (state, action) => {
            state.loading = true;
        }).addCase(lenderActions.getLenderAction.fulfilled, (state, action) => {
            state.loading = false;
            state.lender = action.payload;
        }).addCase(lenderActions.getLenderAction.rejected, (state, action) => {
            state.loading = false;
            ToastUtil.displayErrorToast("Unable to get the lender from server");
            if (isRejectedWithValue(action)) {
                state.error = action.error
            }
        })

        // createContactAction
        builder.addCase(lenderActions.createLenderAction.pending, (state, action) => {
            state.loading = true;
        }).addCase(lenderActions.createLenderAction.fulfilled, (state, action) => {
            state.loading = false;
            ToastUtil.displaySuccessToast("Lender Creation is Success!");
        }).addCase(lenderActions.createLenderAction.rejected, (state, action) => {
            state.loading = false;
            ToastUtil.displayErrorToast("Lender Creation is Failed!");
            if (isRejectedWithValue(action)) {
                state.error = action.error
            }
        })

        // updateContactAction
        builder.addCase(lenderActions.updateLenderAction.pending, (state, action) => {
            state.loading = true;
        }).addCase(lenderActions.updateLenderAction.fulfilled, (state, action) => {
            state.loading = false;
            ToastUtil.displaySuccessToast("Lender Update is Success!");
        }).addCase(lenderActions.updateLenderAction.rejected, (state, action) => {
            state.loading = false;
            ToastUtil.displayErrorToast("Lender Update is Failed!");
            if (isRejectedWithValue(action)) {
                state.error = action.error
            }
        })

        // deleteContactAction
        builder.addCase(lenderActions.deleteLenderAction.pending, (state, action) => {
            state.loading = true;
        }).addCase(lenderActions.deleteLenderAction.fulfilled, (state, action) => {
            state.loading = false;
            ToastUtil.displayInfoToast("Contact Delete is Success!");
        }).addCase(lenderActions.deleteLenderAction.rejected, (state, action) => {
            state.loading = false;
            ToastUtil.displayErrorToast("Contact Delete is Failed!");
            if (isRejectedWithValue(action)) {
                state.error = action.error
            }
        })

      

      
    }
})















