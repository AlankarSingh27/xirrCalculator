export interface IContact {
    _id?: string;
    user?: string;
    name: string;
    mobile: string;
    address:string;
    loan_Amount:number;
    disb_Date:Date;
    intrest_Rate:number;
    process_Fee:number;
    arranger:number;
    total_Tenor:number;
    moratorioum:number;
    marginIntrest:number;
    marginAmount:number;
    others:number;
    createdAt?: Date;
    updatedAt?: Date;
}