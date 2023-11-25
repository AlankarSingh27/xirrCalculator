import {createSlice, isRejectedWithValue, SerializedError} from "@reduxjs/toolkit";
import {IContactView} from "../../modules/contacts/models/IContactView";
import * as contactActions from "./contacts.actions";
import {ToastUtil} from "../../util/ToastUtil";

export const contactFeatureKey = "contactFeature";

export interface InitialState {
    loading: boolean;
    error: SerializedError;
    contacts: IContactView[];
    contact: IContactView;
}

const initialState: InitialState = {
    loading: false,
    error: {} as SerializedError,
    contacts: [] as IContactView[],
    contact: {} as IContactView,
};

export const contactSlice = createSlice({
    name: 'contactSlice',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        // getAllContactsAction
        builder.addCase(contactActions.getAllContactsAction.pending, (state, action) => {
            state.loading = true;
        }).addCase(contactActions.getAllContactsAction.fulfilled, (state, action) => {
            state.loading = false;
            state.contacts = action.payload;
        }).addCase(contactActions.getAllContactsAction.rejected, (state, action) => {
            state.loading = false;
            ToastUtil.displayErrorToast("Unable to get contacts from server");
            if (isRejectedWithValue(action)) {
                state.error = action.error
            }
        })

        // getContactAction
        builder.addCase(contactActions.getContactAction.pending, (state, action) => {
            state.loading = true;
        }).addCase(contactActions.getContactAction.fulfilled, (state, action) => {
            state.loading = false;
            state.contact = action.payload;
        }).addCase(contactActions.getContactAction.rejected, (state, action) => {
            state.loading = false;
            ToastUtil.displayErrorToast("Unable to get the contact from server");
            if (isRejectedWithValue(action)) {
                state.error = action.error
            }
        })

        // createContactAction
        builder.addCase(contactActions.createContactAction.pending, (state, action) => {
            state.loading = true;
        }).addCase(contactActions.createContactAction.fulfilled, (state, action) => {
            state.loading = false;
            ToastUtil.displaySuccessToast("Contact Creation is Success!");
        }).addCase(contactActions.createContactAction.rejected, (state, action) => {
            state.loading = false;
            ToastUtil.displayErrorToast("Contact Creation is Failed!");
            if (isRejectedWithValue(action)) {
                state.error = action.error
            }
        })

        // updateContactAction
        builder.addCase(contactActions.updateContactAction.pending, (state, action) => {
            state.loading = true;
        }).addCase(contactActions.updateContactAction.fulfilled, (state, action) => {
            state.loading = false;
            ToastUtil.displaySuccessToast("Contact Update is Success!");
        }).addCase(contactActions.updateContactAction.rejected, (state, action) => {
            state.loading = false;
            ToastUtil.displayErrorToast("Contact Update is Failed!");
            if (isRejectedWithValue(action)) {
                state.error = action.error
            }
        })

        // deleteContactAction
        builder.addCase(contactActions.deleteContactAction.pending, (state, action) => {
            state.loading = true;
        }).addCase(contactActions.deleteContactAction.fulfilled, (state, action) => {
            state.loading = false;
            ToastUtil.displayInfoToast("Contact Delete is Success!");
        }).addCase(contactActions.deleteContactAction.rejected, (state, action) => {
            state.loading = false;
            ToastUtil.displayErrorToast("Contact Delete is Failed!");
            if (isRejectedWithValue(action)) {
                state.error = action.error
            }
        })

      

      
    }
})















