import { Router } from 'express';
import { pool } from '../db.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();
router.use(requireAuth); // todas las rutas de reseñas exigen token

const CAMPOS = 'id, nombre_restaurante, calificacion, fecha_visita, observaciones';

// Valida el cuerpo; devuelve { error } o { data }
function validar(body) {
  const nombre = body.nombre_restaurante?.trim();
  const calificacion = Number(body.calificacion);
  const fecha = body.fecha_visita;

  if (!nombre) return { error: 'El nombre del restaurante es obligatorio' };
  if (!Number.isInteger(calificacion) || calificacion < 1 || calificacion > 5) {
    return { error: 'La calificación debe ser un número entre 1 y 5' };
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(fecha || '') || Number.isNaN(Date.parse(fecha))) {
    return { error: 'La fecha de visita no es válida' };
  }
  return {
    data: [nombre, calificacion, fecha, body.observaciones?.trim() || null],
  };
}

// Busca una reseña SOLO si pertenece al usuario autenticado
async function buscarPropia(id, userId) {
  const [rows] = await pool.query(
    `SELECT ${CAMPOS} FROM resenas WHERE id = ? AND usuario_id = ?`,
    [id, userId]
  );
  return rows[0];
}

// GET /api/reviews  -> solo las reseñas del usuario
router.get('/', async (req, res) => {
  const [rows] = await pool.query(
    `SELECT ${CAMPOS} FROM resenas WHERE usuario_id = ? ORDER BY fecha_visita DESC, id DESC`,
    [req.userId]
  );
  res.json(rows);
});

// POST /api/reviews
router.post('/', async (req, res) => {
  const { error, data } = validar(req.body);
  if (error) return res.status(400).json({ message: error });

  const [r] = await pool.query(
    `INSERT INTO resenas (usuario_id, nombre_restaurante, calificacion, fecha_visita, observaciones)
     VALUES (?, ?, ?, ?, ?)`,
    [req.userId, ...data]
  );
  res.status(201).json(await buscarPropia(r.insertId, req.userId));
});

// PUT /api/reviews/:id
router.put('/:id', async (req, res) => {
  if (!(await buscarPropia(req.params.id, req.userId))) {
    return res.status(404).json({ message: 'Reseña no encontrada' });
  }
  const { error, data } = validar(req.body);
  if (error) return res.status(400).json({ message: error });

  await pool.query(
    `UPDATE resenas
        SET nombre_restaurante = ?, calificacion = ?, fecha_visita = ?, observaciones = ?
      WHERE id = ? AND usuario_id = ?`,
    [...data, req.params.id, req.userId]
  );
  res.json(await buscarPropia(req.params.id, req.userId));
});

// DELETE /api/reviews/:id
router.delete('/:id', async (req, res) => {
  if (!(await buscarPropia(req.params.id, req.userId))) {
    return res.status(404).json({ message: 'Reseña no encontrada' });
  }
  await pool.query('DELETE FROM resenas WHERE id = ? AND usuario_id = ?', [
    req.params.id,
    req.userId,
  ]);
  res.status(204).end();
});

export default router;
