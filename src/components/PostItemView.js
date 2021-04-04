import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
    Box,
    Typography,  
    Grid,
    Container,
    Paper,
    Tooltip,
    IconButton,
    ListItemIcon,
    Menu,
    MenuItem
} from '@material-ui/core';

import {
    MoreVert as MoreVertIcon,
    Edit    as EditIcon,
    RemoveCircle as RemoveCircleIcon,
  } from '@material-ui/icons';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    root: {
      maxWidth: "800px",
      alignContent: 'center',
      height: '100%',
      padding: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'row',
      cursor: 'pointer',
      position: 'relative',
      marginTop: "15px"
    },

    postImage: {
        
        //maxWidth: "300px",
        width:"100%",
        //margin: "auto",
    },

    intro: {
        fontSize: "2em",
        fontFamily: 'Portrait Inline',
    },

    title: {
        fontSize: "2em",
        fontFamily: 'Portrait Text',
        fontWeight: 'bold',
    },
    
}));


  

function PostItem({id, intro, title, content, author, date, imageData, localPost, externalUrl,onEdit, onRemove}) {
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const optionMenuHEIGHT = 48;

    const menuOptions = () => [
        {
            id: 1,
            description: 'Edit Post',
            enabled: true,
            icon: <EditIcon className={classes.defaultIconStyle} style={{}} fontSize={"small"}/>,
            onClickOption: ()=>{
                onEdit(id);
                setAnchorEl(null);
            },
        },

        {
            id: 2,
            description: 'Delete Post',
            enabled: true,
            icon: <RemoveCircleIcon className={classes.defaultIconStyle} style={{}} fontSize={"small"}/>,
            onClickOption: ()=>{
                onRemove(id);
                setAnchorEl(null);
            },
        },
    ]

    const handleClick=()=>{

    }
    
    const handleClickExternal = () => {
        
        const link = document.createElement('a');
        
        link.href = externalUrl;
        link.target='_blank';
        // 3. Append to html page
        document.body.appendChild(link);
        // 4. Force download
        link.click();
        //5. Clean up and remove the link
        link.parentNode.removeChild(link);
    }

    const handleOptionsClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
      const handleOptionsClose = () => {
        setAnchorEl(null);
      };

    return (
        <Container
            maxWidth="lg"
        >
            <Paper className={classes.root} >
                <Box
                  display="flex"
                  flexDirection="column"
                  onClick={localPost ? handleClick : handleClickExternal}
                  style={{ width: '95%', }}
                >
                    <Grid
                    container
                    spacing={2}
                    //
                    >
                        <Grid item sm={12} xs={12} lg={6} md={6}>
                            <Box style={{textAlign: "left"}}>
                                {
                                 intro && (intro+"").trim() != "" &&
                                 <label className={classes.intro} style={{textAlign: "left"}}>
                                        { intro + "\u00A0"}
                                 </label>
                                }
                                <label className={classes.title} style={{textAlign: "left"}}>
                                    {title}
                                </label>
                            </Box>

                            <Typography variant="body2" color="textSecondary" component="p" style={{textAlign: "left"}}>
                                {content}
                            </Typography>
                            
                            <Box mt={3} style={{textAlign: "left"}}>
                                <Typography variant="caption" color="textSecondary" style={{textAlign: "left", display: 'inline-block'}}>
                                    {"By "}
                                </Typography>
                                <Typography variant="overline" color="textSecondary" style={{textAlign: "left",display: 'inline-block' }}>
                                    { " \u00A0 " + (author && (author+"").trim() != "" ? author : "Anonymous")}
                                </Typography>
                                {date && 
                                <Typography variant="overline" color="textSecondary" style={{textAlign: "left",display: 'inline-block' }}>
                                    { "\u00A0. " + date}
                                </Typography>
                                }
                            </Box>
                        </Grid>
                        
                        <Grid item sm={12} xs={12} lg={6} md={6}>
                            <img className={classes.postImage} src={imageData}></img>
                        </Grid>
                    </Grid>
                </Box>
                { localPost &&
                <Box
                 display="flex"
                 flexDirection="column"
                 style={{ width: '5%', position: "absolute", top: 12, right: 12 }}
                >
                    <Tooltip title="Options">
                        <IconButton
                            onClick={handleOptionsClick}
                        > 
                            <MoreVertIcon className={classes.defaultIconStyle} style={{}} fontSize={"small"} /> 
                        </IconButton>
                    </Tooltip>
                    <Menu
                        id="long-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={open}
                        onClose={(handleOptionsClose)}
                        PaperProps={{
                        style: {
                            maxHeight: optionMenuHEIGHT * 4.5,
                            //width: '20ch',
                        },}}
                    >
                        {
                            menuOptions().filter(x => x.enabled)
                            .map((option) => (
                                <MenuItem key={option.id} onClick={option.onClickOption}>
                                    <ListItemIcon>
                                        {option.icon}
                                    </ListItemIcon>
                                    <Typography variant="inherit" noWrap>{option.description}</Typography>
    
                                </MenuItem>
                            )) 
                        }


                    </Menu>
                </Box>
                }
            </Paper>
        </Container>
    )
}

PostItem.propTypes = {
    id: PropTypes.any,
    title: PropTypes.any.isRequired,
    content: PropTypes.any.isRequired,
    author: PropTypes.any.isRequired,
    date: PropTypes.any.isRequired,
    imageData: PropTypes.any.isRequired,
    localPost: PropTypes.bool,
    externalUrl: PropTypes.any,

    onEdit: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
};

PostItem.defaultProps = {
    localPost: false,
    onEdit: ()=>{},
    onRemove: ()=>{},
}

export default PostItem;
