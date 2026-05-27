import Link from 'next/link'

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="foot-grid">
          <div>
            <div className="foot-logo"><span className="mark">М</span>Мама гимнастки</div>
            <p className="foot-about">Платформа и сообщество для мам, чьи дочки занимаются художественной гимнастикой. Создано с любовью.</p>
            <div className="foot-socials">
              <a href="#" aria-label="Telegram">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"><path d="M21.5 3.5L2.5 11l5 2 2 6 3.5-4 5 4 3.5-15.5z"/></svg>
              </a>
              <a href="#" aria-label="VK">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="4"/><path d="M7 9c1 4 4 7 7 7h2v-2c0-1 1-1 2 0l2 2"/></svg>
              </a>
              <a href="#" aria-label="Instagram">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".5" fill="currentColor"/></svg>
              </a>
            </div>
          </div>
          <div className="foot-col">
            <h5>разделы</h5>
            <ul>
              <li><Link href="/articles">Статьи</Link></li>
              <li><Link href="/salons">Салоны</Link></li>
              <li><Link href="/atelier">Ателье</Link></li>
              <li><Link href="/shops">Магазины</Link></li>
            </ul>
          </div>
          <div className="foot-col">
            <h5>сообщество</h5>
            <ul>
              <li><a href="#">О проекте</a></li>
              <li><a href="#">Истории мам</a></li>
              <li><a href="#">Эксперты</a></li>
              <li><a href="#">Стать партнёром</a></li>
            </ul>
          </div>
          <div className="foot-col">
            <h5>помощь</h5>
            <ul>
              <li><a href="mailto:gymnastmom@yandex.ru">Контакты</a></li>
              <li><a href="tel:+79647624480">+7 (964) 762-44-80</a></li>
              <li><Link href="/privacy">Политика</Link></li>
            </ul>
          </div>
        </div>
        <div className="foot-bottom">
          <div>© 2026 Мама гимнастки. Сделано с любовью.</div>
          <div className="legal">
            <Link href="/privacy">Конфиденциальность</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
