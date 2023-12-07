import * as XLSX from "xlsx";
import React, { useEffect } from "react";
import moment from "moment";
import emailjs, { init } from "emailjs-com";
import { ppmt,ipmt } from 'financial'
var xirr = require("xirr");

export interface IProps {
  name:string;
  address:string;
  startDate: string | number;
  limit: string | number;
  principal: string | number;
  rate: string | number;
  arranger: string | number;
  marginInterest: string | number;
  marginAmount: string | number;
  processFee: string | number;
  others: string | number;
}

export const PMMT: React.FC<IProps> = ({
  name,
  address,
  startDate,
  limit,
  principal,
  rate,
  processFee,
  arranger,
  marginInterest,
  marginAmount,
  others,
}) => {
  let newName:string=name;
  let newAddress:string=address;
  let newcurrentDate = moment(startDate, "DD-MMM-YY");
  let currentDate = moment(startDate, "DD-MMM-YY");
  let lastDate: any = [];
  const repeatedDates: any = [];
  let totalTenor: number = Number(limit);
  let totalAmount: number = Number(principal);
  let interestRate: number = Number(rate);
  let ppl: number = Number(principal);
  let newProcessFee: number = Number(processFee);
  let newMarginInterest: number = Number(marginInterest);
  let newMarginAmount: number = Number(marginAmount);
  let newArranger: number = Number(arranger);
  let newOthers: number = Number(others) || 0;
  let remainingPrincipal: number = totalAmount;
  let margin: number = -(
    ppl -
    ((newMarginAmount / 100) * ppl +
      (newProcessFee / 100) * ppl +
      (newArranger * ppl) / 100) -
    newOthers
  );

  const cashflows: { amount: number; when: Date }[] = [];
  const dates: { amount: number; when: Date }[] = [];

  cashflows.push({ amount: margin, when: new Date(currentDate.toDate()) });
  const InterestOnMargin: number = (ppl * newMarginAmount) / 100;

  let totalDaysInMonth = 0;
  for (let i = 0; i < totalTenor; i++) {
    currentDate.add(1, "months");
    const daysInMonth = moment(currentDate, "MMM").daysInMonth();
    totalDaysInMonth += daysInMonth;

    const period: number = i + 1;
    const principalPayment = -ppmt(interestRate / 100 / 12, period, totalTenor, totalAmount);
    remainingPrincipal -= principalPayment;
    // const monthlyInterest =
    //   (totalAmount * interestRate * daysInMonth) / (100 * 365);
    const monthlyInterest =-ipmt(interestRate / 100 / 12, period, totalTenor, totalAmount);
    
    const cashflow = principalPayment + monthlyInterest;

    repeatedDates.push({
      date: currentDate.format("DD-MMM-YYYY"),
      daysInMonth: daysInMonth,
      interest: monthlyInterest,
      principalPayment: principalPayment,
      totalAmount: remainingPrincipal,
    });

    if (i === totalTenor - 1) {
      cashflows.push({
        amount:
          cashflow -
          InterestOnMargin -
          (newMarginInterest / 100) *
            (totalDaysInMonth / 365) *
            InterestOnMargin,
        when: new Date(currentDate.toDate()),
      });
      lastDate.push({
        newlastDate: currentDate.format("DD-MMM-YYYY"),
      });
     
    } else {
      cashflows.push({
        amount: cashflow,
        when: new Date(currentDate.toDate()),
      });
    }
  }

  currentDate = moment(startDate, "");
  for (let i = 0; i <= totalTenor; i++) {
    dates.push({ amount: 0, when: new Date(currentDate.toDate()) });
    currentDate.add(1, "months");
  }

  const newRate: number | null = xirr(cashflows, dates);
  const xirrResult: number | null = newRate !== null ? newRate * 100 : null;
  
  const exportToExcel = () => {
    const wsData = [
      ["Name:", newName, ""],
      ["Address:",newAddress, ""],
      [
        "S.No",
        "Date",
        "Days",
        "Disbursement",
        "PPL",
        "Interest",
        "PF",
        "Margin",
        "Int.on Marg.",
        "Arranger",
        "Total",
        "Bal. Price",
        "Bal.Marg.",
        "EMI",
      ],
     
    ];
    wsData.push([
      "",
      newcurrentDate.format("DD-MMM-YYYY"),
      "",
      ppl.toString(),
      "",
      "",
      (-((newProcessFee / 100) * ppl + newOthers)).toFixed(2).toString(),

      (-((newMarginAmount / 100) * ppl).toFixed(2)).toString(),
      "",
      (-((ppl * newArranger) / 100)).toFixed(2).toString(),
      (
        ppl -
        (ppl * newArranger) / 100 -
        (newProcessFee / 100) * ppl -
        (newMarginAmount / 100) * ppl -
        newOthers
      ).toString(),
      ppl.toString(),
      (-((newMarginAmount / 100) * ppl)).toFixed(2).toString(),
      "",
    ]);

    // Add data from the repeatedDates to wsData
    repeatedDates.forEach((entry: any, index: any) => {
      wsData.push([
        index + 1,
        entry.date,
        entry.daysInMonth,
        "", // Disbursement
        (entry.principalPayment.toFixed(2)),
        entry.interest.toFixed(2),
        "", // PF
        "", // Margin
        "", // Int.on Marg.
        "", // Arranger
        (entry.principalPayment + (entry.interest)).toFixed(2),
        entry.totalAmount.toFixed(2),
        "", // Bal. Price
        (entry.principalPayment + entry.interest).toFixed(2),
      ]);
    });
    wsData.push(["XIRR:", xirrResult !== null ? xirrResult.toFixed(2) + "%" : "N/A", ""]);
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "XLIRR1 Data");

    // Save the file with a name, for example: XLIRRData.xlsx
    XLSX.writeFile(wb, "XLIRRData.xlsx");
  };
  const lastCashflow = cashflows[cashflows.length - 1];
  
  return (
    <>
      <div className="col">
        <button className="btn btn-success" onClick={exportToExcel}>
          Export to Excel
        </button>
      </div>
      <table className="table table-striped table-hover text-center table-sm">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Date</th>
            <th>Days</th>
            <th>Disbursement</th>
            <th>PPL</th>
            <th>Interest</th>
            <th>PF+Others</th>
            <th>Margin</th>
            <th>Int.on Marg.</th>
            <th>Arranger</th>
            <th>Total</th>
            <th>Bal. Price</th>
            <th>Bal.Marg.</th>
            <th>EMI</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th></th>
            <th>{newcurrentDate.format("DD-MMM-YYYY")}</th>
            <th></th>
            <th>{ppl}</th>
            <th></th>
            <th></th>
            <th>-{((newProcessFee / 100) * ppl + newOthers).toFixed(2)}</th>
            <th>-{((newMarginAmount / 100) * ppl).toFixed(2)}</th>
            <th></th>
            <th>-{((ppl * newArranger) / 100).toFixed(2)}</th>
            <th>
              {ppl -
                (ppl * newArranger) / 100 -
                (newProcessFee / 100) * ppl -
                (newMarginAmount / 100) * ppl -
                newOthers}
            </th>
            <th>{ppl}</th>
            <th>-{((newMarginAmount / 100) * ppl).toFixed(2)}</th>
            <th></th>
          </tr>
          {repeatedDates.map((entry: any, index: any) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{entry.date}</td>
              <td>{entry.daysInMonth}</td>
              <td>-</td>
              {/* <td>{(ppl / totalTenor).toFixed(2)}</td> */}
              <td>{entry.principalPayment.toFixed(2)}</td>
              <td>{entry.interest.toFixed(2)}</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>{(entry.principalPayment + entry.interest).toFixed(2)}</td>
              <td>{entry.totalAmount.toFixed(2)}</td>
              <td>-</td>
              <td>{(entry.principalPayment + entry.interest).toFixed(2)}</td>
            </tr>
          ))}
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td>
            <p className="bg-success text-white">
              The XIRR is: {xirrResult !== null ? xirrResult.toFixed(2) : "N/A"}
              %
            </p>
          </td>
        </tbody>
      </table>
      {/* <div className="last-cashflow  text-warning">
        <h4>
          {" "}
          Lastcashflow -Margin Interest-Interest on Margin :{" "}
          {lastCashflow.amount.toFixed(2)}
        </h4>
      </div> */}
      {/* <div className="col">
  <button className="btn btn-primary" onClick={sendEmail}>
    Send Email
  </button>
</div> */}
    </>
  );
};

export default PMMT;
