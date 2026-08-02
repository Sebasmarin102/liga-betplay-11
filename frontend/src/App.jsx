import { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import SelectorFormacion from './components/SelectorFormacion';
import Cancha from './components/Cancha';
import ModalSeleccionJugador from './components/ModalSeleccionJugador';
import { FORMACIONES } from './data/formaciones';
import './App.css';

function crearAlineacionVacia(formacion) {
  const alineacion = {};
  FORMACIONES[formacion].forEach((slot) => {
    alineacion[slot.id] = null;
  });
  return alineacion;
}

function App() {
  const [formacion, setFormacion] = useState(null);
  const [alineacion, setAlineacion] = useState({});
  const [slotActivo, setSlotActivo] = useState(null);
  const canchaRef = useRef(null);

  function elegirFormacion(nombre) {
    setFormacion(nombre);
    setAlineacion(crearAlineacionVacia(nombre));
  }

  function reiniciar() {
    setFormacion(null);
    setAlineacion({});
    setSlotActivo(null);
  }

  function seleccionarJugador(jugador) {
    setAlineacion((prev) => ({ ...prev, [slotActivo.id]: jugador }));
    setSlotActivo(null);
  }

  async function descargarImagen() {
    if (!canchaRef.current) return;
    const canvas = await html2canvas(canchaRef.current, { backgroundColor: null, scale: 2 });
    const link = document.createElement('a');
    link.download = `mi-11-ideal-${formacion}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  }

  if (!formacion) {
    return <SelectorFormacion onElegir={elegirFormacion} />;
  }

  const slots = FORMACIONES[formacion];
  const idsSeleccionados = Object.values(alineacion)
    .filter(Boolean)
    .map((j) => j.id);
  const completo = idsSeleccionados.length === slots.length;

  return (
    <div className="app">
      <h1>Arma tu 11 ideal - {formacion}</h1>
      <p className="app__ayuda">Toca una posicion en la cancha para elegir jugador</p>

      <Cancha ref={canchaRef} slots={slots} alineacion={alineacion} onSlotClick={setSlotActivo} />

      <div className="acciones-finales">
        {completo ? (
          <>
            <button onClick={descargarImagen}>Descargar imagen</button>
            <button className="secundario" onClick={reiniciar}>
              Volver a empezar
            </button>
          </>
        ) : (
          <button className="secundario" onClick={reiniciar}>
            Cambiar formacion
          </button>
        )}
      </div>

      {slotActivo && (
        <ModalSeleccionJugador
          slot={slotActivo}
          idsExcluidos={idsSeleccionados}
          onSeleccionar={seleccionarJugador}
          onCerrar={() => setSlotActivo(null)}
        />
      )}
    </div>
  );
}

export default App;
