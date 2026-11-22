import { useState } from 'react';
import { api } from '../api.js';

export default function Login({ onAuth }) {
  const [registro, setRegistro] = useState(false);
  const [form, setForm] = useState({ nombre: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const set = (campo) => (e) => setForm({ ...form, [campo]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      onAuth(await (registro ? api.register(form) : api.login(form)));
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const input =
    'mt-1 w-full rounded-lg border border-morado/20 bg-white px-3 py-2 outline-none focus:border-morado focus:ring-2 focus:ring-morado/20';

  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <div className="grid w-full max-w-3xl overflow-hidden rounded-3xl bg-white shadow-xl md:grid-cols-2">
        {/* Panel de marca */}
        <section className="hidden flex-col justify-center bg-linear-to-br from-morado to-naranja p-10 text-white md:flex">
          <h1 className="text-4xl font-bold">Duby Sazón</h1>
          <p className="mt-3 text-white/90">
            Guarda tus reseñas de restaurantes y recuerda dónde mejor has comido.
          </p>
        </section>

        {/* Formulario */}
        <form onSubmit={submit} className="space-y-4 bg-fantasma p-8">
          <h2 className="text-2xl font-bold text-morado">
            {registro ? 'Crear cuenta' : 'Iniciar sesión'}
          </h2>

          {registro && (
            <label className="block text-sm font-medium">
              Nombre
              <input className={input} value={form.nombre} onChange={set('nombre')} required />
            </label>
          )}
          <label className="block text-sm font-medium">
            Correo
            <input type="email" className={input} value={form.email} onChange={set('email')} required />
          </label>
          <label className="block text-sm font-medium">
            Contraseña
            <input
              type="password"
              className={input}
              value={form.password}
              onChange={set('password')}
              minLength={registro ? 6 : undefined}
              required
            />
          </label>

          {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

          <button
            disabled={loading}
            className="w-full rounded-lg bg-naranja py-2.5 font-semibold text-white hover:bg-naranja-oscuro disabled:opacity-60"
          >
            {loading ? 'Un momento…' : registro ? 'Registrarme' : 'Entrar'}
          </button>

          <p className="text-center text-sm">
            {registro ? '¿Ya tienes cuenta?' : '¿Aún no tienes cuenta?'}{' '}
            <button
              type="button"
              onClick={() => {
                setRegistro(!registro);
                setError('');
              }}
              className="font-semibold text-morado underline"
            >
              {registro ? 'Inicia sesión' : 'Regístrate'}
            </button>
          </p>
        </form>
      </div>
    </main>
  );
}
