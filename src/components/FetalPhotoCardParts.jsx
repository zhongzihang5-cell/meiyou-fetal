import { formatDate } from '../lib/fetalFormat.js'

/**
 * 时间轴照片卡底部：标签 + 元信息 + 赞/评论
 * @param {() => void} [onTagClick] 点击标签（如进入详情）
 */
export function CardFoot({ tag, tagColor, tagBg, tagBorder, entry, onTagClick }) {
  const t = entry.time ? ` ${entry.time}` : ''
  const lock = entry.isPrivate ? '  🔒 仅自己可见' : ''
  const metaText = `${entry.author || '妈妈'}  ${formatDate(entry.date)}${t}${lock}`
  return (
    <div style={{ marginTop: 8, paddingTop: 8 }}>
      <div style={{ padding: '0 14px 8px' }}>
        <span
          onClick={e => {
            e.stopPropagation()
            onTagClick?.()
          }}
          style={{
            fontSize: 11,
            fontWeight: 500,
            color: tagColor,
            background: tagBg,
            borderRadius: 20,
            padding: '3px 10px',
            border: tagBorder ? `0.5px solid ${tagBorder}` : '0.5px solid transparent',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 3,
          }}
        >
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
        <div
          style={{ display: 'flex', gap: 14, flexShrink: 0, alignItems: 'center' }}
          onClick={e => e.stopPropagation()}
        >
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

/** 与胎宝宝时间轴 PhotoCard 一致的图片区（占位 / 背景图） */
export function PhotoRecordImageBlock({ entry }) {
  const isBelly = entry.subtype === 'belly'
  return (
    <div
      style={{
        height: 130,
        background: entry.imageUrl
          ? `#E8E8E8 url(${entry.imageUrl}) center/cover no-repeat`
          : (entry.color || '#E8E8E8'),
        position: 'relative',
      }}
    >
      {!entry.imageUrl && (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" opacity="0.3">
            {isBelly ? (
              <><ellipse cx="20" cy="18" rx="10" ry="12" fill="#fff" /><ellipse cx="20" cy="32" rx="14" ry="10" fill="#fff" /></>
            ) : (
              <><rect x="4" y="6" width="32" height="26" rx="3" fill="#fff" /><path d="M8 24 L13 18 L18 22 L24 14 L32 20" stroke="#DDD" strokeWidth="2" fill="none" strokeLinecap="round" /></>
            )}
          </svg>
        </div>
      )}
      {entry.isNew && (
        <div style={{ position: 'absolute', top: 8, right: 8, background: 'rgba(232,96,138,0.9)', color: '#fff', fontSize: 10, fontWeight: 600, borderRadius: 6, padding: '2px 7px' }}>
          新上传
        </div>
      )}
    </div>
  )
}
