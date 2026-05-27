'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); setError(''); setLoading(true)
    try {
      const res = await fetch('/api/auth', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ email, password }) })
      const data = await res.json()
      if (!res.ok) { setError(data.error); return }
      localStorage.setItem('mg_user', JSON.stringify(data.user))
      localStorage.setItem('mg_token', data.accessToken)
      if (data.isAdmin) router.push('/admin'); else router.push('/')
    } catch { setError('Ошибка соединения с сервером') } finally { setLoading(false) }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <Link href="/" className="auth-logo">Мама гимнастки</Link>
        <div className="auth-title">Добро пожаловать</div>
        <div className="auth-sub">Войдите в свой аккаунт</div>
        {error && <div className="auth-error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="field"><label>Email</label><input type="email" placeholder="вы@example.com" value={email} onChange={e=>setEmail(e.target.value)} required/></div>
          <div className="field"><label>Пароль</label><input type="password" placeholder="••••••••" value={password} onChange={e=>setPassword(e.target.value)} required/></div>
          <button type="submit" className="btn btn-primary" style={{width:'100%',padding:16,marginTop:8}} disabled={loading}>{loading?'Вход...':'Войти'}</button>
        </form>
        <div className="modal-foot" style={{marginTop:18}}>Нет аккаунта? <Link href="/register" style={{color:'var(--pink-deep)',fontWeight:600}}>Зарегистрироваться</Link></div>
        <div style={{textAlign:'center',marginTop:12}}><Link href="/" style={{fontSize:13,color:'var(--muted)'}}>← На главную</Link></div>
      </div>
    </div>
  )
}
