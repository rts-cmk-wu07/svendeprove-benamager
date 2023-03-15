import { useState } from "react";

export default function useCheckboxInput({ label, containerClassName, defaultChecked = false }) {
  const [isChecked, setIsChecked] = useState(defaultChecked);

  function checkboxChange(event) {
    setIsChecked(event.target.checked);
  }

  const input =
    <label className={`flex gap-3 items-center ${containerClassName}`}>
      <span className="drop-shadow-2xl inline-block font-medium tracking-wide select-none">{label}</span>
      <input className="h-5 w-5" type="checkbox" checked={isChecked} onChange={checkboxChange} />
    </label>

  return { input, isChecked };
}
