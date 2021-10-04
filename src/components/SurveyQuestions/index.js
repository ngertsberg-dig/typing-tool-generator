import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import PaginationButtons from "./Pagination/";

import { logoName } from '../../surveySections.js';
import "./index.sass";
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function SimpleTable(props) {
  const classes = useStyles();
  const { surveySections } = props;
  return (
    <TableContainer component={Paper} className = "survey-question-table">
      <div className = 'top-description'>
        <div className = 'top'>
          {logoName !== "" && (
            <div className = 'logo'>
              <img width="160" src = {process.env.PUBLIC_URL + `/img/${logoName}`} alt = "Company Logo"/>
            </div>
          )}
          <div className = 'page-pagination'>
          </div>
        </div>

        <div className = 'bottom'>
          <div className = 'title'><h1>{surveySections.title}</h1></div>
          <div className = 'description'><p>{surveySections.description}</p></div>
        </div>
      </div>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            {surveySections.options.map((el,index)=>(
                <TableCell className = 'table-header-title' key = {index}>{el.label}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {surveySections.questions.map((question,index)=>(
            <TableRow className = {question.name} key = {index}>
                <TableCell align="center" className = 'table-question' dangerouslySetInnerHTML={{__html: question.title}}></TableCell>
                {surveySections.options.map((button,index)=>(
                    <TableCell className = 'table-input' key = {index}>
                        <input onClick={(e)=>props.recordAnswer(question.name,button.value,e)}value = {button.value} name = {question.name} type = 'radio'></input>
                    </TableCell>
                ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <PaginationButtons 
        page = {props.page} 
        maxPage = {props.maxPage} 
        nextPage = {props.nextPage}
        backPage = {props.backPage}
      />
    </TableContainer>
  );
}
