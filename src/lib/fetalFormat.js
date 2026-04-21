/** 胎宝宝时间轴等与「今天」比较的日期基准 */
export const TODAY = new Date().toISOString().split('T')[0]

export function formatDate(dateStr) {
  if (dateStr === TODAY) return '今天'
  const d = new Date(dateStr)
  return `${d.getMonth() + 1} 月 ${d.getDate()} 日`
}

/** 紧凑展示，如 4月15日（详情页日期行） */
export function formatDateCompact(dateStr) {
  if (dateStr === TODAY) return '今天'
  const d = new Date(dateStr)
  return `${d.getMonth() + 1}月${d.getDate()}日`
}
