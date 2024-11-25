import Navbar from "./Navbar"
import Slider from "./Slider"
import SidebarItem from "./SidebarItem"
import { useState } from "react"

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

  return (
    <>
      <Navbar/>
      <div className="container">
        <div className="main-image" style={imageFilter()}/>
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
