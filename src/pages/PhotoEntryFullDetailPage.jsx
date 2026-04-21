import { useState } from 'react'
import { StatusBar } from '../components/Layout.jsx'
import { FetalTimelinePhotoCard } from '../components/FetalTimelinePhotoCard.jsx'
import { MilestoneCompletedCard } from '../components/MilestoneCompletedCard.jsx'
import { formatDateCompact } from '../lib/fetalFormat.js'
import { PHONE_SHELL_MIN_HEIGHT } from '../lib/phoneShell.js'

/**
 * 时间轴卡片白色区域进入：标题「详情」；照片卡与 PhotoCard 一致，大事记与 MilestoneCompletedCard 一致。
 */
export default function PhotoEntryFullDetailPage({ entry, onBack, onTagToCategory }) {
  const [sheetOpen, setSheetOpen] = useState(false)
  const isMilestone = entry.type === 'milestone'

  return (
    <div
      className="phone-shell"
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: PHONE_SHELL_MIN_HEIGHT,
        height: '100%',
        background: '#F5F5F7',
        position: 'relative',
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
        <span style={{ fontSize: 17, fontWeight: 600, color: '#1A1A1A' }}>详情</span>
        <button
          type="button"
          aria-label="更多"
          onClick={() => setSheetOpen(true)}
          style={{
            position: 'absolute',
            right: 6,
            top: '50%',
            transform: 'translateY(-50%)',
            minWidth: 40,
            height: 40,
            border: 'none',
            background: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 8px',
            fontSize: 20,
            fontWeight: 700,
            color: '#333',
            letterSpacing: 2,
            lineHeight: 1,
          }}
        >
          ···
        </button>
      </div>

      <div className="scroll-area" style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: '12px 12px 8px' }}>
        <div style={{ marginBottom: 12, paddingLeft: 2 }}>
          <span style={{ fontSize: 15, fontWeight: 600, color: '#1A1A1A' }}>{formatDateCompact(entry.date)}</span>
          <span style={{ display: 'inline-block', width: 12 }} />
          <span style={{ fontSize: 14, color: '#888' }}>孕{entry.week}周</span>
        </div>

        {isMilestone ? (
          <MilestoneCompletedCard
            embedded
            entry={entry}
            onTagClick={onTagToCategory ? () => onTagToCategory(entry) : undefined}
          />
        ) : (
          <FetalTimelinePhotoCard
            embedded
            entry={entry}
            onTagClick={onTagToCategory ? () => onTagToCategory(entry) : undefined}
          />
        )}
      </div>

      <div
        style={{
          flexShrink: 0,
          padding: '8px 12px 18px',
          background: '#fff',
          borderTop: '0.5px solid #EEE',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <div
          style={{
            flex: 1,
            background: '#F5F5F7',
            borderRadius: 20,
            padding: '10px 14px',
            fontSize: 14,
            color: '#BBB',
          }}
        >
          祝宝贝健康快乐、茁壮成长～
        </div>
        <button
          type="button"
          aria-label="表情"
          style={{
            border: 'none',
            background: 'none',
            fontSize: 22,
            cursor: 'pointer',
            padding: 4,
            lineHeight: 1,
          }}
        >
          🙂
        </button>
      </div>

      {sheetOpen && (
        <ShareActionSheet onClose={() => setSheetOpen(false)} />
      )}
    </div>
  )
}

function ShareActionSheet({ onClose }) {
  const shares = [
    { label: '微信朋友圈', bg: '#07C160', icon: '◎' },
    { label: '微信', bg: '#07C160', icon: '💬' },
    { label: '抖音', bg: '#000', icon: '♪' },
    { label: '小红书', bg: '#FF2442', icon: '书' },
    { label: '微博', bg: '#E6162D', icon: 'W' },
  ]

  return (
    <div
      role="presentation"
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 300,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
      }}
      onClick={onClose}
    >
      <div style={{ flex: 1, background: 'rgba(0,0,0,0.45)' }} />
      <div
        role="dialog"
        aria-modal="true"
        style={{
          background: '#fff',
          borderRadius: '16px 16px 0 0',
          padding: '14px 12px 10px',
          maxHeight: '78%',
        }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ fontSize: 12, color: '#AAA', textAlign: 'center', marginBottom: 14 }}>分享到</div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: 4,
            padding: '0 4px 16px',
            borderBottom: '0.5px solid #EEE',
          }}
        >
          {shares.map(s => (
            <button
              key={s.label}
              type="button"
              style={{
                border: 'none',
                background: 'none',
                padding: '4px 2px',
                cursor: 'pointer',
                fontFamily: 'inherit',
                flex: '1 1 0',
                minWidth: 0,
              }}
            >
              <div
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: '50%',
                  background: s.bg,
                  margin: '0 auto 6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontSize: 16,
                  fontWeight: 700,
                }}
              >
                {s.icon}
              </div>
              <div style={{ fontSize: 10, color: '#666', lineHeight: 1.25 }}>{s.label}</div>
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-around', padding: '16px 20px 12px', gap: 24 }}>
          <SheetIconBtn label="编辑" emoji="✏️" />
          <SheetIconBtn label="修改可见范围" emoji="👥" />
        </div>

        <button
          type="button"
          onClick={onClose}
          style={{
            width: '100%',
            border: 'none',
            background: '#F5F5F7',
            borderRadius: 12,
            padding: '13px',
            fontSize: 16,
            fontWeight: 500,
            color: '#333',
            cursor: 'pointer',
            fontFamily: 'inherit',
            marginTop: 8,
          }}
        >
          取消
        </button>
      </div>
    </div>
  )
}

function SheetIconBtn({ label, emoji }) {
  return (
    <button
      type="button"
      style={{
        border: 'none',
        background: 'none',
        cursor: 'pointer',
        fontFamily: 'inherit',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
        flex: 1,
      }}
    >
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: '50%',
          background: '#F0F0F2',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 22,
        }}
      >
        {emoji}
      </div>
      <span style={{ fontSize: 11, color: '#555' }}>{label}</span>
    </button>
  )
}
