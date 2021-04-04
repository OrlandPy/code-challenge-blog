import { createMuiTheme } from '@material-ui/core/styles';

import {grey,} from '@material-ui/core/colors';

const theme = createMuiTheme({
    palette: {
        primary: {
            //main: blue[400], //purple[200],//"#ffff", //e3e3e3
            main : "#000000",
        },
        secondary: {
            main: grey[500],
        },

        backgroud: {
            default: "#fff"
        }
    },
    typography: {
        /*
        fontFamily: [
            'PT Serif',
            'serif'
        ].join(','),*/

        h1: {
            fontFamily: 'Portrait Inline',
        },

        h2: {
            fontFamily: 'Portrait',
        },

        h3: {
            fontFamily: 'Portrait',
        },

        h4: {
            fontFamily: 'Portrait',
            fontWeight: "bold"
        },

        h5: {
            fontFamily: 'Portrait Text',
            fontWeight: "bold",
            fontSize: "2em"
        },

        h6: {
            fontFamily: 'Portrait',
        },

        body1: {
            fontFamily: 'Portrait Text',
        },

        body2: {
            fontFamily: 'Portrait Text',
        },

        caption: {
            fontFamily: 'Portrait Text',
            fontWeight: 'bold',
            fontStyle: 'italic'
        },

        overline: {
            fontFamily: 'Brown',
            fontWeight: 400,
        },

    }
})

export default theme;