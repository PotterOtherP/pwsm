import React from 'react';
import {all_plant_tests, all_waste_tests, all_solution_tests, all_media_tests,
    getStyledLabId} from './data.js';

/**
 * The worklist is one large table with expandable rows for each report. Expanding a report
 * row will reveal all of it samples and their assigned tests.
 */
const Worklist = (props) => {


    return (

        <div>
        <table className="worklist-table">
            <thead>
            </thead>
        <ReportRows records={props.records}/>
        </table>
        </div>
        );
}

/**
 * The component that generates the report rows, including a row with all relevant tests
 * and a row for each sample in the report. Only the report row is visible initially.
 */
const ReportRows = (props) => {

    /**
     * This function is triggered when the report row is clicked.
     */
    const toggleSamples = (classname) => {


        let samples = document.getElementsByClassName(classname);
        let test = document.getElementById(classname);

        let visible = samples[0].getAttribute("style") !== ("display: none");

        for (let sample of samples)
        {
            if (visible)
            {
                sample.setAttribute("style", "display: none");
                test.setAttribute("style", "display: none");
            }
            else
            {
                sample.setAttribute("style", "display: table-row");
                test.setAttribute("style", "display: table-row");
            }

        }
    }

    return props.records.map((row, index) => {

        let first = getStyledLabId(row.sampleType, row.firstLabId);
        let sampleRange = (row.firstLabId < row.lastLabId)? (first + " - " + row.lastLabId)
        : first;

        let testArray = all_plant_tests;
        if (row.sampleType === "Waste") testArray = all_waste_tests;
        if (row.sampleType === "Solution") testArray = all_solution_tests;
        if (row.sampleType === "Media") testArray = all_media_tests;

        return(
        <tbody key={index + "tbody"}>
                <tr key={index + "tr"} className="worklist-report-row" onClick={() => toggleSamples("worklist-sample-row" + row.styledReportNumber)}>
                <td title="Expand/Collapse Report" style={{"cursor": "default"}}>☰</td>
                <td>{row.styledReportNumber}</td>
                <td>{"Samples: " + sampleRange}</td>
                <td colspan="9"></td>
                <td>{row.reportType}</td>
                </tr>

                <tr key={index + "trtests"} id={"worklist-sample-row" + row.styledReportNumber} className="worklist-test-row">
                <td colspan="3"></td>
                <ReportRowTestSection tests={testArray} />
                <td>Comment</td>
                </tr>

                <WorklistSampleRows samples={row.sampleGrid} type={row.sampleType} reportId={row.styledReportNumber} testArray={testArray}/>                
        </tbody>
        );

    });

}

/**
 * A component for the sample rows in a particular report.
 */
const WorklistSampleRows = (props) => {

    return props.samples.map((sample, sampleIndex) => {

        return (
            <tr key={sampleIndex + "sampletr"} className={"worklist-sample-row" + props.reportId + " worklist-sample-row"}>
            <td></td>
            <td>{getStyledLabId(props.type, sample.sampleId)}</td>
            <td>{sample.code}</td>
            <SampleRowTestSection allTests={props.testArray} assignedTests={sample.tests} />
            <td>{sample.comment}</td>
            </tr>
            );
    });
}

/**
 * Creates the <td> elements for each test
 */
const ReportRowTestSection = (props) => {

    return props.tests.map((test, index) => {
        return(<td key={test + index}>{test}</td>);
        
    });
}

/**
 * Prints an "O" for each test assigned to the sample. Tests not assigned are left blank.
 */
const SampleRowTestSection = (props) => {

    return props.allTests.map((test, index) => {

        let letter = props.assignedTests.includes(test)? "O" : "";

        return(<td key={test + index}>{letter}</td>);
        
    });
}

export default Worklist;