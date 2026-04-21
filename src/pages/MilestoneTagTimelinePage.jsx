import { StatusBar } from '../components/Layout.jsx'
import { MilestoneCompletedCard } from '../components/MilestoneCompletedCard.jsx'
import { formatDate } from '../lib/fetalFormat.js'
import { formatPregnancyWeekDay } from '../data/timeline.js'
import { PHONE_SHELL_MIN_HEIGHT } from '../lib/phoneShell.js'

const TL_GUTTER = 20
const TL_LINE_LEFT = 9

function TlDot() {
  return (
    <div
      style={{
        width: 8,
        height: 8,
        borderRadius: '50%',
        background: '#E295A8',
        flexShrink: 0,
        position: 'relative',
        zIndex: 1,
        boxShadow: '0 0 0 2px #F5F5F7',
      }}
    />
  )
}

function TlGutter() {
  return <div style={{ width: TL_GUTTER, flexShrink: 0 }} />
}

function TimelineSpine({ children }) {
  return (
    <div style={{ position: 'relative', paddingBottom: 4 }}>
      <div
        aria-hidden
        style={{
          position: 'absolute',
          left: TL_LINE_LEFT,
          top: 12,
          bottom: 6,
          width: 1,
          background: '#D8D8D8',
          borderRadius: 0.5,
        }}
      />
      {children}
    </div>
  )
}

function weekLabel(entry) {
  return formatPregnancyWeekDay(entry.week, entry.day)
}

/**
 * 大事记：从标签进入，展示该分类下时间轴列表（示意）
 */
export default function MilestoneTagTimelinePage({ entries, onBack }) {
  return (
    <div
      className="phone-shell"
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: PHONE_SHELL_MIN_HEIGHT,
        height: '100%',
        background: '#F5F5F7',
      }}
    >
      <StatusBar />

      <div
        style={{
          height: 44,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          background: '#fff',
          borderBottom: '0.5px solid #EBEBEB',
          flexShrink: 0,
        }}
      >
        <button
          type="button"
          aria-label="返回"
          onClick={onBack}
          style={{
            position: 'absolute',
            left: 6,
            top: '50%',
            transform: 'translateY(-50%)',
            width: 40,
            height: 40,
            border: 'none',
            background: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 0,
          }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M15 18l-6-6 6-6" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <span style={{ fontSize: 17, fontWeight: 600, color: '#1A1A1A' }}>大事记</span>
        <button
          type="button"
          style={{
            position: 'absolute',
            right: 10,
            top: '50%',
            transform: 'translateY(-50%)',
            border: 'none',
            background: '#E8608A',
            color: '#fff',
            fontSize: 14,
            fontWeight: 600,
            padding: '6px 14px',
            borderRadius: 18,
            cursor: 'pointer',
            fontFamily: 'inherit',
          }}
        >
          添加
        </button>
      </div>

      <div className="scroll-area" style={{ flex: 1, minHeight: 0, overflowY: 'auto' }}>
        <div style={{ padding: '14px 12px 28px' }}>
          <TimelineSpine>
            {entries.map(entry => (
              <div key={entry.id}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
                  <div style={{ width: TL_GUTTER, flexShrink: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <TlDot />
                  </div>
                  <div style={{ flex: 1, minWidth: 0, display: 'flex', alignItems: 'center', gap: 7, flexWrap: 'wrap' }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#1A1A1A' }}>{formatDate(entry.date)}</span>
                    <span style={{ fontSize: 12, color: '#AAA' }}>{weekLabel(entry)}</span>
                  </div>
                </div>
                <div style={{ display: 'flex', marginBottom: 4 }}>
                  <TlGutter />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <MilestoneCompletedCard entry={entry} />
                  </div>
                </div>
              </div>
            ))}
          </TimelineSpine>

          <p style={{ margin: '18px 0 0', textAlign: 'center', fontSize: 12, color: '#C8C8C8' }}>没有更多记录了</p>
        </div>
      </div>
    </div>
  )
}
