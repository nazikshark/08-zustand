'use client';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2 style={{ color: 'red' }}>Щось пішло не так!</h2>
      <p>{error.message}</p>
      <button onClick={() => reset()} style={{ marginTop: '10px', padding: '8px 16px' }}>
        Спробувати знову
      </button>
    </div>
  );
}