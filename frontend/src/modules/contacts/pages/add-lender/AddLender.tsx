import React, {useEffect,useRef, useState} from 'react';
import NavBar from "../../../layout/pages/navbar/NavBar";
import Heading from "../../../layout/components/heading/Heading";
import {Link} from "react-router-dom";
import {IContactView} from "../../models/IContactView";
import {LenderService} from "../../services/LenderService";
import Spinner from "../../../layout/components/spinner/Spinner";
import ErrorMessage from "../../../layout/components/error-message/ErrorMessage";
import {useNavigate} from "react-router-dom";
import {ToastUtil} from "../../../../util/ToastUtil";
import * as lenderActions from "../../../../redux/lenders/lenders.actions";
import * as lenderReducer from "../../../../redux/lenders/lenders.slice";
import {useSelector} from "react-redux";
import {AppDispatch, RootState, useAppDispatch} from "../../../../redux/store";
interface IState {
    loading: boolean;
    errorMessage: string;
}

export const AddLender: React.FC = () => {
    const dispatch: AppDispatch = useAppDispatch();

    const navigate = useNavigate();
    // const cloudinaryRef = useRef<any>();
    // const widgetRef = useRef<any>();

    /**
     * get the data from redux
     */
    const lenderState: lenderReducer.InitialState = useSelector((store: RootState) => {
        return store[lenderReducer.lenderFeatureKey];
    });

    const {loading, error} = lenderState;

    const [lender, setlender] = useState<IContactView>({
        name: "",
        mobile: "",
        address:"",
        loan_Amount: "",
        disb_Date: "",
        intrest_Rate: "",
        process_Fee: "",
        arranger:"",
        total_Tenor: "",
        moratorioum: "",
        marginIntrest:"",
        marginAmount:"",
        others:""
    });

    const updateInput = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setlender({
            ...lender,
            [event.target.name]: event.target.value
        })
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(lenderActions.createLenderAction({contact: lender})).then((response: any) => {
            if (!response.error) {
                navigate("/lenders/admin");
            }
        });
    };
    
    

    return (
        <>
            {loading && <Spinner/>}
            <NavBar color={'bg-dark'}/>
            <Heading heading={'Add Lenders'} color={'text-success'}/>
            {!loading && Object.keys(error).length > 0 && <ErrorMessage message={JSON.stringify(error)}/>}
            <section className="mt-2">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-4">
                            <form onSubmit={e => handleSubmit(e)}>
                                <div className="mb-2">
                                    <input
                                        required={true}
                                        name={'name'}
                                        value={lender.name}
                                        onChange={e => updateInput(e)}
                                        className="form-control" placeholder="Name" type="text"/>
                                </div>
                              
                                <div className="mb-2">
                                    <input
                                        required={true}
                                        name={'mobile'}
                                        value={lender.mobile}
                                        onChange={e => updateInput(e)}
                                        className="form-control" placeholder="Mobile" type="number"/>
                                </div>
                                <div className="mb-2">
                                    <input
                                        required={true}
                                        name={'address'}
                                        value={lender.address}
                                        onChange={e => updateInput(e)}
                                        className="form-control" placeholder="Address" type="text"/>
                                </div>
                                <div className="mb-2">
                                    <input
                                        required={true}
                                        name={'loan_Amount'}
                                        value={lender.loan_Amount}
                                        onChange={e => updateInput(e)}
                                        className="form-control" placeholder="Loan Amount" type="number"/>
                                </div>
                                <div className="mb-2">
                                    <input
                                        required={true}
                                        name={'disb_Date'}
                                        value={lender.disb_Date}
                                        onChange={e => updateInput(e)}
                                        className="form-control" type="Date"/>
                                </div>
                                <div className="mb-2">
                                <input
                                       required={true}
                                        name={'intrest_Rate'}
                                        value={lender.intrest_Rate}
                                        onChange={e => updateInput(e)}
                                        className="form-control" placeholder="InterestRate in Number" type="number"/>
                                </div>
                                <div className="mb-2">
                                <input
                                       required={true}
                                        name={'process_Fee'}
                                        value={lender.process_Fee}
                                        onChange={e => updateInput(e)}
                                        className="form-control" placeholder="ProcessFee in Number" type="number"/>
                                </div>
                                <div className="mb-2">
                                <input
                                       required={true}
                                        name={'arranger'}
                                        value={lender.arranger}
                                        onChange={e => updateInput(e)}
                                        className="form-control" placeholder="Arranger in Number" type="number"/>
                                </div>
                                <div className="mb-2">
                                <input
                                       required={true}
                                        name={'total_Tenor'}
                                        value={lender.total_Tenor}
                                        onChange={e => updateInput(e)}
                                        className="form-control" placeholder="TotalTenor in Number" type="number"/>
                                </div>
                                <div className="mb-2">
                                <input
                                       required={true}
                                        name={'moratorioum'}
                                        value={lender.moratorioum}
                                        onChange={e => updateInput(e)}
                                        className="form-control" placeholder="Moratorioum in Number" type="number"/>
                                </div>
                                <div className="mb-2">
                                <input
                                       required={true}
                                        name={'marginIntrest'}
                                        value={lender.marginIntrest}
                                        onChange={e => updateInput(e)}
                                        className="form-control" placeholder="MarginInterest in Number" type="number"/>
                                </div>
                                <div className="mb-2">
                                <input
                                       required={true}
                                        name={'marginAmount'}
                                        value={lender.marginAmount}
                                        onChange={e => updateInput(e)}
                                        className="form-control" placeholder="MarginAmount in Number" type="number"/>
                                </div>
                                <div className="mb-2">
                                <input
                                       required={true}
                                        name={'others'}
                                        value={lender.others}
                                        onChange={e => updateInput(e)}
                                        className="form-control" placeholder="Others in Number" type="number"/>
                                </div>
                                <div className="mb-2">
                                    <input className="btn btn-success me-2" type="submit" value="Create"/>
                                    <Link className="btn btn-dark" to="/lenders/admin">Cancel</Link>
                                </div>
                                
                            </form>
                        </div>
                     
                    </div>
                
                </div>
            </section>
        </>
    )
};
export default AddLender;