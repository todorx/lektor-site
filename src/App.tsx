import { useState, useEffect } from 'react'

const logoSrc = new URL('./assets/logo.png', import.meta.url).href

// ─── Design tokens ────────────────────────────────────────────────────────────
const T = {
  red: '#CE2028',
  redDark: '#A0181E',
  gold: '#F5C41C',
  goldDark: '#C49A14',
  bg: '#0E0404',
  surface: '#1A0808',
  panel: '#240C0C',
  border: '#350F0F',
  muted: 'rgba(255,255,255,0.45)',
  dim: 'rgba(255,255,255,0.22)',
}

// ─── Icons ────────────────────────────────────────────────────────────────────
function Icon({ name, size = 20, color = 'currentColor' }: { name: string; size?: number; color?: string }) {
  const paths: Record<string, JSX.Element> = {
    github: <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" fill={color} />,
    shield: <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" stroke={color} strokeWidth="1.5" fill="none" strokeLinejoin="round" />,
    zap: <><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" stroke={color} strokeWidth="1.5" fill="none" strokeLinejoin="round" /></>,
    search: <><circle cx="11" cy="11" r="8" stroke={color} strokeWidth="1.5" fill="none" /><line x1="21" y1="21" x2="16.65" y2="16.65" stroke={color} strokeWidth="1.5" strokeLinecap="round" /></>,
    cpu: <><rect x="4" y="4" width="16" height="16" rx="2" stroke={color} strokeWidth="1.5" fill="none" /><rect x="9" y="9" width="6" height="6" stroke={color} strokeWidth="1.5" fill="none" /><line x1="9" y1="1" x2="9" y2="4" stroke={color} strokeWidth="1.5" /><line x1="15" y1="1" x2="15" y2="4" stroke={color} strokeWidth="1.5" /><line x1="9" y1="20" x2="9" y2="23" stroke={color} strokeWidth="1.5" /><line x1="15" y1="20" x2="15" y2="23" stroke={color} strokeWidth="1.5" /><line x1="20" y1="9" x2="23" y2="9" stroke={color} strokeWidth="1.5" /><line x1="20" y1="14" x2="23" y2="14" stroke={color} strokeWidth="1.5" /><line x1="1" y1="9" x2="4" y2="9" stroke={color} strokeWidth="1.5" /><line x1="1" y1="14" x2="4" y2="14" stroke={color} strokeWidth="1.5" /></>,
    check: <polyline points="20 6 9 17 4 12" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />,
    x: <><line x1="18" y1="6" x2="6" y2="18" stroke={color} strokeWidth="2" strokeLinecap="round" /><line x1="6" y1="6" x2="18" y2="18" stroke={color} strokeWidth="2" strokeLinecap="round" /></>,
    plus: <><line x1="12" y1="5" x2="12" y2="19" stroke={color} strokeWidth="2" strokeLinecap="round" /><line x1="5" y1="12" x2="19" y2="12" stroke={color} strokeWidth="2" strokeLinecap="round" /></>,
    minus: <line x1="5" y1="12" x2="19" y2="12" stroke={color} strokeWidth="2" strokeLinecap="round" />,
    arrowRight: <><line x1="5" y1="12" x2="19" y2="12" stroke={color} strokeWidth="1.5" strokeLinecap="round" /><polyline points="12 5 19 12 12 19" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" /></>,
    lock: <><rect x="3" y="11" width="18" height="11" rx="2" stroke={color} strokeWidth="1.5" fill="none" /><path d="M7 11V7a5 5 0 0 1 10 0v4" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" /></>,
    code: <><polyline points="16 18 22 12 16 6" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" /><polyline points="8 6 2 12 8 18" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" /></>,
    globe: <><circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.5" fill="none" /><line x1="2" y1="12" x2="22" y2="12" stroke={color} strokeWidth="1.5" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" stroke={color} strokeWidth="1.5" fill="none" /></>,
    book: <><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" stroke={color} strokeWidth="1.5" fill="none" /></>,
    copy: <><rect x="9" y="9" width="13" height="13" rx="2" stroke={color} strokeWidth="1.5" fill="none" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" /></>,
    firefox: <><circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.5" fill="none" /><path d="M12 2C9 5 8 8 9 12s4 7 7 8" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" /></>,
    type: <><polyline points="4 7 4 4 20 4 20 7" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" /><line x1="9" y1="20" x2="15" y2="20" stroke={color} strokeWidth="1.5" strokeLinecap="round" /><line x1="12" y1="4" x2="12" y2="20" stroke={color} strokeWidth="1.5" strokeLinecap="round" /></>,
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {paths[name]}
    </svg>
  )
}

// ─── Logo ─────────────────────────────────────────────────────────────────────
function Logo({ size = 36 }: { size?: number }) {
  return (
    <img src={logoSrc} alt="Лектор-МК лого" width={size} height={size} style={{ display: 'block', objectFit: 'contain' }} />
  )
}

// ─── Label ────────────────────────────────────────────────────────────────────
function Label({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      fontSize: 11, letterSpacing: '2px', fontWeight: 600,
      color: T.red, fontFamily: 'Outfit, sans-serif', marginBottom: 14,
    }}>{children}</div>
  )
}

// ─── Section wrapper ──────────────────────────────────────────────────────────
function Section({ id, bg = T.bg, children, style = {} }: {
  id?: string; bg?: string; children: React.ReactNode; style?: React.CSSProperties
}) {
  return (
    <section id={id} style={{
      background: bg,
      padding: '96px clamp(24px, 6vw, 80px)',
      ...style,
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {children}
      </div>
    </section>
  )
}

// ─── Divider ──────────────────────────────────────────────────────────────────
function Divider() {
  return <div style={{ height: 1, background: T.border }} />
}

// ─── Nav ─────────────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 48)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? T.bg : 'transparent',
      borderBottom: scrolled ? `1px solid ${T.border}` : '1px solid transparent',
      transition: 'background 0.25s, border-color 0.25s',
      padding: '0 clamp(20px, 5vw, 60px)',
      height: 58,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    }}>
      <a href="#hero" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
        <Logo size={30} />
        <span style={{ fontFamily: 'Merriweather, serif', fontWeight: 700, fontSize: 16, color: '#fff' }}>
          Лектор-МК
        </span>
      </a>
      <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
        {[['#features', 'Функции'], ['#stats', 'Бројки'], ['#open-source', 'Код'], ['#faq', 'FAQ']].map(([href, label]) => (
          <a key={href} href={href} style={{
            fontFamily: 'Outfit, sans-serif', fontSize: 13.5, fontWeight: 500,
            color: T.muted, textDecoration: 'none', transition: 'color 0.15s',
          }}
            onMouseOver={e => (e.currentTarget.style.color = '#fff')}
            onMouseOut={e => (e.currentTarget.style.color = T.muted)}
          >{label}</a>
        ))}
        <a
          href="https://github.com/todorx/lektor-mk"
          target="_blank" rel="noopener noreferrer"
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '6px 14px',
            border: `1px solid ${T.border}`,
            borderRadius: 4,
            color: T.muted, fontSize: 13, fontWeight: 500,
            textDecoration: 'none', fontFamily: 'Outfit, sans-serif',
            transition: 'color 0.15s, border-color 0.15s',
          }}
          onMouseOver={e => {
            e.currentTarget.style.color = '#fff'
            e.currentTarget.style.borderColor = T.muted
          }}
          onMouseOut={e => {
            e.currentTarget.style.color = T.muted
            e.currentTarget.style.borderColor = T.border
          }}
        >
          <Icon name="github" size={14} color="currentColor" />
          GitHub
        </a>
      </div>
    </nav>
  )
}

// ─── Before/After ─────────────────────────────────────────────────────────────
function BeforeAfter() {
  const [step, setStep] = useState<'before' | 'after'>('before')

  return (
    <div style={{
      background: T.surface,
      border: `1px solid ${T.border}`,
      borderRadius: 8,
      overflow: 'visible',
      width: '100%',
      fontFamily: 'Outfit, sans-serif',
    }}>
      {/* Browser chrome */}
      <div style={{
        background: T.panel,
        padding: '10px 16px',
        borderBottom: `1px solid ${T.border}`,
        display: 'flex', alignItems: 'center', gap: 8,
        borderRadius: '8px 8px 0 0',
      }}>
        <div style={{ width: 9, height: 9, borderRadius: '50%', background: T.border }} />
        <div style={{ width: 9, height: 9, borderRadius: '50%', background: T.border }} />
        <div style={{ width: 9, height: 9, borderRadius: '50%', background: T.border }} />
        <div style={{
          marginLeft: 8, flex: 1, background: T.bg,
          borderRadius: 3, padding: '4px 10px',
          fontSize: 11, color: T.dim,
        }}>
          docs.gov.mk
        </div>
        <Logo size={18} />
      </div>

      {/* Text area */}
      <div style={{ padding: '24px 24px 8px', position: 'relative' }}>
        <span style={{ fontSize: 16, lineHeight: 1.8, color: '#fff', display: 'block' }}>
          Ја прочитав{' '}
          {step === 'before' ? (
            <span style={{ position: 'relative' }}>
              <span style={{ borderBottom: `2px solid ${T.red}`, paddingBottom: 1 }}>
                убавата книгата
              </span>
              <span style={{
                position: 'absolute', bottom: 'calc(100% + 8px)', left: 0,
                background: T.panel,
                border: `1px solid ${T.red}`,
                borderRadius: 6, padding: '10px 14px',
                fontSize: 12, whiteSpace: 'nowrap',
                color: '#fff', zIndex: 10,
                boxShadow: '0 4px 16px rgba(0,0,0,0.6)',
                display: 'flex', flexDirection: 'column', gap: 6,
              }}>
                <span style={{ color: T.red, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 5 }}>
                  <Icon name="x" size={12} color={T.red} /> Двојна определба
                </span>
                <span style={{ color: T.muted }}>Членот не се удвојува</span>
                <span
                  onClick={() => setStep('after')}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 5,
                    background: T.bg, borderRadius: 4,
                    padding: '4px 10px',
                    color: '#6DC96D', fontWeight: 600, cursor: 'pointer',
                    border: '1px solid rgba(109,201,109,0.3)',
                  }}
                >
                  <Icon name="check" size={12} color="#6DC96D" /> убавата книга
                </span>
              </span>
            </span>
          ) : (
            <span style={{ color: '#6DC96D' }}>убавата книга</span>
          )}{' '}
          вчера навечер.
        </span>
      </div>

      {/* Action bar */}
      <div style={{
        padding: '12px 24px 16px',
        display: 'flex', gap: 10, alignItems: 'center',
      }}>
        {step === 'before' ? (
          <button onClick={() => setStep('after')} style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '7px 14px', background: T.red, border: 'none',
            borderRadius: 4, color: '#fff', fontSize: 12, fontWeight: 600,
            cursor: 'pointer', fontFamily: 'Outfit, sans-serif',
          }}>
            <Icon name="check" size={13} color="#fff" />
            Примени поправка
          </button>
        ) : (
          <button onClick={() => setStep('before')} style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '7px 14px', background: 'transparent',
            border: `1px solid ${T.border}`,
            borderRadius: 4, color: T.muted, fontSize: 12,
            cursor: 'pointer', fontFamily: 'Outfit, sans-serif',
          }}>
            Врати назад
          </button>
        )}
        <span style={{ fontSize: 12, color: T.dim }}>
          {step === 'before' ? '1 грешка пронајдена' : '0 грешки'}
        </span>
      </div>
    </div>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section id="hero" style={{
      background: T.bg,
      borderBottom: `1px solid ${T.border}`,
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 64,
      alignItems: 'center',
      padding: 'clamp(80px, 10vw, 120px) clamp(24px, 6vw, 80px) 80px',
    }}>
      {/* Red top bar */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: T.red }} />

      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
          <Logo size={44} />
          <div>
            <div style={{ fontFamily: 'Merriweather, serif', fontWeight: 900, fontSize: 20, color: '#fff', lineHeight: 1 }}>
              Лектор-МК
            </div>
            <div style={{ fontSize: 10, color: T.dim, letterSpacing: '2px', marginTop: 4, fontFamily: 'Outfit, sans-serif' }}>
              ЛЕКТОР-МК
            </div>
          </div>
        </div>

        <h1 style={{
          fontFamily: 'Merriweather, serif',
          fontSize: 'clamp(32px, 5vw, 58px)',
          fontWeight: 900,
          color: '#fff',
          margin: '0 0 20px',
          lineHeight: 1.12,
          letterSpacing: '-0.5px',
        }}>
          Прв вистински<br />
          <span style={{ color: T.gold }}>правопис за</span><br />
          македонски
        </h1>

        <p style={{
          fontFamily: 'Outfit, sans-serif', fontWeight: 300,
          fontSize: 16, color: T.muted,
          lineHeight: 1.8, margin: '0 0 36px', maxWidth: 440,
        }}>
          Бесплатна, отворена Firefox додатка. Проверува правопис и граматика целосно на вашиот уред — без сервери, без сметки.
        </p>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <a
            href="https://github.com/todorx/lektor-mk"
            target="_blank" rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '12px 24px', background: T.red,
              borderRadius: 4, textDecoration: 'none',
              color: '#fff', fontFamily: 'Outfit, sans-serif',
              fontWeight: 600, fontSize: 14,
              border: `1px solid ${T.red}`,
              transition: 'background 0.15s',
            }}
            onMouseOver={e => (e.currentTarget.style.background = T.redDark)}
            onMouseOut={e => (e.currentTarget.style.background = T.red)}
          >
            <Icon name="github" size={16} color="#fff" />
            Преземи од GitHub
          </a>
          <a href="#features" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '12px 24px',
            background: 'transparent',
            border: `1px solid ${T.border}`,
            borderRadius: 4, textDecoration: 'none',
            color: T.muted, fontFamily: 'Outfit, sans-serif',
            fontWeight: 500, fontSize: 14,
            transition: 'border-color 0.15s, color 0.15s',
          }}
            onMouseOver={e => {
              e.currentTarget.style.borderColor = T.muted
              e.currentTarget.style.color = '#fff'
            }}
            onMouseOut={e => {
              e.currentTarget.style.borderColor = T.border
              e.currentTarget.style.color = T.muted
            }}
          >
            Функции
            <Icon name="arrowRight" size={14} color="currentColor" />
          </a>
        </div>

        <div style={{
          display: 'flex', gap: 24, marginTop: 32,
          paddingTop: 28, borderTop: `1px solid ${T.border}`,
          flexWrap: 'wrap',
        }}>
          {[
            { icon: 'firefox', label: 'Firefox' },
            { icon: 'lock', label: 'Целосно офлајн' },
            { icon: 'code', label: 'GPL-3.0' },
            { icon: 'globe', label: 'Бесплатно' },
          ].map(({ icon, label }) => (
            <div key={label} style={{
              display: 'flex', alignItems: 'center', gap: 7,
              fontSize: 13, color: T.dim, fontFamily: 'Outfit, sans-serif',
            }}>
              <Icon name={icon} size={14} color={T.dim} />
              {label}
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <Label>ИНТЕРАКТИВНА ДЕМО</Label>
        <BeforeAfter />
        <p style={{ fontSize: 12, color: T.dim, margin: 0, lineHeight: 1.6, fontFamily: 'Outfit, sans-serif' }}>
          Кликнете на грешката за да видите поправка во реално време.
        </p>
      </div>
    </section>
  )
}

// ─── Privacy ──────────────────────────────────────────────────────────────────
function Privacy() {
  return (
    <Section bg={T.surface}>
      <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: 80, alignItems: 'center' }}>
        <div style={{
          fontFamily: 'Merriweather, serif',
          fontWeight: 900,
          fontSize: 'clamp(40px, 5vw, 64px)',
          color: T.gold,
          lineHeight: 1,
        }}>
          100%<br />локално
        </div>
        <div>
          <h2 style={{ fontFamily: 'Merriweather, serif', fontSize: 20, fontWeight: 700, color: '#fff', margin: '0 0 14px' }}>
            Зошто само на вашиот уред?
          </h2>
          <p style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 300, fontSize: 15, color: T.muted, lineHeight: 1.85, margin: '0 0 12px' }}>
            Лекторот гледа сè — деловни извештаи, лични пораки, новинарски написи пред објава. Грамерли и слични алатки го испраќаат тој текст на свои сервери. Лектор-МК не. Целиот мотор — речникот, граматиката, предлозите — се испорачува внатре во додатката како неколку мегабајти WebAssembly и работи исклучиво во вашиот прелистувач.
          </p>
          <p style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 300, fontSize: 15, color: T.muted, lineHeight: 1.85, margin: 0 }}>
            Ова е особено важно за новинари, лектори и државни службеници кои работат со доверлив материјал.
          </p>
        </div>
      </div>
    </Section>
  )
}

// ─── Features ─────────────────────────────────────────────────────────────────
const features = [
  {
    icon: 'book',
    title: 'Правопис со рангирани поправки',
    body: '427.464 форми стиснати во 1,25 MB конечно-статусен трансдуктор. Предлози рангирани по фреквенција и македонски конфузии (к/ќ, е/ѐ), плус контекст на соседните зборови.',
  },
  {
    icon: 'search',
    title: 'Детекција на хомоглифи',
    body: 'Открива латинични букви скриени во кирилски зборови — пиксел-идентични, невидливи за луѓе, но ги кршат пребарувањето и сортирањето. Открива и српски/руски/бугарски букви.',
  },
  {
    icon: 'type',
    title: 'Граматички правила',
    body: 'Двојна определба (убавата книгата ✗), редослед на клитики (ми го даде / го ми даде), ѝ vs и, согласување на л-партицип — прецизно подесено на нула лажни позитиви.',
  },
  {
    icon: 'zap',
    title: 'Брзо и офлајн',
    body: '17.782 зборови проверени за 0,95 секунди. Целата додатка е ~6,2 MB. Работи без интернет — во авион, во болница, зад заштитен ѕид.',
  },
  {
    icon: 'cpu',
    title: 'WebAssembly мотор',
    body: 'Написан во Rust и компајлиран до WASM. Речникот, граматиката и автодополнувањето работат директно во прелистувачот без инсталација на надворешни програми.',
  },
]

function Features() {
  return (
    <Section id="features" bg={T.bg}>
      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 80, marginBottom: 56 }}>
        <div>
          <Label>ФУНКЦИИ</Label>
          <h2 style={{ fontFamily: 'Merriweather, serif', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 900, color: '#fff', margin: 0, lineHeight: 1.15 }}>
            Направено за македонски
          </h2>
        </div>
        <p style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 300, fontSize: 15, color: T.muted, lineHeight: 1.8, margin: 'auto 0 0', maxWidth: 520 }}>
          Ниту еден постоечки алат — LanguageTool, Grammarly, ниту друг — не поддржува македонски. Лектор-МК е направен специфично за македонскиот правопис и граматика.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: 1, background: T.border, border: `1px solid ${T.border}`, borderRadius: 6, overflow: 'hidden' }}>
        {features.map((f, i) => (
          <div key={i} style={{
            background: T.surface,
            padding: '28px 26px',
            transition: 'background 0.15s',
          }}
            onMouseOver={e => (e.currentTarget.style.background = T.panel)}
            onMouseOut={e => (e.currentTarget.style.background = T.surface)}
          >
            <div style={{ marginBottom: 16, color: T.gold }}>
              <Icon name={f.icon} size={22} color={T.gold} />
            </div>
            <h3 style={{
              fontFamily: 'Merriweather, serif', fontWeight: 700,
              fontSize: 15, color: '#fff', margin: '0 0 10px', lineHeight: 1.4,
            }}>{f.title}</h3>
            <p style={{
              fontFamily: 'Outfit, sans-serif', fontWeight: 300,
              fontSize: 13.5, color: T.muted, lineHeight: 1.75, margin: 0,
            }}>{f.body}</p>
          </div>
        ))}
      </div>
    </Section>
  )
}

// ─── Stats ────────────────────────────────────────────────────────────────────
const stats = [
  { n: '427.464', label: 'лексички форми', sub: 'во 1,25 MB FST' },
  { n: '2,78%', label: 'стапка на грешки', sub: 'на живата мак. Википедија' },
  { n: '0', label: 'лажни позитиви', sub: 'на 17.782 збора уредена проза' },
  { n: '0,95 s', label: 'за 17.782 зборови', sub: 'целосна провера' },
  { n: '~6,2 MB', label: 'вкупна големина', sub: 'вградено во додатката' },
  { n: '71.109', label: 'имиња во газетир', sub: 'намалувачи на лажни аларми' },
]

function Stats() {
  return (
    <Section id="stats" bg={T.surface}>
      <div style={{ textAlign: 'center', marginBottom: 56 }}>
        <Label>ИЗМЕРЕНИ БРОЈКИ · СИТЕ РЕПРОДУЦИБИЛНИ</Label>
        <h2 style={{ fontFamily: 'Merriweather, serif', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 900, color: '#fff', margin: '0 0 12px' }}>
          Бројки, не ветувања
        </h2>
        <p style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 300, fontSize: 14, color: T.dim, margin: 0 }}>
          Секој број е измерен и може да се репродуцира од README.
        </p>
      </div>

      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
        border: `1px solid ${T.border}`, borderRadius: 6, overflow: 'hidden',
        background: T.border, gap: 1,
      }}>
        {stats.map(({ n, label, sub }) => (
          <div key={label} style={{
            background: T.bg, padding: '32px 28px', textAlign: 'center',
            transition: 'background 0.15s',
          }}
            onMouseOver={e => (e.currentTarget.style.background = T.panel)}
            onMouseOut={e => (e.currentTarget.style.background = T.bg)}
          >
            <div style={{
              fontFamily: 'Merriweather, serif', fontWeight: 900,
              fontSize: 'clamp(24px, 3.5vw, 42px)',
              color: T.gold, lineHeight: 1, marginBottom: 10,
            }}>{n}</div>
            <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: 14, color: '#fff', marginBottom: 4 }}>{label}</div>
            <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 12, color: T.dim, fontWeight: 300 }}>{sub}</div>
          </div>
        ))}
      </div>
    </Section>
  )
}

// ─── Open Source ──────────────────────────────────────────────────────────────
const sources = [
  { name: 'gerazov/dictionary-mk', use: 'Основен речник (261.460 форми)', license: 'GPL-2.0' },
  { name: 'apertium-mkd', use: 'Парадигми / морфолошко проширување', license: 'GPL' },
  { name: 'МК Википедија — написи', use: 'Фреквентни броења', license: 'CC BY-SA 4.0' },
  { name: 'МК Википедија — наслови', use: 'Газетир со сопствени имиња', license: 'CC BY-SA 4.0' },
]

function OpenSource() {
  return (
    <Section id="open-source" bg={T.bg}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' }}>
        <div>
          <Label>ОТВОРЕН КОД</Label>
          <h2 style={{ fontFamily: 'Merriweather, serif', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 900, color: '#fff', margin: '0 0 20px', lineHeight: 1.15 }}>
            Слободен,<br />отворен,<br /><span style={{ color: T.gold }}>заеднички</span>
          </h2>
          <p style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 300, fontSize: 15, color: T.muted, lineHeight: 1.8, margin: '0 0 28px' }}>
            GPL-3.0-or-later. Изворниот код, речникот, граматичките правила и алатките за изградба се целосно достапни.
          </p>
          <a
            href="https://github.com/todorx/lektor-mk"
            target="_blank" rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '12px 22px', background: T.red,
              border: `1px solid ${T.red}`,
              borderRadius: 4, textDecoration: 'none',
              color: '#fff', fontFamily: 'Outfit, sans-serif',
              fontWeight: 600, fontSize: 14,
              transition: 'background 0.15s',
            }}
            onMouseOver={e => (e.currentTarget.style.background = T.redDark)}
            onMouseOut={e => (e.currentTarget.style.background = T.red)}
          >
            <Icon name="github" size={16} color="#fff" />
            todorx/lektor-mk
          </a>
        </div>

        <div>
          <div style={{ fontSize: 11, letterSpacing: '1.5px', color: T.dim, fontWeight: 600, marginBottom: 14, fontFamily: 'Outfit, sans-serif' }}>
            ИЗВОРИ НА ПОДАТОЦИ
          </div>
          <div style={{ border: `1px solid ${T.border}`, borderRadius: 6, overflow: 'hidden' }}>
            <div style={{
              display: 'grid', gridTemplateColumns: '2fr 2fr 1fr',
              background: T.panel, padding: '9px 16px',
              fontSize: 10, letterSpacing: '0.8px', color: T.dim,
              fontFamily: 'Outfit, sans-serif', fontWeight: 600,
              borderBottom: `1px solid ${T.border}`,
            }}>
              <span>ИЗВОР</span><span>УПОТРЕБА</span><span>ЛИЦЕНЦА</span>
            </div>
            {sources.map((s, i) => (
              <div key={i} style={{
                display: 'grid', gridTemplateColumns: '2fr 2fr 1fr',
                padding: '13px 16px',
                background: i % 2 === 0 ? T.surface : T.bg,
                borderTop: i === 0 ? 'none' : `1px solid ${T.border}`,
                alignItems: 'center', gap: 8,
                fontSize: 12.5, fontFamily: 'Outfit, sans-serif',
              }}>
                <span style={{ color: T.gold, fontWeight: 500 }}>{s.name}</span>
                <span style={{ color: T.muted, fontWeight: 300 }}>{s.use}</span>
                <span style={{
                  padding: '2px 7px', borderRadius: 3,
                  border: `1px solid ${T.border}`,
                  color: T.muted, fontSize: 10.5, fontWeight: 600,
                  whiteSpace: 'nowrap', fontFamily: 'Outfit, sans-serif',
                }}>{s.license}</span>
              </div>
            ))}
          </div>
          <p style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 300, fontSize: 12, color: T.dim, lineHeight: 1.6, margin: '12px 0 0' }}>
            Лиценцирано под GPL-3.0-or-later, наследено од речничката зависност.
          </p>
        </div>
      </div>
    </Section>
  )
}

// ─── FAQ ─────────────────────────────────────────────────────────────────────
const faqs = [
  {
    q: 'Кои прелистувачи се поддржани?',
    a: 'Тековно само Firefox. Додатката користи Manifest V2, кој Chrome го укина. Поддршката за Chrome/Edge е планирана кога Manifest V3 ќе овозможи еквивалентен API.',
  },
  {
    q: 'Дали работи без интернет?',
    a: 'Да, целосно. Речникот, граматиката и автодополнувањето се дел од додатката. По инсталацијата не е потребна мрежна врска.',
  },
  {
    q: 'Дали мојот текст се праќа некаде?',
    a: 'Никогаш. Нема сервери, нема сметки, нема аналитика. Целиот мотор работи во вашиот прелистувач. Може да го верифицирате со преглед на изворниот код.',
  },
  {
    q: 'Зошто само Firefox, а не Chrome?',
    a: 'Chrome го укина Manifest V2, кој ни овозможуваше да го вбризгуваме моторот во секоја страница. Manifest V3 сè уште нема доволно API. Firefox продолжи со поддршка на MV2.',
  },
]

function FAQ() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <Section id="faq" bg={T.surface}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <Label>ПРАШАЊА</Label>
          <h2 style={{ fontFamily: 'Merriweather, serif', fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 900, color: '#fff', margin: 0 }}>
            Често прашувани
          </h2>
        </div>

        <div style={{ border: `1px solid ${T.border}`, borderRadius: 6, overflow: 'hidden' }}>
          {faqs.map((faq, i) => (
            <div key={i} style={{ borderTop: i === 0 ? 'none' : `1px solid ${T.border}` }}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                style={{
                  width: '100%', textAlign: 'left',
                  padding: '18px 22px',
                  background: open === i ? T.panel : T.bg,
                  border: 'none',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  cursor: 'pointer', gap: 16, transition: 'background 0.15s',
                }}
                onMouseOver={e => (e.currentTarget.style.background = T.panel)}
                onMouseOut={e => (e.currentTarget.style.background = open === i ? T.panel : T.bg)}
              >
                <span style={{ fontFamily: 'Merriweather, serif', fontWeight: 700, fontSize: 15, color: '#fff' }}>
                  {faq.q}
                </span>
                <span style={{ color: T.red, flexShrink: 0, transition: 'transform 0.2s', transform: open === i ? 'rotate(45deg)' : 'none', display: 'inline-flex' }}>
                  <Icon name="plus" size={18} color={T.red} />
                </span>
              </button>
              {open === i && (
                <div style={{
                  padding: '0 22px 18px',
                  fontFamily: 'Outfit, sans-serif', fontWeight: 300,
                  fontSize: 14, color: T.muted, lineHeight: 1.8,
                  background: T.panel,
                }}>
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{
      background: T.bg,
      borderTop: `1px solid ${T.border}`,
      padding: '36px clamp(24px, 6vw, 80px)',
    }}>
      <div style={{
        maxWidth: 1100, margin: '0 auto',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Logo size={28} />
          <div>
            <div style={{ fontFamily: 'Merriweather, serif', fontWeight: 700, fontSize: 14, color: '#fff' }}>
              Лектор-МК
            </div>
            <div style={{ fontSize: 10, color: T.dim, marginTop: 2, fontFamily: 'Outfit, sans-serif' }}>
              GPL-3.0-or-later
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 28 }}>
          {[['#features', 'Функции'], ['#stats', 'Бројки'], ['#open-source', 'Код'], ['#faq', 'FAQ']].map(([href, label]) => (
            <a key={href} href={href} style={{
              fontFamily: 'Outfit, sans-serif', fontSize: 13,
              color: T.dim, textDecoration: 'none', transition: 'color 0.15s',
            }}
              onMouseOver={e => (e.currentTarget.style.color = '#fff')}
              onMouseOut={e => (e.currentTarget.style.color = T.dim)}
            >{label}</a>
          ))}
          <a
            href="https://github.com/todorx/lektor-mk"
            target="_blank" rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 5,
              fontFamily: 'Outfit, sans-serif', fontSize: 13,
              color: T.dim, textDecoration: 'none', transition: 'color 0.15s',
            }}
            onMouseOver={e => (e.currentTarget.style.color = '#fff')}
            onMouseOut={e => (e.currentTarget.style.color = T.dim)}
          >
            <Icon name="github" size={13} color="currentColor" />
            GitHub
          </a>
        </div>
      </div>
    </footer>
  )
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div>
      <Nav />
      <Hero />
      <Divider />
      <Privacy />
      <Divider />
      <Features />
      <Divider />
      <Stats />
      <Divider />
      <OpenSource />
      <Divider />
      <FAQ />
      <Footer />
    </div>
  )
}
