import React from 'react';
import {all_plant_tests, all_waste_tests, all_solution_tests, all_media_tests,
    getStyledLabId} from './data.js';


const Worklist = (props) => {

    console.log(all_plant_tests.length);
    console.log(all_waste_tests.length);
    console.log(all_solution_tests.length);
    console.log(all_media_tests.length);

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

        let visible = samples[0].getAttribute("style") === ("display: table-row");

        for (let sample of samples)
        {
            if (visible)
                sample.setAttribute("style", "display: none");
            else
                sample.setAttribute("style", "display: table-row");

        }
    }

    return props.records.map((row, index) => {

        let first = getStyledLabId(row.sampleType, row.firstLabId);
        let sampleRange = (row.firstLabId < row.lastLabId)? (first + " - " + row.lastLabId)
        : first;

        let testArray = all_plant_tests;
        if (row.reportType === "Waste") testArray = all_waste_tests;
        if (row.reportType === "Solution") testArray = all_solution_tests;
        if (row.reportType === "Meda") testArray = all_media_tests;

        return(
        <tbody key={index + "tbody"}>
                <tr key={index + "tr"} className="worklist-report-row" onClick={() => toggleSamples("worklist-sample-row" + row.styledReportNumber)}>
                <td title="Expand/Collapse Report" style={{"cursor": "default"}}>☰</td>
                <td>{row.styledReportNumber + " - " + row.reportType}</td>
                <td>{sampleRange}</td>
                <ReportRowTestSection tests={testArray} />
                <td>Comment</td>
                </tr>

                <WorklistSampleRow samples={row.sampleGrid} type={row.sampleType} reportId={row.styledReportNumber} testArray={testArray}/>                
        </tbody>
        );

    });

}

const WorklistSampleRow = (props) => {

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