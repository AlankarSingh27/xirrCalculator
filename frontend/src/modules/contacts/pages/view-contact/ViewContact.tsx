
import React, { useEffect } from 'react';
import NavBar from "../../../layout/pages/navbar/NavBar";
import Heading from "../../../layout/components/heading/Heading";
import { Link, useParams } from "react-router-dom";
import Spinner from "../../../layout/components/spinner/Spinner";
import ErrorMessage from "../../../layout/components/error-message/ErrorMessage";
import * as contactActions from "../../../../redux/contacts/contacts.actions";
import * as contactReducer from "../../../../redux/contacts/contacts.slice";
import { useSelector } from "react-redux";
import { AppDispatch, RootState, useAppDispatch } from "../../../../redux/store";
import { XLIRRdate } from '../../../../calulatorComponents/XLIRRdate';



export const ViewContact: React.FC = () => {
    const dispatch: AppDispatch = useAppDispatch();
    const { contactId } = useParams();
   

    const contactState: contactReducer.InitialState = useSelector((store: RootState) => {
        return store[contactReducer.contactFeatureKey];
    });

    const { loading, contact, error } = contactState;

    useEffect(() => {
        if (contactId) {
            dispatch(contactActions.getContactAction({ contactId: contactId }));
        }
    }, [contactId]);
    

    return (
        <>
            {loading && <Spinner />}
            <NavBar color={'bg-dark'} />
            <Heading heading={'XIRR calculator'} color={'text-warning'} />
            {!loading && Object.keys(error).length > 0 && <ErrorMessage message={JSON.stringify(error)} />}
            {
                !loading && contact && Object.keys(contact).length > 0 &&
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
                                        Name: <span className="fw-bold">{contact.name}</span>
                                    </li>
                                    <li className="list-group-item">
                                        Mobile: <span className="fw-bold">{contact.mobile}</span>
                                    </li>
                                    <li className="list-group-item">
                                        Address: <span className="fw-bold">{contact.address}</span>
                                    </li>
                                    <li className="list-group-item">
                                        Amount: <span className="fw-bold">{contact.loan_Amount}</span>
                                    </li>
                                    <li className="list-group-item">
                                        Disb_Date: <span className="fw-bold"> {new Intl.DateTimeFormat('en-GB', {
                                            day: '2-digit',
                                            month: 'short',
                                            year: '2-digit',
                                        }).format(new Date(contact.disb_Date))}</span>
                                    </li>
                                    <li className="list-group-item">
                                        Intrest-Rate: <span className="fw-bold">{contact.intrest_Rate}%</span>
                                    </li>
                                    <li className="list-group-item">
                                        Process_Fee: <span className="fw-bold">{contact.process_Fee}%</span>
                                    </li>
                                    <li className="list-group-item">
                                        Arranger: <span className="fw-bold">{contact.arranger}%</span>
                                    </li>
                                    <li className="list-group-item">
                                        Total_Tenor: <span className="fw-bold">{contact.total_Tenor}</span>
                                    </li>
                                    <li className="list-group-item">
                                        Moratorioum: <span className="fw-bold">{contact.moratorioum}</span>
                                    </li>
                                    <li className="list-group-item">
                                        Margin Intrest: <span className="fw-bold">{contact.marginIntrest}%</span>
                                    </li>
                                    <li className="list-group-item">
                                        Margin Amount: <span className="fw-bold">{contact.marginAmount}%</span>
                                    </li>
                                    <li className="list-group-item">
                                        Others Expenditure: <span className="fw-bold">{contact.others}</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="row mt-3">
                                <div className="column">
                                   
                                         <XLIRRdate name={contact.name} address={contact.address} startDate={new Intl.DateTimeFormat('en-GB', {
                                                day: '2-digit',
                                                month: 'short',
                                                year: '2-digit',
                                            }).format(new Date(contact.disb_Date))} limit={contact.total_Tenor} principal={contact.loan_Amount} rate={contact.intrest_Rate} processFee={contact.process_Fee} arranger={contact.arranger} marginInterest={contact.marginIntrest} marginAmount={contact.marginAmount} others={contact.others} />
                                    
                                </div>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col">
                                <Link className="btn btn-warning" to="/contacts/admin">
                                    <i className="bi bi-arrow-left-circle-fill"></i> Back</Link>
                            </div>
                       
                        </div>
                    </div>
                </section>
            }
        </>
    );
};

 export default ViewContact;


