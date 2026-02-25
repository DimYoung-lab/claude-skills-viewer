import { useLanguage } from '../context/LanguageContext'
import { getSkillName, getSkillNameEn } from '../data/skillDescriptions'

// Emoji mapping for skills - unique icon for each skill
const skillEmojis: Record<string, string> = {
  // Main skills
  'prd-writer': '📝',
  'copywriter': '📋',
  'daily-ai-news': '📰',
  'rag-qa': '🔍',
  'agent-teams': '👥',
  'skill-learning-planner': '📖',
  'skill-creator': '🛠️',
  'superpowers': '💼',
  'meeting-summary': '🤝',
  'thesis-progress-report': '📚',
  'idea-debate': '⚖️',
  'mcp-builder': '🔧',

  // Superpowers child skills
  'brainstorming': '💡',
  'dispatching-parallel-agents': '⚡',
  'executing-plans': '🚀',
  'finishing-a-development-branch': '🌿',
  'receiving-code-review': '👀',
  'requesting-code-review': '📤',
  'subagent-driven-development': '🤖',
  'systematic-debugging': '🔧',
  'test-driven-development': '✅',
  'using-git-worktrees': '🌳',
  'using-superpowers': '✨',
  'verification-before-completion': '✔️',
  'writing-plans': '📋',
  'writing-skills': '✍️',

  // Default icon for unknown skills
  'default': '⚡'
}

function getSkillEmoji(skillId: string, isFolder?: boolean): string {
  // Skill folders get a special folder icon
  if (isFolder) return '📁'
  // Otherwise use skill-specific icon
  return skillEmojis[skillId] || skillEmojis.default
}

interface SkillCardProps {
  skill: {
    id: string
    name: string
    description?: string
    isFolder?: boolean
    children?: any[]
  }
  onClick: () => void
  isExpanded?: boolean
  isChild?: boolean
}

export function SkillCard({ skill, onClick, isExpanded, isChild }: SkillCardProps) {
  const { language, t } = useLanguage()
  const emoji = getSkillEmoji(skill.id, skill.isFolder)

  // Get Chinese name if available
  const displayName = language === 'zh' ? getSkillName(skill.id) : getSkillNameEn(skill.id)
  const childCount = skill.children?.length || 0

  return (
    <button
      onClick={onClick}
      className={`group relative flex flex-col items-center p-6 bg-white rounded-2xl border shadow-sm hover:shadow-xl hover:shadow-sky-500/10 transition-all duration-300 active:scale-95 animate-fade-in ${
        skill.isFolder
          ? 'border-amber-300 hover:border-amber-400'
          : isChild
            ? 'border-amber-200 hover:border-amber-300'
            : 'border-slate-200 hover:border-sky-300'
      } ${isChild ? 'bg-amber-50/50' : ''}`}
    >
      {/* Emoji Icon */}
      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform duration-300 ${
        skill.isFolder || isChild
          ? 'bg-gradient-to-br from-amber-50 to-orange-100'
          : 'bg-gradient-to-br from-sky-50 to-blue-100'
      }`}>
        {emoji}
      </div>

      {/* Skill Name */}
      <h3 className="text-lg font-semibold text-slate-800 mb-1 text-center">
        {displayName}
      </h3>

      {/* Folder child count */}
      {skill.isFolder && childCount > 0 && (
        <span className="text-xs text-amber-600 font-medium">
          {isExpanded ? '▼' : '▶'} {t('childCount').replace('{count}', String(childCount))}
        </span>
      )}

      {/* Hover indicator */}
      <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
        skill.isFolder || isChild
          ? 'bg-gradient-to-r from-amber-500/5 to-orange-500/5'
          : 'bg-gradient-to-r from-sky-500/5 to-blue-500/5'
      }`} />
    </button>
  )
}
