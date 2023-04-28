import { useState } from 'react'
import useCountry from './useCountry'
import CountrySelect from './component/CountrySelect'
import { Country, State } from 'country-state-city'
import { Route, Routes, useNavigate } from 'react-router-dom'
import './App.css'

function App() {
  const navigate = useNavigate()
  const { options } = useCountry()
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [selectedState, setSelectedState] = useState(null)

  function onChange(option) {
    setSelectedCountry(option)
  }

  function onChangeState(option) {
    setSelectedState(option)
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (selectedCountry === null) {
      return alert('Please select country')
    }
    navigate('/result')
  }

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={
          <form onSubmit={handleSubmit}>
            {options?.length !== 0 ? <CountrySelect options={Country.getAllCountries()} onChange={onChange} /> : "Loading"}
            {selectedCountry?.name !=="" ? <CountrySelect options={State.getStatesOfCountry(selectedCountry?.isoCode)} onChange={onChangeState} /> : null}
            <div className="button">
              <button type='submit'>Submit</button>
            </div>
          </form>
        } />
        <Route path='/result' element={
          <>
            <div className="result">
              <h3>Selected</h3> 
              <strong>Country:</strong> {selectedCountry?.name}
              <br />
              {selectedState ? <><strong>State:</strong> {selectedState?.name}</>:`${selectedCountry?.name} have no states`}
            </div>
          </>} />
      </Routes>

    </div>
  )
}

export default App
