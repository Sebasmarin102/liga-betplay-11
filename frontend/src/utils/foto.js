export function placeholderFoto(nombre) {
  return `https://ui-avatars.com/api/?background=2e7d32&color=fff&name=${encodeURIComponent(nombre)}`;
}

export function onFotoError(nombre) {
  return (e) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = placeholderFoto(nombre);
  };
}
