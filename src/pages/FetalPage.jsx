import { useState, useMemo } from 'react'
import { StatusBar, BottomNav } from '../components/Layout.jsx'
import UploadModal from '../components/UploadModal.jsx'
import { IconCamera, IconFetalAvatar } from '../components/Icons.jsx'
import { INITIAL_TIMELINE, MILESTONES, CURRENT_WEEK, CURRENT_DAY, formatPregnancyWeekDay, deriveFetalMovementMetrics } from '../data/timeline.js'

const TODAY = new Date().toISOString().split('T')[0]

function formatDate(dateStr) {
  if (dateStr === TODAY) return '今天'
  const d = new Date(dateStr)
  return `${d.getMonth() + 1} 月 ${d.getDate()} 日`
}

function weekLabel(entry) {
  return formatPregnancyWeekDay(entry.week, entry.day)
}

function groupByWeekThenDate(entries) {
  const weekMap = {}
  entries.forEach(e => {
    const wk = e.week
    if (!weekMap[wk]) weekMap[wk] = {}
    if (!weekMap[wk][e.date]) weekMap[wk][e.date] = []
    weekMap[wk][e.date].push(e)
  })
  return Object.entries(weekMap)
    .sort((a, b) => Number(b[0]) - Number(a[0]))
    .map(([week, dateMap]) => ({
      week: Number(week),
      dates: Object.entries(dateMap).sort((a, b) => b[0].localeCompare(a[0]))
    }))
}

const MILESTONE_EMOJIS = {1:'🌱',8:'💓',12:'📋',16:'🤲',22:'🔬',28:'📸',29:'📸',30:'📸',36:'⏰'}

function CardFoot({ tag, tagColor, tagBg, entry }) {
  const t = entry.time ? ` ${entry.time}` : ''
  const lock = entry.isPrivate ? '  🔒 仅自己可见' : ''
  const metaText = `${entry.author || '妈妈'}  ${formatDate(entry.date)}${t}${lock}`
  return (
    <div style={{borderTop:'0.5px solid #F2F2F2',marginTop:8}}>
      <div style={{padding:'5px 14px 2px',fontSize:12,color:'#C0B0A8'}}>{metaText}</div>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'5px 14px 11px'}}>
        <span style={{fontSize:11,fontWeight:500,color:tagColor,background:tagBg,borderRadius:20,padding:'3px 10px',cursor:'pointer',display:'inline-flex',alignItems:'center',gap:3}}>
          {tag} <span style={{opacity:0.5,fontSize:10}}>›</span>
        </span>
        <div style={{display:'flex',gap:14}}>
          <span style={{fontSize:12,color:'#C0B0A8',display:'flex',alignItems:'center',gap:4,cursor:'pointer'}}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M12 21C12 21 3 14.5 3 8.5C3 5.42 5.42 3 8.5 3C10.24 3 11.91 3.81 13 5.08C14.09 3.81 15.76 3 17.5 3C20.58 3 23 5.42 23 8.5C23 14.5 12 21 12 21Z" stroke="#C0B0A8" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
            赞
          </span>
          <span style={{fontSize:12,color:'#C0B0A8',display:'flex',alignItems:'center',gap:4,cursor:'pointer'}}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M21 15C21 16.1 20.1 17 19 17H7L3 21V5C3 3.9 3.9 3 5 3H19C20.1 3 21 3.9 21 5V15Z" stroke="#C0B0A8" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
            评论
          </span>
        </div>
      </div>
    </div>
  )
}

function TodayGuideCard({ entry, onUpload }) {
  return (
    <div style={{background:'#fff',borderRadius:18,border:'1px solid #F4C0D1',marginBottom:14,overflow:'hidden'}}>
      <div style={{padding:'22px 16px 18px',textAlign:'center'}}>
        <div style={{width:72,height:64,background:'#FBEAF0',borderRadius:16,margin:'0 auto 14px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:32}}>
          {entry.emoji}
        </div>
        <div style={{fontSize:16,fontWeight:700,color:'#C04070',marginBottom:6}}>{entry.title}</div>
        <div style={{fontSize:13,color:'#B06080',lineHeight:1.7,marginBottom:16}}>{entry.sub}</div>
        <button onClick={onUpload} style={{background:'#E8608A',color:'#fff',border:'none',borderRadius:24,padding:'10px 32px',fontSize:14,fontWeight:600,cursor:'pointer',fontFamily:'inherit'}}>
          上传记录
        </button>
      </div>
    </div>
  )
}

function WeightEstimateCard({ entry }) {
  const { data } = entry
  return (
    <div style={{background:'#fff',borderRadius:16,border:'0.5px solid #EBEBEB',marginBottom:12,overflow:'hidden'}}>
      <div style={{padding:'13px 14px 0'}}>
        <div style={{display:'flex'}}>
          {[{key:'weight',label:'体重',unit:'g'},{key:'head',label:'头围',unit:'mm'},{key:'belly',label:'腹围',unit:'mm'},{key:'femur',label:'股骨',unit:'mm'}]
            .filter(f=>data?.[f.key])
            .map((f,i)=>(
              <div key={f.key} style={{flex:1,textAlign:'center',borderLeft:i>0?'0.5px solid #F2F2F2':'none'}}>
                <div style={{fontSize:22,fontWeight:700,color:'#1A1A1A',letterSpacing:-0.5}}>{data[f.key]}</div>
                <div style={{fontSize:10,color:'#AAA'}}>{f.unit}</div>
                <div style={{fontSize:10,color:'#AAA',marginTop:2}}>{f.label}</div>
              </div>
            ))}
        </div>
        {entry.note && <div style={{marginTop:10,fontSize:12,color:'#888',borderTop:'0.5px solid #F2F2F2',paddingTop:8}}>{entry.note}</div>}
      </div>
      <CardFoot tag="胎儿估重" tagColor="#E05070" tagBg="#FFE8EE" entry={entry} />
    </div>
  )
}

function FetalMovementCard({ entry }) {
  const { data } = entry
  const primary = '#B84868'
  const blockBg = '#FFFBFC'
  const divider = '#F3EAED'
  const secondary = '#7A626E'
  const assist = '#8B757E'
  const body = '#2E2C2D'

  const { rows, totalValid, totalMinutes } = deriveFetalMovementMetrics(data, entry)
  const minutesRounded = Math.round(totalMinutes)
  const totalDisplay = Number.isFinite(totalValid) ? totalValid : '--'

  return (
    <div
      style={{
        background: '#fff',
        borderRadius: 16,
        border: '0.5px solid #EBEBEB',
        marginBottom: 12,
        overflow: 'hidden',
      }}
    >
      <div style={{ padding: '14px 14px 12px' }}>
        <div style={{ textAlign: 'left' }}>
          <div style={{ fontSize: 14, fontWeight: 400, color: body, lineHeight: 1.6 }}>
            <span style={{ color: primary, fontWeight: 700 }}>{minutesRounded}分钟</span>
            里，你放下整个世界
          </div>
          <div style={{ fontSize: 14, fontWeight: 400, color: body, lineHeight: 1.6, marginTop: 4 }}>
            等一个不确定什么时候会来的轻踢
          </div>
        </div>

        <div
          style={{
            marginTop: 14,
            background: blockBg,
            borderRadius: 12,
            padding: '12px 14px 14px',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1.15fr) minmax(0, 1fr) minmax(0, 0.95fr)',
              alignItems: 'center',
              columnGap: 8,
              paddingBottom: 8,
            }}
          >
            <span style={{ fontSize: 12, color: secondary, fontWeight: 400 }}>开始时间</span>
            <span style={{ fontSize: 12, color: secondary, fontWeight: 400, textAlign: 'center' }}>实际点击</span>
            <span style={{ fontSize: 12, color: secondary, fontWeight: 400, textAlign: 'center' }}>有效次数</span>
          </div>
          <div style={{ height: '0.5px', background: divider, margin: '0 -14px 0' }} />

          {rows.map((row, i) => (
            <div key={i}>
              {i > 0 && (
                <div style={{ height: '0.5px', background: divider, margin: '0 -14px' }} />
              )}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'minmax(0, 1.15fr) minmax(0, 1fr) minmax(0, 0.95fr)',
                  alignItems: 'center',
                  columnGap: 8,
                  padding: '11px 0',
                }}
              >
                <span
                  style={{
                    fontSize: 12,
                    color: assist,
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {row.time}
                </span>
                <span
                  style={{
                    fontSize: 12,
                    color: assist,
                    textAlign: 'center',
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {row.clicks}
                </span>
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 400,
                    color: primary,
                    textAlign: 'center',
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {Number.isFinite(row.valid) ? row.valid : '--'}
                </span>
              </div>
            </div>
          ))}

          <div style={{ height: '0.5px', background: divider, margin: '0 -14px 10px' }} />
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1.15fr) minmax(0, 1fr) minmax(0, 0.95fr)',
              alignItems: 'start',
              columnGap: 8,
            }}
          >
            <span style={{ fontSize: 12, color: secondary, textAlign: 'left' }}>12小时胎动数</span>
            <span aria-hidden style={{ display: 'block' }} />
            <span
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: primary,
                textAlign: 'center',
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              {totalDisplay}次
            </span>
          </div>
        </div>
      </div>
      <CardFoot tag="数胎动" tagColor={primary} tagBg="#F8ECEF" entry={entry} />
    </div>
  )
}

function HeartRateCard({ entry }) {
  const bpm = entry.data?.bpm || 0
  return (
    <div style={{background:'#fff',borderRadius:16,border:'0.5px solid #EBEBEB',marginBottom:12,overflow:'hidden'}}>
      <div style={{padding:'13px 14px 0'}}>
        <div style={{textAlign:'center'}}>
          <div style={{fontSize:36,fontWeight:700,color:'#1A1A1A',letterSpacing:-1}}>{bpm}</div>
          <div style={{fontSize:11,color:'#AAA'}}>次 / 分钟</div>
          <div style={{fontSize:11,color:'#AAA',marginTop:2}}>胎心率</div>
        </div>
        {entry.note && <div style={{marginTop:6,fontSize:12,color:'#888'}}>{entry.note}</div>}
      </div>
      <CardFoot tag="测胎心" tagColor="#185FA5" tagBg="#E6F1FB" entry={entry} />
    </div>
  )
}

function PhotoCard({ entry }) {
  const isBelly = entry.subtype === 'belly'
  const tag = isBelly ? '大肚照' : '产检报告'
  const tagColor = isBelly ? '#508040' : '#308878'
  const tagBg = isBelly ? '#E8F4E0' : '#E0F4F0'
  return (
    <div style={{background:'#fff',borderRadius:16,border:'0.5px solid #EBEBEB',overflow:'hidden',marginBottom:12}}>
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
        {entry.isNew && <div style={{position:'absolute',top:8,right:8,background:'rgba(232,96,138,0.9)',color:'#fff',fontSize:10,fontWeight:600,borderRadius:6,padding:'2px 7px'}}>新上传</div>}
      </div>
      {entry.note && <div style={{padding:'10px 14px 0',fontSize:13,fontWeight:500,color:'#1A1A1A',lineHeight:1.5}}>{entry.note}</div>}
      <CardFoot tag={tag} tagColor={tagColor} tagBg={tagBg} entry={entry} />
    </div>
  )
}

function MilestoneCompletedCard({ entry }) {
  const heroBg = entry.color || '#DDC8D8'
  return (
    <div style={{ background: '#fff', borderRadius: 16, border: '0.5px solid #EBEBEB', overflow: 'hidden', marginBottom: 12 }}>
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
      {entry.title && (
        <div style={{ padding: '10px 14px 0', fontSize: 14, fontWeight: 600, color: '#1A1A1A', lineHeight: 1.45 }}>{entry.title}</div>
      )}
      {entry.note && (
        <div style={{ padding: entry.title ? '6px 14px 0' : '10px 14px 0', fontSize: 13, color: '#666', lineHeight: 1.5 }}>{entry.note}</div>
      )}
      <CardFoot tag="大事记" tagColor="#D04060" tagBg="#FFE0E8" entry={entry} />
    </div>
  )
}

/** 时间轴左侧留白宽度（圆点 + 竖实线） */
const TL_GUTTER = 20
const TL_LINE_LEFT = 9

function TlDot({ muted }) {
  return (
    <div
      style={{
        width: 8,
        height: 8,
        borderRadius: '50%',
        background: muted ? '#CCC' : '#E295A8',
        flexShrink: 0,
        position: 'relative',
        zIndex: 1,
        boxShadow: '0 0 0 2px #F5F5F7',
      }}
    />
  )
}

/** 左侧竖实线 + 子节点（每行左侧为圆点列，右侧为内容） */
function TimelineSpine({ children }) {
  return (
    <div style={{ position: 'relative', paddingBottom: 4 }}>
      <div
        aria-hidden
        style={{
          position: 'absolute',
          left: TL_LINE_LEFT,
          top: 12,
          bottom: 6,
          width: 1,
          background: '#D8D8D8',
          borderRadius: 0.5,
        }}
      />
      {children}
    </div>
  )
}

function TlGutter() {
  return <div style={{ width: TL_GUTTER, flexShrink: 0 }} />
}

function renderEntry(entry, onUpload) {
  switch (entry.subtype) {
    case 'weight_estimate': return <WeightEstimateCard key={entry.id} entry={entry}/>
    case 'fetal_movement':  return <FetalMovementCard key={entry.id} entry={entry}/>
    case 'heart_rate':      return <HeartRateCard key={entry.id} entry={entry}/>
    case 'belly':
    case 'ultrasound':      return <PhotoCard key={entry.id} entry={entry}/>
    case 'found':
    case 'heartbeat':       return <MilestoneCompletedCard key={entry.id} entry={entry}/>
    default:                return <PhotoCard key={entry.id} entry={entry}/>
  }
}

export default function FetalPage({ onTabChange }) {
  const [timeline, setTimeline] = useState(INITIAL_TIMELINE)
  const [showModal, setShowModal] = useState(false)

  const todayEntries = timeline.filter(e => e.date === TODAY)
  const hasTodayEntry = todayEntries.length > 0
  const todayMilestone = MILESTONES[CURRENT_WEEK]

  const pastEntries = useMemo(() => timeline.filter(e => e.date !== TODAY && !e.isPrivate), [timeline])
  const privateEntries = useMemo(() => timeline.filter(e => e.isPrivate), [timeline])
  const weekGroups = useMemo(() => groupByWeekThenDate(pastEntries), [pastEntries])

  const sortedTodayEntries = useMemo(() => {
    return [...todayEntries].sort((a, b) => {
      const bellyRank = e => (e.type === 'photo' && e.subtype === 'belly' ? 1 : 0)
      return bellyRank(a) - bellyRank(b)
    })
  }, [todayEntries])

  return (
    <div className="phone-shell" style={{display:'flex',flexDirection:'column',height:'100%'}}>
      <StatusBar/>

      <div className="top-nav">
        <div style={{padding:'0 6px',display:'flex',alignItems:'center'}}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="9" cy="9" r="7" stroke="#555" strokeWidth="1.6"/><path d="M14.5 14.5L18 18" stroke="#555" strokeWidth="1.6" strokeLinecap="round"/></svg>
        </div>
        <div className="top-nav-tabs">
          <div className="nav-tab" onClick={() => onTabChange('mama')}>妈妈</div>
          <div className="nav-tab active">胎宝宝</div>
          <div className="nav-tab" onClick={() => onTabChange('baby')}>柚柚</div>
        </div>
        <div style={{padding:'0 6px',display:'flex',alignItems:'center'}}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="3" y="3" width="14" height="14" rx="3" stroke="#555" strokeWidth="1.6" fill="none"/><path d="M7 10h6M10 7v6" stroke="#555" strokeWidth="1.4" strokeLinecap="round"/></svg>
        </div>
      </div>

      <div className="scroll-area" style={{flex:1}}>

        {/* Header：背景图 + 底部信息条（孕程进度） */}
        <div style={{ borderBottom: '0.5px solid #F2F2F2' }}>
          <div style={{
            position: 'relative',
            minHeight: 176,
            backgroundColor: '#D8C4BC',
            backgroundImage: 'url(/fetal-header-bg.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center 28%',
          }}>
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(180deg, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0.38) 55%, rgba(0,0,0,0.52) 100%)',
              pointerEvents: 'none',
            }} />
            <div style={{
              position: 'relative', zIndex: 1,
              minHeight: 176,
              display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
              padding: '18px 16px 16px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 48, height: 48, borderRadius: '50%',
                  background: 'rgba(255,255,255,0.22)', border: '2px solid rgba(255,255,255,0.85)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                  backdropFilter: 'blur(4px)',
                }}>
                  <IconFetalAvatar />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 17, fontWeight: 600, color: '#fff', textShadow: '0 1px 8px rgba(0,0,0,0.35)' }}>胎宝宝</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.88)', marginTop: 3, textShadow: '0 1px 6px rgba(0,0,0,0.35)' }}>1位亲友可见</div>
                </div>
                <div style={{
                  fontSize: 12, color: '#fff', borderRadius: 20, padding: '7px 12px',
                  background: 'rgba(0,0,0,0.38)', fontWeight: 500, cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: 4, border: '0.5px solid rgba(255,255,255,0.25)',
                  backdropFilter: 'blur(6px)',
                }}>
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="5" r="3" stroke="#fff" strokeWidth="1.4"/><path d="M2 14c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="#fff" strokeWidth="1.4" strokeLinecap="round"/></svg>
                  邀请准爸爸
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 四维彩超引导条（与柚柚 tab 云相册引导条样式一致） */}
        <div
          style={{
            background: '#fff',
            margin: '8px 12px',
            borderRadius: 14,
            border: '0.5px solid #EBEBEB',
            padding: '12px 14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 10,
          }}
        >
          <span style={{ fontSize: 13, color: '#666', flex: 1, minWidth: 0, lineHeight: 1.35 }}>四维彩超预测宝宝长相—&gt;</span>
          <div
            role="button"
            tabIndex={0}
            style={{
              fontSize: 12,
              background: '#FBEAF0',
              color: '#E8608A',
              borderRadius: 14,
              padding: '5px 12px',
              fontWeight: 500,
              border: '1px solid #F4C0D1',
              cursor: 'pointer',
              flexShrink: 0,
            }}
          >
            立即生成
          </div>
        </div>

        {/* Timeline */}
        <div style={{background:'#F5F5F7',padding:'14px 12px 100px'}}>

          <TimelineSpine>
            {/* Today */}
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
              <div style={{ width: TL_GUTTER, flexShrink: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <TlDot />
              </div>
              <div style={{ flex: 1, minWidth: 0, display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: '#1A1A1A', flexShrink: 0 }}>今天</span>
                <span style={{
                  fontSize: 11,
                  color: '#B0A0A0',
                  fontWeight: 500,
                  whiteSpace: 'nowrap',
                  letterSpacing: '0.03em',
                  flexShrink: 0,
                }}>
                  {formatPregnancyWeekDay(CURRENT_WEEK, CURRENT_DAY)}
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', marginBottom: 4 }}>
              <TlGutter />
              <div style={{ flex: 1, minWidth: 0 }}>
                {todayMilestone && !hasTodayEntry && (
                  <TodayGuideCard
                    entry={{emoji:MILESTONE_EMOJIS[CURRENT_WEEK]||'📸',title:todayMilestone.title,sub:todayMilestone.sub}}
                    onUpload={()=>setShowModal(true)}
                  />
                )}
                {!todayMilestone && !hasTodayEntry && (
                  <div style={{background:'#fff',borderRadius:16,border:'1.5px dashed #F4C0D1',padding:'16px 14px',marginBottom:12,textAlign:'center'}}>
                    <div style={{fontSize:13,color:'#B06080',marginBottom:12,lineHeight:1.6}}>今天{formatPregnancyWeekDay(CURRENT_WEEK, CURRENT_DAY)}，记录一张照片吧</div>
                    <button onClick={()=>setShowModal(true)} style={{background:'#E8608A',color:'#fff',border:'none',borderRadius:20,padding:'8px 24px',fontSize:13,fontWeight:500,cursor:'pointer',fontFamily:'inherit'}}>上传记录</button>
                  </div>
                )}
                {sortedTodayEntries.map(e => renderEntry(e, ()=>setShowModal(true)))}
              </div>
            </div>

            {/* 按孕周分组 */}
            {weekGroups.map(({ week, dates }, gi) => (
              <div key={week} style={{ paddingTop: gi === 0 ? 6 : 16 }}>
                {dates.map(([date, entries]) => (
                  <div key={date}>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
                      <div style={{ width: TL_GUTTER, flexShrink: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <TlDot />
                      </div>
                      <div style={{ flex: 1, minWidth: 0, display: 'flex', alignItems: 'center', gap: 7, flexWrap: 'wrap' }}>
                        <span style={{fontSize:13,fontWeight:600,color:'#1A1A1A'}}>{formatDate(date)}</span>
                        <span style={{fontSize:12,color:'#AAA'}}>{weekLabel(entries[0])}</span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', marginBottom: 4 }}>
                      <TlGutter />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        {entries.map(e => renderEntry(e, ()=>setShowModal(true)))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </TimelineSpine>

          {/* 私密 */}
          {privateEntries.length > 0 && (
            <>
              <div style={{display:'flex',alignItems:'center',gap:8,margin:'8px 0 14px'}}>
                <div style={{flex:1,height:'0.5px',background:'#DDD'}}/>
                <span style={{fontSize:11,color:'#AAA',whiteSpace:'nowrap'}}>以下内容仅妈妈可见</span>
                <div style={{flex:1,height:'0.5px',background:'#DDD'}}/>
              </div>
              {privateEntries.map(e => (
                <div key={e.id} style={{opacity:0.6}}>{renderEntry(e,()=>setShowModal(true))}</div>
              ))}
            </>
          )}
        </div>
      </div>

      <div style={{position:'absolute',bottom:86,right:16,zIndex:50}}>
        <button className="fab" onClick={()=>setShowModal(true)}><IconCamera/></button>
      </div>

      <BottomNav active="record" onTabChange={onTabChange}/>
      {showModal && <UploadModal onClose={()=>setShowModal(false)} onSubmit={e=>{setTimeline(prev=>[e,...prev]);setShowModal(false)}}/>}
    </div>
  )
}
