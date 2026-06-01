'use client'
import { useState, useEffect } from 'react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Link from 'next/link'
import FilterBar, { FilterState } from '@/components/FilterBar'

const SIZES = ['30', '32', '34', '36', '38', '40', '42', '44']

type Product = {
  id: number
  name: string
  price: number
  priceLabel: string
  emoji: string
  desc: string
  cls: string
  popular: number
  isNew: boolean
}

const PRODUCTS: Product[] = [
  { id:1, name:'Купальник «Лебедь»',   price:8500,  priceLabel:'от 8 500 ₽',  emoji:'🩱', desc:'Белый бархат с серебристой вышивкой. Идеален для лирических программ.', cls:'1', popular:95, isNew:false },
  { id:2, name:'Купальник «Весна»',     price:7200,  priceLabel:'от 7 200 ₽',  emoji:'💜', desc:'Нежно-сиреневый с цветочной аппликацией. Лёгкий и воздушный крой.', cls:'2', popular:88, isNew:false },
  { id:3, name:'Купальник «Звезда»',    price:9800,  priceLabel:'от 9 800 ₽',  emoji:'⭐', desc:'Тёмно-синий со стразами. Для торжественных выступлений.', cls:'3', popular:92, isNew:true },
  { id:4, name:'Купальник «Огонь»',     price:8000,  priceLabel:'от 8 000 ₽',  emoji:'🔴', desc:'Алый с золотым градиентом. Динамичный дизайн для энергичных программ.', cls:'4', popular:80, isNew:false },
  { id:5, name:'Купальник «Морская»',   price:6900,  priceLabel:'от 6 900 ₽',  emoji:'🩵', desc:'Бирюзовый с перламутровой отделкой. Плавные линии и мягкая ткань.', cls:'5', popular:75, isNew:false },
  { id:6, name:'Купальник «Принцесса»', price:11500, priceLabel:'от 11 500 ₽', emoji:'🌸', desc:'Персиковый со стразами. Премиальная ткань, индивидуальный пошив.', cls:'6', popular:98, isNew:true },
  { id:7, name:'Купальник «Закат»',     price:7800,  priceLabel:'от 7 800 ₽',  emoji:'🌅', desc:'Оранжево-розовый переход. Яркий и запоминающийся на соревнованиях.', cls:'7', popular:70, isNew:false },
  { id:8, name:'Купальник «Изумруд»',   price:8900,  priceLabel:'от 8 900 ₽',  emoji:'💚', desc:'Насыщенный зелёный с вышивкой. Благородный и элегантный.', cls:'8', popular:82, isNew:false },
  { id:9, name:'Купальник «Сапфир»',    price:10200, priceLabel:'от 10 200 ₽', emoji:'💙', desc:'Глубокий синий со стразами и сеточными вставками. Современный крой.', cls:'9', popular:90, isNew:true },
]

function applyFilters(products: Product[], filters: FilterState): Product[] {
  let result = [...products]
  if (filters.priceMin !== null) result = result.filter(p => p.price >= filters.priceMin!)
  if (filters.priceMax !== null) result = result.filter(p => p.price <= filters.priceMax!)
  if (filters.sort === 'price_asc') result.sort((a, b) => a.price - b.price)
  else if (filters.sort === 'price_desc') result.sort((a, b) => b.price - a.price)
  else if (filters.sort === 'new') result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
  else result.sort((a, b) => b.popular - a.popular)
  return result
}

export default function AtelierPage() {
  const [filters, setFilters] = useState<FilterState>({ discount: false, sort: 'popular', priceMin: null, priceMax: null, size: null })
  const [selected, setSelected] = useState<Product | null>(null)
  const [form, setForm] = useState({ name:'', lastName:'', phone:'', email:'', size:'', date:'', comment:'' })
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const stored = localStorage.getItem('mg_user')
    if (stored) {
      const user = JSON.parse(stored)
      setForm(f => ({ ...f, name: user.name || '', lastName: user.lastName || '', email: user.email || '', phone: user.phone || '' }))
    }
  }, [])

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) => setForm(f => ({ ...f, [k]: e.target.value }))

  async function submitForm(e: React.FormEvent) {
    e.preventDefault()
    if (!form.name || !form.phone) { setError('Заполните Имя и Телефон'); return }
    setLoading(true)
    try {
      const res = await fetch('/api/orders', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, last_name: form.lastName, phone: form.phone, email: form.email, product: selected?.name, size: form.size, competition_date: form.date || null, comment: form.comment }),
      })
      if (!res.ok) { const d = await res.json(); setError(d.error); return }
      setSelected(null); setToast(true); setTimeout(() => setToast(false), 4000)
    } catch { setError('Ошибка соединения с сервером') }
    finally { setLoading(false) }
  }

  const visible = applyFilters(PRODUCTS, filters)

  return (
    <>
      <Nav />
      <section className="page-hero compact">
        <div className="container">
          <div className="crumbs"><Link href="/">Главная</Link><span className="sep">/</span><span>Ателье</span></div>
          <h1>Купальники, <em>сшитые</em> с любовью</h1>
          <p className="lead">Выберите купальник и оставьте заявку — свяжемся в течение 24 часов.</p>
        </div>
      </section>

      <section style={{padding:'40px 0 100px', background:'#fff'}}>
        <div className="container">
          <FilterBar sizes={SIZES} onFilterChange={setFilters} />
          {visible.length === 0 ? (
            <div style={{textAlign:'center',padding:'60px 0',color:'var(--muted)',fontSize:16}}>
              Ничего не найдено — попробуйте изменить фильтры
            </div>
          ) : (
            <div className="catalog-grid">
              {visible.map(p => (
                <div className="prod-card" key={p.id} style={{position:'relative'}}>
                  <div className={`prod-card__img prod-card__img--${p.cls}`}>
                    {p.isNew && <span style={{position:'absolute',top:12,left:12,background:'var(--pink-deep)',color:'#fff',fontSize:10,fontWeight:700,padding:'3px 8px',borderRadius:999}}>НОВИНКА</span>}
                    {p.emoji}
                  </div>
                  <div className="prod-card__body">
                    <div className="prod-card__name">{p.name}</div>
                    <div className="prod-card__price">{p.priceLabel}</div>
                    <div className="prod-card__desc">{p.desc}</div>
                    <button className="prod-card__btn" onClick={() => { setSelected(p); setError('') }}>Выбрать</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {selected && (
        <div className="modal-bg open" onClick={e => { if(e.target===e.currentTarget) setSelected(null) }}>
          <div className="modal" style={{maxHeight:'90vh',overflowY:'auto'}}>
            <button className="close-btn" onClick={() => setSelected(null)}>×</button>
            <div style={{fontFamily:'Playfair Display,serif',fontSize:28,marginBottom:6}}>Оставить заявку</div>
            <div className="modal-sub">Мы свяжемся с вами в течение 24 часов</div>
            <div style={{background:'var(--pink-bg)',borderRadius:8,padding:'14px 18px',display:'flex',alignItems:'center',gap:14,marginBottom:24,border:'1px solid var(--pink-soft)'}}>
              <div style={{fontSize:30}}>{selected.emoji}</div>
              <div>
                <div style={{fontSize:14,fontWeight:600}}>{selected.name}</div>
                <div style={{fontSize:13,color:'var(--pink-deep)',fontWeight:700}}>{selected.priceLabel}</div>
              </div>
            </div>
            {error && <div className="auth-error" style={{marginBottom:14}}>{error}</div>}
            <form onSubmit={submitForm}>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
                <div className="field"><label>Имя *</label><input className="form-input" placeholder="Ваше имя" value={form.name} onChange={set('name')} /></div>
                <div className="field"><label>Фамилия</label><input className="form-input" placeholder="Фамилия" value={form.lastName} onChange={set('lastName')} /></div>
              </div>
              <div className="field"><label>Телефон *</label><input className="form-input" placeholder="+7 (___) ___-__-__" value={form.phone} onChange={set('phone')} /></div>
              <div className="field"><label>Email</label><input className="form-input" type="email" placeholder="example@mail.ru" value={form.email} onChange={set('email')} /></div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
                <div className="field"><label>Размер</label><input className="form-input" placeholder="30, 32, 34..." value={form.size} onChange={set('size')} /></div>
                <div className="field"><label>Дата соревнований</label><input className="form-input" type="date" value={form.date} onChange={set('date')} /></div>
              </div>
              <div className="field"><label>Комментарий</label><input className="form-input" placeholder="Пожелания..." value={form.comment} onChange={set('comment')} /></div>
              <button type="submit" className="btn btn-primary" style={{width:'100%',padding:16,marginTop:8}} disabled={loading}>
                {loading ? 'Отправляем...' : 'Отправить заявку'}
              </button>
            </form>
          </div>
        </div>
      )}
      <div className={`toast ${toast ? 'show' : ''}`}>✅ Заявка отправлена! Свяжемся в течение 24 часов.</div>
      <Footer />
    </>
  )
}