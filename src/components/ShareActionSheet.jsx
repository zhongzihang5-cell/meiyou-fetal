const DEFAULT_FOOTER_ACTIONS = [
  { label: '编辑', emoji: '✏️' },
  { label: '修改可见范围', emoji: '👥' },
]

/**
 * 详情页右上角「···」：分享到 + 底部两个操作（默认同大肚照详情；可传入 footerActions 覆盖）
 */
export default function ShareActionSheet({ onClose, footerActions = DEFAULT_FOOTER_ACTIONS }) {
  const shares = [
    { label: '微信朋友圈', bg: '#07C160', icon: '◎' },
    { label: '微信', bg: '#07C160', icon: '💬' },
    { label: '抖音', bg: '#000', icon: '♪' },
    { label: '小红书', bg: '#FF2442', icon: '书' },
    { label: '微博', bg: '#E6162D', icon: 'W' },
  ]

  return (
    <div
      role="presentation"
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 300,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
      }}
      onClick={onClose}
    >
      <div style={{ flex: 1, background: 'rgba(0,0,0,0.45)' }} />
      <div
        role="dialog"
        aria-modal="true"
        style={{
          background: '#fff',
          borderRadius: '16px 16px 0 0',
          padding: '14px 12px 10px',
          maxHeight: '78%',
        }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ fontSize: 12, color: '#AAA', textAlign: 'center', marginBottom: 14 }}>分享到</div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: 4,
            padding: '0 4px 16px',
            borderBottom: '0.5px solid #EEE',
          }}
        >
          {shares.map(s => (
            <button
              key={s.label}
              type="button"
              style={{
                border: 'none',
                background: 'none',
                padding: '4px 2px',
                cursor: 'pointer',
                fontFamily: 'inherit',
                flex: '1 1 0',
                minWidth: 0,
              }}
            >
              <div
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: '50%',
                  background: s.bg,
                  margin: '0 auto 6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontSize: 16,
                  fontWeight: 700,
                }}
              >
                {s.icon}
              </div>
              <div style={{ fontSize: 10, color: '#666', lineHeight: 1.25 }}>{s.label}</div>
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-around', padding: '16px 20px 12px', gap: 24 }}>
          {footerActions.map(a => (
            <SheetIconBtn key={a.label} label={a.label} emoji={a.emoji} />
          ))}
        </div>

        <button
          type="button"
          onClick={onClose}
          style={{
            width: '100%',
            border: 'none',
            background: '#F5F5F7',
            borderRadius: 12,
            padding: '13px',
            fontSize: 16,
            fontWeight: 500,
            color: '#333',
            cursor: 'pointer',
            fontFamily: 'inherit',
            marginTop: 8,
          }}
        >
          取消
        </button>
      </div>
    </div>
  )
}

function SheetIconBtn({ label, emoji }) {
  return (
    <button
      type="button"
      style={{
        border: 'none',
        background: 'none',
        cursor: 'pointer',
        fontFamily: 'inherit',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
        flex: 1,
      }}
    >
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: '50%',
          background: '#F0F0F2',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 22,
        }}
      >
        {emoji}
      </div>
      <span style={{ fontSize: 11, color: '#555' }}>{label}</span>
    </button>
  )
}
