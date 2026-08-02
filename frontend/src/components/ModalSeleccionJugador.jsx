import { useEffect, useState } from 'react';
import { getJugadoresPorPosicion } from '../api/api';
import { calcularEdad } from '../utils/edad';
import { onFotoError } from '../utils/foto';
import './ModalSeleccionJugador.css';

function ModalSeleccionJugador({ slot, idsExcluidos, onSeleccionar, onCerrar }) {
  const [jugadores, setJugadores] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setCargando(true);
    setError(null);
    getJugadoresPorPosicion(slot.posicion)
      .then((data) => setJugadores(data))
      .catch(() =>
        setError('No se pudo cargar la lista de jugadores. Revisa que el backend y la base de datos esten activos.')
      )
      .finally(() => setCargando(false));
  }, [slot]);

  const disponibles = jugadores.filter((j) => !idsExcluidos.includes(j.id));

  return (
    <div className="modal-overlay" onClick={onCerrar}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal__header">
          <h2>Elige tu {slot.posicion}</h2>
          <button onClick={onCerrar} className="modal__cerrar" aria-label="Cerrar">
            ✕
          </button>
        </div>

        {cargando && <p>Cargando jugadores...</p>}
        {error && <p className="modal__error">{error}</p>}

        <div className="modal__lista">
          {disponibles.map((j) => (
            <button key={j.id} className="tarjeta-jugador" onClick={() => onSeleccionar(j)}>
              <img src={j.foto_url} onError={onFotoError(j.nombre_completo)} alt={j.nombre_completo} />
              <div className="tarjeta-jugador__info">
                <strong>{j.nombre_completo}</strong>
                <span>{j.equipo_nombre}</span>
                <span>Edad: {calcularEdad(j.fecha_nacimiento)}</span>
                <span>Nacionalidad: {j.nacionalidad}</span>
                <span>Altura: {j.altura_cm} cm</span>
                <span>Valor: ${Number(j.valor_mercado_usd || 0).toLocaleString()}</span>
              </div>
            </button>
          ))}
          {!cargando && !error && disponibles.length === 0 && (
            <p>No hay jugadores disponibles para esta posicion.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ModalSeleccionJugador;
