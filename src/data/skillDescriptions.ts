// Skill name and description mappings
// This file provides Chinese and English names and descriptions for all skills

export interface SkillDescription {
  name: string;        // Chinese name
  nameEn: string;      // English name
  description: string; // Chinese description
  descriptionEn: string; // English description
}

// Main skills
export const skillDescriptions: Record<string, SkillDescription> = {
  // Main skills
  'prd-writer': {
    name: 'PRD 撰写',
    nameEn: 'PRD Writer',
    description: '帮助产品经理快速撰写专业的产品需求文档。适用于创建新功能PRD、完善需求、撰写评审文档。',
    descriptionEn: 'Helps product managers quickly create professional product requirement documents. Ideal for creating new feature PRDs, refining requirements, and writing review documents.'
  },
  'copywriter': {
    name: '文案撰写',
    nameEn: 'Copywriter',
    description: '提供各类文案撰写支持，包括营销文案、产品文案、广告文案等。',
    descriptionEn: 'Provides comprehensive copywriting support including marketing copy, product copy, advertising copy, and more.'
  },
  'daily-ai-news': {
    name: 'AI 资讯',
    nameEn: 'Daily AI News',
    description: '从机器之心、量子位、极客公园等中文AI科技媒体汇总每日重要AI新闻。',
    descriptionEn: 'Aggregates daily important AI news from Chinese AI tech media sources like Synced, QbitAI, and GeekPark.'
  },
  'rag-qa': {
    name: '文档问答',
    nameEn: 'RAG Q&A',
    description: '基于PDF、Word、TXT等文档进行问答，从文档中检索信息并生成答案。',
    descriptionEn: 'Q&A based on PDF, Word, TXT documents. Retrieves information from documents and generates answers.'
  },
  'agent-teams': {
    name: 'Agent 团队',
    nameEn: 'Agent Teams',
    description: '用于创建和管理多个子代理协同完成复杂任务。适用于并行执行、分工协作、多源信息收集。',
    descriptionEn: 'Create and manage multiple sub-agents to collaborate on complex tasks. Suitable for parallel execution, division of labor, and multi-source information gathering.'
  },
  'skill-creator': {
    name: '技能创建',
    nameEn: 'Skill Creator',
    description: '帮助创建和更新 Skills，扩展 Claude 的能力。提供专业的技能开发工作流程和最佳实践。',
    descriptionEn: 'Helps create and update Skills, extending Claude capabilities. Provides professional skill development workflows and best practices.'
  },
  'superpowers': {
    name: '超级能力',
    nameEn: 'Superpowers',
    description: 'Claude Code 高级开发能力合集，包含多个子技能帮助你进行软件开发。',
    descriptionEn: 'Claude Code advanced development capabilities collection, containing multiple sub-skills to help with software development.'
  },
  'meeting-summary': {
    name: '会议纪要',
    nameEn: 'Meeting Summary',
    description: '自动生成结构化的会议纪要，总结讨论要点和待办事项。',
    descriptionEn: 'Automatically generates structured meeting summaries, summarizing discussion points and action items.'
  },
  'thesis-progress-report': {
    name: '论文进展',
    nameEn: 'Thesis Progress Report',
    description: '帮助研究生生成论文汇报思路和口语化汇报逐字稿。支持论文写作、研究进展、文献阅读等。',
    descriptionEn: 'Helps graduate students generate thesis progress report ideas and speaking scripts. Supports thesis writing, research progress, literature reading, and more.'
  },

  // Superpowers children skills
  'brainstorming': {
    name: '头脑风暴',
    nameEn: 'Brainstorming',
    description: '在开展任何创造性工作之前使用，包括创建功能、构建组件、添加功能或修改行为。探索用户意图、需求和设计后再实施。',
    descriptionEn: 'Use before any creative work including creating features, building components, adding functionality, or modifying behavior. Explore user intent, requirements, and design before implementation.'
  },
  'dispatching-parallel-agents': {
    name: '并行代理调度',
    nameEn: 'Dispatching Parallel Agents',
    description: '协调多个子代理同时执行任务，提高工作效率。适用于需要并行处理多个独立任务的场景。',
    descriptionEn: 'Coordinate multiple sub-agents to execute tasks simultaneously for improved efficiency. Suitable for scenarios requiring parallel processing of multiple independent tasks.'
  },
  'executing-plans': {
    name: '执行计划',
    nameEn: 'Executing Plans',
    description: '按照预定的实现计划执行开发任务，包括代码编写、测试、调试等环节。',
    descriptionEn: 'Execute development tasks according to predetermined implementation plans, including coding, testing, debugging, and more.'
  },
  'finishing-a-development-branch': {
    name: '完成开发分支',
    nameEn: 'Finishing Development Branch',
    description: '完成开发分支的所有工作，包括代码合并、冲突解决、最终测试和清理工作。',
    descriptionEn: 'Complete all work on development branches including code merging, conflict resolution, final testing, and cleanup.'
  },
  'receiving-code-review': {
    name: '代码审查接收',
    nameEn: 'Receiving Code Review',
    description: '处理代码审查反馈，理解审查意见，进行必要的修改，与审查者有效沟通。',
    descriptionEn: 'Handle code review feedback, understand review comments, make necessary modifications, and communicate effectively with reviewers.'
  },
  'requesting-code-review': {
    name: '请求代码审查',
    nameEn: 'Requesting Code Review',
    description: '发起代码审查请求，准备审查材料，清晰地解释变更内容和原因，获取团队反馈。',
    descriptionEn: 'Initiate code review requests, prepare review materials, clearly explain changes and reasons, and get team feedback.'
  },
  'subagent-driven-development': {
    name: '子代理驱动开发',
    nameEn: 'Subagent Driven Development',
    description: '使用子代理进行分工协作的开发模式，将大型任务分解给多个专业代理完成。',
    descriptionEn: 'Development model using sub-agents for division of labor and collaboration. Breaks large tasks into multiple specialized agents.'
  },
  'systematic-debugging': {
    name: '系统调试',
    nameEn: 'Systematic Debugging',
    description: '系统化的调试方法论，包括问题定位、假设验证、根因分析和解决方案验证。',
    descriptionEn: 'Systematic debugging methodology including problem identification, hypothesis validation, root cause analysis, and solution verification.'
  },
  'test-driven-development': {
    name: '测试驱动开发',
    nameEn: 'Test Driven Development',
    description: '先写测试再写代码的开发模式，确保代码质量和可测试性。',
    descriptionEn: 'Write tests before code to ensure code quality and testability.'
  },
  'using-git-worktrees': {
    name: 'Git Worktree 使用',
    nameEn: 'Using Git Worktrees',
    description: '使用 Git worktree 同时在多个分支上工作，提高并行开发效率。',
    descriptionEn: 'Use Git worktrees to work on multiple branches simultaneously, improving parallel development efficiency.'
  },
  'using-superpowers': {
    name: '使用超级能力',
    nameEn: 'Using Superpowers',
    description: '了解和正确使用 Claude Code 提供的各种超级能力，提升开发效率。',
    descriptionEn: 'Understand and correctly use various superpowers provided by Claude Code to improve development efficiency.'
  },
  'verification-before-completion': {
    name: '完成前验证',
    nameEn: 'Verification Before Completion',
    description: '在完成任务前进行全面验证，确保功能正确、测试通过、文档完整。',
    descriptionEn: 'Perform comprehensive verification before claiming work is complete, ensuring correctness, passing tests, and complete documentation.'
  },
  'writing-plans': {
    name: '撰写计划',
    nameEn: 'Writing Plans',
    description: '创建详细的实现计划，包括任务分解、时间估算、风险评估和里程碑设定。',
    descriptionEn: 'Create detailed implementation plans including task breakdown, time estimation, risk assessment, and milestone setting.'
  },
  'writing-skills': {
    name: '编写技能',
    nameEn: 'Writing Skills',
    description: '编写和优化 Claude Skills，扩展 AI 助手的能力范围。',
    descriptionEn: 'Write and optimize Claude Skills to extend the AI assistant capabilities.'
  }
}

// Get skill description, returns null if not found
export function getSkillDescription(skillId: string): SkillDescription | null {
  return skillDescriptions[skillId] || null
}

// Get Chinese name for a skill
export function getSkillName(skillId: string): string {
  return skillDescriptions[skillId]?.name || skillId
}

// Get English name for a skill
export function getSkillNameEn(skillId: string): string {
  return skillDescriptions[skillId]?.nameEn || skillId
}
