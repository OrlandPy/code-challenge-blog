import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
    TextField,
    makeStyles,
    Card,
    Box,
    Typography,
    Button
} from "@material-ui/core";
import * as Yup from 'yup';
import { Formik } from 'formik';
import ImageUpload from './ImageUpload';
import {LocalPostData} from './LocalPosts'

const useStyles = makeStyles(() => ({
    textField: {
        //padding: "12px 12px;"
      }
    })
);

function PostItemCrud({postData, handlePostSubmit, handleCancel}){
    const classes = useStyles();

    const _postData = LocalPostData(postData);

    const [imageData, setImageData] = useState(_postData.imageData);

    const [msgErrorImg, setMsgErrorImg] = useState({showMessage: false, message: ""})

    useEffect(() => {
        if (imageData !== null ) {
            setMsgErrorImg({showMessage: false, message: ""})
        }
    }, [imageData])
  
    return (
        <Formik
          enableReinitialize
          initialValues={{
            postIntro: _postData.intro,
            postTitle: _postData.title,
            postContent: _postData.description,
            postAuthor: _postData.author,
          }}
          validationSchema={Yup.object().shape({
            postIntro: Yup.string().max(50, 'Intro must be at Most 50 characters'),
            postTitle: Yup.string().min(5).max(50).required('Title is required'),
            postContent: Yup.string().min(20).required('Content is required'),
            postAuthor: Yup.string().max(50, 'Author must be at Most 50 characters'),
          })}
          onSubmit={async (values, //{ resetForm, setErrors, setStatus,setSubmitting}
            ) => {
              if (imageData === null ) {
                setMsgErrorImg({showMessage: true, message: "You must import an image"})
                return;
              }

              let inputPost = LocalPostData(postData);
              inputPost.intro = values.postIntro;
              inputPost.title = values.postTitle;
              inputPost.description = values.postContent;
              inputPost.author = values.postAuthor;
              inputPost.date = new Date().toISOString();
              inputPost.imageData = imageData;

              console.log(inputPost)

              handlePostSubmit(inputPost);

          }}
        >
          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting,
            touched,
            values
          }) => (
              <form onSubmit={handleSubmit}>
                
               <Box>

               <Box mt={3} />

                <TextField
                    error={Boolean(touched.postIntro && errors.postIntro)}
                    fullWidth
                    helperText={touched.postIntro && errors.postIntro}
                    label="Intro"
                    name="postIntro"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="string"
                    value={values.postIntro}
                    InputProps={{
                        inputProps: {
                            className: classes.textField,
                            //maxLength: "50"
                        }
                    }}
                />
                <Box mt={3} />

                <TextField
                    error={Boolean(touched.postTitle && errors.postTitle)}
                    fullWidth
                    helperText={touched.postTitle && errors.postTitle}
                    label="Title"
                    name="postTitle"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="string"
                    value={values.postTitle}
                    InputProps={{
                        inputProps: {
                            className: classes.textField,
                            maxLength: "50"
                        }
                    }}
                />

                <Box mt={3} />

                <TextField
                    error={Boolean(touched.postContent && errors.postContent)}
                    fullWidth
                    helperText={touched.postContent && errors.postContent}
                    label="Description"
                    name="postContent"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="string"
                    value={values.postContent}
                    InputProps={{
                        inputProps: {
                            className: classes.textField,
                        }
                    }}
                />

                <Box mt={3} />

                <TextField
                    error={Boolean(touched.postAuthor && errors.postAuthor)}
                    fullWidth
                    helperText={touched.postAuthor && errors.postAuthor}
                    label="Author"
                    name="postAuthor"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="string"
                    value={values.postAuthor}
                    InputProps={{
                        inputProps: {
                            className: classes.textField,
                            maxLength: "50"
                        }
                    }}
                />

                <Box pt={4}>
                    <Card>
                        <ImageUpload preLoadedImage={imageData} setImageData={setImageData}/>
                    </Card>
                </Box>
                     

                {msgErrorImg.showMessage && (
                    <Box mt={3}>
                        <Typography color={'error'}>
                            {msgErrorImg.message}
                        </Typography>
                    </Box>
                )}
                  
                {
                <Box
                    mt={2}
                    p={2}
                    display="flex"
                    style={{justifyContent: "space-evenly"}}
                >
                    <Button
                        color="primary"
                        disabled={isSubmitting}
                        type="submit"
                        variant="contained"
                    >
                        {'Submit'}
                    </Button>
                    <Button
                        color="secondary"
                        variant="contained"

                        onClick={handleCancel}
                    >
                        {'Cancel'}
                    </Button>
                </Box>



                }
                
              </Box>
              </form>
            )}
        </Formik>
    );
  }

  PostItemCrud.propTypes = {
    handleCancel: PropTypes.func.isRequired,
    handlePostSubmit: PropTypes.func.isRequired,
  }

  PostItemCrud.defaultProps = {
    handleCancel: ()=> {},
    handlePostSubmit: ()=> {},
  }


  export default PostItemCrud;