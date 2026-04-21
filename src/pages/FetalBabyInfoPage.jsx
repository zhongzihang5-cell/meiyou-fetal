import { StatusBar } from '../components/Layout.jsx'
import { IconArrow, IconFetalAvatar } from '../components/Icons.jsx'
import { DAYS_UNTIL_DUE } from '../data/timeline.js'

const NICKNAME_DEFAULT = '胎宝宝'
const RELATION_LABEL = '我是宝宝的'
const RELATION_VALUE = '妈妈'

/** 与演示机一致：保证短内容页也有完整手机高度 */
const PHONE_SHELL_MIN_HEIGHT = 820

function formatDueDateFromDaysUntil() {
  const d = new Date()
  d.setDate(d.getDate() + DAYS_UNTIL_DUE)
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`
}

function InfoRow({ label, value, onClick, isLast }) {
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
        padding: '15px 16px',
        border: 'none',
        borderBottom: isLast ? 'none' : '0.5px solid #F2F2F2',
        background: '#fff',
        cursor: 'pointer',
        fontFamily: 'inherit',
        textAlign: 'left',
      }}
    >
      <span style={{ fontSize: 15, color: '#1A1A1A', flexShrink: 0 }}>{label}</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, minWidth: 0 }}>
        <span style={{ fontSize: 15, color: '#AAA', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{value}</span>
        <IconArrow />
      </div>
    </button>
  )
}

/**
 * 胎宝宝资料页（从胎宝宝 tab Hero 孕周行进入）
 */
export default function FetalBabyInfoPage({ onBack }) {
  const dueLabel = formatDueDateFromDaysUntil()
  const bgUrl = `url(${import.meta.env.BASE_URL}fetal-header-bg.png)`

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

      {/* 顶栏 */}
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
        <span style={{ fontSize: 17, fontWeight: 600, color: '#1A1A1A' }}>胎宝宝信息</span>
      </div>

      <div
        className="scroll-area"
        style={{
          flex: 1,
          minHeight: 0,
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* 圆角头图横幅：头像在左侧垂直居中 + 右上换背景（对齐参考稿） */}
        <div style={{ padding: '14px 14px 0', flexShrink: 0 }}>
          <div
            style={{
              position: 'relative',
              borderRadius: 18,
              overflow: 'hidden',
              minHeight: 212,
              backgroundColor: '#D8C4BC',
              backgroundImage: bgUrl,
              backgroundSize: 'cover',
              backgroundPosition: 'center 32%',
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(105deg, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.05) 45%, rgba(0,0,0,0.22) 100%)',
                pointerEvents: 'none',
              }}
            />
            <button
              type="button"
              style={{
                position: 'absolute',
                top: 14,
                right: 14,
                zIndex: 2,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 5,
                padding: '6px 12px',
                borderRadius: 20,
                border: 'none',
                background: 'rgba(0,0,0,0.42)',
                color: '#fff',
                fontSize: 12,
                fontWeight: 500,
                cursor: 'pointer',
                fontFamily: 'inherit',
                backdropFilter: 'blur(8px)',
                boxShadow: '0 1px 4px rgba(0,0,0,0.15)',
              }}
            >
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden>
                <rect x="1.5" y="3" width="13" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.25" />
                <circle cx="8" cy="7.5" r="2.2" stroke="currentColor" strokeWidth="1.25" />
              </svg>
              换背景
            </button>

            <div
              style={{
                position: 'relative',
                zIndex: 1,
                minHeight: 212,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                padding: '20px 18px',
              }}
            >
              <div style={{ position: 'relative', width: 88, height: 88, flexShrink: 0 }}>
                <div
                  style={{
                    width: 88,
                    height: 88,
                    borderRadius: '50%',
                    background: '#fff',
                    border: '3px solid rgba(255,255,255,0.95)',
                    boxShadow: '0 4px 18px rgba(0,0,0,0.18)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <div style={{ transform: 'scale(2)', transformOrigin: 'center' }}>
                    <IconFetalAvatar />
                  </div>
                </div>
                <button
                  type="button"
                  aria-label="更换头像"
                  style={{
                    position: 'absolute',
                    right: 0,
                    bottom: 0,
                    width: 28,
                    height: 28,
                    borderRadius: '50%',
                    border: '3px solid #fff',
                    background: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    padding: 0,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
                  }}
                >
                  <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden>
                    <rect x="2" y="4" width="12" height="9" rx="1.2" stroke="#888" strokeWidth="1.25" />
                    <circle cx="8" cy="7.5" r="1.8" stroke="#888" strokeWidth="1.25" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 信息列表 */}
        <div style={{ margin: '18px 14px 32px', borderRadius: 14, overflow: 'hidden', border: '0.5px solid #E8E8E8', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
          <InfoRow label="宝宝小名" value={NICKNAME_DEFAULT} onClick={() => {}} />
          <InfoRow label="设置预产期" value={dueLabel} onClick={() => {}} />
          <InfoRow label={RELATION_LABEL} value={RELATION_VALUE} onClick={() => {}} isLast />
        </div>

        {/* 底部留白，避免贴底过紧 */}
        <div style={{ flex: 1, minHeight: 24 }} />
      </div>
    </div>
  )
}
