import React from 'react';

const all_plant_tests = [ "Biomass", "C", "Cl", "DW", "ICP", "Mo", "N", "NO3"];
const all_waste_tests = [ "C", "CCE", "DM", "EC", "HM", "HM - All", "ICP", "Mo", "N", "NH4/NO3", "pH", "TKN"];
const all_solution_tests = [ "CBC", "Cl", "EC", "ICP", "Mo", "NH4/NO3", "pH", "Urea" ];
const all_media_tests = [ "Bulk Density", "Cl", "EC", "ICP", "Mo", "NH4/NO3", "pH", "Urea" ];

const default_plant_tests = ["ICP", "N"];
const default_waste_liquid_tests = ["ICP", "pH", "TKN"];
const default_waste_solid_tests = ["DM", "ICP", "N"];
const default_solution_tests = ["CBC", "Cl", "EC", "ICP", "NH4/NO3", "pH"];
const default_media_tests = ["EC", "ICP", "pH"];

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

const isSolidWaste = (code) => {

    switch (code)
    {
        case "SSB - Beef Surface Scraped/Stockpiled":
        case "SSD - Dairy Surface Scraped/Stockpiled":
        case "SSH - Horse Surface Scraped/Stockpiled":
        case "SSS - Swine Surface Scraped/Stockpiled":
        case "SSO - Other Surface Scraped/Stockpiled":
        case "HBB - Broiler breeder litter":
        case "HBP - Broiler pullet litter":
        case "HLB - Broiler litter":
        case "HLL - Layer litter":
        case "HLT - Turkey litter":
        case "FCB - Composted manure - Beef":
        case "FCD - Composted manure - Dairy":
        case "FCH - Composted manure - Horse":
        case "FCP - Composted manure - Poultry":
        case "FCS - Composted manure - Swine":
        case "FCO - Composted manure - Other":
        case "FPM - Compost, poultry mortality":
        case "FSM - Compost, swine mortality":
        case "FCW - Compost, plant material":
        case "FCX - Compost, mixed materials":
        case "FCV - Vermicompost":
        case "NCR - Raw plant material/crop residues":
        case "NBS - Wood waste/sawdust":
        case "NSF - Food/beverage by-products (solid)":
        case "NSA - Animal by-products (solid)":
        case "IOC - Paper fiber/pulp":
        case "IOL - Lime by-products":
        case "NSO - Non-composted solid, other":
        case "CSW - Wood ash":
        case "CSC - Coal ash":
        case "CSB - Biochar":
        case "CSO - Ash, mixed or other":
        case "BCO - Biosolids, composted":
        case "BIO - Biosolids, other":
        case "BIX - Biosolids, mixed":
        {
            return true;
        }

        default: return false;
    }
}

const refreshCheckBoxes = (id, testArray, assignedTests) => {

    for (let test of testArray)
    {
        if (assignedTests.includes(test))
            document.getElementById(id + test).checked = true;
        else
            document.getElementById(id + test).checked = false;

        // console.log(test + ": " + (document.getElementById(id + test)).checked);
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