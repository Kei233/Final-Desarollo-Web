import { useEffect, useState } from 'react';
import { api } from '../api.js';
import Stars from '../components/Stars.jsx';
import ReviewForm from '../components/ReviewForm.jsx';

const formatoFecha = (iso) => {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString('es-CO', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

export default function Reviews({ user, onLogout }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  // null = modal cerrado | {} = nueva reseña | reseña = editar
  const [editing, setEditing] = useState(null);

  const cargar = async () => {
    try {
      setReviews(await api.list());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargar();
  }, []);

  const guardar = async (data) => {
    if (editing.id) await api.update(editing.id, data);
    else await api.create(data);
    setEditing(null);
    cargar();
  };

  const eliminar = async (r) => {
    if (!window.confirm(`¿Eliminar la reseña de "${r.nombre_restaurante}"?`)) return;
    try {
      await api.remove(r.id);
      cargar();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen">
      <header className="bg-morado text-white shadow">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <span className="text-xl font-bold">
            Duby <span className="text-naranja-claro">Sazón</span>
          </span>
          <div className="flex items-center gap-4 text-sm">
            <span className="hidden sm:inline">Hola, {user.nombre}</span>
            <button
              onClick={onLogout}
              className="rounded-lg border border-white/40 px-3 py-1.5 hover:bg-white/10"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl p-4">
        <div className="my-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-morado">Mis reseñas</h1>
          <button
            onClick={() => setEditing({})}
            className="rounded-lg bg-naranja px-4 py-2 font-semibold text-white hover:bg-naranja-oscuro"
          >
            + Nueva reseña
          </button>
        </div>

        {error && <p className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

        {loading ? (
          <p className="text-center text-morado/60">Cargando…</p>
        ) : reviews.length === 0 ? (
          <div className="rounded-2xl border-2 border-dashed border-morado/20 p-10 text-center">
            <p className="text-lg font-medium">Todavía no tienes reseñas</p>
            <p className="text-morado/60">Pulsa “Nueva reseña” para agregar la primera.</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.map((r) => (
              <article
                key={r.id}
                className="flex flex-col rounded-2xl border-t-4 border-naranja bg-white p-5 shadow"
              >
                <h3 className="text-lg font-bold text-morado">{r.nombre_restaurante}</h3>
                <Stars value={r.calificacion} />
                <p className="mt-1 text-sm text-morado/60">{formatoFecha(r.fecha_visita)}</p>
                <p className="mt-3 flex-1 text-sm">{r.observaciones || 'Sin observaciones'}</p>
                <div className="mt-4 flex gap-2 text-sm font-medium">
                  <button
                    onClick={() => setEditing(r)}
                    className="rounded-lg bg-morado-claro px-3 py-1.5 text-morado hover:bg-morado/20"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => eliminar(r)}
                    className="rounded-lg bg-naranja-claro px-3 py-1.5 text-naranja-oscuro hover:bg-naranja/20"
                  >
                    Eliminar
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      {editing && (
        <ReviewForm
          review={editing.id ? editing : null}
          onSave={guardar}
          onClose={() => setEditing(null)}
        />
      )}
    </div>
  );
}
