export function IconSignal() {
  return (
    <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
      <rect x="0" y="5" width="3" height="7" rx="1" fill="#111"/>
      <rect x="4.5" y="3.5" width="3" height="8.5" rx="1" fill="#111"/>
      <rect x="9" y="1.5" width="3" height="10.5" rx="1" fill="#111"/>
      <rect x="13.5" y="0" width="3" height="12" rx="1" fill="#111"/>
    </svg>
  )
}

export function IconWifi() {
  return (
    <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
      <path d="M8 2.8C10.1 2.8 12 3.7 13.4 5.1L14.6 3.9C12.9 2.2 10.6 1.1 8 1.1S3.1 2.2 1.4 3.9L2.6 5.1C4 3.7 5.9 2.8 8 2.8Z" fill="#111"/>
      <path d="M8 5.6C9.5 5.6 10.9 6.2 11.9 7.2L13.1 6C11.8 4.7 10 3.9 8 3.9S4.2 4.7 2.9 6L4.1 7.2C5.1 6.2 6.5 5.6 8 5.6Z" fill="#111"/>
      <circle cx="8" cy="10" r="2" fill="#111"/>
    </svg>
  )
}

export function IconBattery() {
  return (
    <svg width="27" height="13" viewBox="0 0 27 13" fill="none">
      <rect x="0.5" y="0.5" width="23" height="12" rx="3.5" stroke="#111" strokeWidth="1" fill="none"/>
      <rect x="2" y="2" width="18" height="9" rx="2" fill="#111"/>
      <path d="M25 4.5v4a2.5 2.5 0 000-4z" fill="#111"/>
    </svg>
  )
}

export function IconSearch() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="9" cy="9" r="7" stroke="#555" strokeWidth="1.6"/>
      <path d="M14.5 14.5L18 18" stroke="#555" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  )
}

export function IconCamera() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect x="2" y="6" width="20" height="15" rx="3" stroke="#fff" strokeWidth="1.6"/>
      <circle cx="12" cy="13.5" r="4" stroke="#fff" strokeWidth="1.6"/>
      <path d="M8.5 6l1.8-2.5h3.4L15.5 6" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round"/>
      <circle cx="17.5" cy="9.5" r="1.2" fill="#fff"/>
    </svg>
  )
}

export function IconPlus({ color = '#fff' }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <path d="M11 3v16M3 11h16" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    </svg>
  )
}

export function IconClose() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M4 4l10 10M14 4L4 14" stroke="#999" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  )
}

export function IconArrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M5 3l4 4-4 4" stroke="#AAAAAA" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export function IconHome({ active }) {
  const c = active ? 'var(--pink)' : '#AAA'
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M3 9.5L12 3l9 6.5V21a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" stroke={c} strokeWidth="1.5" fill="none"/>
      <rect x="9" y="14" width="6" height="8" rx="1" stroke={c} strokeWidth="1.4" fill="none"/>
    </svg>
  )
}

export function IconCalendar({ active }) {
  const c = active ? 'var(--pink)' : '#AAA'
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="4" width="18" height="17" rx="3" stroke={c} strokeWidth="1.5" fill="none"/>
      <path d="M7 4V2M17 4V2M3 10h18" stroke={c} strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  )
}

export function IconMessage({ active }) {
  const c = active ? 'var(--pink)' : '#AAA'
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M4 4h16a1 1 0 011 1v11a1 1 0 01-1 1H7L3 21V5a1 1 0 011-1z" stroke={c} strokeWidth="1.4" fill="none"/>
    </svg>
  )
}

export function IconUser({ active }) {
  const c = active ? 'var(--pink)' : '#AAA'
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="5" stroke={c} strokeWidth="1.5" fill="none"/>
      <path d="M3 21c0-5 4-9 9-9s9 4 9 9" stroke={c} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    </svg>
  )
}

export function IconFetalAvatar() {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
      <ellipse cx="15" cy="12" rx="7" ry="8" fill="#F4C0D1"/>
      <ellipse cx="15" cy="12" rx="4.5" ry="5.5" fill="#FBEAF0"/>
      <circle cx="15" cy="8.5" r="2.5" fill="#F4C0D1"/>
      <ellipse cx="15" cy="24" rx="10" ry="8" fill="#F4C0D1"/>
    </svg>
  )
}

/** 数胎动卡片右上角：宝宝脚印（大脚掌 + 五趾横向） */
export function IconBabyFootprint({ color = '#E295A8', size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden>
      <ellipse cx="7" cy="4" rx="2.2" ry="2.8" fill={color} />
      <ellipse cx="13" cy="2.8" rx="2" ry="2.5" fill={color} />
      <ellipse cx="19" cy="3.2" rx="1.8" ry="2.3" fill={color} />
      <ellipse cx="24.5" cy="5" rx="1.6" ry="2" fill={color} />
      <ellipse cx="28" cy="8.5" rx="1.4" ry="1.8" fill={color} />
      <path
        d="M5 14 C4 11 5 9 8 8.5 C12 8 18 8 22 9.5 C26 11 27.5 14 27 18 C26.5 22 24 26 20 28 C16 30 11 29.5 8 27 C5 24.5 5.5 20 5 17 Z"
        fill={color}
      />
    </svg>
  )
}

/** 测胎心卡片右上角：小爱心 */
export function IconTinyHeart({ color = '#B84868', size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        fill={color}
      />
    </svg>
  )
}
