"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type VoipService = {
  name: string;
  tagline: string;
  strongSuit: string;
  highlight: string;
  pricing: string;
  reliability: string;
  website: string;
  badges: string[];
  differentiators: string[];
};

const services: VoipService[] = [
  {
    name: "RingCentral MVP",
    tagline: "Полноценная облачная телефония + контакт-центр",
    strongSuit: "Корпоративные сценарии",
    highlight:
      "Лидер Gartner UCaaS. Гибко масштабируется, даёт аналитику, омниканальность и глубокие интеграции.",
    pricing: "От $30 за пользователя/мес при годовой оплате",
    reliability: "99.999% SLA, глобальная инфраструктура",
    website: "https://www.ringcentral.com/",
    badges: ["Enterprise-ready", "Омниканальность", "99.999% SLA"],
    differentiators: [
      "Мониторинг качества звонков и автоматические алерты",
      "Нативные интеграции с Salesforce, HubSpot, Zendesk, Microsoft Teams",
      "Встроенный AI ассистент для расшифровок и подсказок сотрудникам"
    ]
  },
  {
    name: "Zoom Phone",
    tagline: "Управляемая телефония на базе экосистемы Zoom",
    strongSuit: "Гибридные команды",
    highlight:
      "Бесшовно объединяет звонки, видео и чат с привычным интерфейсом Zoom и глобальным покрытием.",
    pricing: "От $10 за пользователя/мес",
    reliability: "Глобальные медиасервера Zoom, QoS отчёты",
    website: "https://zoom.us/phone-system",
    badges: ["Unified Communications", "Глобальные номера"],
    differentiators: [
      "Единый идентификатор и presence между звонками и встречами",
      "Политики качества обслуживания и расширенная аналитика QoS",
      "Поддержка BYOC для подключения собственного оператора"
    ]
  },
  {
    name: "Dialpad Ai Voice",
    tagline: "Телефония с реальным AI-сопровождением",
    strongSuit: "Команды продаж и поддержки",
    highlight:
      "Встроенная генеративная AI-подсказка, расшифровки в реальном времени и автоматизация CRM заметок.",
    pricing: "От $23 за пользователя/мес",
    reliability: "Глобальный гибридный облак + собственный Carrier Connect",
    website: "https://www.dialpad.com/voice/",
    badges: ["AI-first", "Real-time Transcription"],
    differentiators: [
      "AI Agent Assist с релевантными скриптами во время звонка",
      "Аналитика разговоров с поиском по ключевым словам",
      "Готовые коннекторы к Slack, Salesforce, HubSpot, Zendesk"
    ]
  },
  {
    name: "Aircall",
    tagline: "Готовый облачный колл-центр за считанные минуты",
    strongSuit: "Стартапы и SMB",
    highlight:
      "Минимальное время внедрения, мощные интеграции с CRM и удобные инструменты совместной работы.",
    pricing: "От €30 за пользователя/мес",
    reliability: "40+ датацентров, динамический выбор маршрута",
    website: "https://aircall.io/",
    badges: ["SMB-friendly", "CRM Integrations"],
    differentiators: [
      "Панель с живой очередью, статусами и KPI",
      "Встроенный call tagging и автоматическое распределение задач",
      "Marketplace с 100+ приложениями (Notion, Pipedrive, Gorgias)"
    ]
  },
  {
    name: "8x8 X Series",
    tagline: "Единая платформа UCaaS + CCaaS",
    strongSuit: "Международные компании",
    highlight:
      "Сильная контакт-центр часть, полный контроль качества и встроенная аналитика взаимодействия клиентов.",
    pricing: "От $24 за пользователя/мес",
    reliability: "99.999% uptime, собственная сеть в 50+ странах",
    website: "https://www.8x8.com/products/business-phone",
    badges: ["UCaaS + CCaaS", "Глобальные номера"],
    differentiators: [
      "Customer Journey Analytics с конструктором отчётов",
      "Повсеместная сквозная запись и хранение разговоров",
      "Встроенная платформа для чата, e-mail и социальных каналов"
    ]
  },
  {
    name: "Twilio Flex",
    tagline: "Полностью кастомизируемый контакт-центр",
    strongSuit: "Продуктовые команды и разработчики",
    highlight:
      "API-first подход, глубоко гибкая настройка потоков, поддержка собственных UI и интеграций.",
    pricing: "От $150 за именованного агента/мес или $1 за активный час",
    reliability: "Глобальная инфраструктура Twilio с автоматическим масштабированием",
    website: "https://www.twilio.com/flex",
    badges: ["API-first", "Высокая кастомизация"],
    differentiators: [
      "Конструктор потоков Flex Flow и Studio с возможностью кодового расширения",
      "Непрерывная запись разговоров и чат-истории в одном месте",
      "Богатая экосистема SDK и плагинов"
    ]
  },
  {
    name: "Microsoft Teams Phone",
    tagline: "Телефония внутри Microsoft 365",
    strongSuit: "Организации на Microsoft 365",
    highlight:
      "Единое рабочее пространство: звонки, документы и совместная работа без переключения инструментов.",
    pricing: "Лицензия Teams + Phone Standard от $8 за пользователя/мес",
    reliability: "Глобальные датацентры Microsoft, гео-резервирование",
    website: "https://www.microsoft.com/microsoft-teams/voice-calling",
    badges: ["Office 365", "Security & Compliance"],
    differentiators: [
      "Глубокая интеграция с SharePoint, Outlook и Viva",
      "Управление политиками безопасности и комплаенса из одного центра",
      "Гибрид: собственные SBC + Direct Routing / Operator Connect"
    ]
  },
  {
    name: "Grasshopper",
    tagline: "Виртуальная АТС для малого бизнеса",
    strongSuit: "ИП, микробизнес, фриланс",
    highlight:
      "Простая настройка, единый бизнес-номер и профессиональное приветствие даже для маленьких команд.",
    pricing: "Фиксированная подписка от $31/мес за номер с неограниченными пользователями",
    reliability: "Работает на сети GoTo с избыточностью по регионам США",
    website: "https://grasshopper.com/",
    badges: ["Простота", "Виртуальный номер"],
    differentiators: [
      "Несколько приветствий и голосовое меню без сложных сценариев",
      "Расширенное переадресация на мобильные/стационарные линии",
      "Мобильные приложения iOS/Android с бизнес-чатом"
    ]
  }
];

const filters = [
  { id: "all", label: "Все" },
  { id: "enterprise", label: "Enterprise" },
  { id: "contact-center", label: "Контакт-центры" },
  { id: "smb", label: "SMB и стартапы" },
  { id: "developers", label: "Для разработчиков" }
] as const;

type FilterId = (typeof filters)[number]["id"];

function getFilterPredicate(selected: FilterId) {
  switch (selected) {
    case "enterprise":
      return (service: VoipService) =>
        ["RingCentral MVP", "8x8 X Series", "Microsoft Teams Phone"].includes(service.name);
    case "contact-center":
      return (service: VoipService) =>
        ["RingCentral MVP", "8x8 X Series", "Twilio Flex", "Dialpad Ai Voice"].includes(
          service.name
        );
    case "smb":
      return (service: VoipService) =>
        ["Aircall", "Grasshopper", "Dialpad Ai Voice", "Zoom Phone"].includes(service.name);
    case "developers":
      return (service: VoipService) => service.name === "Twilio Flex";
    default:
      return () => true;
  }
}

export default function Page() {
  const [selectedFilter, setSelectedFilter] = useState<FilterId>("all");

  const visibleServices = useMemo(
    () => services.filter(getFilterPredicate(selectedFilter)),
    [selectedFilter]
  );

  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-12 px-6 pb-24 pt-24">
      <header className="flex flex-col gap-6 text-center">
        <div className="rounded-full border border-sky-400/40 bg-sky-500/10 px-4 py-1 text-sm backdrop-blur-md">
          Подборка 2024 · Экспертный рейтинг
        </div>
        <h1 className="text-balance text-4xl font-semibold leading-tight md:text-6xl">
          Лучшие VoIP сервисы для бизнеса и команд в 2024 году
        </h1>
        <p className="mx-auto max-w-3xl text-lg text-slate-300">
          Мы проанализировали десятки провайдеров, показатели SLA, AI-функции, интеграции и
          стоимость владения. Ниже&nbsp;— только проверенные платформы, которые тянут рост
          бизнеса, а не тормозят его.
        </p>
        <div className="mx-auto flex flex-wrap justify-center gap-3">
          {filters.map((filter) => (
            <button
              key={filter.id}
              className={`rounded-full border px-4 py-2 text-sm transition ${
                selectedFilter === filter.id
                  ? "border-sky-400 bg-sky-500/20 text-white shadow-glow"
                  : "border-slate-700 text-slate-300 hover:border-sky-500 hover:text-white"
              }`}
              onClick={() => setSelectedFilter(filter.id)}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </header>

      <section className="grid gap-6 md:grid-cols-2">
        {visibleServices.map((service) => (
          <article
            key={service.name}
            className="group relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/40 p-8 shadow-lg backdrop-blur transition hover:-translate-y-1 hover:border-sky-400/60 hover:shadow-glow"
          >
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-sky-500 via-cyan-400 to-blue-500 opacity-0 transition group-hover:opacity-100" />
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h2 className="text-2xl font-semibold text-white">{service.name}</h2>
              <span className="rounded-full border border-sky-400/40 bg-sky-500/15 px-3 py-1 text-xs uppercase tracking-wide text-sky-200">
                {service.strongSuit}
              </span>
            </div>
            <p className="mt-3 text-base text-slate-300">{service.tagline}</p>
            <p className="mt-5 text-sm text-slate-400">{service.highlight}</p>
            <ul className="mt-6 space-y-2">
              {service.differentiators.map((point) => (
                <li key={point} className="flex items-start gap-3 text-sm text-slate-200">
                  <span className="mt-1 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-sky-400" />
                  {point}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-3 text-xs text-slate-300">
              <span className="rounded-full border border-slate-700 px-3 py-1">
                <strong className="font-semibold text-slate-100">Стоимость:</strong>{" "}
                {service.pricing}
              </span>
              <span className="rounded-full border border-slate-700 px-3 py-1">
                <strong className="font-semibold text-slate-100">Надёжность:</strong>{" "}
                {service.reliability}
              </span>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {service.badges.map((badge) => (
                <span
                  key={badge}
                  className="rounded-full bg-slate-800/80 px-3 py-1 text-xs text-sky-100 ring-1 ring-slate-700"
                >
                  {badge}
                </span>
              ))}
            </div>
            <Link
              href={service.website}
              className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-sky-300 transition hover:text-sky-100"
              target="_blank"
              rel="noopener noreferrer"
            >
              Перейти на сайт →
            </Link>
          </article>
        ))}
      </section>

      <section className="grid gap-6 rounded-3xl border border-slate-800 bg-slate-900/40 p-8 backdrop-blur">
        <h3 className="text-2xl font-semibold text-white">Как мы формировали рейтинг</h3>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4 text-sm text-slate-300">
            <h4 className="text-base font-semibold text-slate-100">Основные критерии</h4>
            <ul className="space-y-2">
              <li>• SLA, география датацентров и устойчивость к сбоям</li>
              <li>• AI-функции: транскрибация, ассистенты, аналитика разговоров</li>
              <li>• Готовые интеграции с CRM/Helpdesk/Collaboration</li>
              <li>• Прозрачная стоимость владения и гибкость тарифов</li>
              <li>• Комплаенс: GDPR, HIPAA, SOC 2, локальные требования</li>
            </ul>
          </div>
          <div className="space-y-4 text-sm text-slate-300">
            <h4 className="text-base font-semibold text-slate-100">Советы по выбору</h4>
            <ul className="space-y-2">
              <li>• Сравнивайте TCO: лицензии + номера + контакт-центр + интеграции</li>
              <li>• Планируйте номерной план и BYOC заранее, чтобы избежать миграций</li>
              <li>• Проверяйте наличие локализации и поддержки в вашем регионе</li>
              <li>• Тестируйте качество связи с пилотной группой до масштабирования</li>
              <li>• Подключайте AI-модули, только если команда к ним готова процессно</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
