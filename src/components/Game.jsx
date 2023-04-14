import { useState, useEffect } from 'react'
import Countdown from './Countdown'

const Game = () => {
  const [score, setScore] = useState(0)
  const [columns, setColumns] = useState(4)
  const [rows, setRows] = useState(4)
  const [moles, setMoles] = useState([])
  const [gameOver, setGameOver] = useState(true)
  const [moleTimeout, setMoleTimeout] = useState(null)
  const [fileDataURL, setFileDataURL] = useState(null)

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
    setGameOver(true)
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const fileReader = new FileReader()
      fileReader.onload = (e) => {
        const { result } = e.target
        if (result) {
          setFileDataURL(result)
        }
      }
      fileReader.readAsDataURL(file)
    }
  }

  useEffect(() => {
    return () => {
      clearTimeout(moleTimeout)
    }
  }, [moles, gameOver])

  return (
    <main>
      <h2>Score: {score}</h2>
      {gameOver ? (
        <div>
          <div>
            <label htmlFor='image'>
              Use your custom image (works better with a square image)
            </label>
            <br />
            <input
              id='image'
              type='file'
              onChange={handleImageChange}
              placeholder=''
            />
          </div>
          <div>
            <label htmlFor='columns'>Number of columns:</label>
            <input
              id='columns'
              type='number'
              min={3}
              max={6}
              value={columns}
              onChange={(e) =>
                setColumns(Math.min(6, Math.max(3, e.target.value)))
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
          <Countdown endGame={endGame} gameOver={gameOver} />
          <div
            className='mole-container'
            style={{
              gridTemplateColumns: `repeat(${columns}, 1fr)`,
              gridTemplateRows: `repeat(${rows}, 1fr)`,
            }}
          >
            {moles.map((mole, index) => (
              <div
                key={mole.id}
                className={`mole ${mole.active ? 'active' : ''}`}
              >
                <div onClick={() => handleMoleClick(index)}>
                  {mole.hit ? (
                    '💥'
                  ) : fileDataURL ? (
                    <img src={fileDataURL} />
                  ) : (
                    '🐹'
                  )}
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
