import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Link from 'next/link'

const SALONS = [
  { name:'Студия Elegance', city:'Москва', spec:'Причёски для соревнований', rating:'4.9', reviews:128, tag:'Топ выбор' },
  { name:'Beauty Star', city:'Санкт-Петербург', spec:'Макияж и причёска', rating:'4.8', reviews:96, tag:'' },
  { name:'Гримёрная', city:'Казань', spec:'Сценический грим', rating:'4.9', reviews:84, tag:'Проверено' },
  { name:'Студия Ариэль', city:'Екатеринбург', spec:'Причёски и маникюр', rating:'4.7', reviews:62, tag:'' },
  { name:'Primavera Beauty', city:'Новосибирск', spec:'Полная подготовка', rating:'4.8', reviews:74, tag:'Проверено' },
  { name:'Мастерская образов', city:'Краснодар', spec:'Грим и причёска', rating:'4.6', reviews:51, tag:'' },
]

export default function SalonsPage() {
  return (
    <>
      <Nav />
      <section className="page-hero compact">
        <div className="container">
          <div className="crumbs"><Link href="/">Главная</Link><span className="sep">/</span><span>Салоны</span></div>
          <div className="ph-eyebrow"><span className="dot"></span>86 салонов</div>
          <h1>Салоны для <em>гимнасток</em></h1>
          <p className="lead">Причёски, грим, маникюр и подготовка к выступлениям — мастера, которые знают специфику спортивной гимнастики.</p>
        </div>
      </section>

      <section style={{padding:'80px 0 100px', background:'#fff'}}>
        <div className="container">
          <div style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:24}}>
            {SALONS.map((s,i) => (
              <div key={i} style={{border:'1px solid rgba(43,43,43,.08)',borderRadius:24,overflow:'hidden',background:'#fff',transition:'transform .25s, box-shadow .25s',cursor:'pointer'}}>
                <div style={{height:160,background:`linear-gradient(135deg,#F5D5DB,#D97C8A)`,position:'relative',display:'flex',alignItems:'center',justifyContent:'center'}}>
                  <span style={{fontSize:48}}>💅</span>
                  {s.tag && <span style={{position:'absolute',top:14,right:14,background:'rgba(43,43,43,.85)',color:'#fff',padding:'5px 12px',borderRadius:999,fontSize:11,fontWeight:600}}>{s.tag}</span>}
                </div>
                <div style={{padding:22}}>
                  <div style={{fontSize:12,color:'#D97C8A',fontWeight:600,marginBottom:6,textTransform:'uppercase' as any,letterSpacing:'.08em'}}>{s.city}</div>
                  <div style={{fontFamily:'Playfair Display,serif',fontSize:20,fontWeight:500,marginBottom:4}}>{s.name}</div>
                  <div style={{fontSize:13,color:'#4a4244',marginBottom:14}}>{s.spec}</div>
                  <div style={{display:'flex',alignItems:'center',gap:6,fontSize:13}}>
                    <span style={{color:'#F2B544',fontWeight:600}}>★ {s.rating}</span>
                    <span style={{color:'#8a7a7d'}}>({s.reviews} отзывов)</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}
