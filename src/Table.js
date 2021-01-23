import React from 'react';
import SampleRow from './SampleRow';



const LabHeader = (props) => {

    return (
        <thead>
            <tr>
                <th>Report Type: {props.reportData.reportType} </th>
                <th>Report {props.reportData.reportNumber} </th>
                <th>Samples {props.reportData.firstLabId} - {props.reportData.firstLabId + props.reportData.numSamples - 1}</th>
                <th><button id="saveButton" onClick={() => props.saveReport()}>Save Report</button></th>
                <th><button id="clearButton" onClick={() => props.clearGrid()}>Clear Grid</button></th>
            </tr>
        </thead>
    );
};

const TableHeader = () => {
    return (
        <thead>
            <tr>
                <th>Lab ID</th>
                <th>Crop/Code</th>
                <th>Tests</th>
                <th>Comment</th>
            </tr>
        </thead>
    );
}


const TableBody = (props) => {

    const rows = props.reportData.sampleGrid.map((row, index) => {
        return (
            <SampleRow
            addComment={props.addComment}
            assignTest={props.assignTest}
            code={row.code}
            comment={row.comment}
            dropDown={props.dropDown}
            index={index}
            insertSample={props.insertSample}
            key={index}
            sampleId={row.sampleId}
            removeSample={props.removeSample}
            setSampleCode={props.setSampleCode}
            tests={row.tests}
            type={props.reportData.sampleType}
            />
           
        );
    });
    return (
        <tbody>{rows}</tbody>
    );
}

const Table = (props) => {

    // const {reportData, removeSample} = props;

    return (

        <table className="striped-table pwsm-table">
            <LabHeader reportData={props.reportData} clearGrid={props.clearGrid} saveReport={props.saveReport} />
            <TableHeader />
            <TableBody
                addComment={props.addComment}
                assignTest={props.assignTest}
                dropDown={props.dropDown}
                insertSample={props.insertSample}
                removeSample={props.removeSample}
                reportData={props.reportData}
                setSampleCode={props.setSampleCode}
                />
        </table>
        );
}

export default Table;