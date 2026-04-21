import { useState } from 'react'
import { StatusBar } from '../components/Layout.jsx'
import { PHONE_SHELL_MIN_HEIGHT } from '../lib/phoneShell.js'
import { CURRENT_WEEK } from '../data/timeline.js'
import {
  formatFetalWeightGramsToJin,
  getWeightEstimateTheme,
  getWeightMetricsDisplay,
} from '../lib/weightEstimateCard.js'

const GRAD = 'linear-gradient(180deg, #FFB3C8 0%, #FFE8EE 55%, #F5F5F7 100%)'

const DEMO = {
  grams: 3474,
  percentile: 53.3,
  bpd: 90,
  hc: 350,
  ac: 350,
  fl: 70,
  pctRow: [23.7, 89.7, 44.2, 26],
}

function pickData(entry) {
  const d = entry?.data || {}
  const g = Number(d.weight)
  const grams = Number.isFinite(g) && g > 0 ? g : DEMO.grams
  const p = Number(d.percentile)
  const pct = Number.isFinite(p) ? p : DEMO.percentile
  const metrics = getWeightMetricsDisplay(d)
  return { grams, pct, metrics, week: entry?.week ?? CURRENT_WEEK }
}

/** 胎儿估重：标签进入的示意仪表盘 */
export default function WeightEstimateDetailPage({ entry, onBack }) {
  const { grams, pct, metrics, week: weekFromEntry } = pickData(entry)
  const jinStr = formatFetalWeightGramsToJin(grams)
  const jinDisplay = jinStr != null ? parseFloat(jinStr).toFixed(2) : '—'
  const week = weekFromEntry
  const t = getWeightEstimateTheme()
  const [curveTab, setCurveTab] = useState('weight')

  const tabs = [
    { id: 'weight', label: '估重' },
    { id: 'bpd', label: '双顶径' },
    { id: 'hc', label: '头围' },
    { id: 'ac', label: '腹围' },
    { id: 'fl', label: '股骨长' },
  ]

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

      <div style={{ background: GRAD, paddingBottom: 8, flexShrink: 0 }}>
        <div
          style={{
            height: 48,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            padding: '0 8px',
          }}
        >
          <button
            type="button"
            aria-label="返回"
            onClick={onBack}
            style={{
              position: 'absolute',
              left: 2,
              width: 40,
              height: 40,
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M15 18l-6-6 6-6" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <span style={{ fontSize: 17, fontWeight: 600, color: '#1A1A1A' }}>胎儿估重</span>
          <button
            type="button"
            style={{
              position: 'absolute',
              right: 8,
              border: 'none',
              background: 'none',
              color: '#E8608A',
              fontSize: 14,
              fontWeight: 500,
              cursor: 'pointer',
              fontFamily: 'inherit',
            }}
          >
            所有记录
          </button>
        </div>
      </div>

      <div className="scroll-area" style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: '12px 12px 16px' }}>
        <div
          style={{
            background: '#fff',
            borderRadius: 16,
            padding: '18px 14px 14px',
            marginBottom: 12,
            boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: 12 }}>
            <span
              style={{
                display: 'inline-block',
                fontSize: 12,
                color: '#888',
                background: '#F2F2F2',
                padding: '4px 12px',
                borderRadius: 12,
              }}
            >
              孕{week}周
            </span>
          </div>
          <div
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: '#1A1A1A',
              textAlign: 'center',
              marginBottom: 10,
              lineHeight: 1.35,
            }}
          >
            约{grams}克≈{jinDisplay}斤
          </div>
          <p style={{ fontSize: 13, color: '#555', textAlign: 'center', marginBottom: 6, lineHeight: 1.5 }}>
            胎宝宝体重 <strong style={{ color: '#E8608A' }}>正常</strong>，百分位数{' '}
            <strong style={{ color: '#E8608A' }}>{pct.toFixed(1)}%</strong>
            <span style={{ display: 'inline-block', marginLeft: 4, verticalAlign: 'middle' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-label="说明">
                <circle cx="12" cy="12" r="9" stroke="#CCC" strokeWidth="1.2" />
                <path d="M12 10v6M12 7h.01" stroke="#AAA" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </span>
          </p>
          <p style={{ fontSize: 12, color: '#AAA', textAlign: 'center', marginBottom: 16 }}>恭喜啦！你们都很棒棒哦~</p>

          <div style={{ background: '#F5F5F5', borderRadius: 10, padding: '10px 8px', marginBottom: 10 }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                textAlign: 'center',
                fontSize: 10,
                color: '#888',
                marginBottom: 8,
              }}
            >
              <span>双顶径</span>
              <span>头围</span>
              <span>腹围</span>
              <span>股骨长</span>
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                textAlign: 'center',
                fontSize: 12,
                fontWeight: 600,
                color: '#333',
                marginBottom: 8,
              }}
            >
              {metrics.map(m => (
                <span key={m.key} style={{ fontVariantNumeric: 'tabular-nums' }}>
                  {m.value != null ? m.value : '—'}
                </span>
              ))}
            </div>
            <div style={{ fontSize: 10, color: '#AAA', textAlign: 'center', marginBottom: 4 }}>测量值 mm</div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                textAlign: 'center',
                fontSize: 11,
                color: '#888',
              }}
            >
              {DEMO.pctRow.map((p, i) => (
                <span key={i}>{p}%</span>
              ))}
            </div>
            <div style={{ fontSize: 10, color: '#AAA', textAlign: 'center', marginTop: 4 }}>百分位数</div>
          </div>

          <p style={{ fontSize: 10, color: '#B0B0B0', lineHeight: 1.45 }}>
            以上结果由 Hadlock III 公式与 NICHD 亚裔人群数据计算得出，仅供参考
          </p>
        </div>

        <div
          style={{
            background: '#fff',
            borderRadius: 16,
            padding: '14px 12px 16px',
            marginBottom: 12,
            boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
            <span style={{ color: '#E8608A', fontSize: 16 }} aria-hidden>
              📈
            </span>
            <span style={{ fontSize: 15, fontWeight: 700, color: '#1A1A1A' }}>胎宝宝生长曲线</span>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
            {tabs.map(tab => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setCurveTab(tab.id)}
                style={{
                  border: 'none',
                  borderRadius: 14,
                  padding: '5px 10px',
                  fontSize: 11,
                  fontFamily: 'inherit',
                  cursor: 'pointer',
                  background: curveTab === tab.id ? '#FFE0EA' : '#F5F5F5',
                  color: curveTab === tab.id ? '#E8608A' : '#888',
                  fontWeight: curveTab === tab.id ? 600 : 400,
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <GrowthCurveSvg grams={grams} week={week} accent={t.footprint} />
        </div>
      </div>

      <div
        style={{
          flexShrink: 0,
          padding: '10px 12px 22px',
          background: '#F5F5F7',
          borderTop: '0.5px solid #EEE',
        }}
      >
        <button
          type="button"
          style={{
            width: '100%',
            border: 'none',
            borderRadius: 24,
            background: 'linear-gradient(145deg, #FF5C8D, #E8608A)',
            color: '#fff',
            fontSize: 16,
            fontWeight: 600,
            padding: '14px',
            cursor: 'pointer',
            fontFamily: 'inherit',
            boxShadow: '0 8px 22px rgba(232,96,138,0.35)',
          }}
        >
          添加估重记录
        </button>
      </div>
    </div>
  )
}

function GrowthCurveSvg({ grams, week, accent }) {
  const w = 320
  const h = 140
  const pad = 28
  const gw = w - pad - 12
  const gh = h - 24
  const x0 = pad
  const y0 = 12
  const ymin = 2000
  const ymax = 5000
  const wx0 = 20
  const wx1 = 40
  const yFor = g => y0 + gh - ((g - ymin) / (ymax - ymin)) * gh

  const bandLow = yFor(3200)
  const bandHigh = yFor(4200)
  const lineY = yFor(grams)
  const dotX = x0 + ((week - wx0) / (wx1 - wx0)) * gw * 0.85

  return (
    <svg width="100%" height={h} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="xMidYMid meet" style={{ display: 'block' }}>
      <text x={4} y={18} fontSize={9} fill="#AAA">
        {ymax}
      </text>
      <text x={4} y={h / 2 + 4} fontSize={9} fill="#AAA">
        3500
      </text>
      <text x={4} y={h - 8} fontSize={9} fill="#AAA">
        {ymin}
      </text>
      <rect x={x0} y={bandHigh} width={gw} height={bandLow - bandHigh} fill="rgba(232,96,138,0.12)" rx={4} />
      <polyline
        fill="none"
        stroke={accent}
        strokeWidth={2}
        strokeLinecap="round"
        points={`${x0 + 8},${yFor(3800)} ${x0 + gw * 0.35},${yFor(3600)} ${x0 + gw * 0.55},${yFor(3400)} ${dotX},${lineY}`}
      />
      <circle cx={dotX} cy={lineY} r={5} fill="#E8608A" stroke="#fff" strokeWidth={2} />
      <text x={x0} y={h - 2} fontSize={9} fill="#AAA">
        {wx0}周
      </text>
      <text x={x0 + gw - 22} y={h - 2} fontSize={9} fill="#AAA">
        {wx1}周
      </text>
    </svg>
  )
}
