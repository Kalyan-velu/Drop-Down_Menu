import { useState } from 'react'
import useCountry from './useCountry'
import CountrySelect from './component/CountrySelect'
import './App.css'

function App() {
  const { options } = useCountry()
  const[selected,setSelected]=useState(null)

  function onChange(option) {
    console.log("Country Selected", option)
    setSelected(option)
  }

  
  function handleSubmit(e){
    e.preventDefault( )
    alert('Country:'+selected.country+'State:'+ selected.state)
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
      {options?.length !== 0 ? <CountrySelect options={options} onChange={onChange} /> : "Loading"}
      
      <div className="button">
        <button type='submit'>Submit</button>
      </div>
      </form>
    </div>
  )
}

export default App
