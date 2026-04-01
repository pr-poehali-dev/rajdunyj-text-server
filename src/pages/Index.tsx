import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";

const categories = [
  { id: "all", label: "Все вопросы", emoji: "✨" },
  { id: "start", label: "Начало работы", emoji: "🚀" },
  { id: "account", label: "Аккаунт", emoji: "👤" },
  { id: "payment", label: "Оплата", emoji: "💳" },
  { id: "technical", label: "Техническое", emoji: "🔧" },
];

const faqs = [
  {
    id: 1,
    category: "start",
    question: "С чего начать работу на платформе?",
    answer:
      "Всё просто: зарегистрируйтесь, выберите тарифный план и опишите свой проект. Наш ИИ-ассистент поможет создать первую версию сайта за несколько минут. Не нужно никаких технических знаний — просто расскажите, что вам нужно.",
  },
  {
    id: 2,
    category: "start",
    question: "Нужно ли мне знать программирование?",
    answer:
      "Нет, совсем не нужно! Платформа создана специально для людей без технических знаний. Вы описываете задачу обычными словами, а ИИ делает всю работу. Если захотите — сможете изучать код постепенно, но это не обязательно.",
  },
  {
    id: 3,
    category: "start",
    question: "Как быстро будет готов мой сайт?",
    answer:
      "Первая версия сайта появляется буквально за 30–60 секунд. Затем вы можете дорабатывать его в режиме диалога: меняйте цвета, тексты, добавляйте блоки — каждое изменение занимает несколько секунд.",
  },
  {
    id: 4,
    category: "account",
    question: "Как изменить пароль или email?",
    answer:
      "Зайдите в раздел «Настройки аккаунта» в правом верхнем меню. Там вы найдёте все опции для изменения личных данных. Если забыли пароль — воспользуйтесь ссылкой «Восстановить пароль» на странице входа.",
  },
  {
    id: 5,
    category: "account",
    question: "Могу ли я удалить свой аккаунт?",
    answer:
      "Да, вы можете удалить аккаунт в настройках профиля. Обратите внимание: все созданные проекты и данные будут безвозвратно удалены. Если вы просто хотите сделать паузу — можно деактивировать аккаунт без удаления.",
  },
  {
    id: 6,
    category: "payment",
    question: "Какие способы оплаты доступны?",
    answer:
      "Принимаем банковские карты (Visa, MasterCard, МИР), оплату через СБП, а также Юмани. Для юридических лиц доступна оплата по счёту с закрывающими документами.",
  },
  {
    id: 7,
    category: "payment",
    question: "Можно ли вернуть деньги за подписку?",
    answer:
      "Да, в течение 7 дней с момента оплаты мы вернём деньги без вопросов, если вас что-то не устроило. Просто напишите в поддержку. После 7 дней возврат рассматривается индивидуально.",
  },
  {
    id: 8,
    category: "payment",
    question: "Есть ли бесплатный тариф?",
    answer:
      "Да! Бесплатный план позволяет создать один проект с базовыми функциями. Это отличный способ познакомиться с платформой перед покупкой. Ограничений по времени нет — пользуйтесь столько, сколько нужно.",
  },
  {
    id: 9,
    category: "technical",
    question: "Можно ли подключить свой домен?",
    answer:
      "Да, на платных тарифах вы можете подключить любой домен. В настройках проекта выберите «Домены», введите ваш домен и следуйте инструкции по настройке DNS-записей. Обычно это занимает 5–10 минут.",
  },
  {
    id: 10,
    category: "technical",
    question: "Где хранятся данные моего сайта?",
    answer:
      "Все данные хранятся на серверах в России (ГОСТ, 152-ФЗ). Мы делаем автоматические резервные копии каждые 24 часа. Ваши данные защищены шифрованием и недоступны третьим лицам.",
  },
  {
    id: 11,
    category: "technical",
    question: "Что делать, если сайт не работает?",
    answer:
      "Сначала проверьте статус сервисов на нашей странице status.poehali.dev. Если проблема на вашей стороне — попробуйте очистить кэш браузера или открыть в режиме инкогнито. Если не помогло — напишите в поддержку, ответим в течение часа.",
  },
];

export default function Index() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("all");
  const [openId, setOpenId] = useState<number | null>(null);
  const [search, setSearch] = useState("");

  const filtered = faqs.filter((faq) => {
    const matchCat = activeCategory === "all" || faq.category === activeCategory;
    const matchSearch =
      search === "" ||
      faq.question.toLowerCase().includes(search.toLowerCase()) ||
      faq.answer.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const toggle = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="faq-page">
      {/* Hero */}
      <header className="faq-hero">
        <div className="faq-hero-bg" />
        <div className="faq-container">
          <button className="faq-home-btn" onClick={() => navigate("/")}>
            <Icon name="Home" size={15} />
            Главная страница
          </button>
          <div className="faq-badge">Помощь новичкам</div>
          <h1 className="faq-title">
            Часто задаваемые
            <br />
            <em>вопросы</em>
          </h1>
          <p className="faq-subtitle">
            Здесь вы найдёте ответы на самые популярные вопросы о работе с платформой
          </p>

          {/* Search */}
          <div className="faq-search-wrap">
            <div className="faq-search-icon">
              <Icon name="Search" size={18} />
            </div>
            <input
              className="faq-search"
              type="text"
              placeholder="Найти вопрос..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button className="faq-search-clear" onClick={() => setSearch("")}>
                <Icon name="X" size={16} />
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="faq-main">
        <div className="faq-container">
          {/* Categories */}
          <div className="faq-cats">
            {categories.map((cat) => (
              <button
                key={cat.id}
                className={`faq-cat-btn${activeCategory === cat.id ? " active" : ""}`}
                onClick={() => { setActiveCategory(cat.id); setOpenId(null); }}
              >
                <span>{cat.emoji}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>

          {/* Count */}
          <div className="faq-count">
            {filtered.length > 0
              ? `${filtered.length} ${getNoun(filtered.length, "вопрос", "вопроса", "вопросов")}`
              : "Ничего не найдено"}
          </div>

          {/* List */}
          <div className="faq-list">
            {filtered.length === 0 && (
              <div className="faq-empty">
                <span className="faq-empty-icon">🔍</span>
                <p>По вашему запросу ничего не найдено</p>
                <button
                  className="faq-reset-btn"
                  onClick={() => { setSearch(""); setActiveCategory("all"); }}
                >
                  Сбросить фильтры
                </button>
              </div>
            )}
            {filtered.map((faq, i) => (
              <div
                key={faq.id}
                className={`faq-item${openId === faq.id ? " open" : ""}`}
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <button
                  className="faq-item-header"
                  onClick={() => toggle(faq.id)}
                  aria-expanded={openId === faq.id}
                >
                  <span className="faq-item-q">{faq.question}</span>
                  <span className="faq-item-icon">
                    <Icon name="ChevronDown" size={20} />
                  </span>
                </button>
                <div className="faq-item-body">
                  <div className="faq-item-answer">{faq.answer}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Support block */}
          <div className="faq-support">
            <div className="faq-support-inner">
              <div className="faq-support-left">
                <span className="faq-support-emoji">💬</span>
                <div>
                  <h3 className="faq-support-title">Не нашли ответ?</h3>
                  <p className="faq-support-text">Наша команда поддержки отвечает в течение часа</p>
                </div>
              </div>
              <button className="faq-support-btn">
                Написать в поддержку
                <Icon name="ArrowRight" size={16} />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function getNoun(n: number, one: string, two: string, five: string) {
  const n10 = Math.abs(n) % 100;
  const n1 = n10 % 10;
  if (n10 >= 11 && n10 <= 19) return five;
  if (n1 === 1) return one;
  if (n1 >= 2 && n1 <= 4) return two;
  return five;
}