import React from 'react';

const SavedTable = (props) => {

    const rows = props.records.map((row, index) => {

        return(

        <tr key={index}>
            <td>{row.styledReportNumber}</td>
            <td>{row.sampleType}</td>
            <td>{row.reportType}</td>
            <td>{row.firstLabId} - {row.lastLabId}</td>
        </tr>

        );

    });

    return (

        <table className="striped-table pwsm-table">
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