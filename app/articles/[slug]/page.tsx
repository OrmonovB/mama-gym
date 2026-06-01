import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ARTICLES } from '@/lib/articles-data'

export function generateStaticParams() {
  return ARTICLES.map(a => ({ slug: a.slug }))
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = ARTICLES.find(a => a.slug === slug)
  if (!article) notFound()

  const toc = article.sections.filter(s => s.heading).map(s => s.heading!)

  return (
    <>
      <Nav />

      {/* Hero */}
      <section style={{background:'linear-gradient(135deg,#F5D5DB 0%,#E8AEB7 60%,#D97C8A 100%)', padding:'140px 0 60px', position:'relative', overflow:'hidden'}}>
        <div style={{position:'absolute', inset:0, background:'radial-gradient(60% 60% at 10% 30%,rgba(255,255,255,.5),transparent 70%)', pointerEvents:'none'}} />
        <div className="container" style={{position:'relative', zIndex:2, maxWidth:820}}>
          <div className="crumbs" style={{marginBottom:24}}>
            <Link href="/">Главная</Link><span className="sep">/</span>
            <Link href="/articles">Статьи</Link><span className="sep">/</span>
            <span>{article.cat}</span>
          </div>
          <div style={{display:'inline-flex', alignItems:'center', gap:6, background:'rgba(255,255,255,.55)', border:'1px solid rgba(255,255,255,.7)', borderRadius:999, padding:'5px 14px', fontSize:12, fontWeight:600, letterSpacing:'.1em', textTransform:'uppercase' as const, color:'var(--pink-deep)', marginBottom:20}}>
            {article.cat}
          </div>
          <h1 style={{fontFamily:'Playfair Display,serif', fontSize:'clamp(36px,5vw,64px)', fontWeight:500, lineHeight:1.05, letterSpacing:'-.02em', marginBottom:24, color:'var(--ink)'}}>
            {article.title} <em style={{fontStyle:'italic', color:'var(--pink-deep)'}}>{article.titleEm}</em>
          </h1>
          <div style={{display:'flex', alignItems:'center', gap:14}}>
            <div style={{width:44, height:44, borderRadius:'50%', background:'rgba(255,255,255,.6)', color:'var(--pink-deep)', display:'grid', placeItems:'center', fontFamily:'Playfair Display,serif', fontStyle:'italic', fontWeight:600, fontSize:18, flexShrink:0}}>{article.av}</div>
            <div>
              <div style={{fontSize:15, fontWeight:600, color:'var(--ink)'}}>{article.author}</div>
              <div style={{fontSize:13, color:'var(--ink-2)'}}>{article.role} · {article.read} чтения</div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section style={{background:'#fff', padding:'60px 0 100px'}}>
        <div className="container" style={{maxWidth:820, display:'grid', gridTemplateColumns:'1fr 260px', gap:60, alignItems:'start'}}>

          {/* Main */}
          <div>
            {/* Lead */}
            <p style={{fontFamily:'Playfair Display,serif', fontSize:20, lineHeight:1.7, color:'var(--ink-2)', margin:'0 0 40px', fontStyle:'italic', borderLeft:'3px solid var(--pink)', paddingLeft:20}}>
              {article.lead}
            </p>

            {/* Sections */}
            {article.sections.map((s, i) => (
              <div key={i} style={{marginBottom:44}}>
                {s.heading && (
                  <h2 style={{fontFamily:'Playfair Display,serif', fontSize:28, fontWeight:500, color:'var(--ink)', margin:'0 0 16px', lineHeight:1.2}}>
                    {s.heading}
                  </h2>
                )}
                {s.text && (
                  <p style={{fontSize:16, lineHeight:1.8, color:'var(--ink-2)', margin:'0 0 20px'}}>
                    {s.text}
                  </p>
                )}
                {s.stats && (
                  <div style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:12, margin:'20px 0'}}>
                    {s.stats.map((st, j) => (
                      <div key={j} style={{background:'var(--pink-bg)', borderRadius:16, padding:'18px 16px', textAlign:'center', border:'1px solid var(--pink-soft)'}}>
                        <div style={{fontSize:11, color:'var(--muted)', fontWeight:600, letterSpacing:'.08em', textTransform:'uppercase' as const, marginBottom:6}}>{st.label}</div>
                        <div style={{fontFamily:'Playfair Display,serif', fontSize:28, fontWeight:500, color:'var(--pink-deep)', lineHeight:1}}>{st.value}</div>
                        <div style={{fontSize:11, color:'var(--muted)', marginTop:4}}>{st.sub}</div>
                      </div>
                    ))}
                  </div>
                )}
                {s.list && (
                  <ul style={{margin:'0 0 20px', paddingLeft:0, listStyle:'none', display:'flex', flexDirection:'column', gap:10}}>
                    {s.list.map((item, j) => (
                      <li key={j} style={{display:'flex', alignItems:'flex-start', gap:12, fontSize:15, lineHeight:1.6, color:'var(--ink-2)'}}>
                        <span style={{width:20, height:20, borderRadius:'50%', background:'var(--pink-bg)', border:'1px solid var(--pink-soft)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginTop:2}}>
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--pink-deep)" strokeWidth="2.5"><path d="M5 13l4 4L19 7"/></svg>
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
                {s.quote && (
                  <blockquote style={{margin:'24px 0', padding:'20px 24px', background:'var(--pink-bg)', borderLeft:'3px solid var(--pink-deep)', borderRadius:'0 16px 16px 0', fontFamily:'Playfair Display,serif', fontStyle:'italic', fontSize:18, lineHeight:1.6, color:'var(--ink)'}}>
                    {s.quote}
                  </blockquote>
                )}
                {s.tip && (
                  <div style={{margin:'20px 0', padding:'16px 20px', background:'#fff', border:'1px solid var(--pink-soft)', borderRadius:16, display:'flex', gap:14, alignItems:'flex-start'}}>
                    <div style={{width:36, height:36, borderRadius:'50%', background:'var(--pink-bg)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0}}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--pink-deep)" strokeWidth="2"><path d="M12 2a7 7 0 0 1 7 7c0 2.5-1.5 4.5-3 6l-1 3H9l-1-3C6.5 13.5 5 11.5 5 9a7 7 0 0 1 7-7z"/><path d="M9 21h6"/></svg>
                    </div>
                    <div>
                      <div style={{fontSize:12, fontWeight:700, letterSpacing:'.08em', textTransform:'uppercase' as const, color:'var(--pink-deep)', marginBottom:4}}>Совет эксперта</div>
                      <div style={{fontSize:14, lineHeight:1.6, color:'var(--ink-2)'}}>{s.tip}</div>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Footer nav */}
            <div style={{borderTop:'1px solid var(--line)', paddingTop:28, display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:20}}>
              <Link href="/articles" style={{fontSize:14, color:'var(--pink-deep)', textDecoration:'none', display:'flex', alignItems:'center', gap:6, fontWeight:600}}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
                Все статьи
              </Link>
            </div>
          </div>

          {/* Sidebar TOC */}
          <aside style={{position:'sticky', top:100}}>
            <div style={{background:'var(--pink-bg)', borderRadius:20, padding:'24px 22px', border:'1px solid var(--pink-soft)'}}>
              <div style={{fontSize:11, fontWeight:700, letterSpacing:'.12em', textTransform:'uppercase' as const, color:'var(--pink-deep)', marginBottom:16}}>В этой статье</div>
              <div style={{display:'flex', flexDirection:'column', gap:10}}>
                {toc.map((item, i) => (
                  <div key={i} style={{display:'flex', alignItems:'flex-start', gap:10, fontSize:13, lineHeight:1.5, color:'var(--ink-2)'}}>
                    <span style={{color:'var(--pink-deep)', flexShrink:0, marginTop:2}}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
                    </span>
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Author card */}
            <div style={{marginTop:20, background:'#fff', borderRadius:20, padding:'22px', border:'1px solid var(--line)'}}>
              <div style={{display:'flex', alignItems:'center', gap:12, marginBottom:12}}>
                <div style={{width:44, height:44, borderRadius:'50%', background:'var(--pink-bg)', color:'var(--pink-deep)', display:'grid', placeItems:'center', fontFamily:'Playfair Display,serif', fontStyle:'italic', fontWeight:600, fontSize:18}}>{article.av}</div>
                <div>
                  <div style={{fontSize:14, fontWeight:600, color:'var(--ink)'}}>{article.author}</div>
                  <div style={{fontSize:12, color:'var(--muted)'}}>{article.role}</div>
                </div>
              </div>
              <div style={{fontSize:13, lineHeight:1.6, color:'var(--ink-2)'}}>Эксперт платформы «Мама гимнастки»</div>
            </div>
          </aside>
        </div>
      </section>

      <Footer />
    </>
  )
}