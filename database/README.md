# Datos - Liga BetPlay 11

## Flujo de carga de datos

1. Abre `templates/equipos_template.csv` y `templates/jugadores_template.csv` en Google Sheets o Excel.
2. Completa las filas (20 equipos, ~25 jugadores por equipo). Respeta los valores permitidos:
   - `posicion_general`: Portero, Defensa, Volante, Delantero
   - `posicion_especifica`: POR, DFC, LD, LI, MCD, MC, MCO, ED, EI, DC
   - `pie_dominante`: Izquierdo, Derecho, Ambidiestro
3. Exporta cada hoja de vuelta como CSV, reemplazando los archivos en `templates/` (o guarda copias como `equipos.csv` y `jugadores.csv`).
4. Corre el script de seed (se agregará en `backend/seed/`) para insertar los datos en MySQL usando `schema.sql`.

## Notas

- `equipo_id` en jugadores debe coincidir con el `id` del equipo en `equipos.csv`.
- Si no tienes foto real de un jugador, usa un placeholder generado (ej. `https://ui-avatars.com/api/?name=Nombre+Apellido`) en vez de dejarlo vacío.
- `valor_mercado_usd` puede ser una estimación tuya si no encuentras el dato real.
