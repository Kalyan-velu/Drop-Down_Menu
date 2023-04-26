/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from 'react';
import CountrySelectState from './CountrySelectState';

function CustomSelect({ options, onChange }) {
   const [isOpen, setIsOpen] = useState(false);
   const [selectedOption, setSelectedOption] = useState(null);
   const [showSelectState, setShowSelectState] = useState(false)
   const [state, setState] = useState('')
   const optionsListRef = useRef(null);

   useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside);

      return () => {
         document.removeEventListener('mousedown', handleClickOutside);
      };
   }, [isOpen]);

   const handleClickOutside = (event) => {
      if (optionsListRef.current && !optionsListRef.current.contains(event.target)) {
         setIsOpen(false);
      }
   };

   const handleSelectOption = (option) => {
      setSelectedOption(option);
      setIsOpen(!isOpen);
      setShowSelectState(true)
   };

   function onChangeState(option) {
      console.log("Country Selected", option)
      setState(option)
      setShowSelectState(true)
      
      onChange({
         country: option,
         state
      })
   }


   return (
      <>
         <div className={`custom-select ${isOpen ? 'open' : ''}`}>
            <div className="select-trigger" onClick={() => setIsOpen(!isOpen)}>
               {selectedOption ? selectedOption : 'Select a country'}
            </div>
            {isOpen ? <ul className="options" ref={optionsListRef}>
               {options?.map((option) => (
                  <li key={option.name.common} className="option"
                     onClick={() => {
                        handleSelectOption(option.name.common)
                     }}>
                     {option.name.common}
                  </li>
               ))}
            </ul> : null}
         </div>

         {showSelectState ? <CountrySelectState options={options} onChange={onChangeState} /> : null}
      </>
   );
}

export default CustomSelect;
