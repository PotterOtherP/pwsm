import React from 'react';
import {getStyledLabId} from './data.js';


const Worklist = (props) => {

    return (

        <div>
        <table className="striped-table">
            <thead>
                <tr>
                <th>Report Number</th>
                <th>Sample Type</th>
                <th>Report Type</th>
                <th></th>
                <th></th>
                <th>Lab IDs</th>
                </tr>
            </thead>
        <ReportRows records={props.records}/>
        </table>
        </div>
        );
}

const ReportRows = (props) => {

    return props.records.map((row, index) => {

        let first = getStyledLabId(row.sampleType, row.firstLabId);
        let sampleRange = (row.firstLabId < row.lastLabId)? (first + " - " + row.lastLabId)
        : first;

        console.table(row.sampleGrid);
        return(
        <tbody key={index + "tbody"}>
                <tr key={index + "tr"}>
                <td>{row.styledReportNumber}</td>
                <td>{row.sampleType}</td>
                <td>{row.reportType}</td>
                <td></td>
                <td></td>
                <td>{sampleRange}</td>
                </tr>

                <WorklistSampleRow samples={row.sampleGrid} type={row.sampleType} />                
        </tbody>
        );

    });

}

const WorklistSampleRow = (props) => {

    return props.samples.map((sample, sampleIndex) => {

        return (
            <tr key={sampleIndex + "sampletr"}>
            <td>{getStyledLabId(props.type, sample.sampleId)}</td>
            <td>{sample.code}</td>
            <td>Two</td>
            <td>Beeshops</td>
            <td>Vat</td>
            <td>Else</td>
            </tr>
            );
    });
}

export default Worklist;