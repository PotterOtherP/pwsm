import React from 'react';
import {all_plant_tests, all_waste_tests, all_solution_tests, all_media_tests,
        default_plant_tests, default_waste_liquid_tests, default_waste_solid_tests,
        default_solution_tests, default_media_tests,
        isSolidWaste} from './data.js';



const TestEditForm = (props) => {

    return (

        <form id={props.id + "testEditForm"} style={{display: "none",}} >
        {

            props.testArray.map( (test) => {
                return(<div key={test}>
                        <input type="checkbox" id={props.id + test} name={test} value={test}
                        defaultChecked={props.assignedTests.includes(test)? true: false}
                        onChange={(event) => props.assignTest(props.id, test, event.target.checked)} />
                        <label htmlFor={props.id + test}>{test}</label>
                       </div>);
            })
        }

        </form>

    );
}

const getTestArray = (type) => {

    if (type === "Plant") return all_plant_tests;
    if (type === "Waste") return all_waste_tests;
    if (type === "Solution") return all_solution_tests;
    if (type === "Media") return all_media_tests;
}



const refreshCheckBoxes = (id, testArray, assignedTests) => {

    for (let test of testArray)
    {
        if (assignedTests.includes(test))
            document.getElementById(id + test).checked = true;
        else
            document.getElementById(id + test).checked = false;

    }
}

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

const SampleRow = (props) => {


    return (
        <tr>
            <td>{props.sampleId}</td>
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


                <button id="testEdit" onClick={() => toggleTestEditForm(props.sampleId, getTestArray(props.type), props.tests)} >
                <img src="https://s2.svgbox.net/materialui.svg?ic=edit&color=fff" alt=""/>
                </button>
                <TestEditForm id={props.sampleId} testArray={getTestArray(props.type)} assignedTests={props.tests} assignTest={props.assignTest}/>

            </td>

            <td>
                <input type="text" value={props.comment} onChange={(event) => props.addComment(props.index, event.target.value)} />
            </td>
            <td>
                <button onClick={() => props.insertSample(props.index)}>+</button>
            </td>
            <td>
                <button onClick={() => props.removeSample(props.index)}>X</button>
            </td>
        </tr>
    );
};

export default SampleRow;