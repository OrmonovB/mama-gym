'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

type Order = {
  id: string
  name: string
  last_name: string
  phone: string
  email: string
  product: string
  size: string
  competition_date: string
  comment: string
  status: 'new' | 'process' | 'done'
  created_at: string
}

const STATUS_LABEL: Record<string, string> = {
  new: 'Новая', process: 'В работе', done: 'Выполнено'
}
const STATUS_BADGE: Record<string, string> = {
  new: 'badge badge--new', process: 'badge badge--process', done: 'badge badge--done'
}
const STATUS_NEXT: Record<string, string> = {
  new: 'process', process: 'done', done: 'new'
}
const STATUS_BTN: Record<string, string> = {
  new: 'В работу', process: 'Выполнено', done: 'Сбросить'
}

export default function AdminPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [filter, setFilter] = useState('all')
  const [loading, setLoading] = useState(true)

  async function loadOrders() {
    const res = await fetch('/api/orders')
    const data = await res.json()
    setOrders(Array.isArray(data) ? data : [])
    setLoading(false)
  }

  async function changeStatus(id: string, current: string) {
    const next = STATUS_NEXT[current] || 'new'
    await fetch(`/api/orders/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: next }),
    })
    setOrders(orders.map(o => o.id === id ? { ...o, status: next as Order['status'] } : o))
  }

  useEffect(() => { loadOrders() }, [])

  const filtered = filter === 'all' ? orders : orders.filter(o => o.status === filter)
  const stats = {
    total: orders.length,
    new: orders.filter(o => o.status === 'new').length,
    process: orders.filter(o => o.status === 'process').length,
    done: orders.filter(o => o.status === 'done').length,
  }

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-sidebar__logo">Мама гимнастки</div>
        <a className="admin-sidebar__link active">📋 Заявки</a>
        <Link href="/" className="admin-sidebar__link">🏠 На сайт</Link>
        <Link href="/login" className="admin-sidebar__link">🚪 Выйти</Link>
      </aside>

      <div className="admin-main">
        <div className="admin-topbar">
          <div className="admin-topbar__title">Панель управления</div>
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            <div className="admin-avatar">А</div>
            <span style={{ fontSize:14, color:'#444', fontWeight:500 }}>Администратор</span>
          </div>
        </div>

        <div className="admin-content">
          <div className="admin-stats">
            <div className="stat-card">
              <div className="stat-card__label">Всего заявок</div>
              <div className="stat-card__num">{stats.total}</div>
            </div>
            <div className="stat-card">
              <div className="stat-card__label">Новые</div>
              <div className="stat-card__num stat-card__num--pink">{stats.new}</div>
            </div>
            <div className="stat-card">
              <div className="stat-card__label">В обработке</div>
              <div className="stat-card__num stat-card__num--gold">{stats.process}</div>
            </div>
            <div className="stat-card">
              <div className="stat-card__label">Выполнено</div>
              <div className="stat-card__num stat-card__num--green">{stats.done}</div>
            </div>
          </div>

          <div className="admin-table-wrap">
            <div className="admin-table-header">
              <span className="admin-table-title">Заявки на купальники</span>
              <div className="filter-wrap">
                {['all','new','process','done'].map(f => (
                  <button key={f} className={`filter-btn ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>
                    {f === 'all' ? 'Все' : STATUS_LABEL[f]}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ overflowX:'auto' }}>
              <table>
                <thead>
                  <tr>
                    <th>#</th><th>Клиент</th><th>Телефон</th><th>Email</th>
                    <th>Товар</th><th>Размер</th><th>Дата соревн.</th>
                    <th>Комментарий</th><th>Дата заявки</th><th>Статус</th><th>Действие</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr><td colSpan={11} style={{ textAlign:'center', color:'#bbb', padding:40 }}>Загрузка...</td></tr>
                  ) : filtered.length === 0 ? (
                    <tr><td colSpan={11} style={{ textAlign:'center', color:'#bbb', padding:40 }}>Заявок нет</td></tr>
                  ) : filtered.map((o, i) => (
                    <tr key={o.id}>
                      <td style={{ color:'#bbb' }}>{i + 1}</td>
                      <td><strong>{o.name} {o.last_name}</strong></td>
                      <td>{o.phone}</td>
                      <td style={{ color:'#888' }}>{o.email || '—'}</td>
                      <td>{o.product}</td>
                      <td>{o.size || '—'}</td>
                      <td>{o.competition_date ? new Date(o.competition_date).toLocaleDateString('ru-RU') : '—'}</td>
                      <td style={{ color:'#888', maxWidth:160 }}>{o.comment || '—'}</td>
                      <td style={{ color:'#bbb' }}>{new Date(o.created_at).toLocaleDateString('ru-RU')}</td>
                      <td><span className={STATUS_BADGE[o.status]}>{STATUS_LABEL[o.status]}</span></td>
                      <td>
                        <button onClick={() => changeStatus(o.id, o.status)}
                          style={{ background:'transparent', border:'1px solid #ddd', borderRadius:20, padding:'5px 12px', fontSize:11, cursor:'pointer', fontFamily:'inherit', color:'#444', transition:'all 0.2s' }}
                          onMouseOver={e => { (e.target as HTMLElement).style.borderColor='#c94b77'; (e.target as HTMLElement).style.color='#c94b77' }}
                          onMouseOut={e => { (e.target as HTMLElement).style.borderColor='#ddd'; (e.target as HTMLElement).style.color='#444' }}>
                          {STATUS_BTN[o.status]}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
