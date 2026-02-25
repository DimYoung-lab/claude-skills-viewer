import { useEffect } from 'react'
import type { Skill } from '../types'
import { useLanguage } from '../context/LanguageContext'
import { getSkillName, getSkillNameEn, getSkillDescription, skillDescriptions } from '../data/skillDescriptions'

// Check if a skill is external (not in the mapping)
function isExternalSkill(skillId: string): boolean {
  return !skillDescriptions[skillId]
}

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

// Default emojis for unmapped skills (generated from skill name)
const defaultEmojis = ['🎯', '💎', '🚀', '🌟', '🔮', '📦', '🎨', '🛠️', '💡', '🎭', '📚', '🔒', '⚙️', '🌈', '🎪', '🏆', '🎲', '📱', '💻', '🌐']

function getSkillEmoji(skillId: string, isFolder?: boolean): string {
  if (isFolder) return '📁'
  // Use skill-specific icon if mapped
  if (skillEmojis[skillId]) return skillEmojis[skillId]
  // Generate a consistent emoji based on skill name hash
  const hash = skillId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  return defaultEmojis[hash % defaultEmojis.length]
}

interface SkillModalProps {
  skill: Skill | null
  onClose: () => void
  isChild?: boolean
}

export function SkillModal({ skill, onClose, isChild }: SkillModalProps) {
  const { language, t } = useLanguage()

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [onClose])

  if (!skill) return null

  const emoji = getSkillEmoji(skill.id, skill.isFolder)
  const external = isExternalSkill(skill.id)

  // Get name and description based on language
  const skillDesc = getSkillDescription(skill.id)
  // Use mapping first, then fallback to frontmatter or formatted id
  const mappedName = language === 'zh' ? getSkillName(skill.id) : getSkillNameEn(skill.id)
  const displayName = mappedName !== skill.id ? mappedName : (skill.frontmatterName || skill.name)

  // Use mapping description first, then fallback to frontmatterDescription or skill.description
  let displayDesc = language === 'zh'
    ? skillDesc?.description
    : skillDesc?.descriptionEn || skill.frontmatterDescription || skill.description

  // Clean and truncate description for better display
  if (displayDesc) {
    // Replace multiple whitespace/newlines with single space
    displayDesc = displayDesc.replace(/\s+/g, ' ').trim()
    // Truncate to 300 characters with ellipsis
    const maxLength = 300
    if (displayDesc.length > maxLength) {
      displayDesc = displayDesc.substring(0, maxLength) + '...'
    }
  }

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
        <div className={`h-24 ${
          (skill.isFolder && external) || (isChild && external)
            ? 'bg-gradient-to-r from-purple-500 to-violet-600'
            : skill.isFolder || isChild
              ? 'bg-gradient-to-r from-amber-500 to-orange-600'
              : external
                ? 'bg-gradient-to-r from-purple-500 to-violet-600'
                : 'bg-gradient-to-r from-sky-500 to-blue-600'
        }`} />

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
            {displayName}
          </h2>

          {/* External skill badge - show for all external skills including folders */}
          {external && (
            <span className="inline-block px-2 py-1 text-xs font-medium bg-purple-100 text-purple-700 rounded-full mb-3">
              {t('externalSkill')}
            </span>
          )}

          {/* Description - show full description without truncation */}
          <p className="text-slate-600 mb-6 leading-relaxed whitespace-pre-wrap">
            {displayDesc || (language === 'zh' ? '暂无描述' : 'No description available')}
          </p>

          {/* Children list for folders */}
          {skill.isFolder && skill.children && skill.children.length > 0 && (
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-slate-700 mb-2">
                {t('childSkills')}
              </h3>
              <div className="flex flex-wrap gap-2">
                {skill.children.map(child => {
                  const childExternal = isExternalSkill(child.id)
                  return (
                    <span
                      key={child.id}
                      className={`px-2 py-1 text-xs rounded-full ${
                        childExternal
                          ? 'bg-purple-100 text-purple-700'
                          : 'bg-amber-100 text-amber-700'
                      }`}
                    >
                      {language === 'zh' ? getSkillName(child.id) : getSkillNameEn(child.id)}
                    </span>
                  )
                })}
              </div>
            </div>
          )}

          {/* Path */}
          <div className="p-3 rounded-lg bg-slate-100 text-xs text-slate-500 break-all">
            {skill.path}
          </div>
        </div>
      </div>
    </div>
  )
}
