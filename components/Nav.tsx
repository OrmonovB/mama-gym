'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

type User = { name: string; email: string; role?: string }

export default function Nav() {
  const path = usePathname()
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('mg_user')
    if (stored) { try { setUser(JSON.parse(stored)) } catch {} }
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function logout() {
    localStorage.removeItem('mg_user')
    localStorage.removeItem('mg_token')
    setUser(null)
    router.push('/')
  }

  return (
    <header className={`header${scrolled ? ' scrolled' : ''}`}>
      <div className="container inner">
        <Link href="/" className="logo">
          <span className="mark">М</span>
          <span>Мама гимнастки<small>сообщество · 2026</small></span>
        </Link>
        <nav className="nav-links">
          <Link href="/articles" className={path === '/articles' ? 'active' : ''}>Статьи</Link>
          <Link href="/salons"   className={path === '/salons'   ? 'active' : ''}>Салоны</Link>
          <Link href="/atelier"  className={path === '/atelier'  ? 'active' : ''}>Ателье</Link>
          <Link href="/shops"    className={path === '/shops'    ? 'active' : ''}>Магазины</Link>
        </nav>
        <div className="header-right">
          {user ? (
            <>
              <div className="user-pill">
                <div className="user-av">{user.name?.[0]?.toUpperCase()}</div>
                <span className="user-name">{user.name}</span>
              </div>
              {user.role === 'admin' && (
                <Link href="/admin" className="btn btn-ghost btn-sm">Панель</Link>
              )}
              <button onClick={logout} className="btn btn-ghost btn-sm">Выйти</button>
            </>
          ) : (
            <>
              <Link href="/login" className="btn btn-ghost">Войти</Link>
              <Link href="/register" className="btn btn-primary">Зарегистрироваться</Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
