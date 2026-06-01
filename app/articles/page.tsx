import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Link from 'next/link'

const ARTICLES = [
  { cat:'Питание', title:'Как правильно питаться перед соревнованиями', text:'Правильное питание накануне соревнований — залог хорошего выступления. Разбираем, что есть за 3 дня, накануне и в день турнира.', av:'Е', author:'Елена Морозова', role:'Диетолог', read:'6 мин', bg:'linear-gradient(135deg,#F5D5DB,#E8AEB7)' },
  { cat:'Психология', title:'Психологический настрой перед выступлением', text:'Как помочь дочери справиться с волнением и выйти на ковёр с уверенностью. Советы спортивного психолога.', av:'М', author:'Мария Степанова', role:'Психолог', read:'8 мин', bg:'linear-gradient(135deg,#E8AEB7,#D97C8A)' },
  { cat:'Экипировка', title:'Как выбрать купальник для соревнований', text:'На что обратить внимание при выборе купальника: ткань, декор, посадка. Советы от опытных мам и мастеров ателье.', av:'О', author:'Ольга Климова', role:'Мастер ателье', read:'5 мин', bg:'linear-gradient(135deg,#fce6ea,#f8bbd0)' },
  { cat:'Тренировки', title:'Растяжка дома: упражнения для гимнасток', text:'Безопасный комплекс для развития гибкости, который можно делать дома под контролем мамы.', av:'А', author:'Анна Петрова', role:'Тренер', read:'10 мин', bg:'linear-gradient(135deg,#e8eaf6,#c5cae9)' },
  { cat:'Соревнования', title:'Первые соревнования: как подготовиться маме', text:'Что взять с собой, как поддержать дочь, на что обратить внимание — полный гид для мамы на первом турнире.', av:'Т', author:'Татьяна Иванова', role:'Мама гимнастки', read:'7 мин', bg:'linear-gradient(135deg,#e0f2f1,#b2dfdb)' },
  { cat:'Здоровье', title:'Профилактика травм у юных гимнасток', text:'Какие травмы наиболее распространены в художественной гимнастике и как их предотвратить.', av:'Н', author:'Наталья Сидорова', role:'Врач-ортопед', read:'9 мин', bg:'linear-gradient(135deg,#fff8e1,#ffecb3)' },
]

export default function ArticlesPage() {
  return (
    <>
      <Nav />
      <section className="page-hero compact">
        <div className="container">
          <div className="crumbs"><Link href="/">Главная</Link><span className="sep">/</span><span>Статьи</span></div>
          {/* ПРАВКА: убрано "120 материалов" */}
          <h1>Статьи для <em>мам</em></h1>
          <p className="lead">Советы экспертов, разборы упражнений, питание и психология юной спортсменки.</p>
        </div>
      </section>

      <section style={{padding:'80px 0 100px', background:'#fff'}}>
        <div className="container">
          <div style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'32px 28px'}}>
            {ARTICLES.map((a,i) => (
              <div key={i} style={{display:'flex',flexDirection:'column',cursor:'pointer'}}>
                <div style={{aspectRatio:'4/3' as any,borderRadius:20,overflow:'hidden',marginBottom:20,background:a.bg,position:'relative',display:'flex',alignItems:'center',justifyContent:'center'}}>
                  <span style={{position:'absolute',top:14,left:14,background:'rgba(255,255,255,.95)',color:'#2B2B2B',padding:'5px 12px',borderRadius:999,fontSize:11,fontWeight:600,letterSpacing:'.08em',textTransform:'uppercase' as any}}>{a.cat}</span>
                  <span style={{fontSize:48}}>📖</span>
                </div>
                <h4 style={{fontFamily:'Playfair Display,serif',fontSize:22,fontWeight:500,lineHeight:1.2,marginBottom:10}}>{a.title}</h4>
                <p style={{fontSize:14,lineHeight:1.55,color:'#4a4244',marginBottom:14,flex:1}}>{a.text}</p>
                <div style={{display:'flex',alignItems:'center',gap:8,fontSize:12,color:'#8a7a7d'}}>
                  <div style={{width:24,height:24,borderRadius:'50%',background:'#FDF4F6',color:'#D97C8A',display:'grid',placeItems:'center',fontSize:11,fontWeight:700}}>{a.av}</div>
                  <span>{a.author}</span><span>·</span><span>{a.role}</span><span>·</span><span>{a.read}</span>
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