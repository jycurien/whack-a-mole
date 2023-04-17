import { useState } from 'react'

const Game = () => {
  const [gameOver, setGameOver] = useState(true)
  const [moles, setMoles] = useState([])

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
      updatedMoles[moleIndex].active = true
      return updatedMoles
    })

    setTimeout(() => {
      deactivateMole(moleIndex)
    }, Math.floor(Math.random() * 600 + 400))
  }

  const deactivateMole = (index) => {
    setMoles((prevMoles) => {
      const updatedMoles = [...prevMoles]
      updatedMoles[index].active = false
      return updatedMoles
    })

    setTimeout(() => {
      activateMole()
    }, Math.floor(Math.random() * 600 + 400))
  }

  const startGame = () => {
    setGameOver(false)
    generateMoles()
    setTimeout(() => {
      activateMole()
    }, Math.floor(Math.random() * 600 + 400))
  }

  if (gameOver) {
    return <button onClick={startGame}>Start</button>
  }

  return (
    <div
      className='mole-container'
      style={{
        gridTemplateColumns: `repeat(3, 1fr)`,
        gridTemplateRows: `repeat(3, 1fr)`,
      }}
    >
      {moles.map((mole, index) => (
        <div key={mole.id} className={`mole ${mole.active ? 'active' : ''}`}>
          <div>🐹</div>
        </div>
      ))}
    </div>
  )
}

export default Game
