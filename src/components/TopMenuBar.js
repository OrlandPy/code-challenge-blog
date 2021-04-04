import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Box, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: "#fff",
  },

  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    //flexGrow: 1,
    fontFamily: "PT Serif",
  },

}));

export default function TopMenuBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar style={{justifyContent: "space-between"}}>
          
            {/*
            <IconButton edge="start" className={classes.menuButton} color="primary" aria-label="menu">
              <MenuIcon />
            </IconButton>
            */}
            <Typography variant="h3" className={classes.title} color="primary">
              {"Orlando's Blog"}
            </Typography>
            <Box>
              
            </Box>
            <Box>
              <Button color="secondary" variant="outlined" className={classes.menuButton}>Login</Button>
              <Button color="secondary" variant="outlined" className={classes.menuButton}>Sing up</Button>
            </Box>
          
        </Toolbar>
      </AppBar>
    </div>
  );
}