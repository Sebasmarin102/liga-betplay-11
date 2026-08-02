# Liga BetPlay 11 - Arma tu 11 ideal

Proyecto de portafolio: API en Express + MySQL (patron MVC) y frontend en React para armar el 11 ideal de la Liga BetPlay.

## Estructura

```
liga-betplay-11/
  database/            esquema SQL y plantillas CSV para cargar datos
  backend/              API REST (Express + MySQL, MVC)
  frontend/             App React (Vite)
```

## Puesta en marcha

### 1. Base de datos

1. Crea la base ejecutando `database/schema.sql` en tu MySQL local (o en el servicio gratuito que elijas).
2. Completa `database/templates/equipos_template.csv` y `jugadores_template.csv` en Google Sheets/Excel (ver `database/README.md`) y exporta como `equipos.csv` / `jugadores.csv` en la misma carpeta `templates/`.

### 2. Backend

```bash
cd backend
npm install
cp .env.example .env      # ajusta credenciales de tu MySQL
npm run seed               # carga equipos.csv y jugadores.csv a la base
npm run dev                 # levanta la API en http://localhost:4000
```

### 3. Frontend

```bash
cd frontend
npm install
cp .env.example .env       # VITE_API_URL apuntando a tu API
npm run dev                 # http://localhost:5173
```

## Endpoints principales

- `GET /api/equipos` - lista de equipos
- `GET /api/equipos/:id` - equipo con su plantilla completa
- `GET /api/jugadores?posicion=POR` - jugadores filtrados por posicion especifica (POR, DFC, LD, LI, MCD, MC, MCO, ED, EI, DC)
- `GET /api/jugadores?equipo_id=3` - jugadores de un equipo
- `GET /api/jugadores/:id` - detalle de un jugador
