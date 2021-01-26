import React from 'react';
import {getStyledLabId} from './data.js';

const SavedTable = (props) => {



    const rows = props.records.map((row, index) => {

        let first = getStyledLabId(row.sampleType, row.firstLabId);
        let sampleRange = (row.firstLabId < row.lastLabId)? (first + " - " + row.lastLabId)
        : first;

        return(

        <tr key={index} onClick={() => {console.log(index);}}>
            <td>{row.styledReportNumber}</td>
            <td>{row.sampleType}</td>
            <td>{row.reportType}</td>
            <td>{sampleRange}</td>
        </tr>

        );

    });

    return (

        <table className="striped-table">
            <thead>
                <tr>
                <th>Report Number</th>
                <th>Sample Type</th>
                <th>Report Type</th>
                <th>Lab IDs</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
        );
}

export default SavedTable;