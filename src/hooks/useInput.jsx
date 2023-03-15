import { useState } from "react";
import { FiSearch } from "react-icons/fi"

export default function useInput({ placeholder, className, containerClassName, icon = false }) {
  const [value, setValue] = useState("")

  function inputChange(event) {
    setValue(event.target.value)
  }

  const input =
    <div className={`grid ${containerClassName}`}>
      <input type="text" onChange={inputChange} className={`pl-3 grid-area-1 outline-none ${className}`} placeholder={placeholder} />
      {icon && <FiSearch className="grid-area-1 self-center ml-auto text-white mr-3" size="26" />}
    </div>

  return { input, value }
}