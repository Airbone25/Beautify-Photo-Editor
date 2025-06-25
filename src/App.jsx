import Slider from "./Slider";
import SidebarItem from "./SidebarItem";
import React, { useRef, useState } from "react";

function App() {
  const DEFAULT_OPTIONS = [
    {
      name: "Brightness",
      property: "brightness",
      value: "100",
      range: { min: 0, max: 200 },
      unit: "%",
    },
    {
      name: "Contrast",
      property: "contrast",
      value: "100",
      range: { min: 0, max: 200 },
      unit: "%",
    },
    {
      name: "Saturation",
      property: "saturate",
      value: "100",
      range: { min: 0, max: 200 },
      unit: "%",
    },
    {
      name: "Hue",
      property: "hue-rotate",
      value: "0",
      range: { min: 0, max: 360 },
      unit: "deg",
    },
    {
      name: "Blur",
      property: "blur",
      value: "0",
      range: { min: 0, max: 20 },
      unit: "px",
    },
    {
      name: "Grayscale",
      property: "grayscale",
      value: "0",
      range: { min: 0, max: 100 },
      unit: "%",
    },
  ];

  const [options, setOptions] = useState(DEFAULT_OPTIONS);
  const [optionsIndex, setOptionsIndex] = useState(0);
  const selectedOption = options[optionsIndex];
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const imageRef = useRef();

  function handleSliderChange({ target }) {
    setOptions((prevOptions) => {
      return prevOptions.map((option, index) => {
        if (index != optionsIndex) return option;
        return { ...option, value: target.value };
      });
    });
  }

  function imageFilter() {
    const filters = options.map((option) => {
      return `${option.property}(${option.value}${option.unit})`;
    });
    return { filter: filters.join(" ") };
  }

  function handleUpload(e) {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setImageUrl(URL.createObjectURL(file));
    }
  }

  function applyPreset(presetName) {
    const newOptions = [...options];

    switch (presetName) {
      case "Vintage":
        newOptions[0].value = "120"; // brightness
        newOptions[1].value = "90"; // contrast
        newOptions[2].value = "70"; // saturation
        newOptions[3].value = "30"; // hue
        newOptions[4].value = "1"; // blur
        newOptions[5].value = "0"; // grayscale
        break;
      case "Cool":
        newOptions[0].value = "110";
        newOptions[1].value = "110";
        newOptions[2].value = "100";
        newOptions[3].value = "180";
        newOptions[4].value = "0";
        newOptions[5].value = "0";
        break;
      case "Warm":
        newOptions[0].value = "130";
        newOptions[1].value = "100";
        newOptions[2].value = "140";
        newOptions[3].value = "20";
        newOptions[4].value = "0";
        newOptions[5].value = "0";
        break;
      case "Mono":
        newOptions[0].value = "100";
        newOptions[1].value = "100";
        newOptions[2].value = "0";
        newOptions[3].value = "0";
        newOptions[4].value = "0";
        newOptions[5].value = "100";
        break;
    }

    setOptions(newOptions);
  }

  function handleDownload() {
    if (!imageRef.current) {
      alert("No Image Uploaded");
      return;
    }

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = imageRef.current;

    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const filters = options
      .map((option) => `${option.property}(${option.value}${option.unit})`)
      .join(" ");
    ctx.filter = filters;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    canvas.toBlob((blob) => {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "edited.png";
      link.click();
    }, "image/png");
  }

  return (
    <div style={{ overflowY: 'auto', maxHeight: '100vh' }}>
      <nav>
        <h1 style={{ letterSpacing: "2px" }}>Beautify</h1>
        <div style={{ marginRight: "10px" }} className="btns">
          <label className="upload-btn">
            Upload
            <input type="file" accept="image/*" onChange={handleUpload} />
          </label>
          <button className="download-btn" onClick={handleDownload}>
            Download
          </button>
        </div>
      </nav>
      <div className="container">
        <div className="main-image">
          {image ? (
            <img
              src={image}
              ref={imageRef}
              style={imageFilter()}
              className="image"
              alt="Upload Image"
            />
          ) : (
            <h1>Upload Your image</h1>
          )}
        </div>
        <div className="preset-buttons">
            <button onClick={() => applyPreset("Vintage")}>Vintage</button>
            <button onClick={() => applyPreset("Cool")}>Cool</button>
            <button onClick={() => applyPreset("Warm")}>Warm</button>
            <button onClick={() => applyPreset("Mono")}>Mono</button>
          </div>
        <div className="sidebar-container">
          {options.map((option, index) => (
            <SidebarItem
              key={index}
              name={option.name}
              active={index == optionsIndex}
              handleClick={() => setOptionsIndex(index)}
            />
          ))}
        </div>
        <Slider
          max={selectedOption.range.max}
          min={selectedOption.range.min}
          value={selectedOption.value}
          handleChange={handleSliderChange}
        />
      </div>
    </div>
  );
}

export default App;
