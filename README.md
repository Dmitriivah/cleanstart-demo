# CleanStart — демо-сайт клининговой компании

Учебный демонстрационный проект (не реальный бизнес): одностраничный сайт, который показывает полный цикл — от запроса к ИИ до публичной ссылки с рабочей приёмом заявок.

**Стек:** HTML, CSS, JavaScript (без фреймворков), Cursor, Formspree, Netlify.

**Живое демо:** https://cleanstartdemo.netlify.app/

## Что внутри
- `index.html` — структура: услуги с ценами, прайс-таблица, шаги заказа, FAQ, контакты, форма заявки
- `style.css` — оформление и адаптивность (брейкпоинты 900/800/520px, reduced-motion)
- `script.js` — валидация формы, чекбокс согласия, отправка через Formspree, toast об успехе
- `favicon.svg`, `og-cover.svg` — иконка и обложка для соцсетей
- `robots.txt`, `sitemap.xml` — базовое SEO
- `images/` — изображения

## SEO и доступность
- `<title>` и `meta description` с ключевыми словами ниши, Open Graph / Twitter Card
- Разметка Schema.org `LocalBusiness` (JSON-LD)
- Семантические секции, `aria-live` статусы формы, `focus-visible`, alt-тексты

## Как запустить локально (Windows)
Просто дважды открыть `index.html` в браузере.

## Публикация
Публикация: Netlify — Site settings → Build & deploy → Continuous deployment → "Trigger deploy" → "Clear cache and deploy site".
Форма работает на статическом хостинге, потому что заявки принимает внешний сервис Formspree.

⚠️ **Перед публикацией**: замените `FORMSPREE_ENDPOINT` в `script.js` на собственный адрес формы, а также обновите canonical/OG-URL, телефон, WhatsApp и почту на реальные (сейчас там условные демо-данные). Не публикуйте чужие адреса форм и никакие секреты в открытом репозитории.
