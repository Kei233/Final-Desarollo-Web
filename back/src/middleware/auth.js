import jwt from 'jsonwebtoken';

// Verifica el token y deja el id del usuario en req.userId.
// Todas las consultas de reseñas usan este id, así cada usuario solo ve lo suyo.
export function requireAuth(req, res, next) {
  const [type, token] = (req.headers.authorization || '').split(' ');
  if (type !== 'Bearer' || !token) {
    return res.status(401).json({ message: 'Debes iniciar sesión' });
  }
  try {
    req.userId = jwt.verify(token, process.env.JWT_SECRET).id;
    next();
  } catch {
    res.status(401).json({ message: 'Sesión inválida o expirada' });
  }
}
