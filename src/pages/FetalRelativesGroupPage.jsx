import { StatusBar } from '../components/Layout.jsx'
import { IconFetalAvatar } from '../components/Icons.jsx'
import { PHONE_SHELL_MIN_HEIGHT } from '../lib/phoneShell.js'

/** 与宝宝个人中心「宝宝号」展示一致 */
const DEMO_BABY_ID = '1616870670'

const INVITE_LABELS = [
  '姥姥',
  '外婆',
  '奶奶',
  '外公',
  '姥爷',
  '爷爷',
  '阿姨',
  '姨姨',
  '姑姑',
  '干妈',
  '舅舅',
  '叔叔',
]

/**
 * 亲友团（从胎宝宝 tab「邀请准爸爸」进入）
 * 顶部宝宝模块点击 → onOpenPersonalCenter（宝宝个人中心）
 */
export default function FetalRelativesGroupPage({ onBack, onOpenPersonalCenter }) {
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
        <span style={{ fontSize: 17, fontWeight: 600, color: '#1A1A1A' }}>亲友团</span>
        <button
          type="button"
          style={{
            position: 'absolute',
            right: 10,
            top: '50%',
            transform: 'translateY(-50%)',
            border: 'none',
            background: 'none',
            fontSize: 14,
            color: '#666',
            cursor: 'pointer',
            fontFamily: 'inherit',
            padding: '6px 4px',
          }}
        >
          常见问题
        </button>
      </div>

      <div className="scroll-area" style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: '12px 12px 100px' }}>
        <button
          type="button"
          onClick={onOpenPersonalCenter}
          style={{
            width: '100%',
            border: '0.5px solid #EEE',
            background: '#fff',
            borderRadius: 14,
            padding: '14px 14px',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            cursor: 'pointer',
            fontFamily: 'inherit',
            textAlign: 'left',
            boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
            marginBottom: 10,
          }}
        >
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: '50%',
              background: '#FFF5F8',
              border: '2px solid #FCE4EC',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <div style={{ transform: 'scale(1.05)' }}>
              <IconFetalAvatar />
            </div>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: '#1A1A1A' }}>胎宝宝</div>
            <div style={{ fontSize: 12, color: '#999', marginTop: 4, fontVariantNumeric: 'tabular-nums' }}>宝宝号：{DEMO_BABY_ID}</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0, color: '#CCC' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
              <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.4" />
              <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.4" />
              <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.4" />
              <rect x="14" y="14" width="3" height="3" fill="currentColor" />
              <rect x="18" y="14" width="3" height="3" fill="currentColor" />
              <rect x="14" y="18" width="3" height="3" fill="currentColor" />
              <rect x="18" y="18" width="3" height="3" fill="currentColor" />
            </svg>
            <span style={{ fontSize: 18, color: '#CCC' }}>›</span>
          </div>
        </button>

        <div
          style={{
            background: '#fff',
            borderRadius: 14,
            border: '0.5px solid #EEE',
            overflow: 'hidden',
            marginBottom: 10,
          }}
        >
          <div
            style={{
              background: '#FFF5F8',
              padding: '10px 12px',
              fontSize: 12,
              color: '#C04070',
              lineHeight: 1.45,
              textAlign: 'center',
            }}
          >
            记录合体的时光，亲友共同见证
          </div>

          <div style={{ padding: '16px 12px 12px' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'flex-start',
                width: '100%',
                paddingLeft: 4,
                paddingRight: 4,
                marginBottom: 18,
              }}
            >
              <MemberCol
                label="妈妈"
                sub1="来过 83 次"
                sub2="刚刚"
                avatar={
                  <div
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: '50%',
                      background: '#FFE8CC',
                      border: '2px solid #fff',
                      boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 30,
                    }}
                  >
                    🥕
                  </div>
                }
              />
              <MemberCol
                label="爸爸"
                sub1="来过 2 次"
                sub2="18 分钟前"
                avatar={
                  <div
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: '50%',
                      background: 'linear-gradient(145deg, #E8E4FF, #D4E8FF)',
                      border: '2px solid #fff',
                      boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 26,
                    }}
                  >
                    👨
                  </div>
                }
              />
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 8,
              }}
            >
              {INVITE_LABELS.map(label => (
                <button
                  key={label}
                  type="button"
                  style={{
                    border: '0.5px solid #EAEAEA',
                    background: '#F5F5F7',
                    borderRadius: 10,
                    padding: '12px 10px',
                    fontSize: 14,
                    color: '#555',
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 4,
                  }}
                >
                  <span style={{ color: '#E8608A', fontSize: 16 }}>+</span>
                  {label}
                </button>
              ))}
              <button
                type="button"
                style={{
                  gridColumn: '1 / -1',
                  border: '0.5px solid #EAEAEA',
                  background: '#F5F5F7',
                  borderRadius: 10,
                  padding: '12px 10px',
                  fontSize: 14,
                  color: '#555',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 4,
                }}
              >
                <span style={{ color: '#E8608A', fontSize: 16 }}>+</span>
                其他
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          padding: '10px 12px 22px',
          background: 'linear-gradient(180deg, transparent, #F5F5F7 30%)',
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            pointerEvents: 'auto',
            background: '#FFF0F5',
            borderRadius: 10,
            padding: '10px 12px',
            fontSize: 12,
            color: '#C04070',
            marginBottom: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 8,
            border: '0.5px solid #F4C0D1',
          }}
        >
          <span style={{ flex: 1, lineHeight: 1.4 }}>一键为胎宝宝同步亲友团</span>
          <span style={{ color: '#E8608A', flexShrink: 0 }}>›</span>
        </div>
        <button
          type="button"
          style={{
            pointerEvents: 'auto',
            width: '100%',
            border: 'none',
            borderRadius: 24,
            background: 'linear-gradient(145deg, #FF6B9D, #E8608A)',
            color: '#fff',
            fontSize: 16,
            fontWeight: 600,
            padding: '14px',
            cursor: 'pointer',
            fontFamily: 'inherit',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            boxShadow: '0 8px 22px rgba(232,96,138,0.35)',
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M4 6.5C4 5.12 5.12 4 6.5 4h11C18.88 4 20 5.12 20 6.5v9c0 1.38-1.12 2.5-2.5 2.5H6.5C5.12 18 4 16.88 4 15.5v-9z"
              fill="#fff"
              fillOpacity="0.95"
            />
            <circle cx="9" cy="11" r="1.2" fill="#07C160" />
            <circle cx="12" cy="11" r="1.2" fill="#07C160" />
            <circle cx="15" cy="11" r="1.2" fill="#07C160" />
          </svg>
          邀请亲友
        </button>
      </div>
    </div>
  )
}

function MemberCol({ avatar, label, sub1, sub2 }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 0 }}>
      {avatar}
      <span style={{ fontSize: 14, fontWeight: 600, color: '#1A1A1A', marginTop: 8 }}>{label}</span>
      <span style={{ fontSize: 11, color: '#AAA', marginTop: 4 }}>{sub1}</span>
      <span style={{ fontSize: 11, color: '#AAA' }}>{sub2}</span>
    </div>
  )
}
