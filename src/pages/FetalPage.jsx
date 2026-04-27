import { useState, useMemo } from 'react'
import { StatusBar, BottomNav } from '../components/Layout.jsx'
import UploadModal from '../components/UploadModal.jsx'
import FetalBabyInfoPage from './FetalBabyInfoPage.jsx'
import FetalBabyPersonalCenterPage from './FetalBabyPersonalCenterPage.jsx'
import FetalRelativesGroupPage from './FetalRelativesGroupPage.jsx'
import PhotoRecordDetailPage from './PhotoRecordDetailPage.jsx'
import MilestoneTagTimelinePage from './MilestoneTagTimelinePage.jsx'
import FetalMonitorDetailPage from './FetalMonitorDetailPage.jsx'
import WeightEstimateDetailPage from './WeightEstimateDetailPage.jsx'
import PhotoEntryFullDetailPage from './PhotoEntryFullDetailPage.jsx'
import FetalDataRecordDetailPage from './FetalDataRecordDetailPage.jsx'
import { MilestoneCompletedCard } from '../components/MilestoneCompletedCard.jsx'
import { FetalTimelinePhotoCard as PhotoCard } from '../components/FetalTimelinePhotoCard.jsx'
import { WeightEstimateCard, FetalMovementCard, HeartRateCard } from '../components/FetalDataTimelineCards.jsx'
import { TODAY, formatDate } from '../lib/fetalFormat.js'
import { SquarePen } from 'lucide-react'
import { IconCamera, IconFetalAvatar } from '../components/Icons.jsx'
import { INITIAL_TIMELINE, MILESTONES, CURRENT_WEEK, CURRENT_DAY, formatPregnancyWeekDay } from '../data/timeline.js'

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

function renderEntry(
  entry,
  onUpload,
  onOpenPhotoDetail,
  onOpenMilestoneTag,
  onDataTagNavigate,
  onOpenPhotoFullDetail,
  onOpenDataRecordDetail,
) {
  const openPhotoDetail =
    (entry.subtype === 'belly' || entry.subtype === 'ultrasound') && onOpenPhotoDetail
      ? () => onOpenPhotoDetail(entry)
      : undefined
  const openPhotoFull =
    (entry.subtype === 'belly' || entry.subtype === 'ultrasound') && onOpenPhotoFullDetail
      ? () => onOpenPhotoFullDetail(entry)
      : undefined
  const openMilestoneWhite =
    (entry.subtype === 'found' || entry.subtype === 'heartbeat') && onOpenPhotoFullDetail
      ? () => onOpenPhotoFullDetail(entry)
      : undefined
  const openMilestoneTag = onOpenMilestoneTag ? () => onOpenMilestoneTag() : undefined
  const openWeight = onDataTagNavigate ? () => onDataTagNavigate('weight') : undefined
  const openMovement = onDataTagNavigate ? () => onDataTagNavigate('movement') : undefined
  const openHeart = onDataTagNavigate ? () => onDataTagNavigate('heart') : undefined
  const openDataDetail =
    onOpenDataRecordDetail && (entry.subtype === 'weight_estimate' || entry.subtype === 'fetal_movement' || entry.subtype === 'heart_rate')
      ? () => onOpenDataRecordDetail(entry)
      : undefined
  switch (entry.subtype) {
    case 'weight_estimate':
      return <WeightEstimateCard entry={entry} onTagClick={openWeight} onContentClick={openDataDetail} />
    case 'fetal_movement':
      return <FetalMovementCard entry={entry} onTagClick={openMovement} onContentClick={openDataDetail} />
    case 'heart_rate':
      return <HeartRateCard entry={entry} onTagClick={openHeart} onContentClick={openDataDetail} />
    case 'belly':
      return <PhotoCard entry={entry} onTagClick={openPhotoDetail} onBlankClick={openPhotoFull} />
    case 'ultrasound':
      return <PhotoCard entry={entry} onTagClick={openPhotoDetail} onBlankClick={openPhotoFull} />
    case 'found':
    case 'heartbeat':
      return (
        <MilestoneCompletedCard
          entry={entry}
          onTagClick={openMilestoneTag}
          onWhiteClick={openMilestoneWhite}
        />
      )
    default:                return <PhotoCard entry={entry} />
  }
}

export default function FetalPage({ onTabChange }) {
  const [timeline, setTimeline] = useState(INITIAL_TIMELINE)
  const [showModal, setShowModal] = useState(false)
  const [showFetalInfoPage, setShowFetalInfoPage] = useState(false)
  const [relativesGroupOpen, setRelativesGroupOpen] = useState(false)
  const [personalCenterOpen, setPersonalCenterOpen] = useState(false)
  const [photoDetailEntry, setPhotoDetailEntry] = useState(null)
  /** 大肚照/产检报告/大事记 白色区域 → 详情页 */
  const [fullDetailEntry, setFullDetailEntry] = useState(null)
  /** 胎儿估重 / 数胎动 / 测胎心：点击卡片主体进入 */
  const [dataRecordDetailEntry, setDataRecordDetailEntry] = useState(null)
  const [milestoneTagOpen, setMilestoneTagOpen] = useState(false)
  /** null | { type: 'monitor', tab: 'movement'|'heart' } | { type: 'weight' } */
  const [fetalDataDetail, setFetalDataDetail] = useState(null)

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

  const milestoneTagEntries = useMemo(
    () =>
      [...timeline]
        .filter(e => e.type === 'milestone')
        .sort((a, b) => b.date.localeCompare(a.date)),
    [timeline],
  )

  const latestWeightEstimateEntry = useMemo(() => {
    const list = timeline.filter(e => e.subtype === 'weight_estimate')
    return list.sort((a, b) => b.date.localeCompare(a.date))[0] ?? null
  }, [timeline])

  const handleDataTagNavigate = kind => {
    if (kind === 'weight') setFetalDataDetail({ type: 'weight' })
    else if (kind === 'movement') setFetalDataDetail({ type: 'monitor', tab: 'movement' })
    else if (kind === 'heart') setFetalDataDetail({ type: 'monitor', tab: 'heart' })
  }

  const handleDataRecordTagToTool = () => {
    const e = dataRecordDetailEntry
    setDataRecordDetailEntry(null)
    if (e?.subtype === 'weight_estimate') handleDataTagNavigate('weight')
    else if (e?.subtype === 'fetal_movement') handleDataTagNavigate('movement')
    else if (e?.subtype === 'heart_rate') handleDataTagNavigate('heart')
  }

  if (fullDetailEntry) {
    return (
      <PhotoEntryFullDetailPage
        entry={fullDetailEntry}
        onBack={() => setFullDetailEntry(null)}
        onTagToCategory={e => {
          setFullDetailEntry(null)
          if (e.type === 'milestone') setMilestoneTagOpen(true)
          else setPhotoDetailEntry(e)
        }}
      />
    )
  }
  if (photoDetailEntry) {
    return (
      <PhotoRecordDetailPage
        entry={photoDetailEntry}
        onBack={() => setPhotoDetailEntry(null)}
      />
    )
  }
  if (dataRecordDetailEntry) {
    return (
      <FetalDataRecordDetailPage
        entry={dataRecordDetailEntry}
        onBack={() => setDataRecordDetailEntry(null)}
        onTagToTool={handleDataRecordTagToTool}
      />
    )
  }
  if (milestoneTagOpen) {
    return (
      <MilestoneTagTimelinePage
        entries={milestoneTagEntries}
        onBack={() => setMilestoneTagOpen(false)}
      />
    )
  }
  if (fetalDataDetail?.type === 'monitor') {
    return (
      <FetalMonitorDetailPage
        key={fetalDataDetail.tab}
        initialTab={fetalDataDetail.tab}
        onBack={() => setFetalDataDetail(null)}
      />
    )
  }
  if (fetalDataDetail?.type === 'weight') {
    return (
      <WeightEstimateDetailPage
        entry={latestWeightEstimateEntry}
        onBack={() => setFetalDataDetail(null)}
      />
    )
  }
  if (personalCenterOpen) {
    return <FetalBabyPersonalCenterPage onBack={() => setPersonalCenterOpen(false)} />
  }
  if (relativesGroupOpen) {
    return (
      <FetalRelativesGroupPage
        onBack={() => {
          setRelativesGroupOpen(false)
          setPersonalCenterOpen(false)
        }}
        onOpenPersonalCenter={() => setPersonalCenterOpen(true)}
      />
    )
  }
  if (showFetalInfoPage) {
    return <FetalBabyInfoPage onBack={() => setShowFetalInfoPage(false)} />
  }

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
          <div
            role="button"
            tabIndex={0}
            onClick={() => setShowFetalInfoPage(true)}
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                setShowFetalInfoPage(true)
              }
            }}
            style={{
              position: 'relative',
              minHeight: 176,
              backgroundColor: '#D8C4BC',
              backgroundImage: `url(${import.meta.env.BASE_URL}fetal-header-bg.png)`,
              backgroundSize: 'cover',
              backgroundPosition: 'center 28%',
              cursor: 'pointer',
            }}
          >
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
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  backdropFilter: 'blur(4px)',
                }}>
                  <IconFetalAvatar />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 17, fontWeight: 600, color: '#fff', textShadow: '0 1px 8px rgba(0,0,0,0.35)' }}>胎宝宝</div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 5,
                      marginTop: 3,
                      alignSelf: 'flex-start',
                    }}
                  >
                    <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.88)', textShadow: '0 1px 6px rgba(0,0,0,0.35)' }}>
                      {formatPregnancyWeekDay(CURRENT_WEEK, CURRENT_DAY)}
                    </span>
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        lineHeight: 0,
                        opacity: 0.95,
                      }}
                      aria-hidden
                    >
                      <SquarePen size={13} color="rgba(255,255,255,0.95)" strokeWidth={1.75} />
                    </span>
                  </div>
                </div>
                <div
                  role="button"
                  tabIndex={0}
                  onClick={e => {
                    e.stopPropagation()
                    setRelativesGroupOpen(true)
                  }}
                  onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      e.stopPropagation()
                      setRelativesGroupOpen(true)
                    }
                  }}
                  style={{
                    fontSize: 12, color: '#fff', borderRadius: 20, padding: '7px 12px',
                    background: 'rgba(0,0,0,0.38)', fontWeight: 500, cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: 4, border: '0.5px solid rgba(255,255,255,0.25)',
                    backdropFilter: 'blur(6px)',
                    flexShrink: 0,
                  }}
                >
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
                {sortedTodayEntries.map(e => (
                  <div key={e.id}>{renderEntry(e, () => setShowModal(true), setPhotoDetailEntry, () => setMilestoneTagOpen(true), handleDataTagNavigate, setFullDetailEntry, setDataRecordDetailEntry)}</div>
                ))}
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
                        {entries.map(e => (
                          <div key={e.id}>{renderEntry(e, () => setShowModal(true), setPhotoDetailEntry, () => setMilestoneTagOpen(true), handleDataTagNavigate, setFullDetailEntry, setDataRecordDetailEntry)}</div>
                        ))}
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
                <div key={e.id} style={{ opacity: 0.6 }}>{renderEntry(e, () => setShowModal(true), setPhotoDetailEntry, () => setMilestoneTagOpen(true), handleDataTagNavigate, setFullDetailEntry, setDataRecordDetailEntry)}</div>
              ))}
            </>
          )}
        </div>
      </div>

      <div style={{position:'absolute',bottom:86,right:16,zIndex:50}}>
        <button className="fab" onClick={()=>setShowModal(true)}><IconCamera/></button>
      </div>

      <BottomNav active="home" onTabChange={onTabChange}/>
      {showModal && <UploadModal onClose={()=>setShowModal(false)} onSubmit={e=>{setTimeline(prev=>[e,...prev]);setShowModal(false)}}/>}
    </div>
  )
}
