require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse/sync');
const pool = require('../src/config/db');

const TEMPLATES_DIR = path.join(__dirname, '..', '..', 'database', 'templates');

function convertirFecha(fecha) {
  if (!fecha) return null;
  // Excel en Windows suele exportar fechas como M/D/AAAA; MySQL necesita AAAA-MM-DD
  const partes = fecha.split('/');
  if (partes.length !== 3) return fecha;
  const [mes, dia, anio] = partes;
  return `${anio}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`;
}

function readCsv(finalName, fallbackName) {
  const finalPath = path.join(TEMPLATES_DIR, finalName);
  const path_ = fs.existsSync(finalPath) ? finalPath : path.join(TEMPLATES_DIR, fallbackName);
  const raw = fs.readFileSync(path_, 'utf-8');
  console.log(`Leyendo ${path_}`);
  return parse(raw, { columns: true, skip_empty_lines: true, trim: true });
}

async function seedEquipos(rows) {
  if (!rows.length) return;
  const values = rows.map((r) => [
    r.id,
    r.nombre,
    r.ciudad || null,
    r.estadio || null,
    r.escudo_url || null,
    r.fundacion || null,
    r.color_principal || null,
  ]);

  await pool.query(
    `INSERT INTO equipos (id, nombre, ciudad, estadio, escudo_url, fundacion, color_principal) VALUES ?`,
    [values]
  );
}

async function seedJugadores(rows) {
  if (!rows.length) return;
  const values = rows.map((r) => [
    r.equipo_id,
    r.nombre_completo,
    r.dorsal || null,
    r.posicion_general,
    r.posicion_especifica,
    convertirFecha(r.fecha_nacimiento),
    r.nacionalidad || null,
    r.altura_cm || null,
    r.peso_kg || null,
    r.pie_dominante || null,
    r.valor_mercado_usd || null,
    r.foto_url || null,
  ]);

  await pool.query(
    `INSERT INTO jugadores
      (equipo_id, nombre_completo, dorsal, posicion_general, posicion_especifica,
       fecha_nacimiento, nacionalidad, altura_cm, peso_kg, pie_dominante, valor_mercado_usd, foto_url)
     VALUES ?`,
    [values]
  );
}

async function main() {
  const equipos = readCsv('equipos.csv', 'equipos_template.csv');
  const jugadores = readCsv('jugadores.csv', 'jugadores_template.csv');

  console.log(`Equipos a insertar: ${equipos.length}`);
  console.log(`Jugadores a insertar: ${jugadores.length}`);

  await pool.query('SET FOREIGN_KEY_CHECKS = 0');
  await pool.query('TRUNCATE TABLE jugadores');
  await pool.query('TRUNCATE TABLE equipos');
  await pool.query('SET FOREIGN_KEY_CHECKS = 1');

  await seedEquipos(equipos);
  await seedJugadores(jugadores);

  console.log('Seed completado correctamente.');
  await pool.end();
}

main().catch((err) => {
  console.error('Error al hacer seed:', err);
  process.exit(1);
});
