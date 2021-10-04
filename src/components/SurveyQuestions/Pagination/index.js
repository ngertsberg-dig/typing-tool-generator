import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import "./index.sass";
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default function ContainedButtons(props) {
  const classes = useStyles();

  return (
    <div className={classes.root + " bottom-pagination"}>
        <Button onClick = {props.backPage} variant="contained" color="primary" disabled = {props.page === 1 ? true : false}>
            BACK
        </Button>
        <Button onClick = {()=>props.nextPage(false)} variant="contained" color="primary" className = {props.page === props.maxPage ? "hide" : "button-active"}>
            NEXT
        </Button>
        <Button onClick = {()=>props.nextPage(true)} variant="contained" color="primary" className = {props.page === props.maxPage ? "button-active" : "hide"}>
            SUBMIT
        </Button>
    </div>
  );
}
