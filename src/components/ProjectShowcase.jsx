import { useEffect, useState } from 'react'
import { TECH_ICONS } from './techIcons'

const STACK = ['Java', 'Spring Boot', 'Keycloak', 'MySQL', 'MongoDB', 'Redis', 'RabbitMQ']
const BASE = ['Java', 'Spring Boot']

function TechTile({ name, state }) {
  const [Icon, color] = TECH_ICONS[name] || []
  return (
    <li className={`tech-tile is-${state}`} style={{ '--brand': color }}>
      {Icon && <Icon aria-hidden="true" />}
      <span>{name}</span>
    </li>
  )
}

export default function ProjectShowcase({ project }) {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const features = project.features

  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined
    }
    const id = setInterval(() => setActive((i) => (i + 1) % features.length), 3500)
    return () => clearInterval(id)
  }, [paused, features.length])

  const current = features[active]

  return (
    <article
      className="showcase card"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <header className="showcase__head">
        <div>
          <p className="project__index">{project.subtitle}</p>
          <h3 className="project__title">{project.title}</h3>
          <p className="project__body">{project.description}</p>
        </div>
        {project.url && (
          <a
            className="btn btn--dark btn--pill"
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {project.urlLabel || 'View code'} ↗
          </a>
        )}
      </header>

      <div className="showcase__body">
        <ul className="showcase__features" role="tablist" aria-label="Project features">
          {features.map((f, i) => (
            <li key={f.title}>
              <button
                type="button"
                role="tab"
                aria-selected={i === active}
                className={i === active ? 'is-active' : ''}
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive(i)}
              >
                <span className="showcase__num">0{i + 1}</span>
                <span className="showcase__text">
                  <strong>{f.title}</strong>
                  <span>{f.text}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>

        <div className="showcase__stack">
          <p className="showcase__caption">
            Now showing: <strong>{current.title}</strong>
          </p>
          <ul className="tech-grid">
            {STACK.map((name) => {
              const on = BASE.includes(name) || current.tech.includes(name)
              const hot = current.tech.includes(name)
              return (
                <TechTile
                  key={name}
                  name={name}
                  state={hot ? 'hot' : on ? 'base' : 'dim'}
                />
              )
            })}
          </ul>
        </div>
      </div>
    </article>
  )
}
