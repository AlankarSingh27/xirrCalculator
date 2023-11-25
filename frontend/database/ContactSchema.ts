import mongoose from "mongoose";
import {IContact} from "../model/IContact";

const ContactSchema = new mongoose.Schema<IContact>({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    name: {type: String, required: true},
    mobile: {type: String, required: true},
    address: {type: String, required: true},
    loan_Amount: {type: Number, required: true},
    disb_Date: {type: Date, required: true},
    intrest_Rate: {type: Number, required: true},
    process_Fee: {type: Number, required: true},
    arranger: {type: Number, required: true},
    total_Tenor: {type: Number, required: true},
    moratorioum: {type: Number, required: true},
    marginIntrest: {type: Number, required: true},
    marginAmount: {type: Number, required: true},
    others:{type: Number, required: true}
}, {timestamps: true});

const ContactTable = mongoose.model<IContact>('contacts', ContactSchema);
export default ContactTable;