import { useEffect, useState } from 'react'
import {
  education,
  experience,
  profile,
  projects,
} from './data/content'
import portrait from './assets/portrait.jpg'
import heroDoodle from './assets/hero-doodle.svg'
import CaseStudy from './components/CaseStudy'
import ProjectShowcase from './components/ProjectShowcase'
import SkillsShowcase from './components/SkillsShowcase'
import { FaGithub, FaLinkedinIn } from 'react-icons/fa6'
import {
  LuBoxes,
  LuDownload,
  LuFlaskConical,
  LuGauge,
  LuGraduationCap,
  LuMail,
  LuNetwork,
  LuPhone,
  LuRocket,
  LuShieldCheck,
  LuWorkflow,
} from 'react-icons/lu'
import { TECH_ICONS } from './components/techIcons'
import { BackToTop, CountUp, ScrollProgress } from './components/Extras'
import { useReveal } from './hooks/useReveal'
import './App.css'
import './site.css'
import './components/CaseStudy.css'

const JOB_ICONS = {
  architecture: LuBoxes,
  performance: LuGauge,
  messaging: LuWorkflow,
  security: LuShieldCheck,
  devops: LuRocket,
  testing: LuFlaskConical,
}

const ABOUT_FEATURES = [
  { label: 'Scalable APIs', Icon: LuNetwork },
  { label: 'Secure Auth', Icon: LuShieldCheck },
  { label: 'Async Messaging', Icon: LuWorkflow },
  { label: 'Reliable Deploys', Icon: LuRocket },
]

const CORE_STACK = [
  'Java',
  'Spring Boot',
  'PostgreSQL',
  'MongoDB',
  'Redis',
  'RabbitMQ',
  'Keycloak',
]

const YEAR = new Date().getFullYear()

const NAV_ITEMS = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
]

function App() {
  const [scrolled, setScrolled] = useState(false)
  const [activeId, setActiveId] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

  useReveal()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = ['about', 'experience', 'projects', 'skills', 'education', 'contact']
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveId(e.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    sections.forEach((el) => observer.observe(el))
    const onTop = () => window.scrollY < 200 && setActiveId('')
    window.addEventListener('scroll', onTop, { passive: true })
    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onTop)
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <div className="page">
      <a className="skip" href="#about">
        Skip to content
      </a>
      <ScrollProgress />
      <BackToTop />
      <div className="atmosphere" aria-hidden="true" />

      <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
        <a
          className="nav__brand"
          href="#top"
          aria-label={`${profile.name} – back to top`}
          onClick={closeMenu}
        >
          <span className="nav__avatar">
            <img src={portrait} alt="" width={52} height={52} />
            <em aria-hidden="true">Hey!</em>
          </span>
          <span className="nav__name" aria-hidden="true">
            {profile.name.split(' ')[0].split('').map((ch, i) => (
              <span key={i} style={{ '--i': i }}>
                {ch}
              </span>
            ))}
          </span>
        </a>
        <button
          className={`nav__toggle ${menuOpen ? 'is-open' : ''}`}
          type="button"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
        </button>
        <nav
          className={`nav__links ${menuOpen ? 'is-open' : ''}`}
          aria-label="Primary"
        >
          {NAV_ITEMS.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              className={activeId === id ? 'is-active' : ''}
              aria-current={activeId === id ? 'true' : undefined}
              onClick={closeMenu}
            >
              {label}
            </a>
          ))}
          <a href={profile.resumeUrl} download onClick={closeMenu}>
            Resume
          </a>
          <span className="nav__icons">
            <a
              className="nav__icon"
              href={profile.links.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.54-3.87-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.69 1.25 3.35.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.83 1.18 3.09 0 4.42-2.69 5.39-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z"
                />
              </svg>
            </a>
            <a
              className="nav__icon"
              href={profile.links.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z"
                />
              </svg>
            </a>
            <a
              className={`nav__icon nav__icon--send ${activeId === 'contact' ? 'is-active' : ''}`}
              href="#contact"
              aria-label="Contact"
              onClick={closeMenu}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M21.5 3 2.5 10.5l7 3 3 7L21.5 3ZM9.5 13.5 21.5 3"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
              </svg>
            </a>
          </span>
        </nav>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero__inner">
            <div className="hero__copy">
              <p className="hero__status">
                <span className="hero__dot" aria-hidden="true" />
                Open to Java backend roles
              </p>
              <h1 className="hero__name">{profile.name}</h1>
              <p className="hero__role">{profile.role}</p>
              <p className="hero__company">
                {experience[0].company} · 1+ years experience
              </p>
              <p className="hero__tagline">
                I build scalable microservices with Java, Spring Boot and
                event-driven systems, backed by PostgreSQL, MongoDB and Redis.
              </p>
              <div className="hero__actions">
                <a className="btn btn--dark" href="#projects">
                  View My Work <span aria-hidden="true">→</span>
                </a>
                <a className="btn btn--outline" href={profile.resumeUrl} download>
                  <LuDownload aria-hidden="true" />
                  Download resume
                </a>
              </div>
            </div>

            <figure className="hero__art">
              <img
                src={heroDoodle}
                alt="Illustration of a laptop running code, surrounded by Spring Boot, REST APIs, Security, Redis, RabbitMQ and Kubernetes"
                width={640}
                height={570}
              />
            </figure>
          </div>
        </section>

        <section id="about" className="section">
          <div className="section__inner">
            <header className="about__head" data-reveal>
              <p className="about__eyebrow">About me</p>
              <h2 className="section__title about__title">
                Turning ideas into reliable products
              </h2>
            </header>
            <div className="about">
            <div className="about__copy" data-reveal>
              <p className="about__p">
                I&apos;m a <strong>Java Backend Developer</strong> with
                hands-on experience building Spring Boot microservices for a
                production real-time consultation platform. I work with
                PostgreSQL, MongoDB, Redis, and RabbitMQ to develop scalable
                and reliable backend services.
              </p>
              <p className="about__p about__p--soft">
                My work focuses on building REST APIs, optimizing database
                performance, and implementing asynchronous communication using
                RabbitMQ. I&apos;ve contributed to improving p95 API latency by
                30% and increasing message throughput by 25%, with a focus on
                performance, scalability, and reliability.
              </p>
              <ul className="about__features">
                {ABOUT_FEATURES.map(({ label, Icon }) => (
                  <li key={label}>
                    <span className="about__icon">
                      <Icon aria-hidden="true" />
                    </span>
                    {label}
                  </li>
                ))}
              </ul>
            </div>

            <aside className="about__panel" data-reveal>
              <div className="about__stats">
                <div>
                  <strong>
                    <CountUp value="1+" />
                  </strong>
                  <span>Years of experience</span>
                </div>
                <div>
                  <strong>
                    <CountUp value="23" />
                  </strong>
                  <span>Microservices</span>
                </div>
              </div>

              <p className="about__eyebrow about__eyebrow--light">Education</p>
              <div className="about__edu">
                <span className="about__icon about__icon--dark">
                  <LuGraduationCap aria-hidden="true" />
                </span>
                <div>
                  <strong>{education[0].degree}</strong>
                  <span>
                    {education[0].school} · {education[0].period}
                  </span>
                </div>
              </div>

              <p className="about__eyebrow about__eyebrow--light">Core stack</p>
              <ul className="about__stack">
                {CORE_STACK.map((name) => {
                  const [Icon, color] = TECH_ICONS[name]
                  return (
                    <li key={name} style={{ '--brand': color }}>
                      <Icon aria-hidden="true" />
                      {name}
                    </li>
                  )
                })}
              </ul>
            </aside>
            </div>
          </div>
        </section>

        <section id="experience" className="section section--band">
          <div className="section__inner">
            <header className="section__head" data-reveal>
              <p className="section__label">
                <span>02</span>Experience
              </p>
              <h2 className="section__title section__title--oneline">
                Building production-grade microservices
              </h2>
            </header>
            {experience.map((job) => (
              <article className="job card" data-reveal key={job.company}>
                <header className="job__head">
                  <div>
                    <p className="job__period">{job.period}</p>
                    <h3 className="job__company">{job.company}</h3>
                    <p className="job__role">{job.role}</p>
                  </div>
                  {job.productUrl && (
                    <a
                      className="job__product"
                      href={job.productUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Product · {job.product} ↗
                    </a>
                  )}
                </header>

                {job.impact && (
                  <ul className="job__impact" aria-label="Key impact">
                    {job.impact.map((item) => (
                      <li key={item.label}>
                        <strong>{item.value}</strong>
                        <span>{item.label}</span>
                      </li>
                    ))}
                  </ul>
                )}

                <div className="job__groups">
                  {job.groups.map(({ title, icon, items }) => {
                    const Icon = JOB_ICONS[icon]
                    return (
                      <section className="job__group" key={title}>
                        <h4>
                          <span className="job__group-icon">
                            <Icon aria-hidden="true" />
                          </span>
                          {title}
                        </h4>
                        <ul>
                          {items.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </section>
                    )
                  })}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="projects" className="section">
          <div className="section__inner">
            <header className="section__head" data-reveal>
              <p className="section__label">
                <span>03</span>Projects
              </p>
              <h2 className="section__title section__title--oneline">
                Backend systems I&apos;ve worked on
              </h2>
            </header>
            <CaseStudy />

            <div className="modules" data-reveal>
              <h3 className="modules__title">Personal project</h3>
              {projects.map((project) => (
                <ProjectShowcase project={project} key={project.title} />
              ))}
            </div>
          </div>
        </section>

        <section id="skills" className="section section--band">
          <div className="section__inner">
            <header className="section__head" data-reveal>
              <p className="section__label">
                <span>04</span>Skills
              </p>
              <h2 className="section__title section__title--oneline">
                The tools behind reliable backends
              </h2>
            </header>
            <SkillsShowcase />
          </div>
        </section>

        <section id="education" className="section">
          <div className="section__inner">
            <header className="section__head" data-reveal>
              <p className="section__label">
                <span>05</span>Education
              </p>
              <h2 className="section__title section__title--oneline">
                Academic foundation
              </h2>
            </header>
            <div className="education">
              {education
                .filter((item) => item.school || item.period)
                .map((item) => (
                  <article className="edu card" data-reveal key={item.degree}>
                    <p className="edu__period">{item.period}</p>
                    <h3>{item.degree}</h3>
                    <p>{item.school}</p>
                  </article>
                ))}
            </div>
          </div>
        </section>

        <section id="contact" className="section contact-wrap">
          <div className="section__inner">
            <div className="contact" data-reveal>
              <p className="contact__label">Contact</p>
              <h2 className="contact__title">
                Let&apos;s build reliable systems together
              </h2>
              <p className="contact__copy">
                I&apos;m open to Java backend roles. Whether you have an
                opening, a question about my work, or just want to say hi, my
                inbox is open.
              </p>
              <div className="contact__links">
                <a
                  className="btn btn--light"
                  href={profile.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedinIn aria-hidden="true" />
                  Message me on LinkedIn
                </a>
                <a className="btn btn--glass" href={profile.resumeUrl} download>
                  <LuDownload aria-hidden="true" />
                  Resume
                </a>
              </div>
              <div className="contact__cards">
                <a className="contact__card" href={`mailto:${profile.email}`}>
                  <LuMail aria-hidden="true" />
                  <span>
                    <strong>Email</strong>
                    <small>{profile.email}</small>
                  </span>
                </a>
                <a
                  className="contact__card"
                  href={`tel:${profile.phone.replace(/\s/g, '')}`}
                >
                  <LuPhone aria-hidden="true" />
                  <span>
                    <strong>Phone</strong>
                    <small>{profile.phone}</small>
                  </span>
                </a>
                <a
                  className="contact__card"
                  href={profile.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedinIn aria-hidden="true" />
                  <span>
                    <strong>LinkedIn</strong>
                    <small>Connect with me</small>
                  </span>
                </a>
                <a
                  className="contact__card"
                  href={profile.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGithub aria-hidden="true" />
                  <span>
                    <strong>GitHub</strong>
                    <small>{profile.links.github.split('/').pop()}</small>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer__inner">
          <p>
            © {YEAR} {profile.name}
          </p>
          <div className="footer__links">
            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            <a
              href={profile.links.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
