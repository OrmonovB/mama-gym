import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Link from 'next/link'

/* ПРАВКА 2.1: реальные студии Москвы */
const SALONS = [
  { name:'NATASHA DOLOTOV STUDIO', city:'Москва', spec:'Макияж и причёски для выступлений', rating:'5.0', reviews:214, tag:'Топ выбор', site:'https://natashadolotov-studio.ru/' },
  { name:'Академия причёсок и макияжа', city:'Москва', spec:'Причёски и макияж', rating:'4.9', reviews:186, tag:'Проверено', site:'https://academy-stylist.ru/gym/' },
  { name:'Фокус имидж-студия', city:'Москва', spec:'Макияж и автозагар', rating:'4.8', reviews:142, tag:'', site:'https://focusimage.ru/' },
  { name:'RG-Queen', city:'Москва', spec:'Причёски и макияж для гимнасток', rating:'4.9', reviews:97, tag:'Проверено', site:'https://rg-queen.ru/' },
  { name:'iLonShi', city:'Москва', spec:'Моментальный загар', rating:'4.8', reviews:73, tag:'', site:'https://ilonshi.ru' },
  { name:'BRONZEGLOW', city:'Москва', spec:'Автозагар для выступлений', rating:'4.7', reviews:58, tag:'', site:'https://bronzeglow.ru/' },
]

export default function SalonsPage() {
  return (
    <>
      <Nav />
      <section className="page-hero compact">
        <div className="container">
          <div className="crumbs"><Link href="/">Главная</Link><span className="sep">/</span><span>Студии</span></div>
          <h1>Студии для <em>гимнасток</em></h1>
          <p className="lead">Макияж, причёски и автозагар для выступлений — мастера, которые знают специфику художественной гимнастики.</p>
        </div>
      </section>

      <section style={{padding:'80px 0 100px', background:'#fff'}}>
        <div className="container">
          <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))', gap:24}}>
            {SALONS.map((s,i) => (
              <div key={i} style={{border:'1px solid rgba(43,43,43,.08)', borderRadius:24, overflow:'hidden', background:'#fff', transition:'transform .25s, box-shadow .25s'}}>
                <div style={{height:160, background:'linear-gradient(135deg,#F5D5DB,#D97C8A)', position:'relative', display:'flex', alignItems:'center', justifyContent:'center'}}>
                  <span style={{fontSize:48}}>💄</span>
                  {s.tag && <span style={{position:'absolute', top:14, right:14, background:'rgba(43,43,43,.85)', color:'#fff', padding:'5px 12px', borderRadius:999, fontSize:11, fontWeight:600}}>{s.tag}</span>}
                </div>
                <div style={{padding:22}}>
                  <div style={{fontSize:12, color:'#D97C8A', fontWeight:600, marginBottom:6, textTransform:'uppercase' as const, letterSpacing:'.08em'}}>{s.city}</div>
                  <div style={{fontFamily:'Playfair Display,serif', fontSize:18, fontWeight:500, marginBottom:4}}>{s.name}</div>
                  <div style={{fontSize:13, color:'#4a4244', marginBottom:14}}>{s.spec}</div>
                  <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                    <div style={{display:'flex', alignItems:'center', gap:6, fontSize:13}}>
                      <span style={{color:'#F2B544', fontWeight:600}}>★ {s.rating}</span>
                      <span style={{color:'#8a7a7d'}}>({s.reviews} отзывов)</span>
                    </div>
                    <a href={s.site} target="_blank" rel="noopener noreferrer"
                      style={{fontSize:12, color:'#D97C8A', fontWeight:600, textDecoration:'none', border:'1px solid #D97C8A', padding:'5px 12px', borderRadius:999, transition:'all .2s'}}>
                      На сайт →
                    </a>
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