import React, {Component} from 'react';
import Table from './Table';
import Form from './Form';

const plant_codes = [

    "Acacia",
    "Ailanthus",
    "Alfalfa",
    "Apple",
    "Asparagus",
    "Basil",
    "Beans",
    "Bentgrass",
    "Bermudagrass",
    "Blackberry",
    "Blueberry",
    "Broccoli",
    "Brussels sprouts",
    "Cabbage",
    "Cantaloupe",
    "Carinata",
    "Cauliflower",
    "Cedar",
    "Collards",
    "Corn",
    "Cotton",
    "Cucumber",
    "Dandelion",
    "Dogwood",
    "Elm",
    "Fescue",
    "Fig",
    "Fir, Fraser",
    "GH Hemp",
    "GH Strawberry",
    "GH Tomato",
    "Grape, Muscadine",
    "Grape, Vinifera",
    "Honeydew",
    "Kale",
    "Lettuce",
    "Oats",
    "Okra",
    "Peach",
    "Pear",
    "Pepper",
    "Pine",
    "Raspberry",
    "Rice",
    "Soybean",
    "Squash",
    "Strawberry",
    "Tobacco",
    "Tomato",
    "Turfgrass",
    "Watermelon",
    "Wheat",
    "Zucchini"

];

const waste_codes = [

    "ALS - Swine Lagoon Liquid",
    "ALF - Swine Farrow to Wean",
    "ALP - Poultry Lagoon Liquid",
    "ALO - Other Lagoon Liquid",
    "ASP - Poultry Lagoon Sludge",
    "ASS - Swine Lagoon Sludge",
    "ASO - Other Lagoon Sludge",
    "BID - Domestic septage",
    "BCO - Biosolids, composted",
    "BIO - Biosolids, other",
    "BIX - Biosolids, mixed",
    "BLL - Leachates/effluents or reclaimed water",
    "CSW - Wood ash",
    "CSC - Coal ash",
    "CSB - Biochar",
    "CSO - Ash, mixed or other",
    "FCB - Composted manure - Beef",
    "FCD - Composted manure - Dairy",
    "FCH - Composted manure - Horse",
    "FCP - Composted manure - Poultry",
    "FCS - Composted manure - Swine",
    "FCO - Composted manure - Other",
    "FPM - Compost, poultry mortality",
    "FSM - Compost, swine mortality",
    "FCW - Compost, plant material",
    "FCX - Compost, mixed materials",
    "FCV - Vermicompost",
    "GTL - Grease trap water",
    "HBB - Broiler breeder litter",
    "HBP - Broiler pullet litter",
    "HLB - Broiler litter",
    "HLL - Layer litter",
    "HLT - Turkey litter",
    "IOC - Paper fiber/pulp",
    "IOL - Lime by-products",
    "LSB - Beef Slurry",
    "LSD - Dairy Slurry",
    "LSS - Swine Slurry",
    "LSO - Other Slurry",
    "NBS - Wood waste/sawdust",
    "NCR - Raw plant material/crop residues",
    "NSF - Food/beverage by-products (solid)",
    "NLF - Food/beverage by-products (liquid)",
    "NSA - Animal by-products (solid)",
    "NLA - Animal by-products (liquid)",
    "NSO - Non-composted solid, other",
    "NLO - Non-composted liquid, other",
    "SSB - Beef Surface Scraped/Stockpiled",
    "SSD - Dairy Surface Scraped/Stockpiled",
    "SSH - Horse Surface Scraped/Stockpiled",
    "SSS - Swine Surface Scraped/Stockpiled",
    "SSO - Other Surface Scraped/Stockpiled",

];

const solution_codes = [

    "AS - Source Water",
    "AP - Pond Water",
    "AO - Other Aquaculture",
    "FP - Fish Production/Recreation",
    "QG - Ground Water",
    "QH - Household (nonpotable",
    "QS - Surface Water",
    "QO - Other Water",
    "NS - General Nutrient Solution",
    "NT - Tobacco Nutrient Solution",
    "NL - Pour-thru Leachate",
    "NO - Other Nutrient Solution",
    "LC - Cattle Water",
    "LH - Horse Water",
    "LS - Swine Water",
    "LO - Other Livestock Water",
    "IW - General Irrigation",
    "IO - Overhead Irrigation",
    "IT - Trickle Irrigation",
    "HT - Hydroponic Tomato",
    "HC - Hydroponic Cucumber",
    "HL - Hydroponic Lettuce",
    "HH - Hydroponic Herb",
    "HH - Other Hydroponic",
    "SP - Pesticide Solution",
    "SH - Hydroponic Nutrient",
    "SF - Floriculture Production",
    "ST - Tobacco Transplant Production",
    "SV - Vegetable Transplant Production",
    "SO - Other Solution Source"

];

const media_codes = [

    "GHF - GH Floriculture",
    "GHV - GH Vegetable",
    "NUR - Nursery Crop",
    "TOB - Tobacco Transplants",
    "OTH - Other"

];

// const all_plant_tests = [ "Biomass", "C", "Cl", "DW", "ICP", "Mo", "N", "NO3"];
// const all_waste_tests = [ "C", "CCE", "DM", "EC", "HM", "HM - All", "ICP", "Mo", "N", "NH4/NO3", "pH", "TKN"];
// const all_solution_tests = [ "CBC", "Cl", "EC", "ICP", "Mo", "NH4/NO3", "pH", "Urea" ];
// const all_media_tests = [ "Bulk Density", "Cl", "EC", "ICP", "Mo", "NH4/NO3", "pH", "Urea" ];

const default_plant_tests = ["ICP", "N"];
const default_waste_liquid_tests = ["ICP", "pH", "TKN"];
const default_waste_solid_tests = ["DM", "ICP", "N"];
const default_solution_tests = ["CBC", "EC", "ICP", "NH4/NO3", "pH"];
const default_media_tests = ["EC", "ICP", "pH"];

const extra_tests = {

    "Alfalfa": ["Mo"],
    "Broccoli": ["Mo"],
    "Brussels sprouts": ["Mo"],
    "Cauliflower": ["Mo"],
    "Cabbage": ["Mo"],
    "Canola": ["Mo"],
    "Collards": ["Mo"],
    "Kale": ["Mo"],
    "Kohlrabi": ["Mo"],
    "Poinsettia": ["Mo"],
    "Spinach": ["Mo"],
    "Turnip": ["Mo"],

    "Strawberry": ["NO3"],
    "Cotton": ["NO3"],

    "BID - Domestic septage": ["pH", "EC"],
    "BCO - Biosolids, composted": ["C", "pH", "EC"],
    "BIO - Biosolids, other": ["C", "pH", "EC"],
    "BIX - Biosolids, mixed": ["C", "pH", "EC"],
    "BLL - Leachates/effluents or reclaimed water": ["pH", "EC"],

    "CSW - Wood ash": ["C", "pH", "EC"],
    "CSC - Coal ash": ["C", "pH", "EC"],
    "CSB - Biochar": ["C", "pH", "EC"],
    "CSO - Ash, mixed or other": ["C", "pH", "EC"],

    "FCB - Composted manure - Beef": ["C", "pH", "EC"],
    "FCD - Composted manure - Dairy": ["C", "pH", "EC"],
    "FCH - Composted manure - Horse": ["C", "pH", "EC"],
    "FCP - Composted manure - Poultry": ["C", "pH", "EC"],
    "FCS - Composted manure - Swine": ["C", "pH", "EC"],
    "FCO - Composted manure - Other": ["C", "pH", "EC"],
    "FPM - Compost, poultry mortality": ["C", "pH", "EC"],
    "FSM - Compost, swine mortality": ["C", "pH", "EC"],
    "FCW - Compost, plant material": ["C", "pH", "EC"],
    "FCX - Compost, mixed materials": ["C", "pH", "EC"],
    "FCV - Vermicompost": ["C", "pH", "EC"],

    "GTL - Grease trap water": ["pH", "EC"],

    "IOC - Paper fiber/pulp": ["C", "pH", "EC"],
    "IOL - Lime by-products": ["CCE", "pH", "EC"],

    "NBS - Wood waste/sawdust": ["C", "pH", "EC"],
    "NCR - Raw plant material/crop residues": ["C", "pH", "EC"],
    "NSF - Food/beverage by-products (solid)": ["C", "pH", "EC"],
    "NLF - Food/beverage by-products (liquid)": ["pH", "EC"],
    "NSA - Animal by-products (solid)": ["C", "pH", "EC"],
    "NLA - Animal by-products (liquid)": ["pH", "EC"],
    "NSO - Non-composted solid, other": ["C", "pH", "EC"],
    "NLO - Non-composted liquid, other": ["pH", "EC"]


};

class App extends Component {

    initialState = {

        sampleType: "Plant",
        formSampleType: "Plant",
        formSampleCode: plant_codes[0],
        reportType: "Predictive",
        reportNumber: 1,
        firstLabId: 1,
        numSamples: 1,
        sampleCode: '',
        sampleGrid: []
    };


    state = this.initialState;

    addComment = (key, newComment) => {

        this.setState(state => {

            let samples = state.sampleGrid;
            samples[key].comment = newComment; 
            return { sampleGrid: samples };
        });

    }

    assignTest = (id, test, val) => {

        console.log("assignTest() function: " + id + " " + test + " " + val);

        this.setState(state => {

            let samples = state.sampleGrid;

            samples = samples.map( row => {

                if (row.sampleId === id)
                {
                    if (val === true && !row.tests.includes(test))
                    {
                        console.log("Adding " + test + " to sample " + id);
                        row.tests.push(test);
                        row.tests.sort();


                    }

                    else if (val === false && row.tests.includes(test))
                    {
                        console.log("Removing " + test + " from sample " + id);
                        row.tests = row.tests.filter(item => item !== test);

                    }
                }

                return row;
            })

            return { sampleGrid: samples };
        });
    }


    adjustGridIdNumbers = () => {

        this.refreshSampleIDs();
        this.setState(state => {

            let first = state.firstLabId;
            let samples = state.sampleGrid;

            for (let i = 0; i < state.numSamples; ++i)
            {
                samples[i].sampleId = first + i;
            }

            return { sampleGrid: samples };
        })

    }

    clearGrid = () => {

        console.log("Clearing grid");

        this.setState(state => {

            let samples = state.sampleGrid;

            for (let sample of samples)
            {
                while (sample.tests.length > 0)
                    sample.tests.shift();

            }

            while (samples.length > 0)
                samples.shift();

            return {sampleGrid: samples}

        });
    }

    getDropDown = (type) => {

        switch (type)
        {
            case "Plant": return plant_codes;
            case "Waste": return waste_codes;
            case "Solution": return solution_codes;
            case "Media": return media_codes;
            default: break;
        }
    }

    insertSample = (index) => {

        let samples = this.state.sampleGrid;
        let copy = Object.create(samples[index]);
        copy = Object.assign(copy, samples[index]);

        copy.tests = copyArray(samples[index].tests);

        samples.splice(index, 0, copy);

        this.setState(state => {
            return { sampleGrid: samples };
        });

        this.adjustGridIdNumbers();
    }

    refreshSampleIDs = () => {

        this.setState(state => {
            let newNumSamples = state.sampleGrid.length;
            return { numSamples: newNumSamples };
        });
    }

    removeSample = (index) => {

        this.setState(state => {
            const samples = state.sampleGrid.filter((row, i) => i !== index);

            return { sampleGrid: samples };
        });

        this.adjustGridIdNumbers();
    }

    handleSubmit = (reportInfo) => {

        this.setState(state => {

            return {
                sampleType: reportInfo.sampleType,
                reportType: reportInfo.reportType,
                reportNumber: Number.parseInt(reportInfo.reportNumber),
                firstLabId: Number.parseInt(reportInfo.firstLabId),
                numSamples: Number.parseInt(reportInfo.numSamples),
                sampleCode: reportInfo.sampleCode
            };

        });

        this.setState(state => {

            let samples = [];

            for (let i = 0; i < reportInfo.numSamples; ++i)
            {
                samples.push({
                    sampleId: Number.parseInt(reportInfo.firstLabId) + i,
                    code: reportInfo.sampleCode,
                    tests: getTests(reportInfo.sampleType, reportInfo.sampleCode),
                    comment: ""});
            }


            return {sampleGrid: samples};

        });
    
    }

    saveReport = () => {

        if (this.state.sampleGrid.length < 1)
        {
            console.log("Nothing to save!");
        }

        else
        {
            console.table(this.state.sampleGrid);
        }

    }

    setSampleCode = (key, newCode) => {
        this.setState(state => {

            let samples = state.sampleGrid;
            samples[key].code = newCode;
            samples[key].tests = getTests(state.sampleType, newCode);
            return { sampleGrid: samples };
        });
    };

    setFormSampleType = (type) => {
        this.setState(state => {
        
            return {
                formSampleType: type,
                formSampleCode: this.getDropDown(type)[0]
            }

        });
    };

    render() {

        // console.clear();

        return (
            <div className="container">
            <Form
                clearGrid={this.clearGrid}
                plantMenu={plant_codes}
                wasteMenu={waste_codes}
                solutionMenu={solution_codes}
                mediaMenu={media_codes}
                dropDown={this.getDropDown(this.state.formSampleType)}
                handleSubmit={this.handleSubmit}
                sampleCode={this.state.formSampleCode}
                setFormSampleType={this.setFormSampleType}
                />

            <div className="container">
            <Table
                addComment={this.addComment}
                assignTest={this.assignTest}
                clearGrid={this.clearGrid}
                dropDown={this.getDropDown(this.state.sampleType)}
                insertSample={this.insertSample}
                removeSample={this.removeSample}
                reportData={this.state}
                saveReport={this.saveReport}
                setSampleCode={this.setSampleCode}
                />
            </div>

            </div>
            );
    }
}


function copyArray(arr)
{
    let result = [];

    for (let item of arr)
        result.push(item);

    return result;
}



function isSolidWaste(code)
{
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

function getTests(type, code)
{
    let result_array = [];

    switch(type)
    {
        case "Plant":
            result_array = default_plant_tests;
            break;
        case "Solution":
            result_array = default_solution_tests;
            break;
        case "Media":
            result_array = default_media_tests;
            break;
        case "Waste":
            if (isSolidWaste(code))
                result_array = default_waste_solid_tests;
            else
                result_array = default_waste_liquid_tests;
            break;

        default: break;
    }

    if (extra_tests.hasOwnProperty(code))
        result_array = result_array.concat(extra_tests[code]);


    let result_copy = [];
    for (let item of result_array)
        result_copy.push(item);

    return result_copy;
}

function getExtraTests(code)
{
    let result = [];
    if (extra_tests.hasOwnProperty(code))
        result = extra_tests[code];

    return result;

}

export default App