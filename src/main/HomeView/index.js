import { Box } from '@material-ui/core';
import React from 'react';
import Hero from './Hero';
import PostView from './PostView';

function HomeView() {
    return (
        <Box>
            <Hero />
            <PostView />
        </Box>
    )
}

export default HomeView;