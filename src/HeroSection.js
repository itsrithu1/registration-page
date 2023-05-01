import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import './styles/hero_section.css'
//import Loader from './Loader';

//the backend url is stored in the .env file
const backEnd = process.env.REACT_APP_API_KEY


//the hero section is the main section of the page
function HeroSection() {
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [receivedImage, setReceivedImage] = useState(null);
  //loader is used to display a loading animation while the image is being uploaded
  const [loader, setLoader] = useState(false);
  console.log(uploadProgress);

  //handleDrop is a function that handles the drop of the image
  const handleDrop = (acceptedFiles) => {
    setFile(acceptedFiles[0]);
  };

  //handleUpload is a function that handles the upload of the image
  const handleUpload = () => {
    const formData = new FormData();
    formData.append('image', file);

    //the loader is set to true
    setLoader(true);
    //the fetch function is used to send the image to the backend
    fetch(`${backEnd}/unet`, {
      method: 'POST',
      body: formData,
      onUploadProgress: (progressEvent) => {
        setUploadProgress(Math.round((progressEvent.loaded / progressEvent.total) * 100));
      },
    })
      //the response is converted to a blob
      .then((res) => res.blob())
      //the blob is converted to a url
      .then((blob) => {
        console.log(blob);
        setReceivedImage(URL.createObjectURL(blob));
        //the loader is set to false
        setLoader(false);
      })
      //if there is an error, it is logged
      .catch((err) => console.log(err));
  };

  //the hero section is returned
  return (
    //the hero section is divided into two parts
    //the first part is the input section
    //the second part is the result section
    <React.Fragment>
      {/* {loader && <Loader />} */}
      <section className="hero">
        <div className='hero_section'>
          <div className='hero_text'>
            <h1>Brain MRI Progression</h1>
            <p>Get the progression in seconds</p>
          </div>
          <div className='hero_input'>
            <Dropzone onDrop={handleDrop}>
              {({ getRootProps, getInputProps }) => (
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <p>Drop an image here or click to select an image</p>
                </div>
              )}
            </Dropzone>
            {file && (
              <div>
                <p>{file.name}</p>
                <button onClick={handleUpload}>Upload</button>
              </div>
            )}
          </div>
        </div>
        {uploadProgress > 0 && <progress value={uploadProgress} max="100" />}
      </section>
      {/* the result section is only displayed if there is an image */}
      {!loader && receivedImage &&
        <div className="second_hero">
          <section className="hero">
            <h1>Original</h1>
            {/* the image is displayed */}
            {file && <img src={URL.createObjectURL(file)} alt="Original" />}
          </section>
          <section className="hero">
            <h1>Result</h1>
            {receivedImage && <img src={receivedImage} alt="Predicted" />}
          </section>
          </div>}
          
        </React.Fragment>
  );
}

      export default HeroSection;