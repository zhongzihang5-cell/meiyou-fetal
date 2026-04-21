/** 照片卡正文：优先 note；无 note 时用 title（与「大肚照/产检报告」标签重复则不单独展示） */
export function getPhotoCardBodyText(entry) {
  const tagLabel = entry.subtype === 'belly' ? '大肚照' : '产检报告'
  if (entry.note) return entry.note
  if (entry.title && entry.title !== tagLabel) return entry.title
  return null
}
