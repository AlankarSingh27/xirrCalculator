import {createAsyncThunk} from "@reduxjs/toolkit";
import {IContactView} from "../../modules/contacts/models/IContactView";
import {LenderService} from "../../modules/contacts/services/LenderService";
import {AuthUtil} from "../../util/AuthUtil";

/**
 * to get all contacts
 */
export const getAllLendersAction: any = createAsyncThunk("lenders/getAllLendersAction",
    async (payload: {}, {rejectWithValue}): Promise<IContactView[] | any> => {
        try {
            if (AuthUtil.isSetTokenToRequestHeader()) { // PRIVATE
                const response = await LenderService.getAllLenders();
                return response.data;
            }
        } catch (error: any) {
            if (!error.response) {
                throw error
            }
            return rejectWithValue(error.response.data)
        }
    });

/**
 *  get a contact
 */
export const getLenderAction: any = createAsyncThunk("lenders/getLenderAction",
    async (payload: { contactId: string }, {rejectWithValue}): Promise<IContactView | any> => {
        try {
            const {contactId} = payload;
            if (AuthUtil.isSetTokenToRequestHeader()) { // PRIVATE
                const response = await LenderService.getLender(contactId);
                return response.data;
            }
        } catch (error: any) {
            if (!error.response) {
                throw error
            }
            return rejectWithValue(error.response.data)
        }
    });

/**
 * create a contact
 */
export const createLenderAction: any = createAsyncThunk("lenders/createLenderAction",
    async (payload: { contact: IContactView }, {rejectWithValue}): Promise<IContactView | any> => {
        try {
            const {contact} = payload;
            if (AuthUtil.isSetTokenToRequestHeader()) { // PRIVATE
                const response = await LenderService.createLender(contact);
                return response.data;
            }
        } catch (error: any) {
            if (!error.response) {
                throw error
            }
            return rejectWithValue(error.response.data)
        }
    });

/**
 * Update a contact
 */
export const updateLenderAction: any = createAsyncThunk("lenders/updateLenderAction",
    async (payload: { contact: IContactView, contactId: string }, {rejectWithValue}): Promise<IContactView | any> => {
        try {
            const {contact, contactId} = payload;
            if (AuthUtil.isSetTokenToRequestHeader()) { // PRIVATE
                const response = await LenderService.updateLender(contact, contactId);
                return response.data;
            }
        } catch (error: any) {
            if (!error.response) {
                throw error
            }
            return rejectWithValue(error.response.data)
        }
    });


/**
 * Delete a contact
 */
export const deleteLenderAction: any = createAsyncThunk("contacts/deleteLenderAction",
    async (payload: { contactId: string }, {rejectWithValue, dispatch}): Promise<{} | any> => {
        try {
            const {contactId} = payload;
            if (AuthUtil.isSetTokenToRequestHeader()) { // PRIVATE
                const response = await LenderService.deleteLender(contactId);
                if (response && response.data) {
                    dispatch(getAllLendersAction()); // get the fresh data when the delete was success
                }
                return response.data;
            }
        } catch (error: any) {
            if (!error.response) {
                throw error
            }
            return rejectWithValue(error.response.data)
        }
    });






