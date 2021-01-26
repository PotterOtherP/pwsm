import React from 'react';
import {getStyledLabId} from './data.js';


const Worklist = (props) => {

    // console.table(props.records);


    const rowTables = props.records.map((row, index) => {

        console.table(row);

        let first = getStyledLabId(row.sampleType, row.firstLabId);
        let sampleRange = (row.firstLabId < row.lastLabId)? (first + " - " + row.lastLabId)
        : first;


        return(
        <table key={index}>
            <thead></thead>
            <tbody>
                <tr>
                <td>{row.styledReportNumber}</td>
                <td>{row.sampleType}</td>
                <td>{row.reportType}</td>
                <td>{sampleRange}</td>
                </tr>
            </tbody>
        </table>
        );

    });

    return (

        <div>
        <table className="striped-table">
            <thead>
                <tr>
                <th>Report Number</th>
                <th>Sample Type</th>
                <th>Report Type</th>
                <th>Lab IDs</th>
                </tr>
            </thead>
        </table>
        {rowTables}
        </div>
        );
}

export default Worklist;