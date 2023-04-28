/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from 'react';


function CustomSelect({ options, onChange }) {
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
      if(option.length<=0){
         setSelectedOption("Nothing to Select from")
      }
      setSelectedOption(option.name);
      setIsOpen(!isOpen);
      onChange(option)
   };

   return (
      <>
         <div tabIndex={"0"} role='listbox' aria-haspopup="listbox" aria-expanded={isOpen} className={`custom-select ${isOpen ? 'open' : ''}`}>
            <div role='button' tabIndex={"1"} aria-haspopup="listbox" aria-expanded={isOpen} className="select-trigger" onClick={() => setIsOpen(!isOpen)}>
               {selectedOption ? selectedOption : 'Select a option'}
            </div>
            {isOpen ?
               <ul tabIndex={"2"} role='list' className="options" ref={optionsListRef}>
                  {options?.length > 0 ? options?.map((option, index) => (
                     <li tabIndex={index + 3} key={option?.name || index} aria-selected={selectedOption === option?.name} className="option"
                        onClick={() => {
                           handleSelectOption(option)
                        }}>
                        {option?.name || option}
                     </li>
                  )) : <li onClick={()=>handleSelectOption(options)} className='option'>No options</li>}
               </ul> : null}
         </div>
      </>
   );
}

export default CustomSelect;
