// Estrellas de calificación. Con onChange son clicables; sin él, solo se muestran.
export default function Stars({ value, onChange }) {
  return (
    <div className="flex gap-0.5 text-2xl leading-none">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          disabled={!onChange}
          onClick={() => onChange?.(n)}
          aria-label={`${n} de 5`}
          className={`${n <= value ? 'text-naranja' : 'text-gray-300'} ${
            onChange ? 'cursor-pointer hover:scale-110 transition' : 'cursor-default'
          }`}
        >
          ★
        </button>
      ))}
    </div>
  );
}
