import React, { useEffect } from "react"
import { useState } from "react"
const Box = ({index,setTurn,turn,setData,data,winner,winningBoxes}) => {
    
    const [hovered,setHovered] = useState(false)
    const handleHover = () => {
        setHovered(true)
    }
    const handleMouseLeave = () => {
        setHovered(false)
    }
    const toggle = () => {
        if (winner === null && data[index] == null)
        {
            const copyData = [...data]
            copyData[index] = turn
            setData(copyData)
            setTurn(preval => preval == 'X' ? 'O':'X')
        }
    }
    const isWinningBox = winningBoxes && winningBoxes.includes(index);
    return (
        <button className={`box ${isWinningBox ? 'winning-box':''}`} onClick={toggle} key={index} onMouseEnter={handleHover} onMouseLeave={handleMouseLeave}>
            {hovered && !data[index]&&<span className="hover-text">{turn}</span>}
            <h3>{data[index]}</h3>
        </button>
    )
}
export default Box;