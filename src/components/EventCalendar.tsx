import { useState } from 'react'

type PortableTextBlock = {
  _type: string
  style?: string
  children?: { _type: string; text?: string }[]
}

type Event = {
  _id: string
  title: string
  date: string
  endDate?: string
  categoryColor?: string
  location?: string
  description?: PortableTextBlock[]
  imageUrl?: string
  slug: { current: string }
}

function renderPortableText(blocks?: PortableTextBlock[]) {
  if (!blocks || blocks.length === 0) return null
  return blocks
    .filter(b => b._type === 'block')
    .map((block, i) => {
      const text = (block.children ?? [])
        .filter(c => c._type === 'span')
        .map(c => c.text ?? '')
        .join('')
      if (!text) return null
      return (
        <p key={i} className="text-sm leading-relaxed">
          {text}
        </p>
      )
    })
}

// Para expandir a más ramas en el futuro, añadir aquí:
// 'cat-familias':  { bg: 'bg-emerald-50', text: 'text-emerald-900', dot: 'bg-emerald-600', border: 'border-emerald-200', label: 'Familias' },
// 'cat-mujeres':   { bg: 'bg-purple-50', text: 'text-purple-900', dot: 'bg-purple-600', border: 'border-purple-200', label: 'Mujeres de Schoenstatt' },
// 'cat-general':   { bg: 'bg-amber-50', text: 'text-amber-900', dot: 'bg-[#AD8B45]', border: 'border-amber-200', label: 'General' },
const CATEGORIES: Record<string, { bg: string; text: string; dot: string; border: string; label: string }> = {
  'cat-juventud': { bg: 'bg-blue-50', text: 'text-blue-900', dot: 'bg-[#003366]', border: 'border-blue-200', label: 'Juventud Masculina' },
}

const MONTHS = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
const WEEKDAYS = ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb']

function cat(key?: string) {
  return CATEGORIES[key ?? ''] ?? CATEGORIES['cat-juventud']
}

export default function EventCalendar({ events }: { events: Event[] }) {
  const today = new Date()
  const [year, setYear] = useState(today.getFullYear())
  const [month, setMonth] = useState(today.getMonth())
  const [selected, setSelected] = useState<number | null>(null)

  const firstDow = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const prev = () => {
    if (month === 0) { setMonth(11); setYear(y => y - 1) }
    else setMonth(m => m - 1)
    setSelected(null)
  }
  const next = () => {
    if (month === 11) { setMonth(0); setYear(y => y + 1) }
    else setMonth(m => m + 1)
    setSelected(null)
  }

  const byDay: Record<number, Event[]> = {}
  events.forEach(ev => {
    const d = new Date(ev.date)
    if (d.getFullYear() === year && d.getMonth() === month) {
      const day = d.getDate()
      if (!byDay[day]) byDay[day] = []
      byDay[day].push(ev)
    }
  })

  const upcoming = [...events]
    .filter(ev => new Date(ev.date) >= new Date(today.getFullYear(), today.getMonth(), today.getDate()))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  return (
    <div className="space-y-12">

      {/* Calendar card */}
      <div className="bg-[#FAF9F6] rounded-3xl shadow-sm border border-[#E8E4DD] overflow-hidden">

        {/* Month navigation */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#E8E4DD]">
          <button
            onClick={prev}
            className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-[#F2EFE9] transition-colors text-[#002855] text-xl font-bold"
            aria-label="Mes anterior"
          >
            ‹
          </button>
          <p className="font-serif text-[#002855] text-2xl font-bold tracking-tight">
            {MONTHS[month]} {year}
          </p>
          <button
            onClick={next}
            className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-[#F2EFE9] transition-colors text-[#002855] text-xl font-bold"
            aria-label="Mes siguiente"
          >
            ›
          </button>
        </div>

        {/* Weekday headers */}
        <div className="grid grid-cols-7 border-b border-[#E8E4DD]">
          {WEEKDAYS.map(d => (
            <div key={d} className="text-center py-3 text-[10px] font-bold text-[#002855]/40 uppercase tracking-widest">
              {d}
            </div>
          ))}
        </div>

        {/* Days grid */}
        <div className="grid grid-cols-7">
          {Array.from({ length: firstDow }).map((_, i) => (
            <div key={`pad-${i}`} className="h-16 md:h-20 border-b border-r border-[#E8E4DD]/50 bg-[#F2EFE9]/30" />
          ))}

          {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => {
            const dayEvents = byDay[day] ?? []
            const isToday = today.getDate() === day && today.getMonth() === month && today.getFullYear() === year
            const isSelected = selected === day
            const hasEvents = dayEvents.length > 0

            return (
              <button
                key={day}
                onClick={() => hasEvents ? setSelected(isSelected ? null : day) : undefined}
                className={`h-16 md:h-20 p-1.5 border-b border-r border-[#E8E4DD]/50 relative flex flex-col items-start transition-all duration-150 text-left
                  ${hasEvents ? 'cursor-pointer hover:bg-[#F2EFE9]' : 'cursor-default'}
                  ${isSelected ? 'bg-[#002855]/[0.04] ring-2 ring-inset ring-[#002855]/20' : ''}
                `}
              >
                <span className={`w-6 h-6 md:w-7 md:h-7 text-xs md:text-sm font-bold flex items-center justify-center rounded-full
                  ${isToday ? 'bg-[#AD8B45] text-white' : 'text-[#002855]/70'}
                `}>
                  {day}
                </span>
                <div className="flex gap-0.5 flex-wrap mt-0.5 pl-0.5">
                  {dayEvents.slice(0, 3).map(ev => (
                    <span
                      key={ev._id}
                      className={`w-1.5 h-1.5 rounded-full ${cat(ev.categoryColor).dot}`}
                    />
                  ))}
                  {dayEvents.length > 3 && (
                    <span className="text-[8px] text-[#002855]/40 font-bold leading-none self-center">
                      +{dayEvents.length - 3}
                    </span>
                  )}
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Selected day detail */}
      {selected !== null && (
        <div className="bg-[#FAF9F6] rounded-3xl border border-[#E8E4DD] p-6">
          <p className="font-bold text-[#002855] text-lg mb-4">
            {selected} de {MONTHS[month]}
          </p>
          {(byDay[selected] ?? []).length === 0 ? (
            <p className="text-[#2D3436]/40 text-sm">Sin eventos este día.</p>
          ) : (
            <div className="space-y-3">
              {(byDay[selected] ?? []).map(ev => {
                const c = cat(ev.categoryColor)
                const time = new Date(ev.date).toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })
                return (
                  <div key={ev._id} className={`rounded-2xl p-4 border ${c.bg} ${c.border}`}>
                    <div className="flex-1 min-w-0">
                      <p className={`text-[10px] font-bold uppercase tracking-widest ${c.text} opacity-70 mb-0.5`}>
                        {c.label} · {time}
                      </p>
                      <p className={`font-bold ${c.text} text-base`}>{ev.title}</p>
                      {ev.location && (
                        <p className={`text-xs mt-1.5 ${c.text} opacity-60`}>📍 {ev.location}</p>
                      )}
                      {ev.imageUrl && (
                        <img
                          src={ev.imageUrl}
                          alt={ev.title}
                          className="mt-3 w-full rounded-xl object-cover max-h-64"
                        />
                      )}
                      {ev.description && (
                        <div className={`mt-3 space-y-2 ${c.text} opacity-80`}>
                          {renderPortableText(ev.description)}
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}

      {/* Upcoming events */}
      <div>
        <p className="font-serif text-[#AD8B45] text-3xl font-bold mb-6">Próximos eventos</p>

        {upcoming.length === 0 ? (
          <div className="text-center py-16 text-[#2D3436]/40">
            <p className="text-xl font-serif mb-2">Sin eventos próximos</p>
            <p className="text-sm">Vuelve pronto para ver las actividades.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {upcoming.map(ev => {
              const c = cat(ev.categoryColor)
              const d = new Date(ev.date)
              return (
                <div
                  key={ev._id}
                  className="bg-[#FAF9F6] border border-[#E8E4DD] rounded-2xl p-5 flex gap-4 items-start hover:shadow-md transition-shadow"
                >
                  {/* Date block */}
                  <div className={`shrink-0 w-14 text-center rounded-2xl py-2 border ${c.bg} ${c.border}`}>
                    <p className={`text-[10px] font-bold uppercase ${c.text} opacity-70`}>
                      {MONTHS[d.getMonth()].slice(0, 3)}
                    </p>
                    <p className={`text-2xl font-black ${c.text} leading-tight`}>{d.getDate()}</p>
                    <p className={`text-[10px] font-bold ${c.text} opacity-60`}>
                      {d.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className={`text-[10px] font-bold uppercase tracking-widest ${c.text}`}>{c.label}</p>
                    <p className="font-bold text-[#002855] text-base mt-0.5">{ev.title}</p>
                    {ev.location && (
                      <p className="text-xs text-[#2D3436]/50 mt-1">📍 {ev.location}</p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Legend — solo se muestra cuando hay más de una categoría */}
      {Object.keys(CATEGORIES).length > 1 && (
        <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center py-2">
          {Object.entries(CATEGORIES).map(([key, c]) => (
            <div key={key} className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${c.dot}`} />
              <span className="text-xs text-[#2D3436]/50 font-medium">{c.label}</span>
            </div>
          ))}
        </div>
      )}

    </div>
  )
}
