import { useState, useEffect } from 'react'
import Countdown from './Countdown'

const Game = () => {
  const [gameOver, setGameOver] = useState(true)
  const [moles, setMoles] = useState([])
  const [score, setScore] = useState(0)
  const [moleTimeout, setMoleTimeout] = useState(null)

  const generateMoles = () => {
    const newMoles = []
    for (let i = 0; i < 9; i++) {
      newMoles.push({ id: i, active: false })
    }
    setMoles(newMoles)
  }

  const activateMole = () => {
    const moleIndex = Math.floor(Math.random() * 9)
    setMoles((prevMoles) => {
      const updatedMoles = [...prevMoles]
      updatedMoles[moleIndex].hit = false
      updatedMoles[moleIndex].active = true
      return updatedMoles
    })

    setMoleTimeout(
      setTimeout(() => {
        deactivateMole(moleIndex)
      }, Math.floor(Math.random() * 600 + 400))
    )
  }

  const deactivateMole = (index) => {
    setMoles((prevMoles) => {
      const updatedMoles = [...prevMoles]
      updatedMoles[index].active = false
      return updatedMoles
    })

    setMoleTimeout(
      setTimeout(() => {
        activateMole()
      }, Math.floor(Math.random() * 600 + 400))
    )
  }

  const startGame = () => {
    setScore(0)
    setMoles([])
    setGameOver(false)
    generateMoles()
    setMoleTimeout(
      setTimeout(() => {
        activateMole()
      }, Math.floor(Math.random() * 600 + 400))
    )
  }

  const handleMoleClick = (index) => {
    setMoles((prevMoles) => {
      const updatedMoles = [...prevMoles]
      updatedMoles[index].hit = true
      updatedMoles[index].active = false
      return updatedMoles
    })
    setScore(score + 1)
  }

  const endGame = () => {
    setGameOver(true)
  }

  useEffect(() => {
    return () => {
      clearTimeout(moleTimeout)
    }
  }, [moleTimeout])

  if (gameOver) {
    return (
      <>
        <h2>Score: {score}</h2>
        <button onClick={startGame}>Start</button>
      </>
    )
  }

  return (
    <>
      <h2>Score: {score}</h2>
      <Countdown endGame={endGame} gameOver={gameOver} />
      <div
        className='mole-container'
        style={{
          gridTemplateColumns: `repeat(3, 1fr)`,
          gridTemplateRows: `repeat(3, 1fr)`,
        }}
      >
        {moles.map((mole, index) => (
          <div key={mole.id} className={`mole ${mole.active ? 'active' : ''}`}>
            <div onClick={() => handleMoleClick(index)}>
              {mole.hit ? '💥' : '🐹'}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default Game
