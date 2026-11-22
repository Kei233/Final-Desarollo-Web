import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { initDb } from './db.js';
import authRoutes from './routes/auth.js';
import reviewRoutes from './routes/reviews.js';

if (!process.env.JWT_SECRET) {
  console.error('Falta JWT_SECRET en el archivo .env');
  process.exit(1);
}

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/reviews', reviewRoutes);

app.use((req, res) => res.status(404).json({ message: 'Ruta no encontrada' }));
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Error interno del servidor' });
});

const PORT = process.env.PORT || 4000;
initDb()
  .then(() => app.listen(PORT, () => console.log(`API Duby Sazón en http://localhost:${PORT}`)))
  .catch((e) => {
    console.error('No se pudo conectar a MySQL:', e.message);
    process.exit(1);
  });
