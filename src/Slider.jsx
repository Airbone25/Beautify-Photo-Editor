
export default function Slider({max,min,value,handleChange}){
    return(
        <div className="slider-container">
            <input type="range" max={max} min={min} value={value} onChange={handleChange} style={{width: "80%"}}/>
        </div>
    )
}