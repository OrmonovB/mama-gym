'use client'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  const [modal, setModal] = useState<'login'|'register'|null>(null)
  const [tab, setTab] = useState<'login'|'register'>('register')
  const [form, setForm] = useState({ name:'', lastName:'', email:'', password:'', phone:'+7' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const [user, setUser] = useState<{name:string}|null>(null)

  useEffect(() => {
    const stored = localStorage.getItem('mg_user')
    if (stored) { try { setUser(JSON.parse(stored)) } catch {} }
  }, [])

  const set = (k:string) => (e:React.ChangeEvent<HTMLInputElement>) => setForm(f=>({...f,[k]:e.target.value}))

  function openModal(t:'login'|'register') { setTab(t); setModal(t); setError('') }
  function closeModal() { setModal(null); setError('') }

  async function handleAuth(e:React.FormEvent) {
    e.preventDefault(); setError(''); setLoading(true)
    try {
      if (tab === 'register') {
        const res = await fetch('/api/register', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ name: form.name, email: form.email, password: form.password }) })
        const data = await res.json()
        if (!res.ok) { setError(data.error); return }
        if (data.user) { localStorage.setItem('mg_user', JSON.stringify(data.user)); localStorage.setItem('mg_token', data.accessToken) }
        closeModal(); router.refresh()
      } else {
        const res = await fetch('/api/auth', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ email: form.email, password: form.password }) })
        const data = await res.json()
        if (!res.ok) { setError(data.error); return }
        localStorage.setItem('mg_user', JSON.stringify(data.user)); localStorage.setItem('mg_token', data.accessToken)
        setUser(data.user)
        closeModal()
        if (data.isAdmin) router.push('/admin')
      }
    } catch { setError('Ошибка соединения') } finally { setLoading(false) }
  }

  return (
    <>
      <Nav />

      {/* HERO */}
      <section className="hero">
        <div className="container hero-inner" style={{paddingLeft:32, paddingRight:32}}>
          <div className="hero-text">
            <div className="eyebrow"><span className="dot"></span>Сообщество мам · 12 400+ участниц</div>
            <h1>Мама<br/>гимнастки:<br/><em>вместе</em> <span className="stroke">к&nbsp;успеху</span></h1>
            {/* ПРАВКА 1: убран лишний отступ — hero-cta теперь без margin-top на laptop */}
            <p>Платформа для мам, чьи дочки занимаются художественной гимнастикой. Проверенные купальники и магазины, студии красоты, статьи от экспертов — всё в одном месте.</p>
            <div className="hero-cta">
              {!user && (
                <button className="btn btn-primary btn-lg" onClick={() => openModal('register')}>
                  Зарегистрироваться
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
                </button>
              )}
            </div>
            <div className="hero-meta">
              <div className="stat"><div className="n">12k+</div><div className="l">мам в сообществе</div></div>
              <div className="stat"><div className="n">4.9</div><div className="l">средний рейтинг</div></div>
            </div>
          </div>
          <div className="hero-photo">
            <div className="frame">
              <img src="/images/hero-gymnast.jpg" alt="Гимнастка" style={{objectPosition:'right center'}} />
            </div>
          </div>
        </div>
        <div className="scroll-cue"><span>прокрутите</span><span className="line"></span></div>
      </section>

      {/* MARQUEE */}
      <div className="marquee" aria-hidden="true">
        <div className="track">
          {['художественная гимнастика','купальники на заказ','проверенные студии','сообщество мам','советы тренеров',
            'художественная гимнастика','купальники на заказ','проверенные студии','сообщество мам','советы тренеров'].map((t,i) => (
            <span key={i}>{t}<span className="mdot" style={{margin:'0 0 0 48px'}}></span></span>
          ))}
        </div>
      </div>

      {/* ABOUT */}
      {/* ПРАВКА 8: переписан текст под новичков/лайфхаки, убраны репетиции */}
      <section className="about" id="about">
        <div className="container about-inner">
          <div className="section-eyebrow">о нас</div>
          <h2>Мы знаем, как непросто начинать путь в мире <em>художественной&nbsp;гимнастики</em></h2>
          <p className="about-lead">Поиск идеального купальника, подготовка к первым выступлениям, правильная одежда и снаряды — каждый шаг хочется сделать правильно, но информации так мало.</p>
          <p className="about-body">«Мама гимнастки» — это пространство для мам, чьи дочери только начинают свой путь в гимнастике. Здесь вы найдёте все лайфхаки подготовки: проверенные купальники, спортивную одежду и предметы для художественной гимнастики, студии по макияжу и причёскам, а также сообщество мам, которые уже прошли этот путь.</p>
          <div className="about-sig">— команда «Мама гимнастки»</div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="cats" id="categories">
        <div className="container">
          <div className="cats-head">
            {/* ПРАВКА 7: новый заголовок */}
            <h2>Четыре раздела, которые помогут создать <em>лучшие условия</em> для вашей гимнастки</h2>
            <p>Каждое место отобрано вручную и проверено сообществом мам. Всё что нужно — в одном месте.</p>
          </div>
          <div className="cats-grid">
            {[
              { href:'/articles', num:'01', tag:'Статьи', title:'Статьи', desc:'Советы экспертов, разборы упражнений, питание и психология юной спортсменки.', bg:'linear-gradient(135deg,#fce6ea,#e8aeb7)' },
              {
                // ПРАВКА 4: грим/маникюр → макияж и автозагар
                href:'/salons', num:'02', tag:'Студии', title:'Студии', desc:'Макияж, причёски и автозагар для выступлений — мастера, которые знают специфику.', bg:'linear-gradient(135deg,#2b2b2b,#D97C8A)' },
              {
                // ПРАВКА 5: убраны "Эскизы, ткани", кристаллы → стразы
                href:'/atelier', num:'03', tag:'Ателье', title:'Ателье', desc:'Купальники на заказ от мастеров, которые шьют для чемпионок. Стразы, индивидуальный крой.', bg:'linear-gradient(135deg,#F5D5DB,#D97C8A)' },
              {
                // ПРАВКА 6: Магазины → Магазин, убраны чешки, добавлены снаряды
                href:'/shops', num:'04', tag:'Магазин', title:'Магазин', desc:'Скакалка, обруч, мяч, булавы, лента — всё для тренировок и соревнований.', bg:'linear-gradient(135deg,#2b2b2b,#4a4244)' },
            ].map(c => (
              <Link href={c.href} key={c.href} className="cat">
                <div className="bg" style={{ background: c.bg }}></div>
                <div className="num">{c.num}</div>
                <div className="ctag">{c.tag}</div>
                <div className="body">
                  <h3>{c.title}</h3>
                  <div className="desc">{c.desc}</div>
                  <div className="arrow">Перейти <span className="a">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
                  </span></div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="why">
        <div className="container">
          <div className="why-head">
            <h2>Почему <em>нам</em> доверяют</h2>
            <p>Каждое решение, каждый раздел и каждое место на платформе проходит проверку. Мы строим то, чего нам самим не хватало.</p>
          </div>
          <div className="why-grid">
            {[
              { n:'— 01', title:'Проверенная информация', text:'Каждый материал и каждое место отбирается командой и подтверждается реальными мамами.',
                icon:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M9 12l2 2 4-4"/><path d="M12 2l9 4v6c0 5-3.5 9-9 10C6.5 21 3 17 3 12V6l9-4z"/></svg> },
              { n:'— 02', title:'Эксперты рядом', text:'Тренеры, хореографы и психологи отвечают на вопросы и пишут материалы для платформы.',
                icon:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-7 8-7s8 3 8 7"/></svg> },
              {
                // ПРАВКА 2: "нужный салон" вместо "нужное ателье"
                n:'— 03', title:'Удобный поиск', text:'Фильтры по рейтингу и специализации. Нужный салон или купальник — за пару секунд.',
                icon:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg> },
              { n:'— 04', title:'Тёплое сообщество', text:'Мамы, которые понимают вас без слов. Поддержка, советы и дружба на годы вперёд.',
                icon:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M20.84 4.6a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.07a5.5 5.5 0 1 0-7.78 7.78l1.06 1.07L12 21.23l7.78-7.78 1.06-1.07a5.5 5.5 0 0 0 0-7.78z"/></svg> },
            ].map(f => (
              <div className="feat" key={f.n}>
                <div className="n">{f.n}</div>
                <div className="ic">{f.icon}</div>
                <h4>{f.title}</h4>
                <p>{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-band">
            <div>
              <h2>Присоединяйтесь к&nbsp;<em>сообществу</em></h2>
              <p>Бесплатная регистрация. Получите доступ к каталогам купальников, студий и магазина, а также к закрытым материалам от экспертов.</p>
              <div className="cta-actions">
                <button className="btn btn-dark btn-lg" onClick={() => openModal('register')}>
                  Зарегистрироваться
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
                </button>
                <button className="btn btn-ghost btn-lg" onClick={() => openModal('login')}>Войти</button>
              </div>
            </div>
            <div className="cta-vis">
              {/* ПРАВКА 3: "нашла салон за один вечер" */}
              {[{av:'А',t:'Анна, Москва',s:'«нашла салон за один вечер!»'},{av:'К',t:'Катерина, СПб',s:'«сообщество — это сила»'},{av:'О',t:'Ольга, Казань',s:'«статьи — клад для новичков»'}].map(c=>(
                <div className="card" key={c.av}><div className="av">{c.av}</div><div><div className="t">{c.t}</div><div className="s">{c.s}</div></div></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* MODAL — ПРАВКА 11: исправлен скролл модального окна */}
      {modal && (
        <div className="modal-bg open" onClick={e => { if(e.target===e.currentTarget) closeModal() }}>
          <div className="modal" style={{maxHeight:'90vh', overflowY:'auto'}}>
            <button className="close-btn" onClick={closeModal}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 6l12 12M6 18L18 6"/></svg>
            </button>
            <h3>Добро пожаловать в <em>сообщество</em></h3>
            <p className="modal-sub">{tab==='register' ? 'Создайте аккаунт за минуту — это бесплатно.' : 'Рады видеть вас снова.'}</p>
            <div className="mtabs">
              <button className={tab==='register'?'active':''} onClick={()=>{setTab('register');setError('')}}>Регистрация</button>
              <button className={tab==='login'?'active':''} onClick={()=>{setTab('login');setError('')}}>Вход</button>
            </div>
            {error && <div className="auth-error">{error}</div>}
           <form onSubmit={handleAuth}>
              {tab === 'register' && (
                <>
                  <div className="field"><label>Ваше имя</label><input placeholder="Анна" value={form.name} onChange={set('name')} required/></div>
                  <div className="field"><label>Фамилия</label><input placeholder="Иванова" value={form.lastName} onChange={set('lastName')}/></div>
                  <div className="field"><label>Телефон</label><input placeholder="+7 (___) ___-__-__" value={form.phone} onChange={e => {
                    let val = e.target.value
                    if (!val.startsWith('+7')) val = '+7' + val.replace(/^\+?7?/, '')
                    setForm(f => ({ ...f, phone: val }))
                  }} onFocus={() => { if (!form.phone) setForm(f => ({ ...f, phone: '+7' })) }}/></div>
                  <div className="field"><label>Email</label><input type="email" placeholder="вы@example.com" value={form.email} onChange={set('email')} required/></div>
                  <div className="field"><label>Пароль</label><input type="password" placeholder="••••••••" value={form.password} onChange={set('password')} required/></div>
                </>
              )}
              {tab === 'login' && (
                <>
                  <div className="field"><label>Email или телефон</label><input placeholder="вы@example.com или +7 999..." value={form.email} onChange={set('email')} required/></div>
                  <div className="field"><label>Пароль</label><input type="password" placeholder="••••••••" value={form.password} onChange={set('password')} required/></div>
                </>
              )}
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Загрузка...' : tab === 'register' ? 'Создать аккаунт' : 'Войти'}
              </button>
            </form>
            <div className="modal-foot">
              {tab==='register' ? <>Уже с нами? <a onClick={()=>{setTab('login');setError('')}}>Войти</a></> : <>Нет аккаунта? <a onClick={()=>{setTab('register');setError('')}}>Зарегистрироваться</a></>}
            </div>
          </div>
        </div>
      )}
    </>
  )
}