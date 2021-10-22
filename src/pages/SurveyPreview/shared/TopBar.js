import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Link } from "react-router-dom";
import './index.sass';
import { withRouter } from "react-router-dom";
import { documentationURL } from '../../../surveySections';
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

const SimpleTabs = (props) =>{
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const aboutDig = () =>{
    document.querySelector(".Mui-selected").click();
    window.open(documentationURL,'_blank');
  }
  console.log(process.env.PUBLIC_URL)
  return (
    <div className={classes.root}>
      <AppBar position="static" className='survey-headerbar'>
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
            <Tab value = {0} label="Survey" {...a11yProps(0)} to="/" component={Link} />
            <Tab  label="File Upload" {...a11yProps(1)} to="/fileupload" component={Link}/>
            <Tab  label="About Dig Insights" {...a11yProps(2)} onClick = {aboutDig} />
        </Tabs>
      </AppBar>
      {/* <TabPanel value={value} index={0}>
        Item One
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel> */}
    </div>
  );
}

export default withRouter(SimpleTabs);