'use client'
import { useState, useRef, useEffect } from 'react'

type FilterBarProps = {
  onFilterChange?: (filters: FilterState) => void
  showDiscount?: boolean
  sizes?: string[]
}

export type FilterState = {
  discount: boolean
  sort: string
  priceMin: number | null
  priceMax: number | null
  size: string | null
}

const SORT_OPTIONS = [
  { value: 'popular', label: 'По популярности' },
  { value: 'price_asc', label: 'Сначала дешевле' },
  { value: 'price_desc', label: 'Сначала дороже' },
  { value: 'new', label: 'Новинки' },
]

const PRICE_PRESETS = [
  { label: 'до 3 000 ₽', min: null, max: 3000 },
  { label: '3 000 – 7 000 ₽', min: 3000, max: 7000 },
  { label: '7 000 – 12 000 ₽', min: 7000, max: 12000 },
  { label: 'от 12 000 ₽', min: 12000, max: null },
]

function Dropdown({
  label,
  children,
  active,
}: {
  label: string
  children: React.ReactNode
  active?: boolean
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '10px 18px',
          borderRadius: 999,
          border: active ? '1.5px solid var(--pink-deep)' : '1.5px solid rgba(43,43,43,.18)',
          background: active ? 'var(--pink-bg)' : '#fff',
          color: active ? 'var(--pink-deep)' : 'var(--ink)',
          fontSize: 14,
          fontWeight: 500,
          fontFamily: 'Manrope, sans-serif',
          cursor: 'pointer',
          transition: 'all .2s',
          whiteSpace: 'nowrap' as const,
        }}
      >
        {label}
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          style={{ transform: open ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform .2s' }}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {open && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 8px)',
            left: 0,
            background: '#fff',
            borderRadius: 18,
            border: '1px solid rgba(43,43,43,.1)',
            boxShadow: '0 12px 40px -10px rgba(43,43,43,.18)',
            zIndex: 100,
            minWidth: 200,
            padding: '8px 0',
            overflow: 'hidden',
          }}
        >
          {children}
        </div>
      )}
    </div>
  )
}

function DropdownItem({
  label,
  selected,
  onClick,
}: {
  label: string
  selected?: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      style={{
        width: '100%',
        textAlign: 'left',
        padding: '10px 18px',
        background: selected ? 'var(--pink-bg)' : 'transparent',
        color: selected ? 'var(--pink-deep)' : 'var(--ink)',
        fontWeight: selected ? 600 : 400,
        fontSize: 14,
        fontFamily: 'Manrope, sans-serif',
        border: 'none',
        cursor: 'pointer',
        transition: 'background .15s',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 8,
      }}
    >
      {label}
      {selected && (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M5 13l4 4L19 7" />
        </svg>
      )}
    </button>
  )
}

export default function FilterBar({ onFilterChange, showDiscount = true, sizes = [] }: FilterBarProps) {
  const [discount, setDiscount] = useState(false)
  const [sort, setSort] = useState('popular')
  const [priceMin, setPriceMin] = useState<number | null>(null)
  const [priceMax, setPriceMax] = useState<number | null>(null)
  const [size, setSize] = useState<string | null>(null)

  function notify(patch: Partial<FilterState>) {
    onFilterChange?.({
      discount,
      sort,
      priceMin,
      priceMax,
      size,
      ...patch,
    })
  }

  function toggleDiscount() {
    const next = !discount
    setDiscount(next)
    notify({ discount: next })
  }

  function setAndNotifySort(v: string) {
    setSort(v)
    notify({ sort: v })
  }

  function setAndNotifyPrice(min: number | null, max: number | null) {
    setPriceMin(min)
    setPriceMax(max)
    notify({ priceMin: min, priceMax: max })
  }

  function setAndNotifySize(s: string | null) {
    setSize(s)
    notify({ size: s })
  }

  function reset() {
    setDiscount(false)
    setSort('popular')
    setPriceMin(null)
    setPriceMax(null)
    setSize(null)
    onFilterChange?.({ discount: false, sort: 'popular', priceMin: null, priceMax: null, size: null })
  }

  const hasActive = discount || sort !== 'popular' || priceMin !== null || priceMax !== null || size !== null

  const priceLabel =
    priceMin !== null || priceMax !== null
      ? priceMin === null
        ? `до ${priceMax?.toLocaleString()} ₽`
        : priceMax === null
        ? `от ${priceMin?.toLocaleString()} ₽`
        : `${priceMin?.toLocaleString()} – ${priceMax?.toLocaleString()} ₽`
      : 'Цена'

  const sizeLabel = size ? `Размер: ${size}` : 'Размер'
  const sortLabel = SORT_OPTIONS.find(o => o.value === sort)?.label ?? 'По популярности'

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        flexWrap: 'wrap' as const,
        padding: '20px 0 28px',
      }}
    >
      {/* Скидка */}
      {showDiscount && (
        <button
          onClick={toggleDiscount}
          style={{
            padding: '10px 18px',
            borderRadius: 999,
            border: discount ? '1.5px solid var(--pink-deep)' : '1.5px solid rgba(43,43,43,.18)',
            background: discount ? 'var(--pink-deep)' : '#fff',
            color: discount ? '#fff' : 'var(--ink)',
            fontSize: 14,
            fontWeight: 600,
            fontFamily: 'Manrope, sans-serif',
            cursor: 'pointer',
            transition: 'all .2s',
            whiteSpace: 'nowrap' as const,
          }}
        >
          −50%
        </button>
      )}

      {/* Сортировка */}
      <Dropdown label={sortLabel} active={sort !== 'popular'}>
        {SORT_OPTIONS.map(o => (
          <DropdownItem
            key={o.value}
            label={o.label}
            selected={sort === o.value}
            onClick={() => setAndNotifySort(o.value)}
          />
        ))}
      </Dropdown>

      {/* Цена */}
      <Dropdown label={priceLabel} active={priceMin !== null || priceMax !== null}>
        {PRICE_PRESETS.map(p => (
          <DropdownItem
            key={p.label}
            label={p.label}
            selected={priceMin === p.min && priceMax === p.max}
            onClick={() => setAndNotifyPrice(p.min, p.max)}
          />
        ))}
        {(priceMin !== null || priceMax !== null) && (
          <>
            <div style={{ height: 1, background: 'var(--line)', margin: '6px 0' }} />
            <DropdownItem label="Сбросить цену" onClick={() => setAndNotifyPrice(null, null)} />
          </>
        )}
      </Dropdown>

      {/* Размер */}
      {sizes.length > 0 && (
        <Dropdown label={sizeLabel} active={size !== null}>
          {sizes.map(s => (
            <DropdownItem
              key={s}
              label={s}
              selected={size === s}
              onClick={() => setAndNotifySize(size === s ? null : s)}
            />
          ))}
          {size !== null && (
            <>
              <div style={{ height: 1, background: 'var(--line)', margin: '6px 0' }} />
              <DropdownItem label="Сбросить размер" onClick={() => setAndNotifySize(null)} />
            </>
          )}
        </Dropdown>
      )}

      {/* Показать / Сбросить */}
      <div style={{ display: 'flex', gap: 8, marginLeft: 'auto' }}>
        <button
          style={{
            padding: '10px 20px',
            borderRadius: 999,
            border: 'none',
            background: 'var(--ink)',
            color: '#fff',
            fontSize: 14,
            fontWeight: 600,
            fontFamily: 'Manrope, sans-serif',
            cursor: 'pointer',
          }}
        >
          Показать
        </button>
        {hasActive && (
          <button
            onClick={reset}
            style={{
              padding: '10px 20px',
              borderRadius: 999,
              border: '1.5px solid rgba(43,43,43,.18)',
              background: '#fff',
              color: 'var(--ink)',
              fontSize: 14,
              fontWeight: 500,
              fontFamily: 'Manrope, sans-serif',
              cursor: 'pointer',
              transition: 'all .2s',
            }}
          >
            Сбросить
          </button>
        )}
      </div>
    </div>
  )
}