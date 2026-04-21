import { useState } from 'react'
import { StatusBar } from '../components/Layout.jsx'
import { PHONE_SHELL_MIN_HEIGHT } from '../lib/phoneShell.js'

const GRAD =
  'linear-gradient(180deg, #FF5C8D 0%, #FF7BA3 45%, #FF9EB8 100%)'

function NavButton({ children, onClick, active }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        border: 'none',
        background: 'none',
        cursor: 'pointer',
        fontFamily: 'inherit',
        padding: '4px 8px',
        fontSize: 16,
        fontWeight: active ? 700 : 500,
        color: active ? '#fff' : 'rgba(255,255,255,0.72)',
        position: 'relative',
      }}
    >
      {children}
      {active && (
        <span
          style={{
            position: 'absolute',
            left: '50%',
            bottom: -4,
            transform: 'translateX(-50%)',
            width: 22,
            height: 3,
            borderRadius: 2,
            background: '#fff',
          }}
        />
      )}
    </button>
  )
}

/** 数胎动 / 测胎心 全屏页（标签进入，顶栏双 Tab 切换） */
export default function FetalMonitorDetailPage({ initialTab = 'movement', onBack }) {
  const [tab, setTab] = useState(initialTab === 'heart' ? 'heart' : 'movement')

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

      <div style={{ background: GRAD, paddingBottom: 10, flexShrink: 0 }}>
        <div
          style={{
            height: 48,
            display: 'flex',
            alignItems: 'center',
            padding: '0 4px 0 2px',
            gap: 4,
          }}
        >
          <button
            type="button"
            aria-label="返回"
            onClick={onBack}
            style={{
              width: 40,
              height: 40,
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M15 18l-6-6 6-6" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, minWidth: 0 }}>
            <NavButton active={tab === 'movement'} onClick={() => setTab('movement')}>
              数胎动
            </NavButton>
            <NavButton active={tab === 'heart'} onClick={() => setTab('heart')}>
              测胎心
            </NavButton>
          </div>
          <button
            type="button"
            style={{
              flexShrink: 0,
              border: 'none',
              background: 'none',
              color: '#fff',
              fontSize: 14,
              fontWeight: 500,
              cursor: 'pointer',
              fontFamily: 'inherit',
              padding: '8px 6px',
            }}
          >
            全部记录
          </button>
        </div>
      </div>

      <div className="scroll-area" style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: '12px 12px 24px' }}>
        {tab === 'movement' ? <MovementPanel /> : <HeartPanel />}
      </div>
    </div>
  )
}

function MovementPanel() {
  return (
    <>
      <div
        style={{
          background: '#fff',
          borderRadius: 16,
          padding: 0,
          overflow: 'hidden',
          boxShadow: '0 4px 20px rgba(255,92,141,0.08)',
          marginBottom: 12,
        }}
      >
        <div
          style={{
            background: '#FFF0F5',
            padding: '10px 12px',
            display: 'flex',
            alignItems: 'flex-start',
            gap: 8,
            fontSize: 12,
            color: '#B06080',
            lineHeight: 1.45,
          }}
        >
          <span style={{ fontSize: 14, flexShrink: 0 }} aria-hidden>
            📣
          </span>
          <span>
            每天早、中、晚数一数胎动吧 / 关注宝宝在子宫内的健康状态
          </span>
        </div>
        <div style={{ padding: '18px 16px 20px' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              textAlign: 'center',
              marginBottom: 22,
            }}
          >
            <div>
              <div style={{ fontSize: 11, color: '#888', marginBottom: 6 }}>计时</div>
              <div style={{ fontSize: 20, fontWeight: 600, color: '#1A1A1A', fontVariantNumeric: 'tabular-nums' }}>60:00</div>
            </div>
            <div>
              <div style={{ fontSize: 11, color: '#888', marginBottom: 6 }}>实际点击</div>
              <div style={{ fontSize: 20, fontWeight: 600, color: '#FF5C8D', fontVariantNumeric: 'tabular-nums' }}>0</div>
            </div>
            <div>
              <div style={{ fontSize: 11, color: '#888', marginBottom: 6 }}>有效次数</div>
              <div style={{ fontSize: 20, fontWeight: 600, color: '#FF5C8D', fontVariantNumeric: 'tabular-nums' }}>0</div>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button
              type="button"
              style={{
                width: 112,
                height: 112,
                borderRadius: '50%',
                border: 'none',
                background: 'linear-gradient(145deg, #FF5C8D, #FF3D7A)',
                color: '#fff',
                fontSize: 18,
                fontWeight: 700,
                cursor: 'pointer',
                fontFamily: 'inherit',
                boxShadow: '0 10px 28px rgba(255,60,130,0.45)',
              }}
            >
              开始
            </button>
          </div>
        </div>
      </div>

      <button
        type="button"
        style={{
          width: '100%',
          background: '#fff',
          border: '0.5px solid #EEE',
          borderRadius: 14,
          padding: '12px 14px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: 13,
          color: '#555',
          cursor: 'pointer',
          fontFamily: 'inherit',
          marginBottom: 12,
        }}
      >
        <span>数胎动小组件，超好用，快试试</span>
        <span style={{ color: '#CCC' }}>›</span>
      </button>

      <div
        style={{
          background: '#fff',
          borderRadius: 16,
          padding: '16px 14px 22px',
          marginBottom: 12,
          boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
        }}
      >
        <div style={{ fontSize: 15, fontWeight: 700, color: '#1A1A1A', marginBottom: 18 }}>今日胎动情况</div>
        <div style={{ textAlign: 'center', padding: '8px 0 12px' }}>
          <div style={{ fontSize: 44, marginBottom: 8 }} aria-hidden>
            📋
          </div>
          <div style={{ fontSize: 13, color: '#AAA' }}>今天还没有胎动记录</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <MiniLinkCard title="如何数胎动" tint="#FFF5F8" />
        <MiniLinkCard title="胎动范围参考" tint="#F5F0FF" />
      </div>
    </>
  )
}

function MiniLinkCard({ title, tint }) {
  return (
    <button
      type="button"
      style={{
        border: 'none',
        borderRadius: 14,
        background: '#fff',
        padding: '14px 10px',
        textAlign: 'left',
        cursor: 'pointer',
        fontFamily: 'inherit',
        minHeight: 72,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          right: -4,
          bottom: -4,
          width: 48,
          height: 48,
          borderRadius: '50%',
          background: tint,
          opacity: 0.9,
        }}
      />
      <span style={{ fontSize: 12, fontWeight: 600, color: '#333', position: 'relative', zIndex: 1 }}>{title}</span>
      <span style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', color: '#CCC', fontSize: 12 }}>›</span>
    </button>
  )
}

function HeartPanel() {
  const w = 320
  const h = 132
  const yFor = v => h - ((v - 70) / (200 - 70)) * (h - 16) - 8
  const y110 = yFor(110)
  const y160 = yFor(160)
  const gridYs = [80, 100, 120, 140, 160, 180, 200]

  return (
    <>
      <div
        style={{
          background: '#fff',
          borderRadius: '16px 16px 0 0',
          marginTop: -6,
          padding: '16px 14px 20px',
          boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
        }}
      >
        <div style={{ fontSize: 16, fontWeight: 700, color: '#1A1A1A', marginBottom: 14 }}>测量准备</div>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 10 }}>
          <svg width={200} height={140} viewBox="0 0 200 140" aria-hidden>
            <ellipse cx="100" cy="72" rx="52" ry="58" fill="none" stroke="#CCC" strokeWidth="1.5" />
            <ellipse cx="100" cy="68" rx="28" ry="32" fill="none" stroke="#DDD" strokeWidth="1" />
            <circle cx="88" cy="62" r="3" fill="#FF5C8D" />
            <circle cx="100" cy="58" r="3" fill="#FF5C8D" />
            <circle cx="112" cy="62" r="3" fill="#FF5C8D" />
            <circle cx="94" cy="72" r="3" fill="#FF5C8D" />
            <circle cx="106" cy="72" r="3" fill="#FF5C8D" />
          </svg>
        </div>
        <div style={{ fontSize: 12, color: '#888', textAlign: 'center', marginBottom: 6 }}>孕 32–40 周胎心图示</div>
        <p style={{ fontSize: 12, color: '#666', lineHeight: 1.55, textAlign: 'center', padding: '0 4px' }}>
          将胎心仪放在图示位置按压探测，不要频繁移动
        </p>

        <div style={{ marginTop: 18 }}>
          <svg width="100%" height={h} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="xMidYMid meet" style={{ display: 'block' }}>
            <rect x={36} y={8} width={w - 44} height={h - 20} fill="#FAFAFA" rx={4} />
            <rect x={36} y={Math.min(y110, y160)} width={w - 44} height={Math.abs(y160 - y110)} fill="rgba(100,180,255,0.18)" />
            {gridYs.map(v => {
              const y = yFor(v)
              return (
                <g key={v}>
                  <line x1={36} y1={y} x2={w - 8} y2={y} stroke="#EAEAEA" strokeWidth={0.5} />
                  <text x={4} y={y + 3} fontSize={9} fill="#AAA">
                    {v}
                  </text>
                </g>
              )
            })}
          </svg>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 6 }}>
            <span style={{ width: 8, height: 8, borderRadius: 2, background: 'rgba(100,180,255,0.5)' }} />
            <span style={{ fontSize: 11, color: '#888' }}>正常范围</span>
          </div>
        </div>
      </div>

      <div style={{ padding: '16px 0 8px' }}>
        <button
          type="button"
          style={{
            width: '100%',
            border: 'none',
            borderRadius: 24,
            background: 'linear-gradient(145deg, #FF5C8D, #FF3D7A)',
            color: '#fff',
            fontSize: 16,
            fontWeight: 600,
            padding: '14px',
            cursor: 'pointer',
            fontFamily: 'inherit',
            boxShadow: '0 8px 22px rgba(255,60,130,0.35)',
          }}
        >
          连接设备
        </button>
        <button
          type="button"
          style={{
            width: '100%',
            border: 'none',
            background: 'none',
            color: '#888',
            fontSize: 13,
            marginTop: 12,
            cursor: 'pointer',
            fontFamily: 'inherit',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 4,
          }}
        >
          <span aria-hidden>🛍</span> 购买美柚胎心仪 ›
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 8 }}>
        <MiniLinkCard title="如何测胎心" tint="#FFF0F5" />
        <MiniLinkCard title="常见问题" tint="#F0F4FF" />
      </div>
    </>
  )
}
