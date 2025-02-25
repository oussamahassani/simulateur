import React, { useState } from 'react';
import { ChromePicker } from 'react-color';

function ColorPicker({ color, onInputColor }) {
  const [selectedColor, setSelectedColor] = useState(color);

  const swatches = ['#fff', '#f05348', '#f08848', '#f0c048', '#48f072', '#486af0', '#1d0f6b', '#8348f0'];

  // Mise à jour de la couleur sélectionnée et émission de l'événement vers le parent
  const handleColorChange = (color) => {
    setSelectedColor(color.hex); // mettre à jour la couleur locale
    onInputColor(color.hex); // envoyer la couleur au parent via la prop
  };

  return (
    <div>
    {/*  <ChromePicker
        color={selectedColor}
        onChangeComplete={handleColorChange}
      />*/}
      <div style={{ display: 'flex', marginTop: '10px' }}>
        {swatches.map((swatchColor, index) => (
          <div
            key={index}
            onClick={() => handleColorChange({ hex: swatchColor })}
            style={{
              width: '30px',
              height: '30px',
              backgroundColor: swatchColor,
              border: '1px solid #ddd',
              marginRight: '5px',
              cursor: 'pointer',
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default ColorPicker;
