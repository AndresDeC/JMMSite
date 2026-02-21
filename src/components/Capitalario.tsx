import { useState } from 'react';

const APORTES = [
  { id: 'ora', label: 'Oración', icon: '🙏', color: 'hover:bg-blue-50' },
  { id: 'sac', label: 'Sacrificio', icon: '🔥', color: 'hover:bg-orange-50' },
  { id: 'tra', label: 'Trabajo', icon: '🛠️', color: 'hover:bg-green-50' },
  { id: 'mis', label: 'Misión', icon: '👣', color: 'hover:bg-purple-50' },
];

export default function CapitalarioForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  const handleSend = async (tipo: string) => {
    setStatus('sending');
    
    // AQUÍ IRÁ LA CONEXIÓN AL HARDWARE (IoT)
    // fetch('https://api.tu-hardware.com/v1/light/trigger', { method: 'POST' })
    
    setTimeout(() => {
      setStatus('success');
      setTimeout(() => setStatus('idle'), 3000);
    }, 1500);
  };

  return (
    <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl border border-slate-100 relative overflow-hidden">
      {status === 'success' && (
        <div className="absolute inset-0 bg-jm-blue text-white flex flex-col items-center justify-center z-10 animate-in fade-in duration-300">
          <span className="text-6xl mb-4">✨</span>
          <h3 className="text-2xl font-serif">¡Aporte Recibido!</h3>
          <p className="text-jm-gold">La luz ha sido encendida.</p>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        {APORTES.map((item) => (
          <button
            key={item.id}
            onClick={() => handleSend(item.label)}
            disabled={status === 'sending'}
            className={`flex flex-col items-center justify-center p-6 rounded-3xl border-2 border-slate-50 ${item.color} transition-all duration-300 hover:border-jm-gold hover:shadow-xl active:scale-95 disabled:opacity-50 group`}
          >
            <span className="text-4xl mb-2 group-hover:scale-110 transition-transform">{item.icon}</span>
            <span className="font-bold text-slate-700">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}