'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const router = useRouter()
  const [form, setForm] = useState({ name:'', lastName:'', email:'', password:'', phone:'+7' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const set = (k:string) => (e:React.ChangeEvent<HTMLInputElement>) => setForm(f=>({...f,[k]:e.target.value}))

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); setError(''); setLoading(true)
    try {
      const res = await fetch('/api/register', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(form) })
      const data = await res.json()
      if (!res.ok) { setError(data.error); return }
      if (data.autoLogin && data.user) {
        localStorage.setItem('mg_user', JSON.stringify(data.user))
        localStorage.setItem('mg_token', data.accessToken)
        router.push('/')
      } else { router.push('/login') }
    } catch { setError('Ошибка соединения с сервером') } finally { setLoading(false) }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <Link href="/" className="auth-logo">Мама гимнастки</Link>
        <div className="auth-title">Присоединиться</div>
        <div className="auth-sub">Создайте аккаунт за минуту — это бесплатно</div>
        {error && <div className="auth-error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
            <div className="field"><label>Имя *</label><input placeholder="Анна" value={form.name} onChange={set('name')} required/></div>
            <div className="field"><label>Фамилия</label><input placeholder="Иванова" value={form.lastName} onChange={set('lastName')}/></div>
          </div>
          <div className="field"><label>Телефон</label><input placeholder="+7 (___) ___-__-__" value={form.phone} onChange={set('phone')}/></div>
          <div className="field"><label>Email *</label><input type="email" placeholder="вы@example.com" value={form.email} onChange={set('email')} required/></div>
          <div className="field"><label>Пароль *</label><input type="password" placeholder="Минимум 6 символов" value={form.password} onChange={set('password')} required/></div>
          <button type="submit" className="btn btn-primary" style={{width:'100%',padding:16,marginTop:8}} disabled={loading}>{loading?'Регистрация...':'Создать аккаунт'}</button>
        </form>
        <div className="modal-foot" style={{marginTop:18}}>Уже с нами? <Link href="/login" style={{color:'var(--pink-deep)',fontWeight:600}}>Войти</Link></div>
        <div style={{textAlign:'center',marginTop:12}}><Link href="/" style={{fontSize:13,color:'var(--muted)'}}>← На главную</Link></div>
      </div>
    </div>
  )
}
