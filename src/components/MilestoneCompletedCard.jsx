import { CardFoot } from './FetalPhotoCardParts.jsx'

/**
 * 胎宝宝时间轴「大事记」完成态卡片（发现宝宝 / 第一次胎心等）
 * @param {() => void} [onWhiteClick] 点击标题/备注等白色区域（非顶部色块、非底部标签与互动）
 * @param {boolean} [embedded] 嵌入详情页时去掉底部外边距
 */
export function MilestoneCompletedCard({ entry, onTagClick, onWhiteClick, embedded }) {
  const heroBg = entry.color || '#DDC8D8'
  const hasText = Boolean(entry.title || entry.note)
  return (
    <div
      style={{
        background: '#fff',
        borderRadius: 16,
        border: '0.5px solid #EBEBEB',
        overflow: 'hidden',
        marginBottom: embedded ? 0 : 12,
      }}
    >
      <div
        style={{
          height: 130,
          background: entry.imageUrl
            ? `#E8E8E8 url(${entry.imageUrl}) center/cover no-repeat`
            : heroBg,
          position: 'relative',
        }}
      >
        {entry.isNew && (
          <div style={{ position: 'absolute', top: 8, right: 8, background: 'rgba(232,96,138,0.9)', color: '#fff', fontSize: 10, fontWeight: 600, borderRadius: 6, padding: '2px 7px' }}>新上传</div>
        )}
      </div>
      <div
        role={onWhiteClick ? 'button' : undefined}
        tabIndex={onWhiteClick ? 0 : undefined}
        onClick={onWhiteClick ? () => onWhiteClick() : undefined}
        onKeyDown={
          onWhiteClick
            ? e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  onWhiteClick()
                }
              }
            : undefined
        }
        style={{
          cursor: onWhiteClick ? 'pointer' : undefined,
          outline: 'none',
          minHeight: onWhiteClick && !hasText ? 48 : undefined,
        }}
      >
        {entry.title && (
          <div style={{ padding: '10px 14px 0', fontSize: 14, fontWeight: 600, color: '#1A1A1A', lineHeight: 1.45 }}>{entry.title}</div>
        )}
        {entry.note && (
          <div style={{ padding: entry.title ? '6px 14px 0' : '10px 14px 0', fontSize: 13, color: '#666', lineHeight: 1.5 }}>{entry.note}</div>
        )}
      </div>
      <CardFoot tag="大事记" tagColor="#D04060" tagBg="#FFE0E8" entry={entry} onTagClick={onTagClick} />
    </div>
  )
}
