import { Box, Typography } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    hero: {
        backgroundImage: `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.1)), url("https://images.pexels.com/photos/3243090/pexels-photo-3243090.jpeg")`,
        height:"300px",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        position:"relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "#fff"
    },

    title: {
        textShadow: "1px 1px 12px black", //42a5eb
        fontFamily: "Portrait",
    }
}));

function Hero() {
    const classes = useStyles();

    return (
        <Box className={classes.hero}>
            <Typography variant="h1" className={classes.title}>
                {"Orlando's Blog"}
            </Typography>
        </Box>
    )
}

export default Hero;