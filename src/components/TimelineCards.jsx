// Individual card types for the fetal timeline
import { formatPregnancyWeekDay } from '../data/timeline.js'

export function MilestoneCard({ entry, onUpload }) {
  return (
    <div style={{
      background: '#fff',
      borderRadius: 18,
      border: '1px solid #F4C0D1',
      overflow: 'hidden',
      marginBottom: 14,
    }}>
      <div style={{ padding: 18, textAlign: 'center' }}>
        <div style={{
          width: 80, height: 64,
          background: '#FBEAF0',
          borderRadius: 14,
          margin: '0 auto 14px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 32,
        }}>
          {entry.emoji || '🌸'}
        </div>
        <div style={{ fontSize: 15, fontWeight: 700, color: '#C04070', marginBottom: 6 }}>
          {entry.title}
        </div>
        <div style={{ fontSize: 12, color: '#B06080', lineHeight: 1.6 }}>
          {entry.sub}
        </div>
        {entry.note && (
          <div style={{
            marginTop: 10, padding: '8px 12px',
            background: '#FBEAF0', borderRadius: 10,
            fontSize: 13, color: '#C04070', textAlign: 'left',
          }}>
            {entry.note}
          </div>
        )}
        <button
          onClick={onUpload}
          style={{
            marginTop: 14,
            background: 'var(--pink)',
            color: '#fff',
            border: 'none',
            borderRadius: 24,
            padding: '9px 28px',
            fontSize: 14, fontWeight: 600,
            cursor: 'pointer',
            fontFamily: 'inherit',
          }}
        >
          {entry.note ? '添加更多' : '上传记录'}
        </button>
      </div>
    </div>
  )
}

export function WeightEstimateCard({ entry }) {
  const { data, date } = entry
  const fields = [
    { key: 'weight', label: '体重', unit: 'g' },
    { key: 'head', label: '头围', unit: 'mm' },
    { key: 'belly', label: '腹围', unit: 'mm' },
    { key: 'femur', label: '股骨', unit: 'mm' },
  ].filter(f => data?.[f.key])

  return (
    <div style={{
      background: '#fff',
      borderRadius: 16,
      border: '0.5px solid #EBEBEB',
      padding: '14px 16px',
      marginBottom: 12,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
        <span style={{
          fontSize: 12, fontWeight: 600, color: 'var(--pink)',
          background: '#FBEAF0', borderRadius: 8, padding: '3px 9px',
        }}>
          胎儿估重
        </span>
        <span style={{ fontSize: 12, color: '#AAA' }}>
          {date} · {formatPregnancyWeekDay(entry.week, entry.day)}
        </span>
      </div>
      <div style={{ display: 'flex' }}>
        {fields.map((f, i) => (
          <div key={f.key} style={{
            flex: 1,
            textAlign: 'center',
            borderLeft: i > 0 ? '0.5px solid #F2F2F2' : 'none',
          }}>
            <div style={{ fontSize: 22, fontWeight: 700, color: '#1A1A1A', letterSpacing: -0.5 }}>
              {data[f.key]}
            </div>
            <div style={{ fontSize: 11, color: '#AAA' }}>{f.unit}</div>
            <div style={{ fontSize: 11, color: '#AAA', marginTop: 3 }}>{f.label}</div>
          </div>
        ))}
      </div>
      {entry.note && (
        <div style={{ marginTop: 10, fontSize: 12, color: '#888', borderTop: '0.5px solid #F2F2F2', paddingTop: 8 }}>
          {entry.note}
        </div>
      )}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10, paddingTop: 8, borderTop: '0.5px solid #F2F2F2' }}>
        <span style={{ fontSize: 12, color: '#AAA' }}>{entry.author}</span>
      </div>
    </div>
  )
}

export function FetalMovementCard({ entry }) {
  const { data } = entry
  return (
    <div style={{
      background: '#fff',
      borderRadius: 16,
      border: '0.5px solid #EBEBEB',
      padding: '14px 16px',
      marginBottom: 12,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
        <span style={{
          fontSize: 12, fontWeight: 600, color: '#1BA97A',
          background: '#E2F5EE', borderRadius: 8, padding: '3px 9px',
        }}>
          胎动记录
        </span>
        <span style={{ fontSize: 12, color: '#AAA' }}>{entry.date} · {data?.session || ''}次</span>
      </div>
      <div style={{ display: 'flex', gap: 0 }}>
        <div style={{ flex: 1, textAlign: 'center' }}>
          <div style={{ fontSize: 28, fontWeight: 700, color: '#1A1A1A' }}>{data?.count || '--'}</div>
          <div style={{ fontSize: 11, color: '#AAA' }}>次</div>
          <div style={{ fontSize: 11, color: '#AAA', marginTop: 3 }}>胎动次数</div>
        </div>
        <div style={{ flex: 1, textAlign: 'center', borderLeft: '0.5px solid #F2F2F2' }}>
          <div style={{ fontSize: 28, fontWeight: 700, color: '#1A1A1A' }}>{data?.duration || '--'}</div>
          <div style={{ fontSize: 11, color: '#AAA' }}>分钟</div>
          <div style={{ fontSize: 11, color: '#AAA', marginTop: 3 }}>计数时长</div>
        </div>
      </div>
      {entry.note && (
        <div style={{ marginTop: 10, fontSize: 12, color: '#888', borderTop: '0.5px solid #F2F2F2', paddingTop: 8 }}>
          {entry.note}
        </div>
      )}
      <div style={{ marginTop: 8, paddingTop: 8, borderTop: '0.5px solid #F2F2F2' }}>
        <span style={{ fontSize: 12, color: '#AAA' }}>{entry.author}</span>
      </div>
    </div>
  )
}

export function PhotoCard({ entry }) {
  const isBelly = entry.subtype === 'belly'
  return (
    <div style={{
      background: '#fff',
      borderRadius: 16,
      border: '0.5px solid #EBEBEB',
      overflow: 'hidden',
      marginBottom: 12,
    }}>
      <div style={{
        height: entry.isNew ? 160 : 110,
        background: entry.color || '#E8E8E8',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative',
      }}>
        {/* simulate photo with colored background + icon */}
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" opacity="0.35">
          {isBelly ? (
            <>
              <ellipse cx="20" cy="18" rx="10" ry="12" fill="#fff"/>
              <ellipse cx="20" cy="32" rx="14" ry="10" fill="#fff"/>
            </>
          ) : (
            <>
              <rect x="4" y="6" width="32" height="26" rx="3" fill="#fff"/>
              <path d="M8 24 L13 18 L18 22 L24 14 L32 20" stroke="#DDD" strokeWidth="2" fill="none" strokeLinecap="round"/>
            </>
          )}
        </svg>
        {entry.isNew && (
          <div style={{
            position: 'absolute', top: 8, right: 8,
            background: 'rgba(232,96,138,0.9)',
            color: '#fff', fontSize: 10, fontWeight: 600,
            borderRadius: 6, padding: '2px 7px',
          }}>新上传</div>
        )}
      </div>
      <div style={{ padding: '10px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 500, color: '#1A1A1A' }}>{entry.title}</div>
          {entry.note && <div style={{ fontSize: 12, color: '#888', marginTop: 2 }}>{entry.note}</div>}
          <div style={{ fontSize: 11, color: '#AAA', marginTop: 3 }}>
            {formatPregnancyWeekDay(entry.week, entry.day)} · {entry.author}
          </div>
        </div>
      </div>
    </div>
  )
}

export function MilestoneCompletedCard({ entry }) {
  return (
    <div style={{
      background: '#fff',
      borderRadius: 16,
      border: '0.5px solid #F4C0D1',
      padding: '12px 14px',
      marginBottom: 12,
      display: 'flex',
      alignItems: 'flex-start',
      gap: 10,
    }}>
      <div style={{
        width: 36, height: 36,
        background: '#FBEAF0',
        borderRadius: 10,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 20, flexShrink: 0,
      }}>
        {entry.emoji || '🌸'}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: '#C04070', marginBottom: 3 }}>{entry.title}</div>
        {entry.note && (
          <div style={{ fontSize: 12, color: '#888', lineHeight: 1.5 }}>{entry.note}</div>
        )}
        <div style={{ fontSize: 11, color: '#AAA', marginTop: 4 }}>
          {formatPregnancyWeekDay(entry.week, entry.day)} · {entry.author}
        </div>
      </div>
    </div>
  )
}

// Generic empty milestone prompt card (used for today's prompt when no milestone)
export function DailyPromptCard({ week, day = 1, onUpload }) {
  const w = formatPregnancyWeekDay(week, day)
  const prompts = [
    `今天${w}，记录一张照片吧`,
    '写下今天的心情，留给未来的宝宝看',
    '上传今天的产检记录',
  ]
  const prompt = prompts[week % prompts.length]
  return (
    <div style={{
      background: '#fff',
      borderRadius: 16,
      border: '1px dashed #F4C0D1',
      padding: '16px 14px',
      marginBottom: 12,
      textAlign: 'center',
    }}>
      <div style={{ fontSize: 13, color: '#B06080', marginBottom: 12 }}>{prompt}</div>
      <button
        onClick={onUpload}
        style={{
          background: 'var(--pink)',
          color: '#fff',
          border: 'none',
          borderRadius: 20,
          padding: '7px 20px',
          fontSize: 13, fontWeight: 500,
          cursor: 'pointer',
          fontFamily: 'inherit',
        }}
      >
        添加记录
      </button>
    </div>
  )
}
