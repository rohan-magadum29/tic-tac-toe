import React, { useEffect, useState } from 'react'
import './App.css'
import Box from './components/Box'
import { useWindowSize } from 'react-use'
import Confetti from 'react-confetti'
const App = () => {
  const { width, height } = useWindowSize()

  const [turn, setTurn] = useState("X")
  let isDraw = true;
  const winningCondition = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
  ]

  const [data, setData] = useState(Array(9).fill(null))
  const [winner, setWinner] = useState(null)
  const [winningBoxes,setwinningBoxes] = useState()
  const checkWin = () => {
    winningCondition.forEach((condition) => {
      let firstValue = data[condition[0]]
      let secondValue = data[condition[1]]
      let thirdValue = data[condition[2]]

      if (firstValue === secondValue && secondValue === thirdValue && thirdValue != null) {
        setWinner(firstValue)
        setwinningBoxes(condition)   
        isDraw = false;     
      }
    })
    if(isDraw && data.every((cell)=> cell !==null))
    {
      setWinner("None")
    }
  }
  const reset = () => {
    setData(Array(9).fill(null))
    setWinner(null)
    setTurn('X')
    setwinningBoxes([])
  }
  const renderBoxes = (index) => {
    return [index, index + 1, index + 2].map((val) => <Box key={val} index={val} setTurn={setTurn} turn={turn} setData={setData}
      data={data} winner={winner} winningBoxes={winningBoxes}/>)
  }
  useEffect(() => {
    checkWin()
  }, [data])
  return (
    <div className="container">
      {winner && winner !== 'None'?
      <Confetti  width={width} height={height} recycle ={false} numberOfPieces={500} /> : ''}
      <h4 className="title">Tic Tac Toe </h4>
      <span id='react-title'>React</span>
      <h3 id="turn-title">{winner ? `Winner - ${winner}` : ''}</h3>
      <div className="board">
        <div className="row">
          {renderBoxes(0)}
        </div>
        <div className="row">
          {renderBoxes(3)}
        </div>
        <div className="row">
          {renderBoxes(6)}
        </div>
      </div>
      <button id="reset" onClick={reset}>
        Reset
      </button>
    </div>

  )
}
export default App
