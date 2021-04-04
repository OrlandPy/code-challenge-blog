import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import PostItemView from './PostItemView';
import InfiniteScroll from 'react-infinite-scroll-component';

const useStyles = makeStyles(() => ({
    root: {
    },

    title: {
        fontSize: "3em"
    }
}));

function toRemotePostData(item) {

    const _item = item != undefined && item !== null && typeof item === "object" ? item : {};
    const data = {
        author: Object.prototype.hasOwnProperty.call(_item, "author") ? _item.author : null,
        title: Object.prototype.hasOwnProperty.call(_item, "title") ? _item.title : null,
        description: Object.prototype.hasOwnProperty.call(_item, "description") ? _item.description : null,
        url: Object.prototype.hasOwnProperty.call(_item, "url") ? _item.url : null,
        urlToImage: Object.prototype.hasOwnProperty.call(_item, "urlToImage") ? _item.urlToImage : null,
        publishedAt: Object.prototype.hasOwnProperty.call(_item, "publishedAt") ? _item.publishedAt : null,
        content: Object.prototype.hasOwnProperty.call(_item, "content") ? _item.content : null,
    }

    return data;
}

function RemotePosts({title}) {
    const classes = useStyles();
    const [posts, setPosts] = useState([]);
    const [totalResults, setTotalResults] = useState(null);
    const [selectedPage, setSelectedPage] = useState(1);
    const [hasMoreData, setHasMoreData] = useState(false);

    const loadPost = async () => {
        setHasMoreData(true);
        const data = await fetch('https://newsapi.org/v2/everything?' + 
                                 ['q=watches',
                                 //'from=2021-04-04',
                                 'sortBy=publishedAt',
                                 'pageSize=20',
                                 'page='+ selectedPage,
                                 'apiKey=fc3ec5204d8c40b3b4b5eaf88506876f',
                                 ].join("&")
                                 );
        
        const responseData = await data.json();

        const articlesArray = !Array.isArray(responseData.articles) ? [] :
                               Array.from(responseData.articles)
                              ;
        setTotalResults(responseData.totalResults);
        const _post = Array.from(posts).concat(articlesArray);
        
        setHasMoreData(responseData.totalResults > _post.length)
        

        setPosts(_post);
    }

    useEffect(()=> {
        loadPost();
    }, [])

    
    const handleSelectPage =()=> {
        setSelectedPage(selectedPage+1)
        loadPost();
    }

    return (
        <Box>
            <Box>
                <Typography className={classes.title} variant="h1" >{title}</Typography>
            </Box>
            <Box mt={2} style={{textAlign:"-webkit-center"}}>
                <InfiniteScroll
                    dataLength={posts.length}
                    next={()=> { handleSelectPage()}}
                    hasMore={hasMoreData}
                    loader={<h4>Loading...</h4>}
                >
                    {
                    posts.map((item, i) => {
                        const postData = toRemotePostData(item);

                        return (
                            <PostItemView 
                                key={"postRemoteId"+i}
                                //intro={(i+1)+""}
                                title={postData.title}
                                content={postData.description}
                                author={postData.author}
                                date={postData.publishedAt}
                                imageData={postData.urlToImage}
                                externalUrl={postData.url}
                            />
                        )
                    })
                    }
                </InfiniteScroll>
            </Box>
        </Box>
    )
}

RemotePosts.propTypes = {
    title: PropTypes.string.isRequired
}

RemotePosts.defaulProps = {
    title: "Latest Post"
}

export default RemotePosts;