export interface IContactView {
    _id?: string;
    name: string;
    mobile?: string;
    address:string;
    loan_Amount:string|number;
    disb_Date:string|number;
    intrest_Rate:string|number;
    process_Fee:string|number;
    arranger:string|number;
    total_Tenor:string|number;
    moratorioum:string|number;
    marginIntrest:string|number;
    marginAmount:string|number;
    others:string|number;
    createdAt?: Date;
    updatedAt?: Date;
}