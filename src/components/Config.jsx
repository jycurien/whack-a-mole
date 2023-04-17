const Config = ({ handleImageChange, columns, setColumns, rows, setRows }) => {
  return (
    <div>
      <div>
        <label htmlFor='image'>
          Use your custom image{' '}
          <small>(works better with a square image)</small>:
        </label>
        <br />
        <input id='image' type='file' onChange={handleImageChange} />
      </div>
      <div>
        <label htmlFor='columns'>Number of columns:</label>
        <input
          id='columns'
          type='number'
          min={3}
          max={6}
          value={columns}
          onChange={(e) => setColumns(Math.min(6, Math.max(3, e.target.value)))}
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
          onChange={(e) => setRows(Math.min(6, Math.max(3, e.target.value)))}
        />
      </div>
    </div>
  )
}

export default Config
