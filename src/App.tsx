import { useState, useCallback, useMemo } from 'react'
import { LanguageProvider } from './context/LanguageContext'
import { Header } from './components/Header'
import { SkillCard } from './components/SkillCard'
import { SkillModal } from './components/SkillModal'
import { useSkills } from './hooks/useSkills'
import { useLanguage } from './context/LanguageContext'
import type { Skill } from './types'

type SkillCategory = 'all' | 'writing' | 'news' | 'productivity' | 'dev'

const skillCategoryMap: Record<string, SkillCategory> = {
  'prd-writer': 'writing',
  'copywriter': 'writing',
  'thesis-progress-report': 'writing',
  'daily-ai-news': 'news',
  'meeting-summary': 'productivity',
  'agent-teams': 'productivity',
  'rag-qa': 'dev',
  'skill-creator': 'dev',
  'superpowers': 'dev'
}

const categories: { key: SkillCategory; labelKey: string }[] = [
  { key: 'all', labelKey: 'categoryAll' },
  { key: 'writing', labelKey: 'categoryWriting' },
  { key: 'news', labelKey: 'categoryNews' },
  { key: 'productivity', labelKey: 'categoryProductivity' },
  { key: 'dev', labelKey: 'categoryDev' }
]

function AppContent() {
  const { skills, loading, error, refresh } = useSkills()
  const { t } = useLanguage()
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null)
  const [refreshing, setRefreshing] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<SkillCategory>('all')
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set())

  const handleRefresh = useCallback(async () => {
    setRefreshing(true)
    await refresh()
    setRefreshing(false)
  }, [refresh])

  const toggleFolder = useCallback((skillId: string) => {
    setExpandedFolders(prev => {
      const next = new Set(prev)
      if (next.has(skillId)) {
        next.delete(skillId)
      } else {
        next.add(skillId)
      }
      return next
    })
  }, [])

  const handleSkillClick = useCallback((skill: Skill) => {
    if (skill.isFolder && skill.children && skill.children.length > 0) {
      // Toggle folder expansion
      toggleFolder(skill.id)
    } else {
      // Open skill modal
      setSelectedSkill(skill)
    }
  }, [toggleFolder])

  const handleCloseModal = useCallback(() => {
    setSelectedSkill(null)
  }, [])

  const filteredSkills = useMemo(() => {
    return skills.filter(skill => {
      // 分类过滤 - 只过滤顶层技能，技能夹总是显示
      if (selectedCategory !== 'all' && !skill.isFolder) {
        const category = skillCategoryMap[skill.id] || 'all'
        if (category !== selectedCategory) return false
      }
      // 搜索过滤
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase()
        const matchName = skill.name.toLowerCase().includes(query)
        const matchDesc = skill.description?.toLowerCase().includes(query)
        // Also check children for folder skills
        const matchChildren = skill.children?.some(child =>
          child.name.toLowerCase().includes(query) ||
          child.description?.toLowerCase().includes(query)
        )
        if (!matchName && !matchDesc && !matchChildren) return false
      }
      return true
    })
  }, [skills, searchQuery, selectedCategory])

  // Flatten skills with expanded children for display
  const displaySkills = useMemo(() => {
    const result: Skill[] = []
    for (const skill of filteredSkills) {
      result.push(skill)
      // Add children if folder is expanded
      if (skill.isFolder && skill.children && expandedFolders.has(skill.id)) {
        // Filter children based on search
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase()
          const matchingChildren = skill.children.filter(child =>
            child.name.toLowerCase().includes(query) ||
            child.description?.toLowerCase().includes(query)
          )
          result.push(...matchingChildren)
        } else {
          result.push(...skill.children)
        }
      }
    }
    return result
  }, [filteredSkills, expandedFolders, searchQuery])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-sky-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-600 font-medium">{t('loading')}</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-slate-800 mb-2">{t('error')}</h2>
          <p className="text-slate-600 mb-4">{error}</p>
          <button
            onClick={refresh}
            className="px-6 py-2 bg-sky-500 text-white rounded-lg font-medium hover:bg-sky-600 transition-colors"
          >
            {t('retry')}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header onRefresh={handleRefresh} refreshing={refreshing} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <p className="text-slate-600">
            {t('totalSkills')}: <span className="font-semibold text-slate-800">{displaySkills.length}</span>
            {displaySkills.length !== skills.length && (
              <span className="text-slate-400 text-sm ml-2">
                ({skills.length} {t('totalSkills').toLowerCase()})
              </span>
            )}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('searchPlaceholder')}
                className="w-48 sm:w-64 px-4 py-2 pl-10 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
              />
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Category Filters */}
            <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-lg p-1">
              {categories.map(({ key, labelKey }) => (
                <button
                  key={key}
                  onClick={() => setSelectedCategory(key)}
                  className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                    selectedCategory === key
                      ? 'bg-sky-500 text-white'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {t(labelKey)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Skills Grid */}
        {displaySkills.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-slate-100 flex items-center justify-center">
              <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <p className="text-slate-600 text-lg">{t('noResults')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {displaySkills.map(skill => (
              <SkillCard
                key={skill.id}
                skill={skill}
                onClick={() => handleSkillClick(skill)}
                isExpanded={skill.isFolder ? expandedFolders.has(skill.id) : undefined}
              />
            ))}
          </div>
        )}
      </main>

      <SkillModal
        skill={selectedSkill}
        onClose={handleCloseModal}
      />
    </div>
  )
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  )
}
