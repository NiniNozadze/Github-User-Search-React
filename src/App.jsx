import { useState } from 'react'
import './App.css'
import Github from './Components/Github/Github'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Github />
    </>
  )
}

export default App
