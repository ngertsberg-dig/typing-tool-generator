import React, { Component } from "react";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

class CelledTable extends Component {
  renderColumns = (sections, options) => {
    // First flatten all our questions into one array
    let sectionQuestions = sections.map((section) => {
      return section.questions.map((question) => {
        //returns a object for the return statement section
        return {
          ...question,
          options: section.options,
        };
      });
    });
    
    const allQuestions = sectionQuestions.flat();

    // Now render each question's content
    return allQuestions.map((question, index) => {
      return (
        <TableRow key={index}>
          <TableCell component="th" scope="row">{question.name}</TableCell>
          <TableCell style={{borderLeft:"1px solid rgba(224, 224, 224, 1)",borderRight:"1px solid rgba(224, 224, 224, 1)"}} align="left">{question.title}</TableCell>
          <TableCell align="left">
          {question.options.map((option,optionIndex) => {
              return (
                <div key={optionIndex}>
                  {`${option.value} - ${option.label}`} <br />
                </div>
              );
            })}
            </TableCell>
        </TableRow>
      );
    });
  };

  handleDisplayQuestions = (sections) => {
    return (
      <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Column Name</TableCell>
            <TableCell align="center">Description</TableCell>
            <TableCell align="center">Possible Values</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.renderColumns(this.props.sections, this.props.sections.options)}

        </TableBody>
      </Table>
    </TableContainer>
    );
  };
  render() {
   // console.log(this.props.sections);
    return <div>{this.handleDisplayQuestions(this.props.sections)}</div>;
  }
}

export default CelledTable;
