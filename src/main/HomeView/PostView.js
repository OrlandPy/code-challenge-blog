import React from 'react';
import PropTypes from 'prop-types';
import { Box, Container, Tab, Tabs, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import RemotePosts from '../../components/RemotePosts';
import LocalPosts from '../../components/LocalPosts';

const useStyles = makeStyles(() => ({
}));

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
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


function PostView() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    return (
        <Container>
            <Box mt={2} className={classes.hero}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                >
                    <Tab label="Local Post" />
                    <Tab label="Sponsored Posts"  />
                </Tabs>

                <SwipeableViews
                    index={value}
                    onChangeIndex={handleChangeIndex}
                >
                    <TabPanel value={value} index={0}>
                        <LocalPosts title={"Local Posts"}/>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <RemotePosts title={"Watches's Latest Posts"}/>
                    </TabPanel>
                </SwipeableViews>
            </Box>
        </Container>

    )
}

export default PostView;