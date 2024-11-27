import Slider from "./Slider"
import SidebarItem from "./SidebarItem"
import React, { useRef, useState } from "react"

function App() {

  const DEFAULT_OPTIONS = [
    {
      name: "Brightness",
      property: "brightness",
      value: "100",
      range: {min: 0 , max: 200},
      unit: '%'
    },
    {
      name: "Contrast",
      property: "contrast",
      value: "100",
      range: {min: 0 , max: 200},
      unit: '%'
    },
    {
      name: "Saturation",
      property: "saturate",
      value: "100",
      range: {min: 0 , max: 200},
      unit: '%'
    },
    {
      name: "Hue",
      property: "hue-rotate",
      value: "0",
      range: {min: 0 , max: 360},
      unit: "deg"
    },
    {
      name: "Blur",
      property: "blur",
      value: "0",
      range: {min: 0 , max: 20},
      unit: "px"
    },
    {
      name: "Grayscale",
      property: "grayscale",
      value: "0",
      range: {min: 0 , max: 100},
      unit: "%"
    }
  ]

  const [options,setOptions] = useState(DEFAULT_OPTIONS)
  const [optionsIndex,setOptionsIndex] = useState(0)
  const selectedOption = options[optionsIndex]
  const [image,setImage] = useState(null)
  const [imageUrl,setImageUrl] = useState(null)

  const imageRef = useRef()

  function handleSliderChange({target}){
    setOptions(prevOptions=>{
      return prevOptions.map((option,index)=>{
        if(index != optionsIndex) return option
        return {...option,value: target.value}
      })
    })
  }

  function imageFilter(){
    const filters = options.map(option=>{
      return `${option.property}(${option.value}${option.unit})`
    })
    return {filter: filters.join(' ')}
  }

  function handleUpload(e){
    const file = e.target.files[0]
    if(file){
      setImage(URL.createObjectURL(file))
      setImageUrl(URL.createObjectURL(file))
    }
  }

  function handleDownload(){
    if(imageUrl){
      const link = document.createElement('a')
      link.href = imageUrl
      link.download = 'edited.png'
      link.click()
    }
  }

  return (
    <>
      <nav>
        <h1>Beautify</h1>
        <label className="upload-btn">
          Upload
          <input type="file" accept="image/*" onChange={handleUpload}/>
        </label>
        <button className="download-btn" onClick={handleDownload}>
          Download
        </button>
      </nav>
      <div className="container">
        {/* <div className="main-image" style={imageFilter()}/> */}
        <div className="main-image">
        <img src={image} ref={imageRef} style={imageFilter()} className="image" alt="Upload Image"/>
        </div>
        <div className="sidebar-container">
          {options.map((option,index)=>(
            <SidebarItem key={index} name={option.name} active={index == optionsIndex} handleClick={()=>setOptionsIndex(index)}/>
          ))}
        </div>
        <Slider
          max={selectedOption.range.max}
          min={selectedOption.range.min}
          value={selectedOption.value}
          handleChange={handleSliderChange}
        />
      </div>
    </>
  )
}

export default App
