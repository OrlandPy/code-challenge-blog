import React from 'react';import Typography from '@material-ui/core/Typography';
import TopMenuBar from '../components/TopMenuBar';

import {
    Switch,
    Redirect,
    BrowserRouter as Router,
    Route,
    Link as RouterLink 
  } from 'react-router-dom';
import { Box, Button } from '@material-ui/core';
import HomeView from './HomeView';

  
export default function MainPage() {
  
  return (
    <div>
        <Router>
            <TopMenuBar />
            <Switch>
                <Route path="/" exact component={HomeView}/>
                <Route path="/404" component={NotFound404} />
                <Redirect to="/404" />
            </Switch>
        </Router>
    </div>
    )
}

const NotFound404 = ()=> {
    return (
        <Box mt={6}>
            <Typography variant="h6"  color="primary">
                {"Page Not Found"}
            </Typography>
            <Box
                mt={6}
                display="flex"
                justifyContent="center"
                >
                <Button
                    color="secondary"
                    component={RouterLink}
                    to="/"
                    variant="outlined"
                >
                    Home
                </Button>
                </Box>
        </Box>
    )
}