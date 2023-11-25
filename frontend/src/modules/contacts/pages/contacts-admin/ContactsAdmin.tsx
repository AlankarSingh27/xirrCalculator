import React, { useEffect, useState } from 'react';
import NavBar from "../../../layout/pages/navbar/NavBar";
import Heading from "../../../layout/components/heading/Heading";
import { Link } from "react-router-dom";
import Spinner from "../../../layout/components/spinner/Spinner";
import ErrorMessage from "../../../layout/components/error-message/ErrorMessage";
import * as contactActions from "../../../../redux/contacts/contacts.actions";
import * as contactReducer from "../../../../redux/contacts/contacts.slice";
import { useSelector } from "react-redux";
import { AppDispatch, RootState, useAppDispatch } from "../../../../redux/store";
import { IContactView } from '../../models/IContactView';
import moment from 'moment';
import emailjs, { init } from 'emailjs-com';
const xirr = require('xirr');

export const ContactsAdmin: React.FC = () => {
    const dispatch: AppDispatch = useAppDispatch();
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [xirrResults, setXirrResults] = useState<(number | null)[]>([]);
    const [lastPaymentDates, setLastPaymentDates] = useState<(moment.Moment | null)[]>([]);
    const [currAmount, setCurrAmount] = useState<(number)[]>([]);
    const [totalDisbAmount, setTotalDisbAmount] = useState<number>(0);
    const [totalCurrentAmount, setTotalCurrentAmount] = useState<number>(0);
    const [nameCounts, setNameCounts] = useState<{ [name: string]: number }>({});


    const contactState: contactReducer.InitialState = useSelector((store: RootState) => {
        return store[contactReducer.contactFeatureKey];
    });

    const { loading, contacts, error } = contactState;
   
    useEffect(() => {
        dispatch(contactActions.getAllContactsAction());
        calculateCurrentAmounts();
    }, []);
    useEffect(() => {
        calculateCurrentAmounts();
    }, []);
 
    const makeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const clickDeleteContact = (contactId: string | undefined): void => {
        if (contactId) {
            dispatch(contactActions.deleteContactAction({ contactId: contactId }));
        }
    };
  const lastDates: (moment.Moment | null)[] = [];
    const calculateXIRR = (contact: IContactView): number | null => {
                const cashflows: { amount: number; when: Date }[] = [];
                const dates: { amount: number; when: Date }[] = [];
                
                    let loanAmount :number= Number(contact.loan_Amount);
                    let interestRate:number = Number(contact.intrest_Rate) ;
                    let currentDate = moment(contact.disb_Date, 'YYYY-MM-DD');
                    let totalTenor:number = Number(contact.total_Tenor);
                    let ppl:number = Number(contact.loan_Amount);
                    let newprocessFee :number= Number(contact.process_Fee);
                    let newmarginIntrest:number = Number(contact.marginIntrest) ;
                    let newmarginAmount :number= Number(contact.marginAmount) ;
                    let newArranger:number = Number(contact.arranger);
                    let others:number = Number(contact.others);
                    let margin:number=Number(-(ppl-(((newmarginAmount/100)*ppl)+((newprocessFee/100)*ppl)+((newArranger*ppl)/100))-others));
                    cashflows.push({ amount: margin, when: new Date(currentDate.toDate() ) });
            
                    const IntrestOnMargin:number = Number((ppl * newmarginAmount)/100);
                    let totalDaysInMonth = 0;
            
                    for (let i = 0; i < totalTenor; i++) {
                        currentDate.add(1, 'months');
                        const daysInMonth = moment(currentDate, 'MMM').daysInMonth();
                        totalDaysInMonth += daysInMonth;
                        
                        let monthlyInterest :number= Number(loanAmount * interestRate * daysInMonth)/(100*365) ;
                        const cashflow :number= Number((ppl/ totalTenor) + (monthlyInterest));
                        loanAmount -= (ppl / totalTenor);
                        if (i === totalTenor - 1) {
                            cashflows.push({ amount: cashflow-(IntrestOnMargin)-((newmarginIntrest/100)*totalDaysInMonth/365*(IntrestOnMargin)), when: new Date(currentDate.toDate()) });
                          
                        }
                       else{
                        cashflows.push({ amount: cashflow, when: new Date(currentDate.toDate()) });
                       }
                    }
                    
                currentDate = moment(currentDate, 'DD-MMM-YY');
                    for (let i = 0; i <= totalTenor; i++) {
                      dates.push({ amount: 0, when: new Date(currentDate.toDate()) });
                      currentDate.add(1, 'months');
                       }
                       
                const xirrResult: number | null = xirr(cashflows,dates);
                return xirrResult;
            };

    const calculateXIRRs = () => {
        const xirrResults: (number | null)[] = [];

        contacts.forEach(contact => {
            const xirrResult = calculateXIRR(contact);
            xirrResults.push(xirrResult);
        });

        setXirrResults(xirrResults);
    };
    const calculateLastPaymentDates = () => {
        const lastPaymentDates: (moment.Moment | null)[] = [];

        contacts.forEach(contact => {
            const startDate = moment(contact.disb_Date, 'YYYY-MM-DD');
            const lastTenor = Number(contact.total_Tenor);

            // Calculate the last payment date by adding lastTenor months to the startDate
            let lastPaymentDate: moment.Moment = startDate.clone();
            for (let i = 0; i < lastTenor; i++) {
                lastPaymentDate = lastPaymentDate.add(1, 'months'); // Move to the next month
            }

            lastPaymentDates.push(lastPaymentDate);
        });

        setLastPaymentDates(lastPaymentDates);
    };
  
    const calculateCurrentAmounts = () => {
        const updatedCurrAmount = contacts.map((contact, index) => {
            const startDate = moment(contact.disb_Date, 'YYYY-MM-DD');
            const today = moment();
            let currentValue = Number(contact.loan_Amount);
            let ppl = Number(contact.loan_Amount);
            const totalTenor = Number(contact.total_Tenor);
            const loanAmount = Number(ppl / totalTenor);
            const currentTime = today.diff(startDate, 'month');
    
            for (let i = 0; i < currentTime; i++) {
                currentValue -= loanAmount;
            }
    
            return currentValue;
        });
    
        setCurrAmount(updatedCurrAmount);
        localStorage.setItem('currentAmount', JSON.stringify(updatedCurrAmount));
    };
    
    useEffect(() => {
        calculateXIRRs();
        const storedCurrAmount = localStorage.getItem('currentAmount');
        if (storedCurrAmount) {
            setCurrAmount(JSON.parse(storedCurrAmount));
        } else {
            // If no data is found in local storage, calculate it and store it
            calculateCurrentAmounts();
        }
        calculateLastPaymentDates();
        calculateTotalAmounts();
        const nameCounts = calculateNameCounts();
        setNameCounts(nameCounts);
    }, [contactState.contacts]);
    
    const calculateTotalAmounts = () => {
        let totalDisbAmount = 0;
        let totalCurrentAmount = 0;
    
        contacts.forEach(contact => {
            totalDisbAmount += Number(contact.loan_Amount);
            const currentIndex = contacts.indexOf(contact);
            totalCurrentAmount += currAmount[currentIndex] || 0;
        });
    
        setTotalDisbAmount(totalDisbAmount);
        setTotalCurrentAmount(totalCurrentAmount);
    };
    
    const calculateNameCounts = () => {
        const nameCounts: { [name: string]: number } = {};
    
        contacts.forEach(contact => {
            const name = contact.name;
            nameCounts[name] = (nameCounts[name] || 0) + 1;
        });
    
        return nameCounts;
    };
    
    
    const sendEmailToContacts = () => {
        const today = moment(); // Get the current date
    
        const lastEmailSentDate = localStorage.getItem('lastEmailSentDate'); // Retrieve the last sent email date from local storage
    
        if (!lastEmailSentDate) {
            // If the date doesn't exist in local storage, or it's the first time, send emails
            contacts.forEach((contact, index) => {
                const lastPaymentDate = lastPaymentDates[index];
    
                if (lastPaymentDate) {
                    const daysUntilDue = lastPaymentDate.diff(today, 'days');
                    if (daysUntilDue <= 10 && daysUntilDue >= 0) {
                        // Initialize EmailJS with your service ID and template ID
                        init('FttnBSEmypWs8Muis'); 
                            // Your email service ID and template ID from EmailJS
                            const serviceId = 'service_hj0bgpq';
                            const templateId = 'template_ha3lc4h';
    
                        // Data for the email template
                        const templateParams = {
                            to_email: 'alankar2709@gmail.com', // Change to the recipient's email
                            message: `Hello, your payment is due on ${lastPaymentDates[index]}. 
                                Please make the payment as soon as possible to avoid any late fees.`,
                        };
    
                        // Send the email
                        emailjs
                            .send(serviceId, templateId, templateParams)
                            .then(function (response) {
                                console.log('Email sent successfully:', response);
                            })
                            .catch(function (error) {
                                console.error('Error sending email:', error);
                            });
    
                        // Store the current date in local storage to indicate that emails were sent
                        localStorage.setItem('lastEmailSentDate', today.format());
                    }
                }
            });
        }
    };
    

    useEffect(() => {
        sendEmailToContacts();
    }, [lastPaymentDates]);

     const filteredContacts = contacts.filter(contact => contact.name.toLowerCase().includes(searchQuery.toLowerCase()));
   

    return (
        <>
            {loading && <Spinner />}
            <NavBar color={'bg-dark'} />
            <Heading heading={'Borrowers Contacts'} color={'text-dark'} />
            {!loading && Object.keys(error).length > 0 && <ErrorMessage message={JSON.stringify(error)} />}
            <div className="container">
                <div className="row">
                    <div className="col-sm-6">
                        <form>
                            <div className="row">
                                <div className="col">
                                    <input
                                        value={searchQuery}
                                        onChange={e => makeSearch(e)}
                                        className="form-control"
                                        placeholder="Search here"
                                        type="text"
                                    />
                                </div>
                                <div className="col">
                                    <Link className="btn btn-success" to={'/contacts/add'}>
                                        <i className="bi bi-plus-circle-fill"></i> Add Contact
                                    </Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {filteredContacts.length > 0 ? (
                <section className="mt-3">
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <table className="table table-striped table-hover text-center">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Mobile</th>
                                            <th className="address-header">Address</th>
                                            <th>Loan_Amount</th>
                                            <th>Disb_Date</th>
                                            <th>Current_Amount</th>
                                            <th>Last_Date</th>
                                            <th>Interest_Rate</th>
                                            <th>Process_Fee</th>
                                            <th>Arranger</th>
                                            <th>Total_Tenor</th>
                                            <th>Moratorium</th>
                                            <th>XIRR</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredContacts.map((contact:any, index:number) => (
                                            <tr key={contact._id}>
                                                <td>{contact.name}</td>
                                                {/* <td>
                                                    {contact.imageUrl && <img src={contact.imageUrl} alt={contact.name} width="50" height="50" />}
                                                </td> */}
                                                <td>{contact.mobile}</td>
                                                <td className="address-column">{contact.address}</td>
                                                <td>{contact.loan_Amount}</td>
                                                <td>{moment(contact.disb_Date).format('DD-MMM-YYYY')}</td>
                                                <td>
                                                    {(currAmount[index] || 0).toFixed(2)}
                                                </td>
                                                <td>
                                                {lastPaymentDates[index]?.format('DD-MMM-YYYY') || 'N/A'}
                                                     </td>
                                                <td>{contact.intrest_Rate}%</td>
                                                <td>{contact.process_Fee}%</td>
                                                <td>{contact.arranger}%</td>
                                                <td>{contact.total_Tenor}</td>
                                                <td>{contact.moratorioum}</td>
                                                <td>{xirrResults[index] !== null ? (xirrResults[index]! * 100).toFixed(2) : 'N/A'}%</td>
                                                <td>
                                                    <Link className="btn btn-warning" to={`/contacts/view/${contact._id}`}>
                                                        <i className="bi bi-eye-fill"></i>
                                                    </Link>
                                                    <Link className="btn btn-primary m-1" to={`/contacts/edit/${contact._id}`}>
                                                        <i className="bi bi-pencil-square"></i>
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="row">
                              <div className="col text-right">
                              <strong>Total DisbAmount: {totalDisbAmount.toFixed(2)}</strong>
                              </div>
                              <div className="col text-right">
                              <strong>Total Current Amount: {totalCurrentAmount.toFixed(2)}</strong>
                            </div>
                              <div className="col text-left">
                                <strong>Lender Counts:</strong>
                                 <ul>
                                     {Object.entries(nameCounts).map(([name, count]) => (
                                     <li key={name}>{name}: {count} times</li>
                                     ))}
                                 </ul>
                             </div>
                            </div>

                        </div>
                    </div>
                </section>
            ) : (
                <div className="container mt-3">
                    <div className="row">
                        <div className="col text-center">
                            <p className="h4 text-danger">No Contacts Found</p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ContactsAdmin;

