import React, {Component} from 'react';
import Table from './Table';
import Worklist from './Worklist';
import Form from './Form';
import {plant_codes, waste_codes, solution_codes, media_codes,
        default_plant_tests, default_waste_solid_tests, default_waste_liquid_tests, default_solution_tests, default_media_tests,
        extra_tests, saved_reports, saved_report_ids, saved_plant_report_numbers, saved_waste_report_numbers,
        saved_solution_report_numbers, saved_media_report_numbers, saved_plant_lab_ids, saved_waste_lab_ids,
        saved_solution_lab_ids, saved_media_lab_ids,
        copyObject, getAllTests, isSolidWaste, getStyledReportNumber} from './data.js';


/**
 *  Author: Nathan Tryon
 *  Source: https://github.com/PotterOtherP/pwsm
 */
class App extends Component {

    /**
     * Ensures that the correct report number and lab IDs are displayed with every render.
     */
    componentDidMount() {

        this.setState(state => {

            return {
                reportNumber: this.getNextNumbers(this.state.sampleType)[0],
                firstLabId: this.getNextNumbers(this.state.sampleType)[1]
            }
        });

    }

    /** Create and set the initial state */
    initialState = {

        createDisplay: true,
        worklistDisplay: false,

        sampleType: "Plant",
        formSampleType: "Plant",
        formSampleCode: plant_codes[0],
        reportType: "Predictive",
        reportNumber: 101,
        firstLabId: 1001,
        numSamples: 1,
        receiveDate: "1985-01-01",
        sampleCode: '',
        sampleGrid: []
    };


    state = this.initialState;



    /**
     * Adds a comment to a row in the sample grid
     */
    addComment = (key, newComment) => {

        this.setState(state => {

            let samples = state.sampleGrid;
            samples[key].comment = newComment; 
            return { sampleGrid: samples };
        });

    }

    /**
     * Assigns (or removes) a lab test from a sample when
     * it is checked or unchecked by the user in the test
     * checkbox menu.
     */
    assignTest = (id, test, val) => {


        this.setState(state => {

            let samples = state.sampleGrid;

            samples = samples.map( row => {

                if (row.sampleId === id)
                {
                    if (val === true && !row.tests.includes(test))
                    {
                        row.tests.push(test);
                        row.tests.sort();

                    }

                    else if (val === false && row.tests.includes(test))
                    {
                        row.tests = row.tests.filter(item => item !== test);

                    }
                }

                return row;
            })

            return { sampleGrid: samples };
        });
    }


    /**
     * Refreshes the sample grid lab IDs whenever a row is inserted or deleted.
     */
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

    /** Removes all samples from the grid (and the state), ensuring a clean slate. 
     *
     */
    clearGrid = () => {

        this.setState(state => {

            let samples = state.sampleGrid;

            for (let sample of samples)
            {
                while (sample.tests.length > 0)
                    sample.tests.shift();

            }

            while (samples.length > 0)
                samples.shift();

            return {sampleGrid: samples, numSamples: 1}

        });
    }

    /**
     * Removes a saved report from the report storage array.
     */
    deleteSavedReport = (reportNumber) =>
    {

    }

    /**
     * Shows the report creation screen on the page, hiding the worklist/report edit screeen.
     */
    displayCreate = () => {

        this.setState(state => {

            return {
                sampleType: "Plant",
                sampleCode: plant_codes[0],
                formSampleType: "Plant",
                formSampleCode: plant_codes[0],
                reportType: "Predictive",
                reportNumber: this.getNextNumbers("Plant")[0],
                firstLabId: this.getNextNumbers("Plant")[1],
                createDisplay: true,
                worklistDisplay: false
            }
        })
    }

    /**
     * Shows the worklist/report edit screen, hides the creation screen.
     */
    displayReports = () => {

        if (saved_reports.length < 1)
        {
            window.alert("No reports have been created.");
            return;
        }

        this.setState(state => {

            return {
                createDisplay: false,
                worklistDisplay: true
            }
        })

    }

    /**
     * Returns the appropriate code dropdown menu for the specified sample type.
     */
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

    /**
     * Returns the next report number and lab ID number based on previously
     * used numbers for the current sample type.
     */
    getNextNumbers = (type) => {

        let report_numbers = saved_plant_report_numbers;
        let lab_numbers = saved_plant_lab_ids;
        let nextReportNumber = 1;
        let nextLabNumber = 1;

        switch (type)
        {
            case "Waste":
                report_numbers = saved_waste_report_numbers;
                lab_numbers = saved_waste_lab_ids;
                break;

            case "Solution":
                report_numbers = saved_solution_report_numbers;
                lab_numbers = saved_solution_lab_ids;
                break;

            case "Media":
                report_numbers = saved_media_report_numbers;
                lab_numbers = saved_media_lab_ids;
                break;

            default: break;
        }

        if (report_numbers.length < 1)
            nextReportNumber = 101;
        else
            nextReportNumber = report_numbers[report_numbers.length - 1] + 1;

        if (lab_numbers.length < 1)
            nextLabNumber = 1001;
        else
            nextLabNumber = lab_numbers[lab_numbers.length - 1] + 1;

        return [nextReportNumber, nextLabNumber];
    }

    /**
     *  Returns an array of all initially assigned tests to a particular sample code.
     */
    getTests = (type, code) => {
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

    /**
     * When the form is submitted with the Create Report button,
     * this function is called to transmit the form data to the
     * App state.
     * The sample grid is updated after the first setState() call.
     */
    handleSubmit = (reportInfo) => {

        this.setState(state => {

            return {
                sampleType: reportInfo.sampleType,
                reportType: reportInfo.reportType,
                numSamples: Number.parseInt(reportInfo.numSamples),
                sampleCode: reportInfo.sampleCode,
                receiveDate: reportInfo.receiveDate
            };

        });

        this.setState(state => {

            let samples = [];

            for (let i = 0; i < reportInfo.numSamples; ++i)
            {
                samples.push({
                    sampleId: Number.parseInt(this.state.firstLabId) + i,
                    code: reportInfo.sampleCode,
                    tests: this.getTests(reportInfo.sampleType, reportInfo.sampleCode),
                    comment: ""});
            }


            return {sampleGrid: samples};

        });
    
    }


    /**
     * Duplicates a row in the sample grid.
     */
    insertSample = (index) => {

        let samples = this.state.sampleGrid;
        let copy = Object.create(samples[index]);
        copy = Object.assign(copy, samples[index]);

        copy.tests = copyObject(samples[index].tests);

        samples.splice(index, 0, copy);

        this.setState(state => {
            return { sampleGrid: samples };
        });

        this.adjustGridIdNumbers();
    }

    /**
     * When the sample grid length changes, the number of samples is adjusted accordingly.
     */
    refreshSampleIDs = () => {

        this.setState(state => {
            let newNumSamples = state.sampleGrid.length;
            return { numSamples: newNumSamples };
        });
    }

    /**
     * Removes a row from the sample grid.
     */
    removeSample = (index) => {

        this.setState(state => {
            const samples = state.sampleGrid.filter((row, i) => i !== index);

            return { sampleGrid: samples };
        });

        this.adjustGridIdNumbers();
    }

    /**
     * Saves a report to the storage array.
     */
    saveReport = () => {

        if (this.state.sampleGrid.length < 1)
        {
            window.alert("Add samples with \"Create Grid\" to create a report.");
        }

        else
        {

            let newId = getStyledReportNumber(this.state.sampleType, this.state.reportNumber);

            let newReport = {

                reportNumber: this.state.reportNumber,
                styledReportNumber: newId,
                sampleType: this.state.sampleType,
                reportType: this.state.reportType,
                sampleGrid: copyObject(this.state.sampleGrid),
                firstLabId: this.state.firstLabId,
                lastLabId: this.state.firstLabId + this.state.sampleGrid.length - 1,
                allTests: getAllTests(this.state.sampleType)

            };

            if (saved_report_ids.includes(newId))
            {
                window.alert("Report " + newId + " has already been used." );
            }

            else
            {
                window.alert("Saving report " + newId + ".");
                saved_reports.push(newReport);
                
                saved_report_ids.push(newId);
                this.clearGrid();
                
                if (newReport.sampleType === "Plant")
                {
                    saved_plant_report_numbers.push(newReport.reportNumber);
                    for (let i = newReport.firstLabId; i <= newReport.lastLabId; ++i)
                        saved_plant_lab_ids.push(i);
                }

                else if (newReport.sampleType === "Waste")
                {
                    saved_waste_report_numbers.push(newReport.reportNumber);
                    for (let i = newReport.firstLabId; i <= newReport.lastLabId; ++i)
                        saved_waste_lab_ids.push(i);

                }

                else if (newReport.sampleType === "Solution")
                    {
                    saved_solution_report_numbers.push(newReport.reportNumber);
                    for (let i = newReport.firstLabId; i <= newReport.lastLabId; ++i)
                        saved_solution_lab_ids.push(i);

                }

                else if (newReport.sampleType === "Media")
                    {
                    saved_media_report_numbers.push(newReport.reportNumber);
                    for (let i = newReport.firstLabId; i <= newReport.lastLabId; ++i)
                        saved_media_lab_ids.push(i);

                }
            }
        }

        this.setState(state => {

            return {
                reportNumber: this.getNextNumbers(this.state.sampleType)[0],
                firstLabId: this.getNextNumbers(this.state.sampleType)[1]
            }
        });

    }

    /**
     * Set the report type in the app state when it's changed in the form
     * (without submitting the form);
     */
    setReportType = (type) => {
        this.setState(state => {
            return ({reportType: type});
        });
    }

    /**
     * Set the sample code of an individual row in the sample grid.
     */
    setSampleCode = (key, newCode) => {
        this.setState(state => {

            let samples = state.sampleGrid;
            samples[key].code = newCode;
            samples[key].tests = this.getTests(state.sampleType, newCode);
            return { sampleGrid: samples };
        });
    };

    /**
     * Set the sample type that's displayed in the form (not affecting the sample grid).
     */
    setFormSampleType = (type) => {
        this.setState(state => {
        
            return {
                formSampleType: type,
                formSampleCode: this.getDropDown(type)[0],
            }

        });

        this.setState(state => {
        
            return {
                reportNumber: this.getNextNumbers(type)[0],
                firstLabId: this.getNextNumbers(type)[1]
            }

        });
    };

    /**
     * Render either the report creation screen or the worklist/edit report screen.
     */
    render() {

        if (this.state.createDisplay)
        {
            return (
            <div className="container">
            <header>
            <h3>PWSM Receiving</h3>
                <button id="displaySavedButton"
                    onClick={() => this.displayReports()}>{"Show Saved Reports (" + saved_report_ids.length + ")"}
                </button>
            </header>
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
                    setReportType={this.setReportType}
                    />
                <div className="container table-container">
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

        else if (this.state.worklistDisplay)
        {
            return (
                <div className="container">
                    <button id="displayCreateScreen" onClick={() => this.displayCreate()}>Create New Report</button>
                    <Worklist
                        records={saved_reports}

                    />
                </div>
            );
        }
    }
}







export default App