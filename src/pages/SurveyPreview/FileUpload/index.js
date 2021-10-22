import React, { Component } from "react";
import CelledTable from "./celledTable";
import { CSVLink } from "react-csv";
import CSVReader from "react-csv-reader";
import "./style.css";
import axios from 'axios';
import './index.sass';
import { logoName, apiURL, documentationURL } from '../../surveySections.js';
import Button from '@material-ui/core/Button';

const Joi = require("@hapi/joi");

//this create method will create a new instance of axios with some default values.

const segment =  axios.create({
  baseURL: apiURL,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'x-api-key': 'p4uM3ytmFI77c91cF8xGB3k8rZZ2N70haXYKRqdL'
  }
});

const papaparseOptions = {
  header: true,
  dynamicTyping: true,
  skipEmptyLines: true,
  transformHeader: (header) => header.toLowerCase().replace(/\W/g, "_"),
};

class FileUpload extends Component {
  state = {
    loading: false,
    uploaded: false,
    hasError: false,
    data: [],
    isValid: true,
  };

  constructor(props){
      super();
      console.log(props)
  }
  sampleData = (sections) => {
    let sectionQuestions = sections.map((section) => {
      return section.questions.map((question) => {
        return {
          ...question,
          options: section.options,
        };
      });
    });

    const allQuestions = sectionQuestions.flat();

    console.log(allQuestions);
    const headers = [
      "rid",
      ...allQuestions.map((item) => {
        return item.name;
      }),
    ];

    console.log("allQuestions :>> ", allQuestions);

    const demoData = [];

    const DEMO_ITEM_LIMIT = 10;

    for (let i = 0; i < DEMO_ITEM_LIMIT; i++) {
      // Loop through the headers to determine what we need to add
      const item = [];
      for (const header of headers) {
        if (header === "rid") {
          // First will be rid
          const rid = Math.floor(Math.random(100) * 500);
          item.push(rid); //Generate random string
        } else {
          // We're dealing with a dig_var
          const currentQuestion = allQuestions.find((item) => {
            if (item.name === header) {
              return item;
            }
            else{return 0;}
          });

          const options = currentQuestion.options;

          // TODO: Find the min option value
          let sortOptions = options.sort();
          let minValue = sortOptions[0].value;

          // TODO: Find the max option value
          let maxValue = sortOptions.length;

          // TODO: Generate a random whole number between min and max and assign to example variable
          const example = Math.floor(Math.random(minValue) * maxValue);

          item.push(example);
        }
      }
      demoData.push(item);
    }

    // For each header check for a matching question to get our min/max

    this.setState({ data: [headers, ...demoData] });
  };

  componentDidMount() {
    this.sampleData(this.props.sections);
    //this.props.handleReset();
  }
  //one loop to get first array. then push to bigger array. Loop through and add more examples. (have a for loop through 1 - 5 each time loop through dig vars and add the rid and the examples for each var)
  data1 = [];
  fileUpload = [];

  handleLoading = (loading) => {
    if (loading === true) {
      return (
        <div>
          <div className="ui active inverted dimmer">
            <div className="ui text loader">Loading</div>
          </div>
          <p></p>
        </div>
      );
    } else if (loading === false) {
      return (
        <div>
     
        </div>
      );
    }
  };

  handleAnswerDownload = (uploaded, loading, hasError) => {
    if (uploaded === true && loading === false && hasError === false) {
      return (
        <div className = 'download-batch-processed'>
          <p>Download this CSV file to see the batch scoring result</p>
          <CSVLink data={this.fileUpload} className = "downloadButton">
            <Button className = "download-file-button" variant="contained" color="primary">Download File</Button>
          </CSVLink>
        </div>
      );
    }
    return;
  };

  onFileUpload = async (data, fileInfo) => {
    const { sections } = this.props;
    // Check to see if first dataset keys are correct.

    let fileSchema = {
      rid: Joi.number().integer().greater(1).required(),

      // dig_var15: Joi.number().integer().greater(0).required(),
    };

    // Map through sections to generate our Joi Schema
    sections.forEach((section) => {
      section.questions.forEach((question) => {
        // add new key onto the fileSchema based on the question
        fileSchema[question.name] = question.validator;
      });
    });

   // const csvFileSchema = Joi.object(fileSchema).unknown(false).required();

    let isValid = true;
    let errorMessage = "";
    // for (var i = 0; i < data.length; i++) {
    //   // Check first row for matches
    //   const { error, value } = csvFileSchema.validate(data[i]);
    //   if (error) {
    //     console.error("someone messed something up");
    //     errorMessage = error;
    //     isValid = false;
    //   } else {
    //     // console.log("ALL GOOD");
    //   }
    // }

    if (isValid) {
      this.setState({ loading: true });
      // do the rest of this function
      const response = await segment.post("", data);
      const segmentResult = response.data;

      const segmentId = segmentResult["Segment"];
      const segmentName = segmentResult["Segment Names"];

      // data.push(...segmentId);
      for (var i = 0; i < data.length; i++) {
        let answers = (data[i]["answer"] = segmentId[i]);
        // console.log(data[i]);
        //add the rid to the new array object
        let finalObj = {};
        finalObj.rid = data[i]["rid"];
        finalObj.answer = segmentId[i];
        finalObj.segmentName = segmentName[answers];
        console.log(finalObj)
        this.fileUpload.push(finalObj);
        // data[i]["Segment Name"] = segmentName[answers - 1];
      }

      // this.fileUpload.push(...data);

      this.setState({ loading: false, uploaded: true, isValid, errorMessage });
    } else {
      console.error("invalid file");
      this.setState({ isValid, errorMessage });
      //console.log("Info", this.state.isValid, this.state.errorMessage);
      return;
    }
  };

  renderError = () => {
    //console.log("is Valid", this.state.isValid);
    if (this.state.isValid) return;
    return (
      <div class="ui negative message" id="error-message">
        <i class="close icon"></i>
        <div class="header">Invalid File Type</div>
        <p>
          Please make sure that all questions in the csv file are filled out and
          that you have the correct total questions in the survey in the csv
          file.
        </p>
      </div>
    );
  };

  render() {
    return (
      <div className = "page-view file-upload">
        <div id="header-wrapper">
        {logoName !== "" && (
          <div className = 'file-upload-logo'>
            <img width="160" src = {process.env.PUBLIC_URL + `/img/${logoName}`} alt = "Company Logo"/>
          </div>   
        )}

          <h1 id="title">Segment Classification Interface</h1>
        </div>
        <div
          className="ui raised very padded text container segment"
          id="app-container-file"
        >
          <h1>Batch Scoring</h1>
          <p>
            This page allows you to determine the segment of many respondents at
            once. To get started, download our sample file below and modify to
            fit your needs.
          </p>
          <div
            className="ui placeholder segment file-upload-section"
            id="place-holder"
          >
            <div className="ui icon header">
              <i className="pdf file outline icon"></i>
              Select a CSV file to upload
            </div>
            {this.renderError()}
            <CSVReader
              cssClass="csv-reader-input"
              onFileLoaded={this.onFileUpload}
              onError={this.handleUploadError}
              parserOptions={papaparseOptions}
            />
            {this.handleAnswerDownload(
              this.state.uploaded,
              this.state.loading,
              this.state.hasError
            )}
            {this.handleLoading(this.state.loading)}
          </div>
          <div>
            <h3>Sample file</h3>
            <CSVLink data={this.state.data} className="downloadButton">
              <Button className = "download-sample-button" variant="contained" color="primary">Download Sample </Button>
            </CSVLink>
          </div>
          <div className="ui divider"></div>
          <h3> Instructions for Use</h3>
          <p>
            Create a .csv file with all required variables as listed in the
            below table. Each row represents a respondent, and each column a
            variable. For a detailed variable overview, please see the{" "}
            <a
              className="link"
              target="_blank"
              href={documentationURL}
              rel="noopener noreferrer"
            >
              API documentation.
            </a>
          </p>
          <CelledTable
            sections={this.props.sections}
            options={this.props.options}
          ></CelledTable>
        </div>
      </div>
    );
  }
}
export default FileUpload;
