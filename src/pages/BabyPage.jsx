import { StatusBar, BottomNav } from '../components/Layout.jsx'
import { BABY_TIMELINE_AFTER, INITIAL_TIMELINE, BIRTH_INFO } from '../data/timeline.js'

const MILESTONE_EMOJIS = { 1: '🌱', 8: '💓', 12: '📋', 16: '🤲', 22: '🔬', 28: '📸', 29: '📸', 36: '⏰' }

const TODAY_STR = new Date().toISOString().split('T')[0]

function formatEntryDate(dateStr) {
  if (dateStr === TODAY_STR) return '今天'
  const d = new Date(dateStr)
  return `${d.getMonth() + 1} 月 ${d.getDate()} 日`
}

/** 与胎宝宝 tab CardFoot 一致：时间 + 标签 + 赞/评论 */
function FetalPreCardFoot({ tag, tagColor, tagBg, entry }) {
  const t = entry.time ? ` ${entry.time}` : ''
  const lock = entry.isPrivate ? '  🔒 仅自己可见' : ''
  const metaText = `${entry.author || '妈妈'}  ${formatEntryDate(entry.date)}${t}${lock}`
  return (
    <div style={{ borderTop: '0.5px solid #F2F2F2', marginTop: 8 }}>
      <div style={{ padding: '5px 14px 2px', fontSize: 11, color: '#C0B0A8' }}>{metaText}</div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '5px 14px 11px' }}>
        <span style={{
          fontSize: 11, fontWeight: 500, color: tagColor, background: tagBg, borderRadius: 20, padding: '3px 10px',
          cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 3,
        }}>
          {tag} <span style={{ opacity: 0.5, fontSize: 10 }}>›</span>
        </span>
        <div style={{ display: 'flex', gap: 14 }}>
          <span style={{ fontSize: 12, color: '#C0B0A8', display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer' }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M12 21C12 21 3 14.5 3 8.5C3 5.42 5.42 3 8.5 3C10.24 3 11.91 3.81 13 5.08C14.09 3.81 15.76 3 17.5 3C20.58 3 23 5.42 23 8.5C23 14.5 12 21 12 21Z" stroke="#C0B0A8" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
            赞
          </span>
          <span style={{ fontSize: 12, color: '#C0B0A8', display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer' }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M21 15C21 16.1 20.1 17 19 17H7L3 21V5C3 3.9 3.9 3 5 3H19C20.1 3 21 3.9 21 5V15Z" stroke="#C0B0A8" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
            评论
          </span>
        </div>
      </div>
    </div>
  )
}

// ── 出生卡片 ──
function BirthCard() {
  const b = BIRTH_INFO
  return (
    <div style={{ background: '#fff', borderRadius: 18, border: '0.5px solid #EBEBEB', overflow: 'hidden', marginBottom: 14 }}>
      <div style={{ background: 'linear-gradient(135deg, #FFE4E8, #FFC8D0)', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{ width: 50, height: 50, background: 'rgba(255,255,255,0.6)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 26 }}>👶</div>
        <div>
          <div style={{ fontSize: 16, fontWeight: 700, color: '#C04070' }}>小小的你，大大的爱</div>
          <div style={{ fontSize: 12, color: '#C06080', marginTop: 2 }}>★ {b.zodiac} &nbsp; {b.lunar}</div>
        </div>
      </div>
      <div style={{ display: 'flex', padding: '14px 0 10px' }}>
        {[{ val: b.height, unit: 'cm', label: '身高' }, { val: b.weight, unit: 'kg', label: '体重' }, { val: b.head, unit: 'cm', label: '头围' }].map((s, i) => (
          <div key={s.label} style={{ flex: 1, textAlign: 'center', borderLeft: i > 0 ? '0.5px solid #F2F2F2' : 'none' }}>
            <div><span style={{ fontSize: 24, fontWeight: 700, color: '#1A1A1A' }}>{s.val}</span><span style={{ fontSize: 12, color: '#AAA', marginLeft: 2 }}>{s.unit}</span></div>
            <div style={{ fontSize: 11, color: '#AAA', marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>
      <div style={{ padding: '0 14px 12px', display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {[b.date, '身高体重', '出生记录'].map(t => (
          <div key={t} style={{ fontSize: 11, background: '#F5F5F7', color: '#666', borderRadius: 8, padding: '4px 10px' }}>{t}</div>
        ))}
      </div>
      <div style={{ padding: '10px 14px', borderTop: '0.5px solid #F2F2F2', display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 12, color: '#AAA' }}>妈妈</span>
        <div style={{ display: 'flex', gap: 14 }}>
          <span style={{ fontSize: 12, color: '#AAA', cursor: 'pointer' }}>❤️ 赞</span>
          <span style={{ fontSize: 12, color: '#AAA', cursor: 'pointer' }}>💬 评论</span>
        </div>
      </div>
    </div>
  )
}

// ── 出生后普通照片卡 ──
function BabyPhotoCard({ entry }) {
  return (
    <div style={{ background: '#fff', borderRadius: 18, border: '0.5px solid #EBEBEB', overflow: 'hidden', marginBottom: 14 }}>
      <div style={{ height: entry.isToday ? 200 : 160, background: entry.color || '#D8E8E0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width="50" height="50" viewBox="0 0 50 50" fill="none" opacity="0.28">
          <circle cx="25" cy="18" r="14" fill="#fff"/>
          <ellipse cx="25" cy="42" rx="20" ry="14" fill="#fff"/>
        </svg>
      </div>
      <div style={{ padding: '12px 14px' }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: '#1A1A1A', marginBottom: 3 }}>{entry.title}</div>
        {entry.note && <div style={{ fontSize: 12, color: '#888', marginBottom: 4 }}>{entry.note}</div>}
        <div style={{ fontSize: 11, color: '#AAA' }}>{entry.ageLabel}</div>
      </div>
      <div style={{ padding: '10px 14px', borderTop: '0.5px solid #F2F2F2', display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 12, color: '#AAA' }}>{entry.author}</span>
        <div style={{ display: 'flex', gap: 14 }}>
          <span style={{ fontSize: 12, color: '#AAA', cursor: 'pointer' }}>❤️ 赞</span>
          <span style={{ fontSize: 12, color: '#AAA', cursor: 'pointer' }}>💬 评论</span>
        </div>
      </div>
    </div>
  )
}

// ── 出生后里程碑卡 ──
function BabyMilestoneCard({ entry }) {
  return (
    <div style={{ background: '#fff', borderRadius: 14, border: '0.5px solid #FFD0A0', padding: '12px 14px', marginBottom: 12, display: 'flex', alignItems: 'flex-start', gap: 10 }}>
      <div style={{ width: 40, height: 40, background: '#FFF3E0', borderRadius: 10, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>{entry.emoji}</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: '#B06000', marginBottom: 3 }}>{entry.title}</div>
        {entry.note && <div style={{ fontSize: 12, color: '#888', lineHeight: 1.5 }}>{entry.note}</div>}
        <div style={{ fontSize: 11, color: '#AAA', marginTop: 4 }}>{entry.ageLabel} · {entry.author}</div>
      </div>
    </div>
  )
}

// ── 出生前胎宝宝数据卡（精简版，用于柚柚时间轴中展示；底部与胎宝宝 tab CardFoot 一致） ──
function FetalDataCardSmall({ entry }) {
  const isWeight = entry.subtype === 'weight_estimate'
  const isMovement = entry.subtype === 'fetal_movement'
  const isHeartRate = entry.subtype === 'heart_rate'
  const isPhoto = entry.type === 'photo'
  const isMilestone = entry.type === 'milestone'
  const isBelly = entry.subtype === 'belly'

  let footTag = entry.title || '记录'
  let footColor = '#8A6FD8'
  let footBg = '#F0EDFB'
  if (isWeight) { footTag = '胎儿估重'; footColor = '#E05070'; footBg = '#FFE8EE' }
  else if (isMovement) { footTag = '胎动记录'; footColor = '#308878'; footBg = '#E0F4F0' }
  else if (isHeartRate) { footTag = '胎心记录'; footColor = '#185FA5'; footBg = '#E6F1FB' }
  else if (isPhoto) { footTag = isBelly ? '大肚照' : 'B 超单'; footColor = isBelly ? '#508040' : '#308878'; footBg = isBelly ? '#E8F4E0' : '#E0F4F0' }
  else if (isMilestone) { footTag = '里程碑'; footColor = '#D04060'; footBg = '#FFE0E8' }

  const count = entry.data?.count || 0
  const movementSentiment = count >= 10 ? '宝宝今天很活跃，像在开派对 🥳' : count >= 5 ? '宝宝在动哦，跟你打招呼呢 👋' : '宝宝今天比较安静，在睡觉 💤'
  const bpm = entry.data?.bpm || 0
  const heartSentiment = bpm > 160 ? '心跳很有力，咚咚咚 ❤️' : bpm > 140 ? '心跳规律，一切都好 💓' : '宝宝在安静地发育中 🌙'

  return (
    <div style={{ background: '#fff', borderRadius: 14, border: '0.5px solid #EBEBEB', marginBottom: 10, opacity: 0.9, overflow: 'hidden' }}>
      <div style={{ padding: '10px 14px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 8 }}>
          <span style={{ fontSize: 11, color: '#CCC' }}>孕{entry.week}周</span>
        </div>

        {isWeight && entry.data && (
          <div style={{ display: 'flex', gap: 12, paddingBottom: 4 }}>
            {[{ k: 'weight', u: 'g', l: '体重' }, { k: 'head', u: 'mm', l: '头围' }, { k: 'belly', u: 'mm', l: '腹围' }]
              .filter(f => entry.data[f.k])
              .map(f => (
                <div key={f.k} style={{ textAlign: 'center' }}>
                  <span style={{ fontSize: 15, fontWeight: 700, color: '#1A1A1A' }}>{entry.data[f.k]}</span>
                  <span style={{ fontSize: 10, color: '#AAA', marginLeft: 2 }}>{f.u}</span>
                  <div style={{ fontSize: 10, color: '#AAA' }}>{f.l}</div>
                </div>
              ))}
          </div>
        )}
        {isWeight && entry.note && (
          <div style={{ fontSize: 12, color: '#888', borderTop: '0.5px solid #F2F2F2', paddingTop: 8, marginBottom: 4 }}>{entry.note}</div>
        )}

        {isMovement && entry.data && (
          <>
            <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
              <div style={{ flex: 1, textAlign: 'center', borderRight: '0.5px solid #F2F2F2', paddingRight: 12, marginRight: 4 }}>
                <div style={{ fontSize: 22, fontWeight: 700, color: '#1A1A1A' }}>{entry.data.count}</div>
                <div style={{ fontSize: 10, color: '#AAA' }}>次</div>
                <div style={{ fontSize: 10, color: '#AAA', marginTop: 2 }}>胎动次数</div>
              </div>
              <div style={{ flex: 1, textAlign: 'center' }}>
                <div style={{ fontSize: 22, fontWeight: 700, color: '#1A1A1A' }}>{entry.data.duration}</div>
                <div style={{ fontSize: 10, color: '#AAA' }}>分钟</div>
                <div style={{ fontSize: 10, color: '#AAA', marginTop: 2 }}>计数时长</div>
              </div>
            </div>
            <div style={{ marginTop: 8, marginBottom: 4, fontSize: 12, color: '#C08898', fontStyle: 'italic' }}>{movementSentiment}</div>
          </>
        )}

        {isHeartRate && entry.data && (
          <>
            <div style={{ textAlign: 'center', paddingBottom: 4 }}>
              <div style={{ fontSize: 28, fontWeight: 700, color: '#1A1A1A', letterSpacing: -0.5 }}>{entry.data.bpm}</div>
              <div style={{ fontSize: 10, color: '#AAA' }}>次 / 分钟</div>
              <div style={{ fontSize: 10, color: '#AAA', marginTop: 2 }}>胎心率</div>
            </div>
            <div style={{ marginTop: 4, marginBottom: 4, fontSize: 12, color: '#6090A8', fontStyle: 'italic' }}>{heartSentiment}</div>
            {entry.note && <div style={{ fontSize: 12, color: '#888', marginBottom: 4 }}>{entry.note}</div>}
          </>
        )}

        {isPhoto && (
          <div style={{ height: 60, background: entry.color || '#E8E8E8', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 4 }}>
            <span style={{ fontSize: 11, color: '#BBB' }}>{entry.title}</span>
          </div>
        )}

        {isMilestone && (
          <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', paddingBottom: 4 }}>
            <span style={{ fontSize: 20, lineHeight: 1.2 }}>{MILESTONE_EMOJIS[entry.week] || '🌸'}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#2A1020', marginBottom: 4 }}>{entry.title}</div>
              {entry.note && <div style={{ fontSize: 12, color: '#9A8090', lineHeight: 1.6 }}>{entry.note}</div>}
            </div>
          </div>
        )}
      </div>
      <FetalPreCardFoot tag={footTag} tagColor={footColor} tagBg={footBg} entry={entry} />
    </div>
  )
}

function TlDot({ muted, small }) {
  const size = small ? 8 : 10
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%', flexShrink: 0,
      background: muted ? '#CCC' : '#E8608A',
      boxShadow: muted ? 'none' : `0 0 0 ${small ? 2 : 3}px rgba(232,96,138,0.18)`,
    }} />
  )
}

export default function BabyPage({ onTabChange }) {
  const b = BIRTH_INFO
  const heroAgeLabel = BABY_TIMELINE_AFTER.find(e => e.isToday)?.ageLabel
    || BABY_TIMELINE_AFTER[0]?.ageLabel
    || '2 岁 6 天'
  // Public fetal entries (not private)
  const fetalPublic = INITIAL_TIMELINE.filter(e => !e.isPrivate)
  // Group fetal entries by date for display
  const fetalGroups = {}
  fetalPublic.forEach(e => {
    if (!fetalGroups[e.date]) fetalGroups[e.date] = []
    fetalGroups[e.date].push(e)
  })
  const fetalDates = Object.entries(fetalGroups).sort((a, b) => b[0].localeCompare(a[0]))

  return (
    <div className="phone-shell" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <StatusBar />

      {/* Top nav */}
      <div className="top-nav">
        <div style={{ padding: '0 6px', display: 'flex', alignItems: 'center' }}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="9" cy="9" r="7" stroke="#555" strokeWidth="1.6"/><path d="M14.5 14.5L18 18" stroke="#555" strokeWidth="1.6" strokeLinecap="round"/></svg>
        </div>
        <div className="top-nav-tabs">
          <div className="nav-tab" onClick={() => onTabChange('mama')}>妈妈</div>
          <div className="nav-tab" onClick={() => onTabChange('fetal')}>胎宝宝</div>
          <div className="nav-tab active">柚柚</div>
        </div>
        <div style={{ padding: '0 6px' }}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="3" y="3" width="14" height="14" rx="3" stroke="#555" strokeWidth="1.6" fill="none"/><path d="M7 10h6M10 7v6" stroke="#555" strokeWidth="1.4" strokeLinecap="round"/></svg>
        </div>
      </div>

      <div className="scroll-area" style={{ flex: 1 }}>

        {/* Hero：与胎宝宝 tab 同构（底对齐头像 + 文案 + 邀请按钮） */}
        <div style={{ borderBottom: '0.5px solid #F2F2F2' }}>
          <div style={{
            position: 'relative',
            minHeight: 176,
            backgroundColor: '#E8E4E0',
            backgroundImage: 'url(/baby-header-bg.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center 32%',
          }}>
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(180deg, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0.38) 55%, rgba(0,0,0,0.52) 100%)',
              pointerEvents: 'none',
            }} />
            <div style={{
              position: 'relative', zIndex: 1,
              minHeight: 176,
              display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
              padding: '18px 16px 16px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 48, height: 48, borderRadius: '50%',
                  background: 'rgba(255,255,255,0.22)', border: '2px solid rgba(255,255,255,0.85)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                  backdropFilter: 'blur(4px)', fontSize: 26, lineHeight: 1,
                }}>
                  👶
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 17, fontWeight: 600, color: '#fff', textShadow: '0 1px 8px rgba(0,0,0,0.35)' }}>{b.name}</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.88)', marginTop: 3, textShadow: '0 1px 6px rgba(0,0,0,0.35)' }}>{heroAgeLabel}</div>
                </div>
                <div style={{
                  fontSize: 12, color: '#fff', borderRadius: 20, padding: '7px 12px',
                  background: 'rgba(0,0,0,0.38)', fontWeight: 500, cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: 4, border: '0.5px solid rgba(255,255,255,0.25)',
                  backdropFilter: 'blur(6px)',
                }}>
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="5" r="3" stroke="#fff" strokeWidth="1.4"/><path d="M2 14c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="#fff" strokeWidth="1.4" strokeLinecap="round"/></svg>
                  邀请亲友
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Today change card */}
        <div style={{ background: 'linear-gradient(135deg, #FFB347, #FF8C42)', margin: '10px 12px', borderRadius: 18, padding: '14px 16px', color: '#fff' }}>
          <div style={{ fontSize: 11, opacity: 0.85, marginBottom: 5, fontWeight: 500 }}>宝宝今日变化</div>
          <div style={{ fontSize: 13, lineHeight: 1.6, fontWeight: 500 }}>我已经能用勺和碗了，可以开始锻炼我使用筷子了，使用筷子会牵动200多块肌肉，对我而言是一项锻炼呢。›</div>
        </div>

        {/* Kong zone */}
        <div style={{ background: '#fff', marginTop: 8, padding: '14px 14px 12px' }}>
          <div className="kong-grid">
            {[
              { label: '喂养记录', bg: '#FBEAF0' },
              { label: '云相册', bg: '#E8F2FC' },
              { label: '发育测评', bg: '#E8F4E8', vip: true },
              { label: '记身高体重', bg: '#E2F5EE' },
              { label: '更多 ∨', bg: '#F5F5F7' },
            ].map(k => (
              <div key={k.label} className="kong-item">
                <div className="kong-icon" style={{ background: k.bg, position: 'relative' }}>
                  {k.vip && <div className="kong-vip">VIP</div>}
                  <div style={{ width: 26, height: 26, background: 'rgba(0,0,0,0.07)', borderRadius: 6 }} />
                </div>
                <div className="kong-lbl">{k.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Cloud banner */}
        <div style={{ background: '#fff', margin: '8px 12px', borderRadius: 14, border: '0.5px solid #EBEBEB', padding: '12px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 13, color: '#666' }}>宝宝的珍贵回忆永久保存 →</span>
          <div style={{ fontSize: 12, background: '#FBEAF0', color: '#E8608A', borderRadius: 14, padding: '5px 12px', fontWeight: 500, border: '1px solid #F4C0D1', cursor: 'pointer' }}>一键开启</div>
        </div>

        {/* ── 时间轴 ── */}
        <div style={{ background: '#F5F5F7', padding: '14px 16px 40px' }}>

          {/* 出生后记录 */}
          {BABY_TIMELINE_AFTER.map((entry, idx) => {
            const isFirst = idx === 0
            return (
              <div key={entry.id}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12, marginTop: isFirst ? 0 : 4 }}>
                  <TlDot />
                  <span style={{ fontSize: 14, fontWeight: 600, color: '#1A1A1A' }}>{isFirst ? '今天' : entry.date}</span>
                  <span style={{ fontSize: 12, color: '#AAA' }}>{entry.ageLabel}</span>
                </div>
                {entry.type === 'milestone'
                  ? <BabyMilestoneCard entry={entry} />
                  : <BabyPhotoCard entry={entry} />
                }
              </div>
            )
          })}

          {/* ── 出生节点 ── */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12, marginTop: 4 }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#F4C0D1', flexShrink: 0, boxShadow: '0 0 0 3px rgba(244,192,209,0.3)' }} />
            <span style={{ fontSize: 14, fontWeight: 600, color: '#1A1A1A' }}>{b.date}</span>
            <span style={{ fontSize: 12, color: '#AAA' }}>出生日</span>
          </div>
          <BirthCard />

          {/* ── 分割线：出生前数据 ── */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '8px 0 18px' }}>
            <div style={{ flex: 1, height: '0.5px', background: '#DDD' }} />
            <span style={{ fontSize: 11, color: '#AAA', whiteSpace: 'nowrap' }}>以下为出生前记录</span>
            <span style={{ fontSize: 11, color: '#E8608A', cursor: 'pointer', whiteSpace: 'nowrap' }}>仅妈妈可见 · 设置</span>
            <div style={{ flex: 1, height: '0.5px', background: '#DDD' }} />
          </div>

          {/* 胎宝宝历史记录（精简版卡片） */}
          {fetalDates.map(([date, entries]) => {
            const first = entries[0]
            const d = new Date(date)
            const dateLabel = `${d.getMonth() + 1} 月 ${d.getDate()} 日`
            const wLabel = first.day > 0 ? `孕 ${first.week} 周 ${first.day} 天` : `孕 ${first.week} 周`
            return (
              <div key={date} style={{ opacity: 0.75 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                  <TlDot muted small />
                  <span style={{ fontSize: 13, fontWeight: 500, color: '#AAA' }}>{dateLabel}</span>
                  <span style={{ fontSize: 11, color: '#CCC' }}>{wLabel}</span>
                </div>
                {entries.map(e => <FetalDataCardSmall key={e.id} entry={e} />)}
              </div>
            )
          })}

          <div style={{ height: 40 }} />
        </div>
      </div>

      {/* FAB */}
      <div style={{ position: 'absolute', bottom: 86, right: 16, zIndex: 50 }}>
        <button className="fab">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <rect x="2" y="6" width="20" height="15" rx="3" stroke="#fff" strokeWidth="1.6"/>
            <circle cx="12" cy="13.5" r="4" stroke="#fff" strokeWidth="1.6"/>
            <path d="M8.5 6l1.8-2.5h3.4L15.5 6" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round"/>
            <circle cx="17.5" cy="9.5" r="1.2" fill="#fff"/>
          </svg>
        </button>
      </div>

      <BottomNav active="home" onTabChange={onTabChange} />
    </div>
  )
}
