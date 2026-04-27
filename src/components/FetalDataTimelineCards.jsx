import { CardFoot } from './FetalPhotoCardParts.jsx'
import { IconBabyFootprint, IconTinyHeart } from './Icons.jsx'
import { deriveFetalMovementMetrics } from '../data/timeline.js'
import { FETAL_MOVEMENT_THEME } from '../lib/fetalCardThemes.js'
import {
  buildHeartCurvePolylinePoints,
  formatHeartDuration,
  formatHeartMeasurementDateTime,
  getHeartRateTheme,
} from '../lib/heartRateCard.js'
import { formatFetalWeightGramsToJin, getWeightEstimateTheme, getWeightMetricsDisplay } from '../lib/weightEstimateCard.js'
import { Weight } from 'lucide-react'

export function WeightEstimateCard({ entry, onTagClick, onContentClick, embedded }) {
  const data = entry.data || {}
  const weight = Number(data.weight)
  const weightJin = formatFetalWeightGramsToJin(weight)
  const weightStr = weightJin != null ? weightJin : '—'
  const t = getWeightEstimateTheme()
  const metrics = getWeightMetricsDisplay(data)
  const wrapMb = embedded ? 0 : 12

  const main = (
    <div style={{ padding: '14px 14px 0' }}>
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
          marginBottom: 14,
        }}
      >
        <span>宝宝又长大了一点点</span>
        <span style={{ marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', flexShrink: 0 }} role="img" aria-label="估重">
          <Weight size={16} color={t.footprint} strokeWidth={2} aria-hidden />
        </span>
      </div>

      <div style={{ background: t.blockBg, borderRadius: 10, padding: '14px 14px' }}>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: 11, color: t.label, marginBottom: 6 }}>估重</div>
          <div style={{ display: 'flex', alignItems: 'baseline', flexWrap: 'wrap', gap: '0 2px' }}>
            <span
              style={{
                fontSize: 32,
                fontWeight: 700,
                color: t.numStrong,
                fontVariantNumeric: 'tabular-nums',
                letterSpacing: -0.5,
                lineHeight: 1.08,
              }}
            >
              {weightStr}
            </span>
            <span style={{ fontSize: 12, fontWeight: 600, color: t.numStrong }}>斤</span>
          </div>
        </div>

        <div style={{ height: '0.5px', background: t.divider, margin: '12px -14px' }} />

        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'nowrap',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: 4,
            width: '100%',
          }}
        >
          {metrics.map(m => (
            <div key={m.key} style={{ minWidth: 0, flex: '1 1 0', textAlign: 'center' }}>
              <div style={{ fontSize: 9, color: t.label, marginBottom: 4, lineHeight: 1.25 }}>{m.label}</div>
              <div style={{ fontSize: 11, fontWeight: 500, color: t.numStrong, fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap' }}>
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

      {entry.note && (
        <div style={{ marginTop: 10, marginBottom: 4, fontSize: 12, color: '#888', lineHeight: 1.45 }}>{entry.note}</div>
      )}
    </div>
  )

  return (
    <div
      style={{
        background: '#fff',
        borderRadius: 16,
        border: `0.5px solid ${t.border}`,
        marginBottom: wrapMb,
        overflow: 'hidden',
      }}
    >
      {onContentClick ? (
        <div
          role="button"
          tabIndex={0}
          onClick={() => onContentClick()}
          onKeyDown={e => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              onContentClick()
            }
          }}
          style={{ cursor: 'pointer', outline: 'none' }}
        >
          {main}
        </div>
      ) : (
        main
      )}
      <CardFoot tag="胎儿估重" tagColor={t.footTag} tagBg={t.footBg} tagBorder={t.footBorder} entry={entry} onTagClick={onTagClick} />
    </div>
  )
}

export function FetalMovementCard({ entry, onTagClick, onContentClick, embedded }) {
  const { data } = entry
  const tm = FETAL_MOVEMENT_THEME
  const primary = tm.primary
  const blockBg = tm.blockBg
  const divider = tm.divider
  const secondary = tm.secondary
  const assist = tm.assist

  const { rows, totalValid } = deriveFetalMovementMetrics(data, entry)
  const totalDisplay = Number.isFinite(totalValid) ? totalValid : '--'
  const wrapMb = embedded ? 0 : 12

  const main = (
    <div style={{ padding: '14px 14px 0' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: 8,
          width: '100%',
          marginBottom: 14,
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
          <div style={{ marginTop: 2, textAlign: 'right', color: tm.titleSecondLine, fontWeight: 700 }}>——这是我们的小暗号</div>
        </div>
        <span style={{ flexShrink: 0, display: 'inline-flex', alignItems: 'center' }} role="img" aria-label="宝宝脚印">
          <IconBabyFootprint color={tm.footprint} size={16} />
        </span>
      </div>

      <div
        style={{
          background: blockBg,
          borderRadius: 10,
          padding: '12px 14px 14px',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.15fr) minmax(0, 1fr) minmax(0, 0.95fr)',
            alignItems: 'center',
            columnGap: 8,
            paddingBottom: 8,
          }}
        >
          <span style={{ fontSize: 12, color: secondary, fontWeight: 400 }}>开始时间</span>
          <span style={{ fontSize: 12, color: secondary, fontWeight: 400, textAlign: 'center' }}>实际点击</span>
          <span style={{ fontSize: 12, color: secondary, fontWeight: 400, textAlign: 'center' }}>有效次数</span>
        </div>
        <div style={{ height: '0.5px', background: divider, margin: '0 -14px 0' }} />

        {rows.map((row, i) => (
          <div key={i}>
            {i > 0 && <div style={{ height: '0.5px', background: divider, margin: '0 -14px' }} />}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(0, 1.15fr) minmax(0, 1fr) minmax(0, 0.95fr)',
                alignItems: 'center',
                columnGap: 8,
                padding: '11px 0',
              }}
            >
              <span
                style={{
                  fontSize: 12,
                  color: assist,
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                {row.time}
              </span>
              <span
                style={{
                  fontSize: 12,
                  color: assist,
                  textAlign: 'center',
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                {row.clicks}
              </span>
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: primary,
                  textAlign: 'center',
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                {Number.isFinite(row.valid) ? row.valid : '--'}
              </span>
            </div>
          </div>
        ))}

        <div style={{ height: '0.5px', background: divider, margin: '0 -14px 0' }} />
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12,
            marginTop: 8,
            padding: '8px 10px',
            borderRadius: 10,
            background: tm.summaryPillBg,
          }}
        >
          <span style={{ fontSize: 12, color: tm.summaryLabelMuted, fontWeight: 400, flexShrink: 0 }}>12小时胎动数</span>
          <span style={{ textAlign: 'right', minWidth: 0, lineHeight: 1.2 }}>
            <span
              style={{
                fontSize: 16,
                fontWeight: 600,
                color: tm.summaryNumberStrong,
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              {totalDisplay}
            </span>
            <span style={{ fontSize: 12, fontWeight: 400, color: tm.secondary }}>次</span>
          </span>
        </div>
      </div>
    </div>
  )

  return (
    <div
      style={{
        background: '#fff',
        borderRadius: 16,
        border: `0.5px solid ${tm.border}`,
        marginBottom: wrapMb,
        overflow: 'hidden',
      }}
    >
      {onContentClick ? (
        <div
          role="button"
          tabIndex={0}
          onClick={() => onContentClick()}
          onKeyDown={e => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              onContentClick()
            }
          }}
          style={{ cursor: 'pointer', outline: 'none' }}
        >
          {main}
        </div>
      ) : (
        main
      )}
      <CardFoot tag="数胎动" tagColor={tm.footTag} tagBg={tm.footBg} tagBorder={tm.footBorder} entry={entry} onTagClick={onTagClick} />
    </div>
  )
}

export function HeartRateCard({ entry, onTagClick, onContentClick, embedded }) {
  const d = entry.data || {}
  const bpm = Number(d.bpm) || 0
  const abnormal = d.abnormal === true
  const t = getHeartRateTheme(abnormal)
  const wavePoints = buildHeartCurvePolylinePoints(Array.isArray(d.heart_curve) ? d.heart_curve : null, 320, 44)
  const measuredAt = formatHeartMeasurementDateTime(entry)
  const wrapMb = embedded ? 0 : 12

  const main = (
    <div style={{ padding: '14px 14px 0' }}>
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
          marginBottom: 14,
        }}
      >
        <span>每一声心跳，都是你努力生长的证明</span>
        <span style={{ marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', flexShrink: 0 }}>
          <IconTinyHeart color={t.heartIcon} size={16} />
        </span>
      </div>

      <div
        style={{
          background: t.blockBg,
          borderRadius: 10,
          padding: '14px 14px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: 12,
            marginBottom: wavePoints ? 12 : 0,
          }}
        >
          <div style={{ minWidth: 0, flex: '1 1 auto' }}>
            <div style={{ fontSize: 11, color: t.label, marginBottom: 6 }}>平均胎心率</div>
            <div style={{ display: 'flex', alignItems: 'baseline', flexWrap: 'wrap', gap: '0 4px' }}>
              <span style={{ fontSize: 36, fontWeight: 500, color: t.bpmLarge, fontVariantNumeric: 'tabular-nums', letterSpacing: -0.5 }}>
                {bpm}
              </span>
              <span style={{ fontSize: 12, fontWeight: 400, color: t.bpmLarge }}>bpm</span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 24, flexShrink: 0 }}>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 10, color: t.label, marginBottom: 6 }}>测量时间</div>
              <div style={{ fontSize: 12, fontWeight: 400, color: t.value, fontVariantNumeric: 'tabular-nums', lineHeight: 1.35 }}>{measuredAt}</div>
            </div>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 10, color: t.label, marginBottom: 6 }}>用时</div>
              <div style={{ fontSize: 12, fontWeight: 400, color: t.value }}>{formatHeartDuration(d)}</div>
            </div>
          </div>
        </div>

        {wavePoints && (
          <div>
            <svg width="100%" height={44} viewBox="0 0 320 44" preserveAspectRatio="none" style={{ display: 'block' }}>
              <polyline
                fill="none"
                stroke={t.wave}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                points={wavePoints}
              />
            </svg>
          </div>
        )}
      </div>

      {abnormal && (
        <div style={{ marginTop: 12, marginBottom: 2, fontSize: 11, fontWeight: 400, color: t.warnText, lineHeight: 1.5 }}>
          本次胎心率超出正常范围，可稍作休息后重新测量
        </div>
      )}

      {entry.note && (
        <div style={{ marginTop: abnormal ? 8 : 10, marginBottom: 4, fontSize: 12, color: '#888', lineHeight: 1.45 }}>{entry.note}</div>
      )}
    </div>
  )

  return (
    <div
      style={{
        background: '#fff',
        borderRadius: 16,
        border: `0.5px solid ${t.border}`,
        marginBottom: wrapMb,
        overflow: 'hidden',
      }}
    >
      {onContentClick ? (
        <div
          role="button"
          tabIndex={0}
          onClick={() => onContentClick()}
          onKeyDown={e => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              onContentClick()
            }
          }}
          style={{ cursor: 'pointer', outline: 'none' }}
        >
          {main}
        </div>
      ) : (
        main
      )}
      <CardFoot tag="测胎心" tagColor={t.footTag} tagBg={t.footBg} tagBorder={t.footBorder} entry={entry} onTagClick={onTagClick} />
    </div>
  )
}
