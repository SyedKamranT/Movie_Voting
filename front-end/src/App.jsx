import { useState } from 'react'
import Login from './components/Login'
import Results from './components/Results'
import Voting from './components/Voting'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Login />
      <Results />
      <Voting/>
    </div>
  )
}

export default App
