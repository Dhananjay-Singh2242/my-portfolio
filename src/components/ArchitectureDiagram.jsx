import { useMemo, useState } from 'react'
import rough from 'roughjs'
import { TECH_ICONS } from './techIcons'

const gen = rough.generator()
const INK = 'rgba(255,255,255,0.88)'
const ACCENT = '#8aa4ff'

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Hand-drawn (Excalidraw-style) primitives -------------------------------
const rect = (x, y, w, h, seed, extra = {}) =>
  gen.toPaths(
    gen.rectangle(x, y, w, h, { roughness: 1.3, strokeWidth: 1.6, seed, ...extra }),
  )

const arrow = (x1, y1, x2, y2, seed) => {
  const a = Math.atan2(y2 - y1, x2 - x1)
  const head = 9
  const p = (ang) => [x2 - head * Math.cos(a + ang), y2 - head * Math.sin(a + ang)]
  const [lx, ly] = p(0.45)
  const [rx, ry] = p(-0.45)
  const o = { roughness: 1.1, strokeWidth: 1.6, seed }
  return [
    ...gen.toPaths(gen.line(x1, y1, x2, y2, o)),
    ...gen.toPaths(gen.line(x2, y2, lx, ly, o)),
    ...gen.toPaths(gen.line(x2, y2, rx, ry, o)),
  ]
}

// Diagram definitions (every claim comes from the resume) ----------------
const DIAGRAMS = {
  architecture: {
    viewBox: '0 0 640 360',
    groups: [
      { x: 160, y: 14, w: 266, h: 250, label: '23 Spring Boot microservices' },
      { x: 466, y: 14, w: 166, h: 250, label: 'Data layer' },
    ],
    nodes: [
      { id: 'client', label: 'Client', x: 14, y: 134, w: 100, h: 64 },
      { id: 'auth', label: 'Auth', tech: 'Spring Security', x: 176, y: 46, w: 112, h: 52 },
      { id: 'user', label: 'User', x: 298, y: 46, w: 112, h: 52 },
      { id: 'payments', label: 'Payments', x: 176, y: 112, w: 112, h: 52 },
      { id: 'subscriptions', label: 'Subscriptions', x: 298, y: 112, w: 112, h: 52 },
      { id: 'wallet', label: 'Wallet', x: 176, y: 178, w: 112, h: 52 },
      { id: 'notifications', label: 'Notifications', x: 298, y: 178, w: 112, h: 52 },
      { id: 'rabbitmq', label: 'RabbitMQ', tech: 'RabbitMQ', x: 160, y: 296, w: 266, h: 48 },
      { id: 'redis', label: 'Redis', tech: 'Redis', x: 482, y: 44, w: 134, h: 56 },
      { id: 'postgres', label: 'PostgreSQL', tech: 'PostgreSQL', x: 482, y: 118, w: 134, h: 56 },
      { id: 'mongo', label: 'MongoDB', tech: 'MongoDB', x: 482, y: 192, w: 134, h: 56 },
    ],
    arrows: [
      [114, 166, 160, 166],
      [426, 150, 466, 150],
      [293, 264, 293, 296],
    ],
    packets: [
      { path: 'M114 166 L160 166', dur: 1.6 },
      { path: 'M426 150 L466 150', dur: 1.8 },
      { path: 'M293 264 L293 296', dur: 1.4 },
    ],
    info: {
      client: ['Clients', 'Call the platform through REST APIs served by the microservices.'],
      auth: ['Auth service', 'Spring Security with JWT access and refresh tokens, Keycloak, and role-based access control (RBAC).'],
      user: ['User management', 'Part of the 23-service architecture, built within a 2-engineer team.'],
      payments: ['Payments', 'Payment workflows: server notifications, refunds, and recurring subscription charges. Covered by JUnit and Mockito tests.'],
      subscriptions: ['Subscriptions', 'Recurring subscription charges, with JUnit and Mockito tests for subscription and pricing logic.'],
      wallet: ['Wallet', 'Wallet functionality, one of the domains I built backend features for.'],
      notifications: ['Notifications', 'Notification service, one of the domains I built backend features for.'],
      rabbitmq: ['RabbitMQ', 'Async messaging across 19 modules: lower service coupling and +25% message throughput.'],
      redis: ['Redis', 'Caching for high-traffic REST APIs. Part of the 30% p95 latency improvement.'],
      postgres: ['PostgreSQL', 'Query optimization and database indexing, part of the 30% p95 latency improvement.'],
      mongo: ['MongoDB', 'One of the data stores used across the services.'],
    },
    defaultNode: 'auth',
  },
  events: {
    viewBox: '0 0 640 360',
    groups: [],
    nodes: [
      { id: 'request', label: 'API request', x: 10, y: 100, w: 104, h: 64 },
      { id: 'queue', label: 'RabbitMQ', tech: 'RabbitMQ', x: 150, y: 100, w: 140, h: 64 },
      { id: 'consumer', label: 'Consumer', x: 326, y: 100, w: 140, h: 64 },
      { id: 'result', label: 'Processed', x: 502, y: 100, w: 122, h: 64 },
      { id: 'retry', label: 'Retry + backoff', x: 262, y: 246, w: 160, h: 56 },
      { id: 'dlq', label: 'Dead-letter', x: 478, y: 246, w: 146, h: 56 },
      { id: 'idempotent', label: 'Idempotent', x: 327, y: 20, w: 138, h: 44 },
    ],
    arrows: [
      [114, 132, 150, 132],
      [290, 132, 326, 132],
      [466, 132, 502, 132],
      [390, 164, 360, 246],
      [422, 274, 478, 274],
      [262, 274, 220, 274],
      [220, 274, 220, 166],
      [396, 64, 396, 100],
    ],
    packets: [
      { path: 'M114 132 L150 132', dur: 1.4 },
      { path: 'M290 132 L326 132', dur: 1.4, begin: 0.4 },
      { path: 'M466 132 L502 132', dur: 1.4, begin: 0.8 },
    ],
    info: {
      request: ['API request', 'Work that would block the request moves onto RabbitMQ instead.'],
      queue: ['RabbitMQ', 'Integrated across 19 modules: reduced service coupling and +25% message throughput.'],
      consumer: ['Consumer', 'Processes events in the background so the request path stays fast.'],
      result: ['Processed', 'The processed result, delivered onward after the consumer finishes.'],
      retry: ['Retry with exponential backoff', 'Retry mechanisms with exponential backoff, so failed messages are retried with increasing delays.'],
      dlq: ['Dead-letter handling', 'Dead-letter handling for messages that cannot be processed successfully.'],
      idempotent: ['Idempotent processing', 'Idempotent message processing: handling the same message again does not repeat its effect.'],
    },
    defaultNode: 'queue',
  },
}

// White rounded badge with the brand logo, drawn inside the SVG.
function TechBadge({ name, x, y }) {
  const [Icon, color] = TECH_ICONS[name]
  return (
    <g className="diagram__badge" aria-hidden="true">
      <rect x={x} y={y} width="26" height="26" rx="7" fill="#fff" />
      <Icon x={x + 4} y={y + 4} size={18} color={color} />
    </g>
  )
}

export default function ArchitectureDiagram({ mode = 'architecture' }) {
  const def = DIAGRAMS[mode]
  const [selected, setSelected] = useState(def.defaultNode)
  const reduced = prefersReducedMotion()

  const drawn = useMemo(
    () => ({
      groups: def.groups.map((g, i) => rect(g.x, g.y, g.w, g.h, 50 + i, { strokeLineDash: [6, 6], roughness: 1.6 })),
      nodes: Object.fromEntries(
        def.nodes.map((n, i) => [n.id, rect(n.x, n.y, n.w, n.h, 10 + i)]),
      ),
      arrows: def.arrows.map((a, i) => arrow(...a, 90 + i)),
    }),
    [def],
  )

  const [title, text] = def.info[selected]

  return (
    <div className="diagram">
      <svg
        className="diagram__svg"
        viewBox={def.viewBox}
        role="group"
        aria-label={mode === 'events' ? 'Event flow diagram' : 'Architecture diagram'}
      >
        {def.groups.map((g, i) => (
          <g key={g.label}>
            {drawn.groups[i].map((p, k) => (
              <path key={k} d={p.d} fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.4" />
            ))}
            <text className="diagram__group" x={g.x + 12} y={g.y - 2 + (g.y < 20 ? 0 : 0)} dy={-4}>
              {g.label}
            </text>
          </g>
        ))}

        {drawn.arrows.map((paths, i) => (
          <g key={i} className="diagram__arrow">
            {paths.map((p, k) => (
              <path key={k} d={p.d} fill="none" stroke={INK} strokeWidth="1.5" />
            ))}
          </g>
        ))}

        {def.nodes.map((n) => {
          const on = selected === n.id
          return (
            <g
              key={n.id}
              className={`diagram__node ${on ? 'is-selected' : ''}`}
              tabIndex={0}
              role="button"
              aria-pressed={on}
              aria-label={n.label}
              onMouseEnter={() => setSelected(n.id)}
              onFocus={() => setSelected(n.id)}
              onClick={() => setSelected(n.id)}
            >
              <rect x={n.x} y={n.y} width={n.w} height={n.h} rx="10" className="diagram__hit" />
              {drawn.nodes[n.id].map((p, k) => (
                <path
                  key={k}
                  d={p.d}
                  fill="none"
                  stroke={on ? ACCENT : INK}
                  strokeWidth={on ? 2.6 : 1.6}
                />
              ))}
              {n.tech && TECH_ICONS[n.tech] && (
                <TechBadge name={n.tech} x={n.x + 10} y={n.y + n.h / 2 - 13} />
              )}
              <text
                x={n.x + n.w / 2 + (n.tech ? 17 : 0)}
                y={n.y + n.h / 2}
                className="diagram__label"
              >
                {n.label}
              </text>
            </g>
          )
        })}

        {!reduced &&
          def.packets.map((p, i) => (
            <circle key={i} r="4.5" fill={ACCENT} className="diagram__packet">
              <animateMotion
                dur={`${p.dur}s`}
                begin={`${p.begin || 0}s`}
                repeatCount="indefinite"
                path={p.path}
              />
            </circle>
          ))}
      </svg>

      <div className="diagram__info" aria-live="polite">
        <strong>{title}</strong>
        <span>{text}</span>
      </div>
    </div>
  )
}
