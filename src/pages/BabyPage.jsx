import { StatusBar, BottomNav } from '../components/Layout.jsx'
import { SquarePen, Weight } from 'lucide-react'
import { IconBabyFootprint, IconTinyHeart } from '../components/Icons.jsx'
import { BABY_TIMELINE_AFTER, INITIAL_TIMELINE, BIRTH_INFO, formatPregnancyWeekDay, deriveFetalMovementMetrics } from '../data/timeline.js'
import { FETAL_MOVEMENT_THEME } from '../lib/fetalCardThemes.js'
import { buildHeartCurvePolylinePoints, formatHeartDuration, formatHeartMeasurementDateTime, getHeartRateTheme } from '../lib/heartRateCard.js'
import { formatFetalWeightGramsToJin, getWeightEstimateTheme, getWeightMetricsDisplay } from '../lib/weightEstimateCard.js'

const TODAY_STR = new Date().toISOString().split('T')[0]

function formatEntryDate(dateStr) {
  if (dateStr === TODAY_STR) return '今天'
  const d = new Date(dateStr)
  return `${d.getMonth() + 1} 月 ${d.getDate()} 日`
}

/** 与胎宝宝 tab CardFoot 一致：仅标签行；妈妈行与赞/评论同一行 */
function FetalPreCardFoot({ tag, tagColor, tagBg, tagBorder, entry }) {
  const t = entry.time ? ` ${entry.time}` : ''
  const lock = entry.isPrivate ? '  🔒 仅自己可见' : ''
  const metaText = `${entry.author || '妈妈'}  ${formatEntryDate(entry.date)}${t}${lock}`
  return (
    <div style={{ marginTop: 8, paddingTop: 8 }}>
      <div style={{ padding: '0 14px 8px' }}>
        <span style={{
          fontSize: 11, fontWeight: 500, color: tagColor, background: tagBg, borderRadius: 20, padding: '3px 10px',
          border: tagBorder ? `0.5px solid ${tagBorder}` : '0.5px solid transparent',
          cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 3,
        }}>
          {tag} <span style={{ opacity: 0.5, fontSize: 10 }}>›</span>
        </span>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
          padding: '2px 14px 11px',
        }}
      >
        <div style={{ fontSize: 12, color: '#C0B0A8', flex: 1, minWidth: 0, lineHeight: 1.45 }}>{metaText}</div>
        <div style={{ display: 'flex', gap: 14, flexShrink: 0, alignItems: 'center' }}>
          <span style={{ fontSize: 12, color: '#C0B0A8', display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer' }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M12 21C12 21 3 14.5 3 8.5C3 5.42 5.42 3 8.5 3C10.24 3 11.91 3.81 13 5.08C14.09 3.81 15.76 3 17.5 3C20.58 3 23 5.42 23 8.5C23 14.5 12 21 12 21Z" stroke="#C0B0A8" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
            赞
          </span>
          <span style={{ fontSize: 12, color: '#C0B0A8', display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer' }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M21 15C21 16.1 20.1 17 19 17H7L3 21V5C3 3.9 3.9 3 5 3H19C20.1 3 21 3.9 21 5V15Z" stroke="#C0B0A8" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
            评论
          </span>
        </div>
      </div>
    </div>
  )
}

// ── 出生卡片 ──（底部与胎宝宝估重卡标签样式一致：仅「身高体重」药丸 + 时间行）
function BirthCard() {
  const b = BIRTH_INFO
  const wt = getWeightEstimateTheme()
  const birthMeta = `妈妈  ${formatEntryDate(b.date)}`
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
      <div style={{ marginTop: 0, paddingTop: 8 }}>
        <div style={{ padding: '0 14px 8px' }}>
          <span style={{
            fontSize: 11, fontWeight: 500, color: wt.footTag, background: wt.footBg, borderRadius: 20, padding: '3px 10px',
            border: `0.5px solid ${wt.footBorder}`, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 3,
          }}>
            身高体重 <span style={{ opacity: 0.5, fontSize: 10 }}>›</span>
          </span>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12,
            padding: '2px 14px 11px',
          }}
        >
          <div style={{ fontSize: 12, color: '#C0B0A8', flex: 1, minWidth: 0, lineHeight: 1.45 }}>{birthMeta}</div>
          <div style={{ display: 'flex', gap: 14, flexShrink: 0, alignItems: 'center' }}>
            <span style={{ fontSize: 12, color: '#C0B0A8', display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer' }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M12 21C12 21 3 14.5 3 8.5C3 5.42 5.42 3 8.5 3C10.24 3 11.91 3.81 13 5.08C14.09 3.81 15.76 3 17.5 3C20.58 3 23 5.42 23 8.5C23 14.5 12 21 12 21Z" stroke="#C0B0A8" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
              赞
            </span>
            <span style={{ fontSize: 12, color: '#C0B0A8', display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer' }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M21 15C21 16.1 20.1 17 19 17H7L3 21V5C3 3.9 3.9 3 5 3H19C20.1 3 21 3.9 21 5V15Z" stroke="#C0B0A8" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
              评论
            </span>
          </div>
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
  let footBorder = undefined
  let cardBorder = '#EBEBEB'

  if (isWeight) {
    const wt = getWeightEstimateTheme()
    footTag = '胎儿估重'
    footColor = wt.footTag
    footBg = wt.footBg
    footBorder = wt.footBorder
    cardBorder = wt.border
  }
  else if (isMovement) {
    const tm = FETAL_MOVEMENT_THEME
    footTag = '数胎动'
    footColor = tm.footTag
    footBg = tm.footBg
    footBorder = tm.footBorder
    cardBorder = tm.border
  }
  else if (isHeartRate) {
    const ht = getHeartRateTheme(entry.data?.abnormal === true)
    footTag = '测胎心'
    footColor = ht.footTag
    footBg = ht.footBg
    footBorder = ht.footBorder
    cardBorder = ht.border
  }
  else if (isPhoto) { footTag = isBelly ? '大肚照' : '产检报告'; footColor = isBelly ? '#508040' : '#308878'; footBg = isBelly ? '#E8F4E0' : '#E0F4F0' }
  else if (isMilestone) { footTag = '大事记'; footColor = '#D04060'; footBg = '#FFE0E8' }

  return (
    <div style={{ background: '#fff', borderRadius: 14, border: `0.5px solid ${cardBorder}`, marginBottom: 10, opacity: 0.9, overflow: 'hidden' }}>
      <div style={{ padding: '10px 14px 0' }}>
        {!isMilestone && (
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 8 }}>
            <span style={{ fontSize: 11, color: '#CCC' }}>{formatPregnancyWeekDay(entry.week, entry.day)}</span>
          </div>
        )}

        {isWeight && entry.data && (() => {
          const d = entry.data
          const weight = Number(d.weight)
          const weightJin = formatFetalWeightGramsToJin(weight)
          const weightStr = weightJin != null ? weightJin : '—'
          const pct = Number(d.percentile)
          const pctStr = Number.isFinite(pct) ? `P${Math.round(pct)}` : '—'
          const t = getWeightEstimateTheme()
          const metrics = getWeightMetricsDisplay(d)
          return (
            <div style={{ marginBottom: 4 }}>
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'baseline',
                  gap: '0 4px',
                  width: '100%',
                  textAlign: 'left',
                  fontSize: 14,
                  fontWeight: 700,
                  color: t.headline,
                  lineHeight: 1.45,
                  marginBottom: 12,
                }}
              >
                <span>宝宝又长大了一点点</span>
                <span style={{ marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', flexShrink: 0 }} role="img" aria-label="估重">
                  <Weight size={14} color={t.footprint} strokeWidth={2} aria-hidden />
                </span>
              </div>
              <div style={{ background: t.blockBg, borderRadius: 10, padding: '10px 10px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 8 }}>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: 10, color: t.label, marginBottom: 4 }}>估重</div>
                    <div style={{ display: 'flex', alignItems: 'baseline', flexWrap: 'wrap', gap: '0 2px' }}>
                      <span style={{ fontSize: 24, fontWeight: 700, color: t.numStrong, fontVariantNumeric: 'tabular-nums', lineHeight: 1.08 }}>
                        {weightStr}
                      </span>
                      <span style={{ fontSize: 11, fontWeight: 600, color: t.numStrong }}>斤</span>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0, minWidth: 0 }}>
                    <div style={{ fontSize: 9, color: t.label, marginBottom: 4 }}>百分位</div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: t.numStrong, fontVariantNumeric: 'tabular-nums', lineHeight: 1.2, marginBottom: 3 }}>
                      {pctStr}
                    </div>
                    <div style={{ fontSize: 9, fontWeight: 400, color: t.pctSub, lineHeight: 1.35 }}>正常 P10–P90</div>
                  </div>
                </div>
                <div style={{ height: '0.5px', background: t.divider, margin: '8px -10px' }} />
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'nowrap',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    gap: 2,
                    width: '100%',
                  }}
                >
                  {metrics.map(m => (
                    <div key={m.key} style={{ minWidth: 0, flex: '1 1 0', textAlign: 'center' }}>
                      <div style={{ fontSize: 8, color: t.label, marginBottom: 3, lineHeight: 1.2 }}>{m.label}</div>
                      <div style={{ fontSize: 10, fontWeight: 500, color: t.numStrong, fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap' }}>
                        {m.value != null ? (
                          <>
                            {m.value}
                            <span style={{ fontWeight: 400, color: t.unitMm }}> mm</span>
                          </>
                        ) : (
                          <>
                            —
                            <span style={{ fontWeight: 400, color: t.unitMm }}> mm</span>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )
        })()}
        {isWeight && entry.note && (
          <div style={{ fontSize: 12, color: '#888', borderTop: '0.5px solid #F2F2F2', paddingTop: 8, marginBottom: 4 }}>{entry.note}</div>
        )}

        {isMovement && entry.data && (() => {
          const d = entry.data
          const tm = FETAL_MOVEMENT_THEME
          const primary = tm.primary
          const blockBg = tm.blockBg
          const divider = tm.divider
          const secondary = tm.secondary
          const assist = tm.assist
          const { rows, totalValid } = deriveFetalMovementMetrics(d, entry)
          const totalDisplay = Number.isFinite(totalValid) ? totalValid : '--'
          return (
            <div style={{ marginBottom: 4 }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 6,
                  width: '100%',
                  marginBottom: 12,
                }}
              >
                <div
                  style={{
                    flex: '1 1 auto',
                    minWidth: 0,
                    textAlign: 'left',
                    fontSize: 14,
                    fontWeight: 700,
                    color: primary,
                    lineHeight: 1.45,
                  }}
                >
                  <div>你动一下，我数一下</div>
                  <div style={{ marginTop: 2, textAlign: 'right', color: tm.titleSecondLine }}>——这是我们的小暗号</div>
                </div>
                <span style={{ flexShrink: 0, display: 'inline-flex', alignItems: 'center' }} role="img" aria-label="宝宝脚印">
                  <IconBabyFootprint color={tm.footprint} size={14} />
                </span>
              </div>
              <div
                style={{
                  background: blockBg,
                  borderRadius: 10,
                  padding: '8px 10px 10px',
                }}
              >
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'minmax(0, 1.15fr) minmax(0, 1fr) minmax(0, 0.95fr)',
                    alignItems: 'center',
                    columnGap: 6,
                    paddingBottom: 6,
                  }}
                >
                  <span style={{ fontSize: 10, color: secondary }}>开始时间</span>
                  <span style={{ fontSize: 10, color: secondary, textAlign: 'center' }}>实际点击</span>
                  <span style={{ fontSize: 10, color: secondary, textAlign: 'center' }}>有效次数</span>
                </div>
                <div style={{ height: '0.5px', background: divider, margin: '0 -10px 0' }} />

                {rows.map((row, i) => (
                  <div key={i}>
                    {i > 0 && <div style={{ height: '0.5px', background: divider, margin: '0 -10px' }} />}
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'minmax(0, 1.15fr) minmax(0, 1fr) minmax(0, 0.95fr)',
                        alignItems: 'center',
                        columnGap: 6,
                        padding: '7px 0',
                      }}
                    >
                      <span style={{ fontSize: 11, color: assist, fontVariantNumeric: 'tabular-nums' }}>{row.time}</span>
                      <span style={{ fontSize: 11, color: assist, textAlign: 'center', fontVariantNumeric: 'tabular-nums' }}>{row.clicks}</span>
                      <span style={{ fontSize: 11, fontWeight: 700, color: primary, textAlign: 'center', fontVariantNumeric: 'tabular-nums' }}>
                        {Number.isFinite(row.valid) ? row.valid : '--'}
                      </span>
                    </div>
                  </div>
                ))}

                <div style={{ height: '0.5px', background: divider, margin: '0 -10px 0' }} />
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 8,
                    marginTop: 6,
                    padding: '6px 8px',
                    borderRadius: 8,
                    background: tm.summaryPillBg,
                  }}
                >
                  <span style={{ fontSize: 10, color: tm.summaryLabelMuted, fontWeight: 400, flexShrink: 0 }}>12小时胎动数</span>
                  <span style={{ textAlign: 'right', minWidth: 0, lineHeight: 1.2 }}>
                    <span
                      style={{
                        fontSize: 13,
                        fontWeight: 600,
                        color: tm.summaryNumberStrong,
                        fontVariantNumeric: 'tabular-nums',
                      }}
                    >
                      {totalDisplay}
                    </span>
                    <span style={{ fontSize: 11, fontWeight: 400, color: tm.secondary }}>次</span>
                  </span>
                </div>
              </div>
            </div>
          )
        })()}

        {isHeartRate && entry.data && (() => {
          const d = entry.data
          const bpm = Number(d.bpm) || 0
          const abnormal = d.abnormal === true
          const t = getHeartRateTheme(abnormal)
          const wavePoints = buildHeartCurvePolylinePoints(Array.isArray(d.heart_curve) ? d.heart_curve : null, 280, 36)
          const measuredAt = formatHeartMeasurementDateTime(entry)
          return (
            <div style={{ marginBottom: 4 }}>
              <div style={{ padding: '0 0 0' }}>
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'baseline',
                    gap: '0 4px',
                    width: '100%',
                    textAlign: 'left',
                    fontSize: 14,
                    fontWeight: 700,
                    color: t.headline,
                    lineHeight: 1.45,
                    marginBottom: 12,
                  }}
                >
                  <span>每一声心跳，都是你努力生长的证明</span>
                  <span style={{ marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', flexShrink: 0 }}>
                    <IconTinyHeart color={t.heartIcon} size={14} />
                  </span>
                </div>
                <div style={{ background: t.blockBg, borderRadius: 10, padding: '10px 10px' }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'flex-end',
                      justifyContent: 'space-between',
                      gap: 8,
                      marginBottom: wavePoints ? 8 : 0,
                    }}
                  >
                    <div style={{ minWidth: 0, flex: '1 1 auto' }}>
                      <div style={{ fontSize: 10, color: t.label, marginBottom: 4 }}>平均胎心率</div>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: 2, flexWrap: 'wrap' }}>
                        <span style={{ fontSize: 26, fontWeight: 500, color: t.bpmLarge, fontVariantNumeric: 'tabular-nums' }}>{bpm}</span>
                        <span style={{ fontSize: 11, color: t.bpmLarge }}>bpm</span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16, flexShrink: 0 }}>
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontSize: 9, color: t.label, marginBottom: 4 }}>测量时间</div>
                        <div style={{ fontSize: 11, fontWeight: 400, color: t.value, fontVariantNumeric: 'tabular-nums', lineHeight: 1.35 }}>{measuredAt}</div>
                      </div>
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontSize: 9, color: t.label, marginBottom: 4 }}>用时</div>
                        <div style={{ fontSize: 11, fontWeight: 400, color: t.value }}>{formatHeartDuration(d)}</div>
                      </div>
                    </div>
                  </div>
                  {wavePoints && (
                    <div>
                      <svg width="100%" height={36} viewBox="0 0 280 36" preserveAspectRatio="none" style={{ display: 'block' }}>
                        <polyline fill="none" stroke={t.wave} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" points={wavePoints} />
                      </svg>
                    </div>
                  )}
                </div>
                {abnormal && (
                  <div style={{ marginTop: 8, marginBottom: 4, fontSize: 10, fontWeight: 400, color: t.warnText, lineHeight: 1.45 }}>
                    本次胎心率超出正常范围，可稍作休息后重新测量
                  </div>
                )}
                {entry.note && <div style={{ marginTop: 6, marginBottom: 4, fontSize: 11, color: '#888' }}>{entry.note}</div>}
              </div>
            </div>
          )
        })()}

        {isPhoto && (
          <div style={{ height: 60, background: entry.color || '#E8E8E8', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 4 }}>
            <span style={{ fontSize: 11, color: '#BBB' }}>{entry.title}</span>
          </div>
        )}

        {isMilestone && (
          <>
            <div
              style={{
                position: 'relative',
                height: 58,
                borderRadius: 8,
                overflow: 'hidden',
                marginBottom: 8,
                background: entry.imageUrl
                  ? `#E8E8E8 url(${entry.imageUrl}) center/cover no-repeat`
                  : (entry.color || '#DDC8D8'),
              }}
            />
            {entry.title && <div style={{ fontSize: 13, fontWeight: 700, color: '#2A1020', marginBottom: 3 }}>{entry.title}</div>}
            {entry.note && <div style={{ fontSize: 11, color: '#9A8090', lineHeight: 1.55 }}>{entry.note}</div>}
          </>
        )}
      </div>
      <FetalPreCardFoot tag={footTag} tagColor={footColor} tagBg={footBg} tagBorder={footBorder} entry={entry} />
    </div>
  )
}

function TlDot({ muted, small }) {
  const size = small ? 8 : 10
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%', flexShrink: 0,
      background: muted ? '#CCC' : '#E295A8',
      boxShadow: muted ? 'none' : `0 0 0 ${small ? 2 : 3}px rgba(226,149,168,0.22)`,
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
            backgroundImage: `url(${import.meta.env.BASE_URL}baby-header-bg.png)`,
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
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 3 }}>
                    <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.88)', textShadow: '0 1px 6px rgba(0,0,0,0.35)' }}>{heroAgeLabel}</span>
                    <button
                      type="button"
                      aria-label="编辑宝宝年龄"
                      onClick={e => e.preventDefault()}
                      style={{
                        padding: 0,
                        border: 'none',
                        background: 'none',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        lineHeight: 0,
                        opacity: 0.95,
                      }}
                    >
                      <SquarePen size={13} color="rgba(255,255,255,0.95)" strokeWidth={1.75} aria-hidden />
                    </button>
                  </div>
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

          {/* ── 出生前记录：隐私说明 + 时间轴（与产品稿一致） ── */}
          <div style={{ marginTop: 12, marginBottom: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
              <div style={{ flex: 1, height: '0.5px', background: '#E5E5E5' }} />
              <span style={{ fontSize: 12, color: '#999', padding: '0 10px', whiteSpace: 'nowrap', lineHeight: 1.4 }}>
                — 以下内容仅对部分亲友可见 —
              </span>
              <div style={{ flex: 1, height: '0.5px', background: '#E5E5E5' }} />
            </div>
            <div style={{ textAlign: 'center', marginBottom: 18 }}>
              <span
                role="button"
                tabIndex={0}
                style={{ fontSize: 13, color: '#3A8DDD', cursor: 'pointer' }}
                onClick={e => e.preventDefault()}
              >
                前往设置
              </span>
            </div>

            {/* 左侧竖线 + 粉点 + 日期与孕周同一行 */}
            <div style={{ position: 'relative', paddingLeft: 22, marginLeft: 2 }}>
              <div
                aria-hidden
                style={{
                  position: 'absolute',
                  left: 7,
                  top: 10,
                  bottom: 0,
                  width: 2,
                  background: '#E3E5EA',
                  borderRadius: 1,
                }}
              />
              {fetalDates.map(([date, entries]) => {
                const first = entries[0]
                const d = new Date(date)
                const dateLabel = `${d.getMonth() + 1}月${d.getDate()}日`
                const wLabel = formatPregnancyWeekDay(first.week, first.day)
                return (
                  <div key={date} style={{ position: 'relative', marginBottom: 14 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10, minHeight: 22 }}>
                      <div
                        aria-hidden
                        style={{
                          position: 'absolute',
                          left: -17,
                          top: 3,
                          width: 10,
                          height: 10,
                          borderRadius: '50%',
                          background: '#E295A8',
                          boxShadow: '0 0 0 3px rgba(226,149,168,0.22)',
                          zIndex: 1,
                        }}
                      />
                      <span style={{ fontSize: 15, fontWeight: 600, color: '#1A1A1A' }}>{dateLabel}</span>
                      <span style={{ fontSize: 14, fontWeight: 500, color: '#333' }}>{wLabel}</span>
                    </div>
                    {entries.map(e => (
                      <FetalDataCardSmall key={e.id} entry={e} />
                    ))}
                  </div>
                )
              })}
            </div>
          </div>

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
