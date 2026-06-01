'use client'
import { useState, useEffect } from 'react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Link from 'next/link'

const PRODUCTS = [
  { id:1, name:'Купальник «Лебедь»',    price:'от 8 500 ₽', emoji:'🩱', desc:'Белый бархат с серебристой вышивкой. Идеален для лирических программ.', cls:'1' },
  { id:2, name:'Купальник «Весна»',      price:'от 7 200 ₽', emoji:'💜', desc:'Нежно-сиреневый с цветочной аппликацией. Лёгкий и воздушный крой.', cls:'2' },
  { id:3, name:'Купальник «Звезда»',     price:'от 9 800 ₽', emoji:'⭐', desc:'Тёмно-синий со стразами. Для торжественных выступлений.', cls:'3' },
  { id:4, name:'Купальник «Огонь»',      price:'от 8 000 ₽', emoji:'🔴', desc:'Алый с золотым градиентом. Динамичный дизайн для энергичных программ.', cls:'4' },
  { id:5, name:'Купальник «Морская»',    price:'от 6 900 ₽', emoji:'🩵', desc:'Бирюзовый с перламутровой отделкой. Плавные линии и мягкая ткань.', cls:'5' },
  { id:6, name:'Купальник «Принцесса»',  price:'от 11 500 ₽', emoji:'🌸', desc:'Персиковый со стразами. Премиальная ткань, индивидуальный пошив.', cls:'6' },
  { id:7, name:'Купальник «Закат»',      price:'от 7 800 ₽', emoji:'🌅', desc:'Оранжево-розовый переход. Яркий и запоминающийся на соревнованиях.', cls:'7' },
  { id:8, name:'Купальник «Изумруд»',    price:'от 8 900 ₽', emoji:'💚', desc:'Насыщенный зелёный с вышивкой. Благородный и элегантный.', cls:'8' },
  { id:9, name:'Купальник «Сапфир»',     price:'от 10 200 ₽', emoji:'💙', desc:'Глубокий синий со стразами и сеточными вставками. Современный крой.', cls:'9' },
]

type ModalProduct = { name: string; price: string; emoji: string } | null

export default function AtelierPage() {
  const [selected, setSelected] = useState<ModalProduct>(null)
  const [form, setForm] = useState({ name:'', lastName:'', phone:'', email:'', size:'', date:'', comment:'' })
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const stored = localStorage.getItem('mg_user')
    if (stored) {
      const user = JSON.parse(stored)
      setForm(f => ({
        ...f,
          name: user.name || '',
          lastName: user.lastName || '',
          email: user.email || '',
          phone: user.phone || '',
      }))
    }
  }, [])

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }))

  function openModal(p: typeof PRODUCTS[0]) {
    setSelected({ name: p.name, price: p.price, emoji: p.emoji })
    setError('')
  }

  function closeModal() { setSelected(null) }

  async function submitForm(e: React.FormEvent) {
    e.preventDefault()
    if (!form.name || !form.phone) { setError('Заполните Имя и Телефон'); return }
    setLoading(true)
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          last_name: form.lastName,
          phone: form.phone,
          email: form.email,
          product: selected?.name,
          size: form.size,
          competition_date: form.date || null,
          comment: form.comment,
        }),
      })
      if (!res.ok) { const d = await res.json(); setError(d.error); return }
      closeModal()
      setToast(true)
      setTimeout(() => setToast(false), 4000)
    } catch {
      setError('Ошибка соединения с сервером')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Nav />

      <section className="page-hero compact">
        <div className="container">
          <div className="crumbs"><Link href="/">Главная</Link><span className="sep">/</span><span>Ателье</span></div>
          {/* ПРАВКА: убрано "54 ателье" */}
          <h1>Купальники, <em>сшитые</em> с любовью</h1>
          <p className="lead">Выберите купальник и оставьте заявку — свяжемся в течение 24 часов.</p>
        </div>
      </section>

      <section style={{padding:'80px 0 100px', background:'#fff'}}>
        <div className="container">
          <div className="catalog-grid">
            {PRODUCTS.map(p => (
              <div className="prod-card" key={p.id}>
                <div className={`prod-card__img prod-card__img--${p.cls}`}>
                  {p.emoji}
                </div>
                <div className="prod-card__body">
                  <div className="prod-card__name">{p.name}</div>
                  <div className="prod-card__price">{p.price}</div>
                  <div className="prod-card__desc">{p.desc}</div>
                  <button className="prod-card__btn" onClick={() => openModal(p)}>Выбрать</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MODAL — ПРАВКА 11: добавлен скролл, все поля редактируемые */}
      {selected && (
        <div className="modal-bg open" onClick={e => { if(e.target===e.currentTarget) closeModal() }}>
          <div className="modal" style={{maxHeight:'90vh', overflowY:'auto'}}>
            <button className="close-btn" onClick={closeModal}>×</button>
            <div className="modal__title" style={{fontFamily:'Playfair Display,serif',fontSize:28,marginBottom:6}}>Оставить заявку</div>
            <div className="modal-sub">Мы свяжемся с вами в течение 24 часов</div>
            <div style={{background:'var(--pink-bg)',borderRadius:8,padding:'14px 18px',display:'flex',alignItems:'center',gap:14,marginBottom:24,border:'1px solid var(--pink-soft)'}}>
              <div style={{fontSize:30}}>{selected.emoji}</div>
              <div>
                <div style={{fontSize:14,fontWeight:600,color:'var(--ink)'}}>{selected.name}</div>
                <div style={{fontSize:13,color:'var(--pink-deep)',fontWeight:700}}>{selected.price}</div>
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