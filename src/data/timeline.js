// 孕周里程碑配置
export const MILESTONES = {
  1:  { title: '记录第一次发现宝宝存在', sub: '验孕棒、早早孕试纸，留下这一刻', icon: '🌱' },
  8:  { title: '第一次听到心跳', sub: '拍下 B 超单，留住这个珍贵瞬间', icon: '💓' },
  12: { title: 'NT 检查', sub: '留下第一张正式的 B 超照', icon: '📋' },
  16: { title: '第一次感受到胎动', sub: '记录下来，这一刻无比珍贵', icon: '🤲' },
  22: { title: '四维彩超', sub: '看看宝宝长什么样', icon: '🔬' },
  28: { title: '孕 28 周，拍一张大肚照吧', sub: '进入孕晚期，留下最美的孕肚时光', icon: '📸' },
  36: { title: '待产倒计时', sub: '记录最后的孕肚时光，宝宝快来了', icon: '⏰' },
}

// 模拟时间轴数据
export const INITIAL_TIMELINE = [
  {
    id: 'entry-001',
    type: 'data',
    subtype: 'weight_estimate',
    date: '2026-04-01',
    week: 28,
    day: 0,
    title: '胎儿估重',
    data: { weight: 1120, head: 248, belly: 220, femur: 42 },
    author: '妈妈',
  },
  {
    id: 'entry-002',
    type: 'photo',
    subtype: 'ultrasound',
    date: '2026-04-01',
    week: 28,
    day: 0,
    title: 'B 超单',
    note: '孕 28 周产检，一切正常',
    author: '妈妈',
    color: '#C8D8E8',
  },
  {
    id: 'entry-003',
    type: 'data',
    subtype: 'fetal_movement',
    date: '2026-03-28',
    week: 27,
    day: 3,
    title: '数胎动',
    data: { count: 12, duration: 60, session: '晚' },
    author: '妈妈',
  },
  {
    id: 'entry-004',
    type: 'photo',
    subtype: 'belly',
    date: '2026-03-20',
    week: 26,
    day: 2,
    title: '大肚照',
    note: '26 周肚子越来越大了',
    author: '妈妈',
    color: '#E8D4C8',
  },
  {
    id: 'entry-005',
    type: 'milestone',
    subtype: 'heartbeat',
    date: '2026-02-01',
    week: 8,
    day: 0,
    title: '第一次听到心跳',
    note: '168次/分钟，好快！',
    author: '妈妈',
  },
  {
    id: 'entry-006',
    type: 'milestone',
    subtype: 'found',
    date: '2025-12-10',
    week: 1,
    day: 0,
    title: '发现宝宝存在',
    note: '两条线！太惊喜了',
    author: '妈妈',
    isPrivate: true,
  },
]

export const CURRENT_WEEK = 28
export const CURRENT_DAY = 3
export const DUE_DATE = '2026-07-01'
export const DAYS_UNTIL_DUE = 83
