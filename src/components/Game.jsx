import { useEffect, useState } from 'react'

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

  const startGame = () => {
    setGameOver(false)
    generateMoles()
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
