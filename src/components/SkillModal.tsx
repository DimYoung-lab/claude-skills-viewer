import { useEffect } from 'react'
import type { Skill, UsageRecord } from '../types'
import { useLanguage } from '../context/LanguageContext'

// Emoji mapping for skills
const skillEmojis: Record<string, string> = {
  'prd-writer': '📝',
  'copywriter': '📋',
  'daily-ai-news': '📰',
  'rag-qa': '🔍',
  'agent-teams': '👥',
  'frontend-design': '🎨',
  'thesis-progress-report': '📚',
  'meeting-summary': '🤝',
  'skill-creator': '🛠️',
  'claude-developer-platform': '🤖',
  'default': '⚡'
}

function getSkillEmoji(skillId: string): string {
  return skillEmojis[skillId] || skillEmojis.default
}

interface SkillModalProps {
  skill: Skill | null
  usage?: UsageRecord
  onClose: () => void
}

export function SkillModal({ skill, usage, onClose }: SkillModalProps) {
  const { t } = useLanguage()

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [onClose])

  if (!skill) return null

  const emoji = getSkillEmoji(skill.id)
  const usageCount = usage?.count || 0
  const lastUsed = usage?.lastUsed ? new Date(usage.lastUsed).toLocaleDateString() : '-'

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl animate-scale-in overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Gradient Header */}
        <div className="h-24 bg-gradient-to-r from-sky-500 to-blue-600" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Content */}
        <div className="px-8 pb-8 -mt-12">
          {/* Avatar */}
          <div className="w-24 h-24 rounded-2xl bg-white shadow-lg flex items-center justify-center text-4xl mb-6">
            {emoji}
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-slate-800 mb-2">
            {skill.name}
          </h2>

          {/* Description */}
          <p className="text-slate-600 mb-6 leading-relaxed">
            {skill.description || 'No description available.'}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="p-4 rounded-xl bg-slate-50">
              <div className="text-sm text-slate-500 mb-1">{t('usageCount')}</div>
              <div className="text-2xl font-bold text-slate-800">{usageCount}</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-50">
              <div className="text-sm text-slate-500 mb-1">{t('lastUsed')}</div>
              <div className="text-lg font-semibold text-slate-800">{lastUsed}</div>
            </div>
          </div>

          {/* Path */}
          <div className="p-3 rounded-lg bg-slate-100 text-xs text-slate-500 break-all">
            {skill.path}
          </div>
        </div>
      </div>
    </div>
  )
}
