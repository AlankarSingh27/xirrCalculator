import React, {useEffect, useState} from 'react';
import NavBar from "../../../layout/pages/navbar/NavBar";
import Heading from "../../../layout/components/heading/Heading";
import {Link, useNavigate, useParams} from "react-router-dom";
import {IContactView} from "../../models/IContactView";
import Spinner from "../../../layout/components/spinner/Spinner";
import ErrorMessage from "../../../layout/components/error-message/ErrorMessage";
import * as lenderActions from "../../../../redux/lenders/lenders.actions";
import * as lenderReducer from "../../../../redux/lenders/lenders.slice";
import {useSelector} from "react-redux";
import {AppDispatch, RootState, useAppDispatch} from "../../../../redux/store";

export const EditContact: React.FC = () => {
    const dispatch: AppDispatch = useAppDispatch();
    const navigate = useNavigate();
    const {contactId} = useParams();

    /**
     * get the data from redux
     */
    const lenderState: lenderReducer.InitialState = useSelector((store: RootState) => {
        return store[lenderReducer.lenderFeatureKey];
    });

    const {loading, lender: contactRedux,  error} = lenderState;
    const [contact, setContact] = useState<IContactView>({
        name: "",
        mobile: "",
        address:"",
        loan_Amount: 0,
        disb_Date: 0,
        intrest_Rate: 0,
        process_Fee: 0,
        arranger:0,
        total_Tenor: 0,
        moratorioum: 0,
        marginIntrest:0,
        marginAmount:0,
        others:0
    });

   

    /**
     * when contactId, then get the contact from server
     */
    useEffect(() => {
        if (contactId) {
            dispatch(lenderActions.getLenderAction({contactId: contactId}));
        }
    }, [contactId]);

    /**
     * if change in the contact Redux, populate the data
     */
    useEffect(() => {
        if (contactRedux && Object.keys(contactRedux).length > 0) {
            setContact({
                ...contact,
                name: contactRedux.name ? contactRedux.name : "",
                mobile: contactRedux.mobile ? contactRedux.mobile : "",
                address: contactRedux.address ? contactRedux.address : "",
                loan_Amount: contactRedux.loan_Amount? contactRedux.loan_Amount : 0,
                // disb_Date: contactRedux.disb_Date? contactRedux.disb_Date : 0,
                disb_Date: contactRedux.disb_Date ? new Date(contactRedux.disb_Date).toISOString().split('T')[0] : "",
                intrest_Rate: contactRedux.intrest_Rate ? contactRedux.intrest_Rate : 0,
                process_Fee: contactRedux.process_Fee? contactRedux.process_Fee: 0,
                arranger: contactRedux.arranger? contactRedux.arranger: 0,
                total_Tenor: contactRedux.total_Tenor? contactRedux.total_Tenor : 0,
                moratorioum: contactRedux.moratorioum? contactRedux.moratorioum: 0,
                marginIntrest: contactRedux.marginIntrest? contactRedux.marginIntrest: 0,
                marginAmount: contactRedux.marginAmount? contactRedux.marginAmount: 0,
                others: contactRedux.others? contactRedux.others: 0
            })
        }
    }, [contactRedux])


    /**
     * when the form field data changes, update the local state
     * @param event
     */
    const updateInput = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setContact({
            ...contact,
            [event.target.name]: event.target.value
        })
    };

    /**
     * form submit for update
     * @param event
     */
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (contactId) {
            dispatch(lenderActions.updateLenderAction({
                contact: contact,
                contactId: contactId
            })).then((response: any) => {
                if (!response.error) {
                    navigate("/lenders/admin");
                }
            });
        }
    };

    return (
        <>
            {loading && <Spinner/>}
            <NavBar color={'bg-dark'}/>
            <Heading heading={'Edit Contact'} color={'text-primary'}/>
            {!loading && Object.keys(error).length > 0 && <ErrorMessage message={JSON.stringify(error)}/>}
            <section className="mt-3">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-4">
                            <form onSubmit={e => handleSubmit(e)}>
                                <div className="mb-2">
                                    <input
                                        required={true}
                                        name={'name'}
                                        value={contact.name}
                                        onChange={e => updateInput(e)}
                                        className="form-control" placeholder="Name" type="text"/>
                                </div>
                                {/* <div className="mb-2">
                                    <input
                                        required={true}
                                        name={'imageUrl'}
                                        value={contact.imageUrl}
                                        onChange={e => updateInput(e)}
                                        className="form-control" placeholder="Image Url" type="text"/>
                                </div> */}
                                <div className="mb-2">
                                    <input
                                        required={true}
                                        name={'mobile'}
                                        value={contact.mobile}
                                        onChange={e => updateInput(e)}
                                        className="form-control" placeholder="Mobile" type="number"/>
                                </div>
                                <div className="mb-2">
                                    <input
                                        required={true}
                                        name={'address'}
                                        value={contact.address}
                                        onChange={e => updateInput(e)}
                                        className="form-control" placeholder="Address" type="text"/>
                                </div>
                                <div className="mb-2">
                                    <input
                                        required={true}
                                        name={'loan_Amount'}
                                        value={contact.loan_Amount}
                                        onChange={e => updateInput(e)}
                                        className="form-control" placeholder="Company" type="number"/>
                                </div>
                                <div className="mb-2">
                                    <input
                                        required={true}
                                        name={'disb_Date'}
                                        value={contact.disb_Date}
                                        onChange={e => updateInput(e)}
                                        className="form-control" placeholder="Disb Date" type="date"/>
                                </div>
                                <div className="mb-2">
                                    <input
                                        required={true}
                                        name={'intrest_Rate'}
                                        value={contact.intrest_Rate}
                                        onChange={e => updateInput(e)}
                                        className="form-control" placeholder="Intrest Rate" type="number"/>
                                </div>
                                <div className="mb-2">
                                    <input
                                        required={true}
                                        name={'process_Fee'}
                                        value={contact.process_Fee}
                                        onChange={e => updateInput(e)}
                                        className="form-control" placeholder="Process Fee" type="number"/>
                                </div>
                                <div className="mb-2">
                                    <input
                                        required={true}
                                        name={'arranger'}
                                        value={contact.arranger}
                                        onChange={e => updateInput(e)}
                                        className="form-control" placeholder="Arranger" type="number"/>
                                </div>
                                <div className="mb-2">
                                    <input
                                        required={true}
                                        name={'total_Tenor'}
                                        value={contact.total_Tenor}
                                        onChange={e => updateInput(e)}
                                        className="form-control" placeholder="Arranger" type="number"/>
                                </div>
                                <div className="mb-2">
                                    <input
                                        required={true}
                                        name={'moratorioum'}
                                        value={contact.moratorioum}
                                        onChange={e => updateInput(e)}
                                        className="form-control" placeholder="Moratorium" type="number"/>
                                </div>
                                <div className="mb-2">
                                    <input
                                        required={true}
                                        name={'marginIntrest'}
                                        value={contact.marginIntrest}
                                        onChange={e => updateInput(e)}
                                        className="form-control" placeholder="marginIntrest" type="number"/>
                                </div>
                                <div className="mb-2">
                                    <input
                                        required={true}
                                        name={'marginAmount'}
                                        value={contact.marginAmount}
                                        onChange={e => updateInput(e)}
                                        className="form-control" placeholder="marginAmount" type="number"/>
                                </div>
                                <div className="mb-2">
                                    <input
                                        required={true}
                                        name={'others'}
                                        value={contact.others}
                                        onChange={e => updateInput(e)}
                                        className="form-control" placeholder="Others in Rupees" type="number"/>
                                </div>
                                <div className="mb-2">
                                    <input className="btn btn-primary me-2" type="submit" value="Update"/>
                                    <Link className="btn btn-dark" to="/contacts/admin">Cancel</Link>
                                </div>
                            </form>
                        </div>
                        {/* <div className="col-sm-3">
                            {
                                contact && contact.imageUrl &&
                                <img alt="" className="img-fluid rounded-circle shadow-lg" src={contact.imageUrl}/>
                            }
                        </div> */}
                    </div>
                </div>
            </section>
        </>
    )
};
export default EditContact;