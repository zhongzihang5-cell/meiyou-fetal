import { useState } from 'react'
import { StatusBar } from '../components/Layout.jsx'
import ShareActionSheet from '../components/ShareActionSheet.jsx'

const DATA_RECORD_SHEET_ACTIONS = [
  { label: '修改查看权限', emoji: '👥' },
  { label: '删除', emoji: '🗑️' },
]
import { HeartRateCard, FetalMovementCard, WeightEstimateCard } from '../components/FetalDataTimelineCards.jsx'
import { formatDateCompact } from '../lib/fetalFormat.js'
import { PHONE_SHELL_MIN_HEIGHT } from '../lib/phoneShell.js'

function renderDataCard(entry, onTagToTool) {
  switch (entry.subtype) {
    case 'weight_estimate':
      return <WeightEstimateCard embedded entry={entry} onTagClick={onTagToTool} />
    case 'fetal_movement':
      return <FetalMovementCard embedded entry={entry} onTagClick={onTagToTool} />
    case 'heart_rate':
      return <HeartRateCard embedded entry={entry} onTagClick={onTagToTool} />
    default:
      return null
  }
}

/**
 * 胎宝宝时间轴：胎儿估重 / 数胎动 / 测胎心 单条记录详情（顶栏与底部与大肚照「详情」一致）
 */
export default function FetalDataRecordDetailPage({ entry, onBack, onTagToTool }) {
  const [sheetOpen, setSheetOpen] = useState(false)

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

        {renderDataCard(entry, onTagToTool)}
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

      {sheetOpen && <ShareActionSheet onClose={() => setSheetOpen(false)} footerActions={DATA_RECORD_SHEET_ACTIONS} />}
    </div>
  )
}
