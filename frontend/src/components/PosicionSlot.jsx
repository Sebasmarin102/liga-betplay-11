import { onFotoError } from '../utils/foto';

function PosicionSlot({ slot, jugador, onClick }) {
  return (
    <button
      type="button"
      className={`slot ${jugador ? 'slot--ocupado' : ''}`}
      style={{ left: `${slot.x}%`, top: `${slot.y}%` }}
      onClick={onClick}
    >
      {jugador ? (
        <>
          <img
            src={jugador.foto_url}
            onError={onFotoError(jugador.nombre_completo)}
            alt={jugador.nombre_completo}
            className="slot__foto"
          />
          <span className="slot__dorsal">{jugador.dorsal}</span>
          <span className="slot__nombre">{jugador.nombre_completo.split(' ').slice(-1)[0]}</span>
        </>
      ) : (
        <span className="slot__label">{slot.posicion}</span>
      )}
    </button>
  );
}

export default PosicionSlot;
