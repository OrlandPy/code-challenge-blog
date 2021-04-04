import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
    Box,
    Button,
    SvgIcon,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import PostItemView from './PostItemView';
import InfiniteScroll from 'react-infinite-scroll-component';


import {
    Add as AddIcon,
  } from '@material-ui/icons';
import usePostLocalData from '../hooks/usePostLocalData';
import PostItemCrud from './PostItemCrud';

const useStyles = makeStyles((theme) => ({
    root: {
    },

    title: {
        fontSize: "3em"
    },

    addBtn: {
        marginRight: theme.spacing(2),
    },

}));

export function LocalPostData(item) {

    const _item = item != undefined && item !== null && typeof item === "object" ? item : {};
    const data = {
        id: Object.prototype.hasOwnProperty.call(_item, "id") ? _item.id : null,
        author: Object.prototype.hasOwnProperty.call(_item, "author") ? _item.author : "",
        intro: Object.prototype.hasOwnProperty.call(_item, "intro") ? _item.intro : "",
        title: Object.prototype.hasOwnProperty.call(_item, "title") ? _item.title : "",
        description: Object.prototype.hasOwnProperty.call(_item, "description") ? _item.description : "",
        imageData: Object.prototype.hasOwnProperty.call(_item, "imageData") ? _item.imageData : null,
        date: Object.prototype.hasOwnProperty.call(_item, "date") ? _item.date : null,
    }

    return data;
}

function LocalPosts({title}) {
    const classes = useStyles();
    const [posts, setPosts] = usePostLocalData();
    const [selectedPage, setSelectedPage] = useState(1);
    const [loadedPosts, setLoadedPosts] = useState([]);
    const [hasMoreData, setHasMoreData] = useState(false);


    const [openDialog, setOpenDialog] = useState(false);
    const [dialogTitle, setDialogTitle] = useState(false);
    const [selectedPost, setSelectedPost] = useState(LocalPostData(null));

    const handleClickAdd=()=>{
        setOpenDialog(true);
        setDialogTitle("New Post")
        
        setSelectedPost(LocalPostData());
    }

    const handleEdit=(idPost)=> {

        const _selectedPost = getLocalPostById(idPost);

        if (_selectedPost !== null) {
            setOpenDialog(true);
            setDialogTitle("Edit Post");
            
            setSelectedPost(LocalPostData(_selectedPost));
        }
    }

    const handleRemove=(idPost)=> {
        
        let _posts = Array.from(posts);
        // Each existing element except by the one with the same id
        _posts = _posts.map(x=> LocalPostData(x)).filter(x=> x.id !== idPost)
        
        setPosts(_posts);
    }

    const getLocalPostById=(idPost) => {
        let _posts = Array.from(posts);
        
        _posts = _posts.map(x=> LocalPostData(x)).filter(x=> x.id === idPost);

        if (_posts.length > 0) {
            return _posts[0];
        }

        return null;
    }

    const handleSubmitPost=(postData)=> {
        setOpenDialog(false);
        let _postData = LocalPostData(postData);
        _postData.id = _postData.id === null ? (new Date().getTime()) : _postData.id;

        let _posts = Array.from(posts);
        // Each existing element except by the one with the same id
        _posts = _posts.map(x=> LocalPostData(x)).filter(x=> x.id !== _postData.id)
        // Add the element (for insert / update)
        _posts.push(LocalPostData(_postData));

        setPosts(_posts);

    }

    const handleCloseDialog=()=>{
        setOpenDialog(false);
    }

    const loadPostsToShow = () => {
       let _selectedPost = Array.from(posts).map(x=> LocalPostData(x)).sort((a,b) => Number(b.id) - Number(a.id));

       _selectedPost = _selectedPost.slice(0, selectedPage * 20);

       setLoadedPosts(_selectedPost) // paged by 20

       return _selectedPost;
    }

    useEffect(()=> {
        loadPostsToShow();
    }, [posts, selectedPage]);

    useEffect(()=> {
        setHasMoreData(posts.length > loadedPosts.length);
    }, [loadedPosts])

    return (
        <Box>
            <Box>
                <Typography className={classes.title} variant="h1" >{title}</Typography>
            </Box>

            <Box mt={1} style={{textAlign: "left"}}>
                
                <Button color="secondary" variant="outlined" className={classes.addBtn} onClick={handleClickAdd}>
                    <SvgIcon
                        fontSize="small"
                        className={classes.actionIcon}
                    >
                        <AddIcon />
                    </SvgIcon>
                    {'New  Post'}
                </Button>
                
            </Box>
            <Box mt={2} style={{textAlign:"-webkit-center"}}>
                <InfiniteScroll
                    dataLength={loadedPosts.length}
                    next={()=> { setSelectedPage(selectedPage+1)}}
                    hasMore={hasMoreData}
                    loader={<h4>Loading...</h4>}
                >
                    {
                    loadedPosts.map((item, i) => {
                        const postData = LocalPostData(item);

                        return (
                            <PostItemView
                                id={postData.id}
                                key={"postLocalId"+i}
                                intro={postData.intro}
                                title={postData.title}
                                content={postData.description}
                                author={postData.author}
                                date={postData.date}
                                imageData={postData.imageData}
                                onEdit={handleEdit}
                                onRemove={handleRemove}
                                localPost={true}
                            />
                        )
                    })
                    }
                </InfiniteScroll>
            </Box>
        
        
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle id="form-dialog-title">{dialogTitle}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To submit a Post you must enter a Title, a description and import an image
                    </DialogContentText>
                    <PostItemCrud postData={selectedPost} handlePostSubmit={handleSubmitPost} handleCancel={handleCloseDialog} />
                </DialogContent>
                
            </Dialog>
        
        </Box>
    )
}

LocalPosts.propTypes = {
    title: PropTypes.string
}

LocalPosts.defaulProps = {
    title: "Local Post"
}

export default LocalPosts;