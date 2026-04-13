/**
 * 孕周点阵数据（接口字段示例；接入 API 后替换）
 * currentWeek 与 timeline 的 CURRENT_WEEK 对齐便于演示；第 30 周未在 recorded 中可展示「当周未记」
 */
export const DEFAULT_PREGNANCY_PROGRESS = {
  currentWeek: 30,
  recordedWeeks: [1, 2, 4, 5, 7, 8, 9, 11, 12, 14, 15, 16, 18, 19, 21, 22, 23, 24, 26, 27, 28, 29],
}

const TERM_WEEKS = 40

export function getRemainWeeksToMeet(currentWeek) {
  return Math.max(0, TERM_WEEKS - currentWeek)
}

/** @param {number[]} recordedWeeks */
export function buildWeekDotStates(currentWeek, recordedWeeks) {
  const recorded = new Set(recordedWeeks)
  return Array.from({ length: TERM_WEEKS }, (_, i) => {
    const w = i + 1
    if (w > currentWeek) return 'future'
    if (w === currentWeek) return 'current'
    if (recorded.has(w)) return 'recorded'
    return 'empty'
  })
}
