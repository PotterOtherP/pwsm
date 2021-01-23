import React, {Component} from 'react';

class Form extends Component {

    initialState = {

        sampleType: 'Plant',
        reportType: 'Predictive',
        reportNumber: 101,
        firstLabId: 1001,
        numSamples: 1,
        sampleCode: this.props.dropDown[0],

    };



    state = this.initialState;

    handleChange = (event) => {

        this.setState(state => {
            return { [event.target.name]: event.target.value };
        });


    }

    handleSampleTypeChange = (event) => {

        this.props.clearGrid();
        this.props.setFormSampleType(event.target.value);
        this.setState(state => {

            let type = event.target.value;
            let code = "";

            switch(type)
            {
                case "Plant":
                    code = this.props.plantMenu[0];
                    break;
                case "Waste":
                    code = this.props.wasteMenu[0];
                    break;
                case "Solution":
                    code = this.props.solutionMenu[0];
                    break;
                case "Media":
                    code = this.props.mediaMenu[0];
                    break;

                default: break;
            }


            return {sampleType: type, sampleCode: code};
        });


    }
        

    

    selectNumSamples = () => { document.getElementById("numSamples").select(); }
    selectReportNumber = () => { document.getElementById("reportNumber").select(); }
    selectFirstId = () => { document.getElementById("firstLabId").select(); }


    submitForm = (event) => {
        event.preventDefault();
        this.props.handleSubmit(this.state);
    }

    render(props) {

        return (
            <form>

                <fieldset className="flex-row" onChange={this.handleSampleTypeChange}>
                    <input type="radio" id="plant" name="sampleType" value="Plant" defaultChecked />
                    <label htmlFor="plant">Plant</label>
                    <input type="radio" id="waste" name="sampleType" value="Waste" />
                    <label htmlFor="waste">Waste</label>
                    <input type="radio" id="solution" name="sampleType" value="Solution" />
                    <label htmlFor="solution">Solution</label>
                    <input type="radio" id="media" name="sampleType" value="Media" />
                    <label htmlFor="media">Media</label>
                </fieldset>

                <fieldset className="flex-row" onChange={this.handleChange}>
                    <input type="radio" id="predictive" name="reportType" value="Predictive" defaultChecked />
                    <label htmlFor="predictive">Predictive</label>
                    <input type="radio" id="diagnostic" name="reportType" value="Diagnostic" />
                    <label htmlFor="diagnostic">Diagnostic</label>
                    <input type="radio" id="research" name="reportType" value="Research" />
                    <label htmlFor="research">Research</label>
                    <input type="radio" id="internal" name="reportType" value="Internal" />
                    <label htmlFor="internal">Internal</label>
                    <input type="radio" id="out-of-state" name="reportType" value="Out of State" />
                    <label htmlFor="out-of-state">Out of State</label>
                </fieldset>
                
                    <div className="flex-row">
                    <table>
                    <thead></thead>
                    <tbody>
                    <tr>
                        <td>
                        <label htmlFor="sampleCode">Crop/Code:</label>
                        <select name="sampleCode" id="codeSelect" onChange={this.handleChange} value={this.state.sampleCode} >
                            {this.props.dropDown.map( (code, index) => {
                                return (<option key={index} value={code}>{code}</option>);
                            })}
                        </select>
                        </td>

                        <td>
                        <label htmlFor="numSamples">Number of Samples: </label>
                        <input type="number" id="numSamples" name="numSamples" onChange={this.handleChange}
                        onFocus={this.selectNumSamples} value={this.state.numSamples} min="1" max="500" required />
                        </td>
                        
                        <td>
                        <label htmlFor="reportNumber">Report Number: </label>
                        <input type="number" id="reportNumber" name="reportNumber" onChange={this.handleChange}
                        onFocus={this.selectReportNumber} value={this.state.reportNumber} min="1" required/>
                        </td>

                        <td>
                        <label htmlFor="firstLabId">First Lab ID: </label>
                        <input type="number" id="firstLabId" name="firstLabId" onChange={this.handleChange}
                        onFocus={this.selectFirstId} value={this.state.firstLabId} min="1" required/>
                        </td>
                        </tr>
                        </tbody>

                        </table>
                    </div>

                <input type="submit" value="Create Grid" onClick={this.submitForm} />
            </form>
        );
    }

}

export default Form;