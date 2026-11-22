import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { pool } from '../db.js';

const router = Router();

const crearSesion = (u) => ({
  token: jwt.sign({ id: u.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES || '2h',
  }),
  user: { id: u.id, nombre: u.nombre, email: u.email },
});

// POST /api/auth/register
router.post('/register', async (req, res) => {
  const { nombre, email, password } = req.body;
  if (!nombre?.trim() || !email?.trim() || !password) {
    return res.status(400).json({ message: 'Nombre, correo y contraseña son obligatorios' });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: 'La contraseña debe tener al menos 6 caracteres' });
  }

  const [existe] = await pool.query('SELECT id FROM usuarios WHERE email = ?', [email.trim()]);
  if (existe.length) return res.status(409).json({ message: 'Ese correo ya está registrado' });

  const hash = await bcrypt.hash(password, 10);
  const [r] = await pool.query(
    'INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)',
    [nombre.trim(), email.trim(), hash]
  );
  res.status(201).json(crearSesion({ id: r.insertId, nombre: nombre.trim(), email: email.trim() }));
});

// POST /api/auth/login  ->  { token, user }
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Correo y contraseña son obligatorios' });
  }
  const [rows] = await pool.query('SELECT * FROM usuarios WHERE email = ?', [email.trim()]);
  const u = rows[0];
  if (!u || !(await bcrypt.compare(password, u.password))) {
    return res.status(401).json({ message: 'Correo o contraseña incorrectos' });
  }
  res.json(crearSesion(u));
});

export default router;
