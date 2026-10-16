import { useState } from 'react'
import { TECH_ICONS } from './techIcons'
import { skills } from '../data/content'

const FallbackIcon = () => null

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'backend', label: 'Backend', groups: ['Languages & Frameworks', 'Architecture & APIs', 'Security'] },
  { id: 'data', label: 'Data & Messaging', groups: ['Databases & Caching', 'Messaging & Testing'] },
  { id: 'devops', label: 'Cloud & DevOps', groups: ['Cloud & DevOps', 'Tools'] },
  { id: 'cs', label: 'Fundamentals', groups: ['CS Fundamentals'] },
]

export default function SkillsShowcase() {
  const [filter, setFilter] = useState('all')
  const active = FILTERS.find((f) => f.id === filter)

  return (
    <>
      <div className="skills__filters" role="tablist" aria-label="Skill categories">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            role="tab"
            aria-selected={filter === f.id}
            className={filter === f.id ? 'is-active' : ''}
            onClick={() => setFilter(f.id)}
          >
            {f.label}
          </button>
        ))}
      </div>
      <div className="skills">
        {skills.map((group, i) => {
          const dimmed = filter !== 'all' && !active.groups.includes(group.group)
          return (
            <div
              className="skill-group card"
              data-dimmed={dimmed}
              data-reveal
              style={{ '--delay': `${(i % 3) * 70}ms` }}
              key={group.group}
            >
              <h3>{group.group}</h3>
              <ul>
                {group.items.map((item) => {
                  const [Icon, color] = TECH_ICONS[item] || [FallbackIcon, '#64748b']
                  return (
                    <li key={item} style={{ '--brand': color }}>
                      <Icon aria-hidden="true" />
                      {item}
                    </li>
                  )
                })}
              </ul>
            </div>
          )
        })}
      </div>
    </>
  )
}
