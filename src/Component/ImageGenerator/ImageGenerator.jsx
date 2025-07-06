import React, { useRef, useState } from 'react';
import './ImageGenerator.css';
import default_image from '../Assets/default_image.png';

const ImageGenerator = () => {
  const [image_url, setImage_url] = useState('/');
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);

  const generateImage = async () => {
    if (inputRef.current.value === "") {
      alert("Please enter a prompt");
      return;
    }

    setIsLoading(true);
    setImage_url('/');

    try {
      const response = await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer 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`,
          'User-Agent': 'Chrome',
        },
        body: JSON.stringify({
          prompt: inputRef.current.value,
          n: 1,
          size: "512x512",
        }),
      });

      const data = await response.json();
      console.log(data);

      if (data?.data && data.data[0]?.url) {
        setImage_url(data.data[0].url);
      } else {
        alert("Image generation failed");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="ai-image-generator">
        <div className="header">AI Image Generator</div>
        <div className="img-loading">
          <div className="image">
            <img src={image_url === "/" ? default_image : image_url} alt="Generated" />
          </div>

          <div className="search-box">
            <input
              type="text"
              placeholder="Enter a prompt"
              className="search-input"
              ref={inputRef}
            />
            <button className="generate-btn" onClick={generateImage}>
              Generate
            </button>
          </div>

          {isLoading && (
            <>
              <div className="loading-wrapper">
                <div className="loading-bar" style={{ width: '100%' }}></div>
              </div>
              <div className="loading-text">Generating image, please wait...</div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ImageGenerator;
