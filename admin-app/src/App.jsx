import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import GridLayout from './component/GridLayout'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <GridLayout/>
    </div>
  )
}

export default App
