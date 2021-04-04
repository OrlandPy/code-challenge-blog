import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { Button } from "@material-ui/core";
import ImageUploading from "react-images-uploading";

function ImageUpload({preLoadedImage, setImageData}) {

    const [images, setImages] = useState([]);
    
    const maxNumber = 69;
    const multipleImg=false;

    const onChange = (imageList, addUpdateIndex) => {
        console.log(addUpdateIndex)
        setImages(imageList);
    };

    useEffect(()=> {
        if (preLoadedImage && preLoadedImage != null && preLoadedImage != undefined) {
            const imgData = {
                data_url: preLoadedImage,
                file:null,
            }

            let _images = [];

            _images.push(imgData)

            setImages(_images);
        }
    }, [preLoadedImage])

    useEffect(()=> {
        if (Array.isArray(images) && images.length > 0) {
            setImageData(images[0].data_url);
        } else {
            setImageData(null);
        }
    }, [images])
 
    return (
    <ImageUploading  
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
        multiple={multipleImg}
    >
        {({
        imageList,
        onImageUpload,
        onImageRemoveAll,
        onImageUpdate,
        onImageRemove,
        isDragging,
        dragProps
        }) => (
        // write your building UI
        <div className="upload__image-wrapper">
           

            <Button
                color="primary"
                variant="outlined"
                style={isDragging ? { color: "red" } : null}
                onClick={onImageUpload}
                {...dragProps}
            >
                {'Click or Drop here'}
            </Button>


            &nbsp;
            {multipleImg && <button onClick={onImageRemoveAll}>Remove all images</button>}
            {imageList.map((image, index) => (
            <div key={index} className="image-item">
                <img src={image.data_url} alt="" width="500" />
                <div className="image-item__btn-wrapper">
                 {multipleImg && <button onClick={() => onImageUpdate(index)}>Update</button>}
                <button onClick={() => onImageRemove(index)}>Remove</button>
                </div>
            </div>
            ))}
        </div>
        )}
    </ImageUploading>
    )
}

ImageUpload.propTypes = {
    setImageData: PropTypes.func.isRequired
}

ImageUpload.defaultProps = {
    setImageData: ()=> {}
}

export default ImageUpload;