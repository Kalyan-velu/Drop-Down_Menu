/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from 'react';


function CustomSelectState({ options, onChange }) {
   const [isOpen, setIsOpen] = useState(false);
   const [selectedOption, setSelectedOption] = useState(null);
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
      onChange(option);
      console.log(option)
      setIsOpen(!isOpen);
   };

   return (
      <div className={`custom-select ${isOpen ? 'open' : ''}`}>
         <div className="select-trigger" onClick={() => setIsOpen(!isOpen)}>
            {selectedOption ? selectedOption : 'Select a State'}
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
   );
}

export default CustomSelectState;
