import React from 'react';
import {default_plant_tests, default_waste_liquid_tests, default_waste_solid_tests,
        default_solution_tests, default_media_tests,
        isSolidWaste, getAllTests, getStyledLabId} from './data.js';


/**
 *  A component for the test edit menu on each sample row.
 *  Consists of a grid of checkboxes. 
 */
const TestEditForm = (props) => {

    return (

        <form id={props.id + "testEditForm"} style={{display: "none",}} >
        <div className="testEditForm">
        {
            props.testArray.map( (test, index) => {
                return(<div key={test + index} className="testCheckbox">
                        <input type="checkbox"  id={props.id + test} name={test} value={test}
                        defaultChecked={props.assignedTests.includes(test)? true: false}
                        onChange={(event) => props.assignTest(props.id, test, event.target.checked)}></input>
                        <label htmlFor={props.id + test}>{test}</label>
                        
                       </div>);
            })
        }
        </div>

        </form>

    );
}


/**
 * Each time the menu is opened or closed, the checkboxes are updated to
 * ensure they reflect the actual array of tests assigned to the sample.
 */
const refreshCheckBoxes = (id, testArray, assignedTests) => {

    for (let test of testArray)
    {
        if (assignedTests.includes(test))
            document.getElementById(id + test).checked = true;
        else
            document.getElementById(id + test).checked = false;

    }
}

/**
 * Controls the visibility of the test edit checkbox form.
 */
const toggleTestEditForm = (id, testArray, assignedTests) =>
{
    refreshCheckBoxes(id, testArray, assignedTests);

    const formId = id + "testEditForm";

    const form = document.getElementById(formId);
    let val = "display: block;";

    if (form.getAttribute("style") === ("display: block;"))
        val = "display: none;";

    document.getElementById(formId).setAttribute("style", val);
}


/**
 * A component for each row of the sample grid table that appears on the "Create Report" page.
 */
const SampleRow = (props) => {


    return (
        <tr>
            <td>{getStyledLabId(props.type, props.sampleId)}</td>
            <td>
                        <select name="sampleCode" id="codeSelect"  value={props.code} onChange={(event) => props.setSampleCode(props.index, event.target.value)} >
                            {props.dropDown.map( (code, index) => {
                                return (<option key={index} value={code}>{code}</option>);
                            })}
                        </select>
            </td>
            <td>{props.tests.filter(item => { 
                
                if (props.type === "Plant" && default_plant_tests.includes(item)) return false; 
                if (props.type === "Waste" && !isSolidWaste(props.code) && default_waste_liquid_tests.includes(item)) return false; 
                if (props.type === "Waste" && isSolidWaste(props.code) && default_waste_solid_tests.includes(item)) return false; 
                if (props.type === "Solution" && default_solution_tests.includes(item)) return false; 
                if (props.type === "Media" && default_media_tests.includes(item)) return false;


                return true;

            }).join(" ")}


                <button id="testEdit" className="editTests" title="Edit Tests" onClick={() => toggleTestEditForm(props.sampleId, getAllTests(props.type), props.tests)} >
                <img src="https://s2.svgbox.net/materialui.svg?ic=edit&color=fff" alt=""/>
                </button>
                <TestEditForm id={props.sampleId} testArray={getAllTests(props.type)} assignedTests={props.tests} assignTest={props.assignTest}/>

            </td>

            <td>
                <input type="text" value={props.comment} onChange={(event) => props.addComment(props.index, event.target.value)} />
            </td>
            <td>
                <button className="duplicate gridButton" title="Duplicate Row" onClick={() => props.insertSample(props.index)}>+</button>
            </td>
            <td>
                <button className="delete gridButton" title="Delete Row" onClick={() => props.removeSample(props.index)}>X</button>
            </td>
        </tr>
    );
};

export default SampleRow;