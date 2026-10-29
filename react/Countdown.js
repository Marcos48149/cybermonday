import React, { useEffect, useState } from 'react'
import { useCssHandles } from 'vtex.css-handles'

const CSS_HANDLES = [
  'cyberCountdown',
  'cyberCountdownBoxes',
  'cyberCountdownBox',
  'cyberCountdownNumber',
  'cyberCountdownLabel',
]

const ZERO = { days: 0, hours: 0, minutes: 0, seconds: 0 }

const getTimeLeft = targetDate => {
  const diff = new Date(targetDate).getTime() - Date.now()

  if (isNaN(diff) || diff <= 0) return ZERO

  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

const pad = n => String(n).padStart(2, '0')

const Countdown = ({ targetDate }) => {
  const cssHandles = useCssHandles(CSS_HANDLES)
  const handles = cssHandles.handles || cssHandles
  const [time, setTime] = useState(ZERO)

  useEffect(() => {
    const tick = () => setTime(getTimeLeft(targetDate))

    tick()
    const id = setInterval(tick, 1000)

    return () => clearInterval(id)
  }, [targetDate])

  const items = [
    { value: time.days, label: 'Días' },
    { value: time.hours, label: 'Horas' },
    { value: time.minutes, label: 'Minutos' },
    { value: time.seconds, label: 'Segundos' },
  ]

  return (
    <div className={handles.cyberCountdown}>
      <div className={handles.cyberCountdownBoxes}>
        {items.map(item => (
          <div key={item.label} className={handles.cyberCountdownBox}>
            <span className={handles.cyberCountdownNumber}>{pad(item.value)}</span>
            <span className={handles.cyberCountdownLabel}>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

Countdown.defaultProps = {
  targetDate: '2026-12-01T00:00:00-03:00',
}

export default Countdown
