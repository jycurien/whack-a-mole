import { useState, useEffect } from 'react'

const Game = () => {
  const [score, setScore] = useState(0)
  const [columns, setColumns] = useState(4)
  const [rows, setRows] = useState(4)
  const [moles, setMoles] = useState([])
  const [gameOver, setGameOver] = useState(true)
  const [moleTimeout, setMoleTimeout] = useState(null)
  const [countdown, setCountdown] = useState(null)

  const startGame = () => {
    setScore(0)
    setMoles([])
    setGameOver(false)
    generateMoles()
    clearTimeout(moleTimeout)
    setMoleTimeout(
      setTimeout(() => {
        activateMole()
      }, Math.floor(Math.random() * 600 + 400))
    )
    setCountdown(30)
  }

  const generateMoles = () => {
    const newMoles = []
    for (let i = 0; i < columns * rows; i++) {
      newMoles.push({ id: i, active: false })
    }
    setMoles(newMoles)
  }

  const activateMole = () => {
    const moleIndex = Math.floor(Math.random() * columns * rows)
    setMoles((prevMoles) => {
      const updatedMoles = [...prevMoles]
      updatedMoles[moleIndex].hit = false
      updatedMoles[moleIndex].active = true
      return updatedMoles
    })
    clearTimeout(moleTimeout)
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
    clearTimeout(moleTimeout)
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
      return updatedMoles
    })
    setScore(score + 1)
    deactivateMole(index)
  }

  const endGame = () => {
    clearTimeout(moleTimeout)
    setGameOver(true)
  }

  useEffect(() => {
    let timeout = null
    if (countdown && !gameOver) {
      timeout = setTimeout(() => {
        setCountdown(countdown - 1)
      }, 1000)
    }

    if (countdown === 0) {
      endGame()
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout)
      }
    }
  }, [countdown])

  return (
    <main>
      <h2>Score: {score}</h2>
      {gameOver ? (
        <div>
          <div>
            <label htmlFor='columns'>Number of columns:</label>
            <input
              id='columns'
              type='number'
              min={3}
              max={8}
              value={columns}
              onChange={(e) =>
                setColumns(Math.min(8, Math.max(3, e.target.value)))
              }
            />
          </div>
          <div>
            <label htmlFor='rows'>Number of rows:</label>
            <input
              id='rows'
              type='number'
              min={3}
              max={6}
              value={rows}
              onChange={(e) =>
                setRows(Math.min(6, Math.max(3, e.target.value)))
              }
            />
          </div>
          <button onClick={startGame}>Start</button>
        </div>
      ) : (
        <>
          <div className='countdown'>
            <span>{countdown > 0 ? '⏳' : '⌛'}</span>
            {countdown}
          </div>
          <div
            className='mole-container'
            style={{
              gridTemplateColumns: `repeat(${columns}, 80px)`,
              gridTemplateRows: `repeat(${rows}, 80px)`,
            }}
          >
            {moles.map((mole, index) => (
              <div
                key={mole.id}
                className={`mole ${mole.active ? 'active' : ''}`}
              >
                <div onClick={() => handleMoleClick(index)}>
                  {mole.hit ? '💥' : '🐹'}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </main>
  )
}

export default Game
