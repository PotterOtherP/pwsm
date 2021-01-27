import React from 'react';
import {all_plant_tests, all_waste_tests, all_solution_tests, all_media_tests,
    getStyledLabId} from './data.js';


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

const ReportRows = (props) => {

    const toggleSamples = (classname) => {


        let samples = document.getElementsByClassName(classname);
        let test = document.getElementById(classname);

        let visible = samples[0].getAttribute("style") === ("display: table-row");

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
                <td>{row.styledReportNumber + " - " + row.reportType}</td>
                <td>{sampleRange}</td>
                <td></td><td></td><td></td><td></td>
                <td></td><td></td><td></td><td></td>
                <td></td><td></td><td></td><td></td>
                <td>Comment</td>
                </tr>

                <tr key={index + "trtests"} id={"worklist-sample-row" + row.styledReportNumber} className="worklist-test-row">
                <td></td>
                <td></td>
                <td></td>
                <ReportRowTestSection tests={testArray} />
                <td></td>
                </tr>

                <WorklistSampleRows samples={row.sampleGrid} type={row.sampleType} reportId={row.styledReportNumber} testArray={testArray}/>                
        </tbody>
        );

    });

}

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

const ReportRowTestSection = (props) => {

    return props.tests.map((test, index) => {
        return(<td key={test + index}>{test}</td>);
        
    });
}

const SampleRowTestSection = (props) => {

    return props.allTests.map((test, index) => {

        let letter = props.assignedTests.includes(test)? "O" : "";

        return(<td key={test + index}>{letter}</td>);
        
    });
}

export default Worklist;