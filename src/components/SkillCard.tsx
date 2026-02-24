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

interface SkillCardProps {
  skill: {
    id: string
    name: string
    description?: string
  }
  onClick: () => void
}

export function SkillCard({ skill, onClick }: SkillCardProps) {
  const { t } = useLanguage()
  const emoji = getSkillEmoji(skill.id)

  return (
    <button
      onClick={onClick}
      className="group relative flex flex-col items-center p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-sky-500/10 hover:border-sky-300 transition-all duration-300 active:scale-95 animate-fade-in"
    >
      {/* Emoji Icon */}
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-sky-50 to-blue-100 flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">
        {emoji}
      </div>

      {/* Skill Name */}
      <h3 className="text-lg font-semibold text-slate-800 mb-2 text-center">
        {skill.name}
      </h3>

      {/* Hover indicator */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-sky-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </button>
  )
}
