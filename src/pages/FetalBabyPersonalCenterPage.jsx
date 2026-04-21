import { StatusBar } from '../components/Layout.jsx'
import { IconArrow, IconFetalAvatar } from '../components/Icons.jsx'

const PHONE_MIN = 820

function BackHeader({ title, onBack }) {
  return (
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
  )
}

function ChevronRow({ icon, label, onClick, isLast, right }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 10,
        padding: '14px 16px',
        border: 'none',
        borderBottom: isLast ? 'none' : '0.5px solid #F0F0F0',
        background: '#fff',
        cursor: 'pointer',
        fontFamily: 'inherit',
        textAlign: 'left',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: icon ? 10 : 0, minWidth: 0 }}>
        {icon}
        <span style={{ fontSize: 15, color: '#1A1A1A' }}>{label}</span>
      </div>
      {right ?? <IconArrow />}
    </button>
  )
}

/** 胎宝宝 tab → 邀请准爸爸：宝宝个人中心 */
export default function FetalBabyPersonalCenterPage({ onBack }) {
  return (
    <div
      className="phone-shell"
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: PHONE_MIN,
        height: '100%',
        background: '#F5F5F7',
      }}
    >
      <StatusBar />
      <BackHeader title="宝宝个人中心" onBack={onBack} />

      <div className="scroll-area" style={{ flex: 1, minHeight: 0, overflowY: 'auto', paddingBottom: 28 }}>
        {/* 亲友可见 */}
        <div
          style={{
            margin: '12px 12px 0',
            background: '#fff',
            borderRadius: 14,
            padding: '14px 14px 16px',
            border: '0.5px solid #EEE',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 14 }}>
            <span style={{ fontSize: 14, color: '#333' }}>1位亲友可见</span>
            <span
              style={{
                width: 16,
                height: 16,
                borderRadius: '50%',
                border: '0.5px solid #CCC',
                color: '#AAA',
                fontSize: 11,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                lineHeight: 1,
              }}
              aria-hidden
            >
              i
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, minWidth: 0 }}>
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: '50%',
                  background: '#F5F5F5',
                  border: '2px solid #fff',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 6,
                }}
              >
                <div style={{ transform: 'scale(1.1)' }}>
                  <IconFetalAvatar />
                </div>
              </div>
              <span style={{ fontSize: 14, fontWeight: 600, color: '#1A1A1A' }}>妈妈</span>
              <span style={{ fontSize: 11, color: '#AAA', marginTop: 4 }}>来过 14 次</span>
              <span style={{ fontSize: 11, color: '#AAA' }}>刚刚</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, minWidth: 0 }}>
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: '50%',
                  border: '1.5px dashed #F4A0B8',
                  background: '#FFF5F8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 6,
                  color: '#E8608A',
                  fontSize: 26,
                  fontWeight: 300,
                  lineHeight: 1,
                }}
              >
                +
              </div>
              <span style={{ fontSize: 13, fontWeight: 600, color: '#E8608A', textAlign: 'center' }}>微信邀请准爸爸</span>
              <span style={{ fontSize: 11, color: '#E895A8', marginTop: 4, textAlign: 'center' }}>共同记录宝宝</span>
            </div>
          </div>
        </div>

        {/* 宝宝资料 / 二维码 / 宝宝号 */}
        <div
          style={{
            margin: '10px 12px 0',
            background: '#fff',
            borderRadius: 14,
            overflow: 'hidden',
            border: '0.5px solid #EEE',
          }}
        >
          <ChevronRow label="宝宝资料" onClick={() => {}} />
          <ChevronRow
            label="宝宝二维码"
            onClick={() => {}}
            right={
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden>
                  <rect x="1" y="1" width="5" height="5" stroke="#BBB" strokeWidth="1" />
                  <rect x="10" y="1" width="5" height="5" stroke="#BBB" strokeWidth="1" />
                  <rect x="1" y="10" width="5" height="5" stroke="#BBB" strokeWidth="1" />
                  <rect x="3" y="3" width="1" height="1" fill="#BBB" />
                  <rect x="12" y="3" width="1" height="1" fill="#BBB" />
                  <rect x="3" y="12" width="1" height="1" fill="#BBB" />
                </svg>
                <IconArrow />
              </div>
            }
          />
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '14px 16px',
              borderTop: '0.5px solid #F0F0F0',
            }}
          >
            <span style={{ fontSize: 15, color: '#1A1A1A' }}>宝宝号</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 14, color: '#AAA', fontVariantNumeric: 'tabular-nums' }}>1616870670</span>
              <button
                type="button"
                style={{
                  fontSize: 12,
                  color: '#666',
                  background: '#F5F5F7',
                  border: '0.5px solid #E8E8E8',
                  borderRadius: 12,
                  padding: '3px 10px',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                }}
              >
                复制
              </button>
            </div>
          </div>
        </div>

        {/* 功能列表 */}
        <div
          style={{
            margin: '10px 12px 0',
            background: '#fff',
            borderRadius: 14,
            overflow: 'hidden',
            border: '0.5px solid #EEE',
          }}
        >
          {[
            { label: '云相册', bg: '#E3F2FD', glyph: '☁' },
            { label: '大事记', bg: '#FFF3E0', glyph: '🚩' },
            { label: '产检时间表', bg: '#E8F5E9', glyph: '📅' },
            { label: '胎儿估重', bg: '#FCE4EC', glyph: '⚖' },
            { label: '大肚照', bg: '#FFF3E0', glyph: '♡' },
            { label: 'MV 制作', bg: '#F3E5F5', glyph: '▶' },
            { label: '四维预测长相', bg: '#FCE4EC', glyph: '👶' },
          ].map((item, i, arr) => (
            <ChevronRow
              key={item.label}
              label={item.label}
              onClick={() => {}}
              isLast={i === arr.length - 1}
              icon={
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    background: item.bg,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 16,
                    lineHeight: 1,
                  }}
                >
                  {item.glyph}
                </div>
              }
            />
          ))}
        </div>

        {/* 安全保障 */}
        <div style={{ margin: '10px 12px 0', background: '#fff', borderRadius: 14, overflow: 'hidden', border: '0.5px solid #EEE' }}>
          <ChevronRow label="安全保障" onClick={() => {}} isLast />
        </div>
      </div>
    </div>
  )
}
