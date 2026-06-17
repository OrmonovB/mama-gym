import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { ARTICLES } from '@/lib/articles-data'

export default function ArticlesPage() {
  return (
    <>
      <Nav />
      <section className="page-hero compact">
        <div className="container">
          <div className="crumbs"><Link href="/">Главная</Link><span className="sep">/</span><span>Статьи</span></div>
          <h1>Статьи для <em>мам</em></h1>
          <p className="lead">Советы экспертов, разборы упражнений, питание и психология юной спортсменки.</p>
        </div>
      </section>

      <section style={{padding:'80px 0 100px', background:'#fff'}}>
        <div className="container">
          <div style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'32px 28px'}}>
            {ARTICLES.map((a, i) => (
              <Link key={i} href={`/articles/${a.slug}`} style={{display:'flex', flexDirection:'column', cursor:'pointer', textDecoration:'none', color:'inherit'}}>
                <div style={{aspectRatio:'4/3' as any, borderRadius:20, overflow:'hidden', marginBottom:20, background:a.bg, position:'relative', display:'flex', alignItems:'center', justifyContent:'center'}}>
                  <span style={{position:'absolute', top:14, left:14, background:'rgba(255,255,255,.95)', color:'#2B2B2B', padding:'5px 12px', borderRadius:999, fontSize:11, fontWeight:600, letterSpacing:'.08em', textTransform:'uppercase' as any}}>{a.cat}</span>
                  <img src={a.image} alt={a.title} style={{width:'100%', height:'100%', objectFit:'cover'}} />
                </div>
                <h4 style={{fontFamily:'Playfair Display,serif', fontSize:22, fontWeight:500, lineHeight:1.2, marginBottom:10}}>{a.title} {a.titleEm}</h4>
                <p style={{fontSize:14, lineHeight:1.55, color:'#4a4244', marginBottom:14, flex:1}}>{a.lead}</p>
                <div style={{display:'flex', alignItems:'center', gap:8, fontSize:12, color:'#8a7a7d'}}>
                  <div style={{width:24, height:24, borderRadius:'50%', background:'#FDF4F6', color:'#D97C8A', display:'grid', placeItems:'center', fontSize:11, fontWeight:700}}>{a.av}</div>
                  <span>{a.author}</span><span>·</span><span>{a.role}</span><span>·</span><span>{a.read}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}