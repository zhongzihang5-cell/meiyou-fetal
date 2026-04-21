import { StatusBar } from '../components/Layout.jsx'
import { FetalTimelinePhotoCard } from '../components/FetalTimelinePhotoCard.jsx'
import { formatDate } from '../lib/fetalFormat.js'
import { formatPregnancyWeekDay } from '../data/timeline.js'
import { PHONE_SHELL_MIN_HEIGHT } from '../lib/phoneShell.js'

const TL_GUTTER = 20

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

/**
 * 大肚照 / 产检报告 单条记录详情（从时间轴标签进入）
 */
export default function PhotoRecordDetailPage({ entry, onBack }) {
  const isBelly = entry.subtype === 'belly'
  const title = isBelly ? '大肚照' : '产检报告'

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
        <span style={{ fontSize: 17, fontWeight: 600, color: '#1A1A1A' }}>{title}</span>
      </div>

      <div className="scroll-area" style={{ flex: 1, minHeight: 0, overflowY: 'auto' }}>
        <div style={{ padding: '14px 12px 28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
            <div style={{ width: TL_GUTTER, flexShrink: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <TlDot />
            </div>
            <div style={{ flex: 1, minWidth: 0, display: 'flex', alignItems: 'center', gap: 7, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: '#1A1A1A' }}>{formatDate(entry.date)}</span>
              <span style={{ fontSize: 12, color: '#AAA' }}>{formatPregnancyWeekDay(entry.week, entry.day)}</span>
            </div>
          </div>

          <div style={{ display: 'flex' }}>
            <div style={{ width: TL_GUTTER, flexShrink: 0 }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <FetalTimelinePhotoCard embedded entry={entry} />
            </div>
          </div>

          <p style={{ margin: '20px 0 0', textAlign: 'center', fontSize: 12, color: '#C8C8C8' }}>没有更多记录了</p>
        </div>
      </div>
    </div>
  )
}
