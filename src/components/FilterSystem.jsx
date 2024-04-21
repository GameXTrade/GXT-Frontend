import React, { useState } from 'react';

function FilterSystem() {
    const [selectedOption, setSelectedOption] = useState('');

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };
  return (
    <div className='w-80' style={{ height: "calc(100dvh - 64px)" }}>

        <div className='h-full bg-slate-200'>
            <label htmlFor="game">Game:</label>
            <select id="game" name="game" value={selectedOption} onChange={handleChange}>
            <option value="">Bitte wählen</option>
            <option value="Metin2">Metin2</option>
            <option value="WoW">WoW</option>
            <option value="Minecraft">Minecraft</option>
            </select>
            {/* <p>Ausgewählte Spiel: {selectedOption}</p> */}
        </div>
    </div>
  )
}

export default FilterSystem