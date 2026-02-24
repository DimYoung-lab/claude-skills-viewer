import { useState, useCallback } from 'react'
import { LanguageProvider } from './context/LanguageContext'
import { Header } from './components/Header'
import { SkillCard } from './components/SkillCard'
import { SkillModal } from './components/SkillModal'
import { useSkills } from './hooks/useSkills'
import { useLocalStorage } from './hooks/useLocalStorage'
import { useLanguage } from './context/LanguageContext'
import type { Skill } from './types'

function AppContent() {
  const { skills, loading, error, refresh } = useSkills()
  const { usageStats, incrementUsage, getUsage } = useLocalStorage()
  const { t } = useLanguage()
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null)
  const [refreshing, setRefreshing] = useState(false)

  const handleRefresh = useCallback(async () => {
    setRefreshing(true)
    await refresh()
    setRefreshing(false)
  }, [refresh])

  const handleSkillClick = useCallback((skill: Skill) => {
    incrementUsage(skill.id)
    setSelectedSkill(skill)
  }, [incrementUsage])

  const handleCloseModal = useCallback(() => {
    setSelectedSkill(null)
  }, [])

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
        {/* Stats Bar */}
        <div className="flex items-center justify-between mb-8">
          <p className="text-slate-600">
            {t('totalSkills')}: <span className="font-semibold text-slate-800">{skills.length}</span>
          </p>
        </div>

        {/* Skills Grid */}
        {skills.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-slate-100 flex items-center justify-center">
              <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <p className="text-slate-600 text-lg">{t('noSkills')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {skills.map(skill => (
              <SkillCard
                key={skill.id}
                skill={skill}
                usage={getUsage(skill.id)}
                onClick={() => handleSkillClick(skill)}
              />
            ))}
          </div>
        )}
      </main>

      <SkillModal
        skill={selectedSkill}
        usage={selectedSkill ? getUsage(selectedSkill.id) : undefined}
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
