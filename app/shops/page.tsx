'use client'
import { useState } from 'react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Link from 'next/link'
import FilterBar, { FilterState } from '@/components/FilterBar'

type ShopItem = {
  id: number
  name: string
  category: string
  spec: string
  price: number
  priceLabel: string
  emoji: string
  tag: string
  popular: number
  isNew: boolean
  sizes: string[]
}

const ITEMS: ShopItem[] = [
  { id:1,  name:'Скакалка', category:'Предметы', spec:'Скакалка для художественной гимнастики', price:890,  priceLabel:'от 890 ₽',   emoji:'🪢', tag:'Топ выбор', popular:95, isNew:false, sizes:[] },
  { id:2,  name:'Обруч',    category:'Предметы', spec:'Обруч диаметром 60–90 см',              price:1200, priceLabel:'от 1 200 ₽',  emoji:'⭕', tag:'',          popular:88, isNew:false, sizes:['60','65','70','75','80','85','90'] },
  { id:3,  name:'Мяч',      category:'Предметы', spec:'Мяч диаметром 15–18.5 см',             price:950,  priceLabel:'от 950 ₽',    emoji:'🔵', tag:'Проверено', popular:82, isNew:false, sizes:['15','16','17','18','18.5'] },
  { id:4,  name:'Булавы',   category:'Предметы', spec:'Булавы 36–45.5 см',                    price:1500, priceLabel:'от 1 500 ₽',  emoji:'🎳', tag:'',          popular:78, isNew:false, sizes:['36','40-41.5','44-45.5'] },
  { id:5,  name:'Лента',    category:'Предметы', spec:'Лента 4–6 м с палочкой',               price:750,  priceLabel:'от 750 ₽',    emoji:'🎀', tag:'',          popular:85, isNew:false, sizes:['4м','5м','6м'] },
  { id:6,  name:'Палочка для ленты', category:'Предметы', spec:'Палочка 50–60 см',            price:400,  priceLabel:'от 400 ₽',    emoji:'🪄', tag:'',          popular:70, isNew:false, sizes:['50','55','57','59.5-60'] },
  { id:7,  name:'Топы и майки',      category:'Одежда',   spec:'Тренировочные топы и майки',  price:1800, priceLabel:'от 1 800 ₽',  emoji:'👚', tag:'',          popular:90, isNew:true,  sizes:['XS','S','M','L','XL'] },
  { id:8,  name:'Шорты',             category:'Одежда',   spec:'Шорты для тренировок',        price:1200, priceLabel:'от 1 200 ₽',  emoji:'🩳', tag:'Проверено', popular:86, isNew:false, sizes:['XS','S','M','L','XL'] },
  { id:9,  name:'Лосины и бриджи',   category:'Одежда',   spec:'Лосины и бриджи',             price:2100, priceLabel:'от 2 100 ₽',  emoji:'👖', tag:'',          popular:88, isNew:false, sizes:['XS','S','M','L','XL'] },
  { id:10, name:'Кофты',             category:'Одежда',   spec:'Спортивные кофты',            price:2500, priceLabel:'от 2 500 ₽',  emoji:'🧥', tag:'',          popular:75, isNew:true,  sizes:['XS','S','M','L','XL'] },
  { id:11, name:'Рюкзаки',           category:'Чехлы и рюкзаки', spec:'Рюкзаки для гимнастики', price:3500, priceLabel:'от 3 500 ₽', emoji:'🎒', tag:'Топ выбор', popular:92, isNew:false, sizes:[] },
  { id:12, name:'Чехол для обруча',  category:'Чехлы и рюкзаки', spec:'Чехлы для обруча',    price:800,  priceLabel:'от 800 ₽',    emoji:'🛍️', tag:'',          popular:80, isNew:false, sizes:[] },
  { id:13, name:'Полупальцы',        category:'Сопутствующие', spec:'Полупальцы для гимнастики', price:350, priceLabel:'от 350 ₽',  emoji:'🤚', tag:'',          popular:88, isNew:false, sizes:['XS','S','M','L'] },
  { id:14, name:'Резина для растяжки', category:'Сопутствующие', spec:'Эластичная лента',    price:450,  priceLabel:'от 450 ₽',    emoji:'🔴', tag:'Проверено', popular:85, isNew:false, sizes:[] },
  { id:15, name:'Наколенники',       category:'Сопутствующие', spec:'Наколенники для гимнастики', price:600, priceLabel:'от 600 ₽', emoji:'🦵', tag:'',          popular:76, isNew:false, sizes:['XS','S','M','L'] },
]

const ALL_SIZES = ['XS','S','M','L','XL','15','16','17','18','18.5','60','65','70','75','80','85','90']

function applyFilters(items: ShopItem[], filters: FilterState): ShopItem[] {
  let result = [...items]
  if (filters.priceMin !== null) result = result.filter(p => p.price >= filters.priceMin!)
  if (filters.priceMax !== null) result = result.filter(p => p.price <= filters.priceMax!)
  if (filters.size) result = result.filter(p => p.sizes.length === 0 || p.sizes.includes(filters.size!))
  if (filters.sort === 'price_asc') result.sort((a, b) => a.price - b.price)
  else if (filters.sort === 'price_desc') result.sort((a, b) => b.price - a.price)
  else if (filters.sort === 'new') result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
  else result.sort((a, b) => b.popular - a.popular)
  return result
}

const CATEGORIES = ['Все', 'Предметы', 'Одежда', 'Чехлы и рюкзаки', 'Сопутствующие']

export default function ShopsPage() {
  const [filters, setFilters] = useState<FilterState>({ discount: false, sort: 'popular', priceMin: null, priceMax: null, size: null })
  const [category, setCategory] = useState('Все')

  const filtered = applyFilters(
    category === 'Все' ? ITEMS : ITEMS.filter(i => i.category === category),
    filters
  )

  return (
    <>
      <Nav />
      <section className="page-hero compact">
        <div className="container">
          <div className="crumbs"><Link href="/">Главная</Link><span className="sep">/</span><span>Магазин</span></div>
          <h1>Магазин для <em>гимнасток</em></h1>
          <p className="lead">Скакалка, обруч, мяч, булавы, лента и тренировочная одежда — всё для художественной гимнастики.</p>
        </div>
      </section>

      <section style={{padding:'40px 0 100px', background:'#fff'}}>
        <div className="container">

          {/* Категории */}
          <div style={{display:'flex',gap:8,flexWrap:'wrap',marginBottom:8}}>
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setCategory(cat)} style={{
                padding:'8px 18px', borderRadius:999, fontSize:13, fontWeight:600,
                fontFamily:'Manrope,sans-serif', cursor:'pointer', border:'1.5px solid',
                borderColor: category === cat ? 'var(--pink-deep)' : 'rgba(43,43,43,.18)',
                background: category === cat ? 'var(--pink-deep)' : '#fff',
                color: category === cat ? '#fff' : 'var(--ink)',
                transition:'all .2s',
              }}>{cat}</button>
            ))}
          </div>

          <FilterBar showDiscount={false} sizes={ALL_SIZES} onFilterChange={setFilters} />

          {filtered.length === 0 ? (
            <div style={{textAlign:'center',padding:'60px 0',color:'var(--muted)',fontSize:16}}>
              Ничего не найдено — попробуйте изменить фильтры
            </div>
          ) : (
            <div style={{display:'grid',gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',gap:24}}>
              {filtered.map(s => (
                <div key={s.id} style={{border:'1px solid rgba(43,43,43,.08)',borderRadius:24,overflow:'hidden',background:'#fff',cursor:'pointer',transition:'transform .25s,box-shadow .25s',position:'relative'}}>
                  <div style={{height:160,background:'linear-gradient(135deg,#2b2b2b,#4a4244)',position:'relative',display:'flex',alignItems:'center',justifyContent:'center'}}>
                    <span style={{fontSize:48}}>{s.emoji}</span>
                    {s.tag && <span style={{position:'absolute',top:14,right:14,background:'rgba(255,255,255,.18)',backdropFilter:'blur(8px)',color:'#fff',padding:'5px 12px',borderRadius:999,fontSize:11,fontWeight:600}}>{s.tag}</span>}
                    {s.isNew && <span style={{position:'absolute',top:14,left:14,background:'var(--pink-deep)',color:'#fff',fontSize:10,fontWeight:700,padding:'3px 8px',borderRadius:999}}>НОВИНКА</span>}
                  </div>
                  <div style={{padding:22}}>
                    <div style={{fontSize:12,color:'#D97C8A',fontWeight:600,marginBottom:6,textTransform:'uppercase' as const,letterSpacing:'.08em'}}>{s.category}</div>
                    <div style={{fontFamily:'Playfair Display,serif',fontSize:20,fontWeight:500,marginBottom:4}}>{s.name}</div>
                    <div style={{fontSize:13,color:'#4a4244',marginBottom:10}}>{s.spec}</div>
                    <div style={{fontSize:15,fontWeight:700,color:'var(--pink-deep)'}}>{s.priceLabel}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  )
}