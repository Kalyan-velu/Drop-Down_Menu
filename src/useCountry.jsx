import axios from 'axios';
import { useEffect, useState } from 'react';

const useCountry = () => {
   const [options, setOptions] = useState([])
   useEffect(() => {
      async function getCountry() {
         const { data } = await axios.get('https://restcountries.com/v3.1/all')
         setOptions(data)
         return data
      }

      getCountry().catch(err => console.log(err))
   }, [])
   return {options}
}

export default useCountry