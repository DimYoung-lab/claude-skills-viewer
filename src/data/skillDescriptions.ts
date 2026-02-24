// Skill name and description mappings in Chinese
// This file provides Chinese names and descriptions for all skills

export interface SkillDescription {
  name: string;
  description: string;
}

// Main skills
export const skillDescriptions: Record<string, SkillDescription> = {
  // Main skills
  'prd-writer': {
    name: 'PRD 撰写',
    description: '帮助产品经理快速撰写专业的产品需求文档。适用于创建新功能PRD、完善需求、撰写评审文档。'
  },
  'copywriter': {
    name: '文案撰写',
    description: '提供各类文案撰写支持，包括营销文案、产品文案、广告文案等。'
  },
  'daily-ai-news': {
    name: 'AI 资讯',
    description: '从机器之心、量子位、极客公园等中文AI科技媒体汇总每日重要AI新闻。'
  },
  'rag-qa': {
    name: '文档问答',
    description: '基于PDF、Word、TXT等文档进行问答，从文档中检索信息并生成答案。'
  },
  'agent-teams': {
    name: 'Agent 团队',
    description: '用于创建和管理多个子代理协同完成复杂任务。适用于并行执行、分工协作、多源信息收集。'
  },
  'skill-creator': {
    name: '技能创建',
    description: '帮助创建和更新 Skills，扩展 Claude 的能力。提供专业的技能开发工作流程和最佳实践。'
  },
  'superpowers': {
    name: '超级能力',
    description: 'Claude Code 高级开发能力合集，包含多个子技能帮助你进行软件开发。'
  },
  'meeting-summary': {
    name: '会议纪要',
    description: '自动生成结构化的会议纪要，总结讨论要点和待办事项。'
  },
  'thesis-progress-report': {
    name: '论文进展',
    description: '帮助研究生生成论文汇报思路和口语化汇报逐字稿。支持论文写作、研究进展、文献阅读等。'
  },

  // Superpowers children skills
  'brainstorming': {
    name: '头脑风暴',
    description: '在开展任何创造性工作之前使用，包括创建功能、构建组件、添加功能或修改行为。探索用户意图、需求和设计后再实施。'
  },
  'dispatching-parallel-agents': {
    name: '并行代理调度',
    description: '协调多个子代理同时执行任务，提高工作效率。适用于需要并行处理多个独立任务的场景。'
  },
  'executing-plans': {
    name: '执行计划',
    description: '按照预定的实现计划执行开发任务，包括代码编写、测试、调试等环节。'
  },
  'finishing-a-development-branch': {
    name: '完成开发分支',
    description: '完成开发分支的所有工作，包括代码合并、冲突解决、最终测试和清理工作。'
  },
  'receiving-code-review': {
    name: '代码审查接收',
    description: '处理代码审查反馈，理解审查意见，进行必要的修改，与审查者有效沟通。'
  },
  'requesting-code-review': {
    name: '请求代码审查',
    description: '发起代码审查请求，准备审查材料，清晰地解释变更内容和原因，获取团队反馈。'
  },
  'subagent-driven-development': {
    name: '子代理驱动开发',
    description: '使用子代理进行分工协作的开发模式，将大型任务分解给多个专业代理完成。'
  },
  'systematic-debugging': {
    name: '系统调试',
    description: '系统化的调试方法论，包括问题定位、假设验证、根因分析和解决方案验证。'
  },
  'test-driven-development': {
    name: '测试驱动开发',
    description: '先写测试再写代码的开发模式，确保代码质量和可测试性。'
  },
  'using-git-worktrees': {
    name: 'Git Worktree 使用',
    description: '使用 Git worktree 同时在多个分支上工作，提高并行开发效率。'
  },
  'using-superpowers': {
    name: '使用超级能力',
    description: '了解和正确使用 Claude Code 提供的各种超级能力，提升开发效率。'
  },
  'verification-before-completion': {
    name: '完成前验证',
    description: '在完成任务前进行全面验证，确保功能正确、测试通过、文档完整。'
  },
  'writing-plans': {
    name: '撰写计划',
    description: '创建详细的实现计划，包括任务分解、时间估算、风险评估和里程碑设定。'
  },
  'writing-skills': {
    name: '编写技能',
    description: '编写和优化 Claude Skills，扩展 AI 助手的能力范围。'
  }
}

// Get skill description, returns English description if not found
export function getSkillDescription(skillId: string): SkillDescription | null {
  return skillDescriptions[skillId] || null
}

// Get Chinese name for a skill
export function getSkillName(skillId: string): string {
  return skillDescriptions[skillId]?.name || skillId
}
