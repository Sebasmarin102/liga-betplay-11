import { forwardRef } from 'react';
import PosicionSlot from './PosicionSlot';
import './Cancha.css';

const Cancha = forwardRef(function Cancha({ slots, alineacion, onSlotClick }, ref) {
  return (
    <div className="cancha" ref={ref}>
      {slots.map((slot) => (
        <PosicionSlot
          key={slot.id}
          slot={slot}
          jugador={alineacion[slot.id]}
          onClick={() => onSlotClick(slot)}
        />
      ))}
    </div>
  );
});

export default Cancha;
