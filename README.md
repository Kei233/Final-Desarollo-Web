# Duby Sazón – CRUD de reseñas de restaurantes

Stack: **React + Tailwind (Vite)** · **Node.js + Express** · **MySQL**

```
duby-sazon/
├── back/    API REST (Express + MySQL + JWT)
└── front/   Interfaz (React + Tailwind)
```

## Requisitos
Node.js 18+ y MySQL 8 en ejecución.

## 1. Backend
```bash
cd back
npm install
cp .env.example .env     # edita DB_PASSWORD y JWT_SECRET
npm run dev
```
Al iniciar, crea la base de datos `duby_sazon` y sus tablas automáticamente (`back/schema.sql`).
API en http://localhost:4000

## 2. Frontend
```bash
cd front
npm install
npm run dev
```
Abre http://localhost:5173 (el proxy de Vite redirige `/api` al backend).

## API
| Método | Ruta                 | Descripción                       | Token |
|--------|----------------------|-----------------------------------|-------|
| POST   | /api/auth/register   | Crear cuenta                      | No    |
| POST   | /api/auth/login      | Iniciar sesión → `{ token, user }`| No    |
| GET    | /api/reviews         | Listar MIS reseñas                | Sí    |
| POST   | /api/reviews         | Crear reseña                      | Sí    |
| PUT    | /api/reviews/:id     | Editar mi reseña                  | Sí    |
| DELETE | /api/reviews/:id     | Eliminar mi reseña                | Sí    |

Reseña: `nombre_restaurante`, `calificacion` (1-5), `fecha_visita` (YYYY-MM-DD), `observaciones`.

## Seguridad: cada usuario solo ve lo suyo
El id del usuario sale del **token** (nunca del cliente) y todas las consultas de
`back/src/routes/reviews.js` filtran por `usuario_id`. Si alguien intenta tocar una
reseña ajena recibe `404`.

El token se guarda en **sessionStorage** (`front/src/api.js`).

## Entrega
`node_modules/`, `dist/` y `.env` están en `.gitignore`: no se suben al repositorio.
