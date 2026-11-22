import { useState } from 'react';
import Stars from './Stars.jsx';

const hoy = () => new Date().toLocaleDateString('en-CA'); // YYYY-MM-DD en hora local

// Modal para crear o editar. Si recibe "review" edita; si no, crea.
export default function ReviewForm({ review, onSave, onClose }) {
  const [form, setForm] = useState({
    nombre_restaurante: review?.nombre_restaurante ?? '',
    calificacion: review?.calificacion ?? 0,
    fecha_visita: review?.fecha_visita ?? hoy(),
    observaciones: review?.observaciones ?? '',
  });
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const set = (campo) => (e) => setForm({ ...form, [campo]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (!form.calificacion) return setError('Elige una calificación');
    setSaving(true);
    try {
      await onSave(form);
    } catch (err) {
      setError(err.message);
      setSaving(false);
    }
  };

  const input =
    'w-full rounded-lg border border-morado/20 bg-fantasma px-3 py-2 outline-none focus:border-morado focus:ring-2 focus:ring-morado/20';

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-morado-oscuro/50 p-4">
      <form onSubmit={submit} className="w-full max-w-md space-y-4 rounded-2xl bg-white p-6 shadow-xl">
        <h2 className="text-xl font-bold text-morado">
          {review ? 'Editar reseña' : 'Nueva reseña'}
        </h2>

        <label className="block text-sm font-medium">
          Restaurante
          <input
            className={`${input} mt-1`}
            value={form.nombre_restaurante}
            onChange={set('nombre_restaurante')}
            placeholder="Ej: Duby Sazón"
            required
          />
        </label>

        <div className="text-sm font-medium">
          Calificación
          <div className="mt-1">
            <Stars value={form.calificacion} onChange={(n) => setForm({ ...form, calificacion: n })} />
          </div>
        </div>

        <label className="block text-sm font-medium">
          Fecha de visita
          <input
            type="date"
            className={`${input} mt-1`}
            value={form.fecha_visita}
            onChange={set('fecha_visita')}
            required
          />
        </label>

        <label className="block text-sm font-medium">
          Observaciones
          <textarea
            rows="3"
            className={`${input} mt-1`}
            value={form.observaciones}
            onChange={set('observaciones')}
            placeholder="¿Qué tal estuvo la comida y el servicio?"
          />
        </label>

        {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-4 py-2 font-medium text-morado hover:bg-morado-claro"
          >
            Cancelar
          </button>
          <button
            disabled={saving}
            className="rounded-lg bg-naranja px-5 py-2 font-semibold text-white hover:bg-naranja-oscuro disabled:opacity-60"
          >
            {saving ? 'Guardando…' : 'Guardar'}
          </button>
        </div>
      </form>
    </div>
  );
}
