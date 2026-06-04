'use client'
import { useState } from 'react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Link from 'next/link'
import FilterBar, { FilterState } from '@/components/FilterBar'

type ShopItem = {
  id: number; name: string; category: string; spec: string
  price: number; priceLabel: string; emoji: string; tag: string
  popular: number; isNew: boolean
}

const ITEMS: ShopItem[] = [
  { id:1,  name:'Скакалка',           category:'Предметы',         spec:'Скакалка для художественной гимнастики', price:890,  priceLabel:'от 890 ₽',   emoji:'🪢', tag:'Топ выбор', popular:95, isNew:false },
  { id:2,  name:'Обруч',              category:'Предметы',         spec:'Обруч диаметром 60–90 см',              price:1200, priceLabel:'от 1 200 ₽',  emoji:'⭕', tag:'',          popular:88, isNew:false },
  { id:3,  name:'Мяч',                category:'Предметы',         spec:'Мяч диаметром 15–18.5 см',             price:950,  priceLabel:'от 950 ₽',    emoji:'🔵', tag:'Проверено', popular:82, isNew:false },
  { id:4,  name:'Булавы',             category:'Предметы',         spec:'Булавы 36–45.5 см',                    price:1500, priceLabel:'от 1 500 ₽',  emoji:'🎳', tag:'',          popular:78, isNew:false },
  { id:5,  name:'Лента',              category:'Предметы',         spec:'Лента 4–6 м с палочкой',               price:750,  priceLabel:'от 750 ₽',    emoji:'🎀', tag:'',          popular:85, isNew:false },
  { id:6,  name:'Палочка для ленты',  category:'Предметы',         spec:'Палочка 50–60 см',                     price:400,  priceLabel:'от 400 ₽',    emoji:'🪄', tag:'',          popular:70, isNew:false },
  /* ПРАВКА: разделены топы и майки */
  { id:7,  name:'Топы',               category:'Одежда',           spec:'Тренировочные топы',                   price:1400, priceLabel:'от 1 400 ₽',  emoji:'🩴', tag:'',          popular:88, isNew:true  },
  { id:8,  name:'Майки',              category:'Одежда',           spec:'Тренировочные майки',                  price:1200, priceLabel:'от 1 200 ₽',  emoji:'👚', tag:'',          popular:85, isNew:false },
  { id:9,  name:'Шорты',              category:'Одежда',           spec:'Шорты для тренировок',                 price:1200, priceLabel:'от 1 200 ₽',  emoji:'🩳', tag:'Проверено', popular:86, isNew:false },
  { id:10, name:'Футболки',           category:'Одежда',           spec:'Футболки для тренировок',              price:1100, priceLabel:'от 1 100 ₽',  emoji:'👕', tag:'',          popular:80, isNew:false },
  /* ПРАВКА: разделены лосины и бриджи */
  { id:11, name:'Лосины',             category:'Одежда',           spec:'Лосины для тренировок',                price:2100, priceLabel:'от 2 100 ₽',  emoji:'🖤', tag:'',          popular:90, isNew:false },
  { id:12, name:'Бриджи',             category:'Одежда',           spec:'Бриджи для тренировок',                price:1800, priceLabel:'от 1 800 ₽',  emoji:'👖', tag:'',          popular:82, isNew:false },
  { id:13, name:'Кофты',              category:'Одежда',           spec:'Спортивные кофты',                     price:2500, priceLabel:'от 2 500 ₽',  emoji:'🧥', tag:'',          popular:75, isNew:true  },
  { id:14, name:'Спортивные штаны',   category:'Одежда',           spec:'Штаны для тренировок',                 price:2200, priceLabel:'от 2 200 ₽',  emoji:'👔', tag:'',          popular:72, isNew:false },
  { id:15, name:'Спортивные костюмы', category:'Одежда',           spec:'Костюмы для тренировок',               price:4500, priceLabel:'от 4 500 ₽',  emoji:'🎽', tag:'Топ выбор', popular:88, isNew:false },
  { id:16, name:'Рюкзаки',            category:'Чехлы и рюкзаки', spec:'Рюкзаки для гимнастики',              price:3500, priceLabel:'от 3 500 ₽',  emoji:'🎒', tag:'Топ выбор', popular:92, isNew:false },
  { id:17, name:'Чехол для скакалки', category:'Чехлы и рюкзаки', spec:'Чехол для скакалки',                  price:500,  priceLabel:'от 500 ₽',    emoji:'🛍️', tag:'',          popular:75, isNew:false },
  { id:18, name:'Чехол для обруча',   category:'Чехлы и рюкзаки', spec:'Чехлы для обруча',                    price:800,  priceLabel:'от 800 ₽',    emoji:'🛍️', tag:'',          popular:80, isNew:false },
  { id:19, name:'Чехол для мяча',     category:'Чехлы и рюкзаки', spec:'Чехлы для мяча',                      price:600,  priceLabel:'от 600 ₽',    emoji:'🛍️', tag:'',          popular:78, isNew:false },
  { id:20, name:'Чехол для булав',    category:'Чехлы и рюкзаки', spec:'Чехлы для булав',                     price:700,  priceLabel:'от 700 ₽',    emoji:'🛍️', tag:'',          popular:70, isNew:false },
  { id:21, name:'Полупальцы',         category:'Сопутствующие',   spec:'Полупальцы для гимнастики',           price:350,  priceLabel:'от 350 ₽',    emoji:'🤚', tag:'',          popular:88, isNew:false },
  { id:22, name:'Гетры и носки',      category:'Сопутствующие',   spec:'Гетры и носки для гимнастики',        price:280,  priceLabel:'от 280 ₽',    emoji:'🧦', tag:'',          popular:82, isNew:false },
  /* ПРАВКА: резина для растяжки → резина для стоп */
  { id:23, name:'Резина для стоп',    category:'Сопутствующие',   spec:'Эластичная резина для стоп',          price:450,  priceLabel:'от 450 ₽',    emoji:'🦶', tag:'Проверено', popular:85, isNew:false },
  { id:24, name:'Наколенники',        category:'Сопутствующие',   spec:'Наколенники для гимнастики',          price:600,  priceLabel:'от 600 ₽',    emoji:'🦵', tag:'',          popular:76, isNew:false },
]

function applyFilters(items: ShopItem[], filters: FilterState): ShopItem[] {
  let result = [...items]
  if (filters.priceMin !== null) result = result.filter(p => p.price >= filters.priceMin!)
  if (filters.priceMax !== null) result = result.filter(p => p.price <= filters.priceMax!)
  if (filters.sort === 'price_asc') result.sort((a, b) => a.price - b.price)
  else if (filters.sort === 'price_desc') result.sort((a, b) => b.price - a.price)
  else if (filters.sort === 'new') result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
  else result.sort((a, b) => b.popular - a.popular)
  return result
}

const CATEGORIES = ['Все', 'Предметы', 'Одежда', 'Чехлы и рюкзаки', 'Сопутствующие']

export default function ShopsPage() {
  const [filters, setFilters] = useState<FilterState>({ discount: false, sort: 'popular', priceMin: null, priceMax: null, size: null })
  const [category, setCategory] = useState('Все')
  const [orderItem, setOrderItem] = useState<ShopItem | null>(null)
  const [orderForm, setOrderForm] = useState({ name:'', phone:'', size:'', color:'', comment:'' })
  const [orderLoading, setOrderLoading] = useState(false)
  const [toast, setToast] = useState(false)
  const [orderError, setOrderError] = useState('')

  const setField = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setOrderForm(f => ({ ...f, [k]: e.target.value }))

  async function submitOrder(e: React.FormEvent) {
    e.preventDefault()
    if (!orderForm.name || !orderForm.phone) { setOrderError('Заполните Имя и Телефон'); return }
    setOrderLoading(true)
    try {
      const res = await fetch('/api/orders', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: orderForm.name, phone: orderForm.phone,
          product: orderItem?.name,
          size: orderForm.size,
          comment: `Цвет: ${orderForm.color}. ${orderForm.comment}`.trim(),
        }),
      })
      if (!res.ok) { const d = await res.json(); setOrderError(d.error); return }
      setOrderItem(null)
      setOrderForm({ name:'', phone:'', size:'', color:'', comment:'' })
      setToast(true); setTimeout(() => setToast(false), 4000)
    } catch { setOrderError('Ошибка соединения') }
    finally { setOrderLoading(false) }
  }

  const filtered = applyFilters(
    category === 'Все' ? ITEMS : ITEMS.filter(i => i.category === category),
    filters
  )

  return (
    <>
      <Nav />
      <section className="page-hero compact">
        <div className="container">
          <div className="crumbs"><Link href="/">Главная</Link><span className="sep">/</span><span>Магазин</span></div>
          <h1>Магазин для <em>гимнасток</em></h1>
          <p className="lead">Скакалка, обруч, мяч, булавы, лента и тренировочная одежда — всё для художественной гимнастики.</p>
        </div>
      </section>

      <section style={{padding:'40px 0 100px', background:'#fff'}}>
        <div className="container">
          <div style={{display:'flex', gap:8, flexWrap:'wrap', marginBottom:8}}>
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setCategory(cat)} style={{
                padding:'8px 18px', borderRadius:999, fontSize:13, fontWeight:600,
                fontFamily:'Manrope,sans-serif', cursor:'pointer', border:'1.5px solid',
                borderColor: category === cat ? 'var(--pink-deep)' : 'rgba(43,43,43,.18)',
                background: category === cat ? 'var(--pink-deep)' : '#fff',
                color: category === cat ? '#fff' : 'var(--ink)', transition:'all .2s',
              }}>{cat}</button>
            ))}
          </div>

          <FilterBar showDiscount={false} onFilterChange={setFilters} />

          {filtered.length === 0 ? (
            <div style={{textAlign:'center', padding:'60px 0', color:'var(--muted)', fontSize:16}}>
              Ничего не найдено — попробуйте изменить фильтры
            </div>
          ) : (
            <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))', gap:24}}>
              {filtered.map(s => (
                <div key={s.id} style={{border:'1px solid rgba(43,43,43,.08)', borderRadius:24, overflow:'hidden', background:'#fff', transition:'transform .25s,box-shadow .25s', position:'relative'}}>
                  <div style={{height:160, background:'linear-gradient(135deg,#2b2b2b,#4a4244)', position:'relative', display:'flex', alignItems:'center', justifyContent:'center'}}>
                    <span style={{fontSize:48}}>{s.emoji}</span>
                    {s.tag && <span style={{position:'absolute', top:14, right:14, background:'rgba(255,255,255,.18)', backdropFilter:'blur(8px)', color:'#fff', padding:'5px 12px', borderRadius:999, fontSize:11, fontWeight:600}}>{s.tag}</span>}
                    {s.isNew && <span style={{position:'absolute', top:14, left:14, background:'var(--pink-deep)', color:'#fff', fontSize:10, fontWeight:700, padding:'3px 8px', borderRadius:999}}>НОВИНКА</span>}
                  </div>
                  <div style={{padding:22}}>
                    <div style={{fontSize:12, color:'#D97C8A', fontWeight:600, marginBottom:6, textTransform:'uppercase' as const, letterSpacing:'.08em'}}>{s.category}</div>
                    <div style={{fontFamily:'Playfair Display,serif', fontSize:20, fontWeight:500, marginBottom:4}}>{s.name}</div>
                    <div style={{fontSize:13, color:'#4a4244', marginBottom:10}}>{s.spec}</div>
                    <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                      <div style={{fontSize:15, fontWeight:700, color:'var(--pink-deep)'}}>{s.priceLabel}</div>
                      <button
                        onClick={() => { setOrderItem(s); setOrderError('') }}
                        style={{background:'var(--ink)', color:'#fff', border:'none', borderRadius:999, padding:'8px 16px', fontSize:13, fontWeight:600, fontFamily:'Manrope,sans-serif', cursor:'pointer'}}
                      >Заказать</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {orderItem && (
        <div className="modal-bg open" onClick={e => { if(e.target===e.currentTarget) setOrderItem(null) }}>
          <div className="modal" style={{maxHeight:'90vh', overflowY:'auto'}}>
            <button className="close-btn" onClick={() => setOrderItem(null)}>×</button>
            <div style={{fontFamily:'Playfair Display,serif', fontSize:28, marginBottom:6}}>Оформить заказ</div>
            <div className="modal-sub">Мы свяжемся с вами в течение 24 часов</div>
            <div style={{background:'var(--pink-bg)', borderRadius:8, padding:'14px 18px', display:'flex', alignItems:'center', gap:14, marginBottom:24, border:'1px solid var(--pink-soft)'}}>
              <div style={{fontSize:30}}>{orderItem.emoji}</div>
              <div>
                <div style={{fontSize:14, fontWeight:600}}>{orderItem.name}</div>
                <div style={{fontSize:13, color:'var(--pink-deep)', fontWeight:700}}>{orderItem.priceLabel}</div>
              </div>
            </div>
            {orderError && <div className="auth-error" style={{marginBottom:14}}>{orderError}</div>}
            <form onSubmit={submitOrder}>
              <div className="field"><label>Имя *</label><input className="form-input" placeholder="Ваше имя" value={orderForm.name} onChange={setField('name')} /></div>
              <div className="field"><label>Телефон *</label><input className="form-input" placeholder="+7 (___) ___-__-__" value={orderForm.phone} onChange={setField('phone')} /></div>
              <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12}}>
                <div className="field"><label>Размер</label><input className="form-input" placeholder="XS, S, M, L..." value={orderForm.size} onChange={setField('size')} /></div>
                <div className="field"><label>Цвет</label><input className="form-input" placeholder="Синий, красный..." value={orderForm.color} onChange={setField('color')} /></div>
              </div>
              <div className="field"><label>Комментарий</label><input className="form-input" placeholder="Пожелания к заказу..." value={orderForm.comment} onChange={setField('comment')} /></div>
              <button type="submit" className="btn btn-primary" style={{width:'100%', padding:16, marginTop:8}} disabled={orderLoading}>
                {orderLoading ? 'Отправляем...' : 'Отправить заявку'}
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