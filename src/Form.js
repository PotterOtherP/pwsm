import React, {Component} from 'react';

class Form extends Component {

    componentDidMount() {
        this.setState({receiveDate: this.getCurrentDate()});
    }

    initialState = {

        sampleType: 'Plant',
        reportType: 'Predictive',
        numSamples: 1,
        sampleCode: this.props.dropDown[0],
        receiveDate: "1985-01-01"

    };



    state = this.initialState;



    getCurrentDate = () => {

        const date = new Date();
        const year = date.getFullYear();
        let month = date.getMonth() + 1;
            if (month < 10) month = "0" + month;
        const day = date.getDate();

        return (year + "-" + month + "-" + day);
    }

    handleChange = (event) => {

        this.setState(state => {
            return { [event.target.name]: event.target.value };
        });

        if (event.target.name === "reportType")
            this.props.setReportType(event.target.value);


    }

    handleSampleTypeChange = (event) => {

        this.props.clearGrid();
        this.props.setFormSampleType(event.target.value);
        this.setState(state => {

            let type = event.target.value;
            let code = "";
            let codeDiv = document.getElementById("codeColor");

            switch(type)
            {
                case "Plant":
                    code = this.props.plantMenu[0];
                    codeDiv.setAttribute("style", "background-color: #ffff99;");
                    break;
                case "Waste":
                    code = this.props.wasteMenu[0];
                    codeDiv.setAttribute("style", "background-color: #ffbf80;");
                    break;
                case "Solution":
                    code = this.props.solutionMenu[0];
                    codeDiv.setAttribute("style", "background-color: #99ddff;");
                    break;
                case "Media":
                    code = this.props.mediaMenu[0];
                    codeDiv.setAttribute("style", "background-color: #ffb3cc;");
                    break;

                default: break;
            }


            return {sampleType: type, sampleCode: code};
        });


    }

    getCodePhrase = (type) => {

        switch(type)
        {
            case "Plant": return "Plant Crop Name: ";
            case "Waste": return "Waste Code: ";
            case "Solution": return "Solution Code: ";
            case "Media": return "Media Code: ";
            default: return "Crop/Code";
        }
    }
        

    

    selectNumSamples = () => { document.getElementById("numSamplesInput").select(); }


    submitForm = (event) => {
        event.preventDefault();
        this.props.handleSubmit(this.state);
    }

    render(props) {

        return (
            <form>

                <fieldset className="flex-row" onChange={this.handleSampleTypeChange}>
                    <label>Select Sample Type:</label>
                    <input type="radio" id="plant" name="sampleType" value="Plant" defaultChecked />
                    <label htmlFor="plant"><div className="radioArea plantBG">Plant</div></label>

                    <input type="radio" id="waste" name="sampleType" value="Waste" />
                    <label htmlFor="waste"><div className="radioArea wasteBG">Waste</div></label>

                    <input type="radio" id="solution" name="sampleType" value="Solution" />
                    <label htmlFor="solution"> <div className="radioArea solutionBG">Solution</div></label>

                    <input type="radio" id="media" name="sampleType" value="Media" />
                    <label htmlFor="media"><div className="radioArea mediaBG">Media</div></label>
                </fieldset>

                <fieldset className="flex-row" onChange={this.handleChange}>
                    <label>Select Report Type:</label>
                    <input type="radio" id="predictive" name="reportType" value="Predictive" defaultChecked />
                    <label htmlFor="predictive"> <div className="radioArea reportTypeBG">Predictive</div></label>

                    <input type="radio" id="diagnostic" name="reportType" value="Diagnostic" />
                    <label htmlFor="diagnostic"> <div className="radioArea reportTypeBG">Diagnostic</div></label>

                    <input type="radio" id="research" name="reportType" value="Research" />
                    <label htmlFor="research"> <div className="radioArea reportTypeBG">Research</div></label>

                    <input type="radio" id="internal" name="reportType" value="Internal" />
                    <label htmlFor="internal"> <div className="radioArea reportTypeBG">Internal</div></label>

                    <input type="radio" id="out-of-state" name="reportType" value="Out of State" />
                    <label htmlFor="out-of-state"> <div className="radioArea reportTypeBG">Out of State</div></label>
                </fieldset>

                <fieldset className="flex-row form-bottom-row">

                    <label id="codeColor">{this.getCodePhrase(this.state.sampleType)}</label>
                    <select name="sampleCode" id="codeSelect" onChange={this.handleChange} value={this.state.sampleCode} >
                        {this.props.dropDown.map( (code, index) => {
                            return (<option key={index} value={code}>{code}</option>);
                        })}
                    </select>

                    <label htmlFor="numSamples">Number of Samples:</label>
                    <input type="number" id="numSamplesInput" name="numSamples" onChange={this.handleChange}
                    onFocus={this.selectNumSamples} value={this.state.numSamples} min="1" max="200" required />

                    <label htmlFor="receiveDate">Date Received:</label>
                    <input type="date" id="receiveDateInput" name="receiveDate"
                    defaultValue={this.getCurrentDate()}
                    onChange={this.handleChange}/>

                </fieldset>
                

                <input type="submit" id="create-grid-button" value="Create Grid" onClick={this.submitForm} />
            </form>
        );
    }

}

export default Form;