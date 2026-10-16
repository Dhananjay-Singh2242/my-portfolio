import { useEffect, useState } from 'react'
import { caseStudy } from '../data/content'
import ArchitectureDiagram from './ArchitectureDiagram'
import { TECH_ICONS } from './techIcons'
import overviewHome from '../assets/case/overview-home.png'
import overviewServices from '../assets/case/overview-services.png'
import deployCicd from '../assets/case/deploy-cicd.png'

const images = {
  overview: overviewHome,
  overviewServices,
  deploy: deployCicd,
}

function PerformanceVisual() {
  return (
    <div className="viz viz--performance" aria-hidden="true">
      <div className="viz__meter">
        <div className="viz__meter-fill" />
        <span>API latency ↓ 30%</span>
      </div>
      <div className="viz__cache">
        <strong>Redis</strong>
        <p>Frequently read data · p95 latency</p>
      </div>
      <div className="viz__bars">
        <i style={{ '--h': '42%' }} />
        <i style={{ '--h': '68%' }} />
        <i style={{ '--h': '55%' }} />
        <i style={{ '--h': '86%' }} />
        <i style={{ '--h': '72%' }} />
      </div>
    </div>
  )
}

export default function CaseStudy() {
  const [active, setActive] = useState(0)
  const [shotState, setShotState] = useState({ step: 0, shot: 0 })
  const shot = shotState.step === active ? shotState.shot : 0
  const setShot = (n) => setShotState({ step: active, shot: n })
  const step = caseStudy.steps[active]
  const shotKeys = step.images?.length
    ? step.images
    : step.image
      ? [step.image]
      : []
  const imageSrc = shotKeys[shot] ? images[shotKeys[shot]] : null

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'ArrowRight') {
        setActive((i) => Math.min(i + 1, caseStudy.steps.length - 1))
      }
      if (event.key === 'ArrowLeft') {
        setActive((i) => Math.max(i - 1, 0))
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div className="case" data-reveal>
      <div className="case__intro">
        <p className="case__kicker">
          Featured case study · {caseStudy.company}
        </p>
        <h3 className="case__headline">{caseStudy.headline}</h3>
        <p className="case__summary">{caseStudy.summary}</p>
        <a
          className="case__product"
          href={caseStudy.productUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Open {caseStudy.product}
        </a>
      </div>

      <div className="case__tabs" role="tablist" aria-label="Case study steps">
        {caseStudy.steps.map((item, index) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={index === active}
            className={`case__tab ${index === active ? 'is-active' : ''}`}
            onClick={() => setActive(index)}
          >
            <span className="case__tab-num">0{index + 1}</span>
            {item.label}
          </button>
        ))}
      </div>

      <div className="case__stage" role="tabpanel">
        <div
          className={`case__visual ${imageSrc ? 'case__visual--photo' : ''} ${step.diagram ? 'case__visual--diagram' : ''}`}
        >
          {step.diagram ? (
            <ArchitectureDiagram key={step.diagram} mode={step.diagram} />
          ) : imageSrc ? (
            <>
              <img
                className="case__image"
                src={imageSrc}
                alt={step.imageAlt || step.title}
              />
              {shotKeys.length > 1 && (
                <div className="case__shots" role="group" aria-label="Screenshots">
                  {shotKeys.map((key, index) => (
                    <button
                      key={key}
                      type="button"
                      className={`case__shot ${index === shot ? 'is-active' : ''}`}
                      onClick={() => setShot(index)}
                    >
                      {index === 0 ? 'Home' : 'Services'}
                    </button>
                  ))}
                </div>
              )}
            </>
          ) : (
            <PerformanceVisual />
          )}
        </div>
        <div className="case__copy">
          <p className="case__step-label">
            Step 0{active + 1} · {step.label}
          </p>
          <h4 className="case__title">{step.title}</h4>
          <p className="case__text">{step.explanation}</p>
          {step.ownership && (
            <p className="case__ownership">
              <strong>My part:</strong> {step.ownership}
            </p>
          )}
          <ul className="case__points">
            {step.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
          <ul className="case__tags">
            {step.tags.map((tag) => {
              const [Icon, color] = TECH_ICONS[tag] || []
              return (
                <li key={tag} style={{ '--brand': color }}>
                  {Icon && <Icon aria-hidden="true" />}
                  {tag}
                </li>
              )
            })}
          </ul>
          <div className="case__nav">
            <button
              type="button"
              className="case__nav-btn"
              disabled={active === 0}
              onClick={() => setActive((i) => i - 1)}
            >
              Previous
            </button>
            <button
              type="button"
              className="case__nav-btn case__nav-btn--primary"
              disabled={active === caseStudy.steps.length - 1}
              onClick={() => setActive((i) => i + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
