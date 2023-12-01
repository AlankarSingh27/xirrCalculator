
import React, { useEffect } from 'react';
import NavBar from "../../../layout/pages/navbar/NavBar";
import Heading from "../../../layout/components/heading/Heading";
import { Link, useParams } from "react-router-dom";
import Spinner from "../../../layout/components/spinner/Spinner";
import ErrorMessage from "../../../layout/components/error-message/ErrorMessage";
import * as lenderActions from "../../../../redux/lenders/lenders.actions";
import * as lenderReducer from "../../../../redux/lenders/lenders.slice";
import { useSelector } from "react-redux";
import { AppDispatch, RootState, useAppDispatch } from "../../../../redux/store";
import { PMMT } from '../../../../calulatorComponents/PMMT';



export const ViewLender: React.FC = () => {
    const dispatch: AppDispatch = useAppDispatch();
    const { contactId } = useParams();
   

    const lenderState: lenderReducer.InitialState = useSelector((store: RootState) => {
        return store[lenderReducer.lenderFeatureKey];
    });

    const { loading, lender, error } = lenderState;

    useEffect(() => {
        if (contactId) {
            dispatch(lenderActions.getLenderAction({ contactId: contactId }));
        }
    }, [contactId]);
    
    return (
        <>
            {loading && <Spinner />}
            <NavBar color={'bg-dark'} />
            <Heading heading={'XIRR calculator'} color={'text-warning'} />
            {!loading && Object.keys(error).length > 0 && <ErrorMessage message={JSON.stringify(error)} />}
            {
                !loading && lender && Object.keys(lender).length > 0 &&
                <section className="mt-3">
                    <div className="container">
                        <div className="row mt-3 align-items-center">
                            {/* <div className="col-sm-3">
                                <img alt=""
                                    className="img-fluid rounded-circle shadow-lg"
                                    src={contact.imageUrl} />
                            </div> */}
                            <div className="col-sm-8 offset-1">
                                <ul className="list-group">
                                    <li className="list-group-item">
                                        Name: <span className="fw-bold">{lender.name}</span>
                                    </li>
                                    <li className="list-group-item">
                                        Mobile: <span className="fw-bold">{lender.mobile}</span>
                                    </li>
                                    <li className="list-group-item">
                                        Address: <span className="fw-bold">{lender.address}</span>
                                    </li>
                                    <li className="list-group-item">
                                        Amount: <span className="fw-bold">{lender.loan_Amount}</span>
                                    </li>
                                    <li className="list-group-item">
                                        Disb_Date: <span className="fw-bold"> {new Intl.DateTimeFormat('en-GB', {
                                            day: '2-digit',
                                            month: 'short',
                                            year: '2-digit',
                                        }).format(new Date(lender.disb_Date))}</span>
                                    </li>
                                    <li className="list-group-item">
                                        Intrest-Rate: <span className="fw-bold">{lender.intrest_Rate}%</span>
                                    </li>
                                    <li className="list-group-item">
                                        Process_Fee: <span className="fw-bold">{lender.process_Fee}%</span>
                                    </li>
                                    <li className="list-group-item">
                                        Arranger: <span className="fw-bold">{lender.arranger}%</span>
                                    </li>
                                    <li className="list-group-item">
                                        Total_Tenor: <span className="fw-bold">{lender.total_Tenor}</span>
                                    </li>
                                    <li className="list-group-item">
                                        Moratorioum: <span className="fw-bold">{lender.moratorioum}</span>
                                    </li>
                                    <li className="list-group-item">
                                        Margin Interest: <span className="fw-bold">{lender.marginIntrest}%</span>
                                    </li>
                                    <li className="list-group-item">
                                        Margin Amount: <span className="fw-bold">{lender.marginAmount}%</span>
                                    </li>
                                    <li className="list-group-item">
                                        Others Expenditure: <span className="fw-bold">{lender.others}</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="row mt-3">
                                <div className="column">
                                   
                                         <PMMT name={lender.name} address={lender.address} startDate={new Intl.DateTimeFormat('en-GB', {
                                                day: '2-digit',
                                                month: 'short',
                                                year: '2-digit',
                                            }).format(new Date(lender.disb_Date))} limit={lender.total_Tenor} principal={lender.loan_Amount} rate={lender.intrest_Rate} processFee={lender.process_Fee} arranger={lender.arranger}
                                             marginInterest={lender.marginIntrest} marginAmount={lender.marginAmount} others={lender.others} />
                                    
                                </div>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col">
                                <Link className="btn btn-warning" to="/lenders/admin">
                                    <i className="bi bi-arrow-left-circle-fill"></i> Back</Link>
                            </div>
                       
                        </div>
                    </div>
                </section>
            }
        </>
    );
};

 export default ViewLender;


