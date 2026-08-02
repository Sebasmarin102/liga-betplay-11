import { FORMACIONES } from '../data/formaciones';

function SelectorFormacion({ onElegir }) {
  return (
    <div className="selector-formacion">
      <h1>Arma tu 11 ideal - Liga BetPlay</h1>
      <p>Elige una formacion para empezar</p>
      <div className="selector-formacion__opciones">
        {Object.keys(FORMACIONES).map((nombre) => (
          <button key={nombre} onClick={() => onElegir(nombre)}>
            {nombre}
          </button>
        ))}
      </div>
    </div>
  );
}

export default SelectorFormacion;
