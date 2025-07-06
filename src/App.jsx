import { useState } from 'react'
import './App.css'
import ImageGenerator from './Component/ImageGenerator/ImageGenerator'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ImageGenerator />
    </>
  )
}

export default App
