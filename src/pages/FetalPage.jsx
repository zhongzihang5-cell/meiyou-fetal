import { useState, useMemo } from 'react'
import { StatusBar, BottomNav } from '../components/Layout.jsx'
import UploadModal from '../components/UploadModal.jsx'
import {
  MilestoneCard,
  WeightEstimateCard,
  FetalMovementCard,
  PhotoCard,
  MilestoneCompletedCard,
  DailyPromptCard,
} from '../components/TimelineCards.jsx'
import { IconCamera, IconFetalAvatar } from '../components/Icons.jsx'
import { INITIAL_TIMELINE, MILESTONES, CURRENT_WEEK, CURRENT_DAY, DAYS_UNTIL_DUE } from '../data/timeline.js'

// Group entries by date
function groupByDate(entries) {
  const map = {}
  entries.forEach(entry => {
    if (!map[entry.date]) map[entry.date] = []
    map[entry.date].push(entry)
  })
  return Object.entries(map).sort((a, b) => b[0].localeCompare(a[0]))
}

function formatDate(dateStr) {
  const d = new Date(dateStr)
  const now = new Date()
  const today = now.toISOString().split('T')[0]
  if (dateStr === today) return '今天'
  const m = d.getMonth() + 1
  const day = d.getDate()
  return `${m} 月 ${day} 日`
}

function weekLabel(entry) {
  if (entry.day && entry.day > 0) return `孕 ${entry.week} 周 ${entry.day} 天`
  return `孕 ${entry.week} 周`
}

export default function FetalPage({ onTabChange }) {
  const [timeline, setTimeline] = useState(INITIAL_TIMELINE)
  const [showModal, setShowModal] = useState(false)
  const [showPrivate, setShowPrivate] = useState(false)

  const today = new Date().toISOString().split('T')[0]
  const todayEntries = timeline.filter(e => e.date === today)
  const hasTodayMilestone = MILESTONES[CURRENT_WEEK]
  const hasTodayEntry = todayEntries.length > 0

  function handleNewEntry(entry) {
    setTimeline(prev => [entry, ...prev])
  }

  // Separate private entries
  const publicEntries = timeline.filter(e => !e.isPrivate)
  const privateEntries = timeline.filter(e => e.isPrivate)

  const publicGroups = useMemo(() => groupByDate(publicEntries), [publicEntries])
  const privateGroups = useMemo(() => groupByDate(privateEntries), [privateEntries])

  function renderEntry(entry, onUpload) {
    switch (entry.type) {
      case 'data':
        if (entry.subtype === 'weight_estimate') return <WeightEstimateCard key={entry.id} entry={entry} />
        if (entry.subtype === 'fetal_movement') return <FetalMovementCard key={entry.id} entry={entry} />
        return null
      case 'photo':
        return <PhotoCard key={entry.id} entry={entry} />
      case 'milestone':
        return entry.note
          ? <MilestoneCompletedCard key={entry.id} entry={{ ...entry, emoji: getMilestoneEmoji(entry.week) }} />
          : <MilestoneCard key={entry.id} entry={{ ...entry, emoji: getMilestoneEmoji(entry.week) }} onUpload={onUpload} />
      default:
        return null
    }
  }

  function getMilestoneEmoji(week) {
    const map = { 1: '🌱', 8: '💓', 12: '📋', 16: '🤲', 22: '🔬', 28: '📸', 36: '⏰' }
    return map[week] || '🌸'
  }

  return (
    <div className="phone-shell" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <StatusBar />

      {/* Top nav tabs */}
      <div className="top-nav">
        <div style={{ padding: '0 6px', display: 'flex', alignItems: 'center' }}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <circle cx="9" cy="9" r="7" stroke="#555" strokeWidth="1.6"/>
            <path d="M14.5 14.5L18 18" stroke="#555" strokeWidth="1.6" strokeLinecap="round"/>
          </svg>
        </div>
        <div className="top-nav-tabs">
          <div className="nav-tab" onClick={() => onTabChange('mama')}>妈妈</div>
          <div className="nav-tab active">胎宝宝</div>
          <div className="nav-tab" onClick={() => onTabChange('baby')}>呢呢</div>
        </div>
        <div style={{ padding: '0 6px', display: 'flex', alignItems: 'center' }}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <rect x="3" y="3" width="14" height="14" rx="3" stroke="#555" strokeWidth="1.6" fill="none"/>
            <path d="M7 10h6M10 7v6" stroke="#555" strokeWidth="1.4" strokeLinecap="round"/>
          </svg>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="screen-scroll" style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>

        {/* Baby header */}
        <div style={{
          background: '#fff',
          padding: '14px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '0.5px solid #F2F2F2',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 52, height: 52,
              borderRadius: '50%',
              background: '#FBEAF0',
              border: '2px solid #F4C0D1',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <IconFetalAvatar />
            </div>
            <div>
              <div style={{ fontSize: 17, fontWeight: 600, color: '#1A1A1A' }}>胎宝宝</div>
              <div style={{ fontSize: 12, color: '#AAA', marginTop: 2 }}>
                孕 {CURRENT_WEEK} 周 {CURRENT_DAY} 天 · 距预产期 {DAYS_UNTIL_DUE} 天
              </div>
            </div>
          </div>
          <div style={{
            fontSize: 12,
            color: '#993556',
            border: '1px solid #F4C0D1',
            borderRadius: 20,
            padding: '6px 12px',
            background: '#FBEAF0',
            fontWeight: 500,
            display: 'flex', alignItems: 'center', gap: 4,
            cursor: 'pointer',
          }}>
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <circle cx="6.5" cy="4.5" r="2.5" stroke="#993556" strokeWidth="1.1" fill="none"/>
              <path d="M1.5 11.5c0-2.8 2.2-5 5-5s5 2.2 5 5" stroke="#993556" strokeWidth="1.1" strokeLinecap="round" fill="none"/>
              <path d="M9.5 2v2.5M8.2 3.2h2.5" stroke="#993556" strokeWidth="1" strokeLinecap="round"/>
            </svg>
            邀请准爸爸
          </div>
        </div>

        {/* AI banner */}
        <div style={{
          margin: '10px 12px',
          background: 'linear-gradient(135deg, #F5E8FF, #EEE0FF)',
          borderRadius: 16,
          padding: '12px 14px',
          display: 'flex',
          gap: 12,
          alignItems: 'center',
          border: '0.5px solid #E0D0F8',
        }}>
          <div style={{
            width: 64, height: 64,
            background: '#E0D0F8',
            borderRadius: 12,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <ellipse cx="20" cy="17" rx="9" ry="10" fill="#C8A8E8"/>
              <ellipse cx="20" cy="17" rx="6" ry="7" fill="#F0E8FC"/>
              <ellipse cx="20" cy="33" rx="12" ry="9" fill="#C8A8E8"/>
            </svg>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#4A2080', marginBottom: 3 }}>
              四维彩超预测宝宝长相
            </div>
            <div style={{ fontSize: 11, color: '#7A40B0', marginBottom: 8 }}>美柚 AI 免费一键生成</div>
            <div style={{
              display: 'inline-block',
              fontSize: 12,
              background: 'linear-gradient(90deg, #C96DD8, #A855F7)',
              color: '#fff',
              borderRadius: 20,
              padding: '5px 16px',
              fontWeight: 500,
              cursor: 'pointer',
            }}>立即生成</div>
          </div>
        </div>

        {/* Kong zone */}
        <div style={{ background: '#fff', marginTop: 8, padding: '14px 14px 10px' }}>
          <div className="kong-grid">
            {[
              { label: '大肚照', bg: '#FBEAF0', icon: <svg width="26" height="26" viewBox="0 0 26 26" fill="none"><rect x="4" y="7" width="18" height="14" rx="3" fill="#E8608A" opacity="0.8"/><circle cx="13" cy="14" r="4" fill="#fff"/><circle cx="13" cy="14" r="2" fill="#E8608A"/><rect x="9" y="4" width="3" height="4" rx="1.5" fill="#E8608A"/><rect x="14" y="4" width="3" height="4" rx="1.5" fill="#E8608A"/></svg> },
              { label: '胎儿估重', bg: '#FBEAF0', icon: <svg width="26" height="26" viewBox="0 0 26 26" fill="none"><rect x="5" y="11" width="16" height="11" rx="3" fill="#E8608A" opacity="0.6"/><ellipse cx="13" cy="11" rx="6" ry="4.5" fill="#E8608A" opacity="0.9"/></svg> },
              { label: '数胎动', bg: '#E2F5EE', icon: <svg width="26" height="26" viewBox="0 0 26 26" fill="none"><path d="M13 5 Q17 9 17 13 Q17 18 13 21 Q9 18 9 13 Q9 9 13 5Z" fill="#1BA97A" opacity="0.8"/><circle cx="13" cy="13" r="3" fill="#fff"/></svg> },
              { label: '测胎心', bg: '#E8F2FC', icon: <svg width="26" height="26" viewBox="0 0 26 26" fill="none"><path d="M4 13 L7 8 L10 18 L14 5 L17 18 L20 10 L22 13" stroke="#3A8DDD" strokeWidth="1.7" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg> },
              { label: '胎教音乐', bg: '#F0EDFB', icon: <svg width="26" height="26" viewBox="0 0 26 26" fill="none"><ellipse cx="13" cy="17" rx="9" ry="7" fill="#8A6FD8" opacity="0.25"/><path d="M9 13 Q10.5 8 13 7 Q15.5 8 17 13" stroke="#8A6FD8" strokeWidth="1.5" fill="none" strokeLinecap="round"/><circle cx="13" cy="7" r="2" fill="#8A6FD8"/></svg> },
            ].map(k => (
              <div key={k.label} className="kong-item" onClick={() => setShowModal(true)}>
                <div className="kong-icon-wrap" style={{ background: k.bg }}>{k.icon}</div>
                <div className="kong-label">{k.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="timeline">

          {/* Today node */}
          <div className="tl-date-row">
            <div className="tl-dot" />
            <div className="tl-date-label">今天</div>
            <div className="tl-week-label">孕 {CURRENT_WEEK} 周 {CURRENT_DAY} 天</div>
          </div>

          {/* Today milestone if exists */}
          {hasTodayMilestone && !hasTodayEntry && (
            <MilestoneCard
              entry={{
                id: 'milestone-today',
                title: MILESTONES[CURRENT_WEEK].title,
                sub: MILESTONES[CURRENT_WEEK].sub,
                week: CURRENT_WEEK,
                emoji: getMilestoneEmoji(CURRENT_WEEK),
              }}
              onUpload={() => setShowModal(true)}
            />
          )}

          {/* Today entries */}
          {todayEntries.map(e => renderEntry(e, () => setShowModal(true)))}

          {/* Daily prompt if no entry today and no milestone */}
          {!hasTodayMilestone && !hasTodayEntry && (
            <DailyPromptCard week={CURRENT_WEEK} onUpload={() => setShowModal(true)} />
          )}

          {/* Past public entries grouped by date */}
          {publicGroups
            .filter(([date]) => date !== today)
            .map(([date, entries]) => (
              <div key={date}>
                <div className="tl-date-row" style={{ marginTop: 4 }}>
                  <div className="tl-dot" />
                  <div className="tl-date-label">{formatDate(date)}</div>
                  <div className="tl-week-label">{weekLabel(entries[0])}</div>
                </div>
                {entries.map(e => renderEntry(e, () => setShowModal(true)))}
              </div>
            ))
          }

          {/* Private divider */}
          {privateEntries.length > 0 && (
            <>
              <div className="tl-divider">
                <div className="tl-divider-line" />
                <div className="tl-divider-text">以下内容仅妈妈可见</div>
                <div className="tl-divider-link" onClick={() => setShowPrivate(!showPrivate)}>
                  {showPrivate ? '收起' : '前往设置'}
                </div>
                <div className="tl-divider-line" />
              </div>

              {privateGroups.map(([date, entries]) => (
                <div key={date} style={{ opacity: 0.7 }}>
                  <div className="tl-date-row">
                    <div className="tl-dot muted" />
                    <div className="tl-date-label muted">{formatDate(date)}</div>
                    <div className="tl-week-label">{weekLabel(entries[0])}</div>
                  </div>
                  {entries.map(e => renderEntry(e, () => setShowModal(true)))}
                </div>
              ))}
            </>
          )}

        </div>

        {/* FAB spacer */}
        <div style={{ height: 80 }} />
      </div>

      {/* FAB */}
      <div style={{
        position: 'absolute',
        bottom: 86,
        right: 16,
        zIndex: 50,
      }}>
        <button className="fab" onClick={() => setShowModal(true)}>
          <IconCamera />
        </button>
      </div>

      <BottomNav active="record" />

      {showModal && (
        <UploadModal
          onClose={() => setShowModal(false)}
          onSubmit={handleNewEntry}
        />
      )}
    </div>
  )
}

function getMilestoneEmoji(week) {
  const map = { 1: '🌱', 8: '💓', 12: '📋', 16: '🤲', 22: '🔬', 28: '📸', 36: '⏰' }
  return map[week] || '🌸'
}
