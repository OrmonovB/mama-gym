import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Link from 'next/link'

// ПРАВКА: убраны чешки, добавлены скакалка/обруч/мяч/булавы/лента, переименовано в Магазин
const SHOPS = [
  { name:'Скакалки', city:'Предметы', spec:'Скакалки для художественной гимнастики', rating:'4.9', reviews:214, emoji:'🪢', tag:'Топ выбор' },
  { name:'Обручи', city:'Предметы', spec:'Обручи диаметром 60–90 см', rating:'4.8', reviews:176, emoji:'⭕', tag:'' },
  { name:'Мячи', city:'Предметы', spec:'Мячи диаметром 15–18.5 см', rating:'4.7', reviews:132, emoji:'🔵', tag:'Проверено' },
  { name:'Булавы', city:'Предметы', spec:'Булавы 36–45.5 см', rating:'4.9', reviews:308, emoji:'🎳', tag:'' },
  { name:'Ленты', city:'Предметы', spec:'Ленты 4–6 м с палочкой', rating:'4.6', reviews:98, emoji:'🎀', tag:'' },
  { name:'Тренировочная одежда', city:'Одежда', spec:'Топы, шорты, лосины, кофты', rating:'4.7', reviews:87, emoji:'👗', tag:'Проверено' },
]

export default function ShopsPage() {
  return (
    <>
      <Nav />
      <section className="page-hero compact">
        <div className="container">
          {/* ПРАВКА: Магазины → Магазин, убрано "180 магазинов" */}
          <div className="crumbs"><Link href="/">Главная</Link><span className="sep">/</span><span>Магазин</span></div>
          <h1>Магазин для <em>гимнасток</em></h1>
          <p className="lead">Скакалка, обруч, мяч, булавы, лента и тренировочная одежда — всё для художественной гимнастики.</p>
        </div>
      </section>

      <section style={{padding:'80px 0 100px', background:'#fff'}}>
        <div className="container">
          <div style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:24}}>
            {SHOPS.map((s,i) => (
              <div key={i} style={{border:'1px solid rgba(43,43,43,.08)',borderRadius:24,overflow:'hidden',background:'#fff',cursor:'pointer',transition:'transform .25s, box-shadow .25s'}}>
                <div style={{height:160,background:'linear-gradient(135deg,#2b2b2b,#4a4244)',position:'relative',display:'flex',alignItems:'center',justifyContent:'center'}}>
                  <span style={{fontSize:48}}>{s.emoji}</span>
                  {s.tag && <span style={{position:'absolute',top:14,right:14,background:'rgba(255,255,255,.18)',backdropFilter:'blur(8px)',color:'#fff',padding:'5px 12px',borderRadius:999,fontSize:11,fontWeight:600}}>{s.tag}</span>}
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