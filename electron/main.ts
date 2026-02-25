import { app, BrowserWindow, ipcMain } from 'electron'
import path from 'path'
import fs from 'fs'

// Initialize skills directory path
let SKILLS_DIR: string

function getSkillsDir() {
  if (!SKILLS_DIR) {
    SKILLS_DIR = path.join(app.getPath('home'), '.claude', 'skills')
  }
  return SKILLS_DIR
}

interface Skill {
  id: string
  name: string
  description: string
  frontmatterName?: string
  frontmatterDescription?: string
  path: string
  hasSkillFile: boolean
  isFolder?: boolean
  children?: Skill[]
}

// Parse YAML frontmatter from SKILL.md content
function parseFrontmatter(content: string): { name?: string; description?: string } {
  const result: { name?: string; description?: string } = {}

  // Check if content starts with ---
  if (!content.startsWith('---')) {
    return result
  }

  // Find the closing ---
  const endIndex = content.indexOf('---', 3)
  if (endIndex === -1) {
    return result
  }

  const frontmatter = content.substring(3, endIndex).trim()

  // Parse YAML lines
  const lines = frontmatter.split('\n')
  for (const line of lines) {
    const colonIndex = line.indexOf(':')
    if (colonIndex === -1) continue

    const key = line.substring(0, colonIndex).trim()
    let value = line.substring(colonIndex + 1).trim()

    // Remove quotes if present
    if ((value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1)
    }

    if (key === 'name') {
      result.name = value
    } else if (key === 'description') {
      result.description = value
    }
  }

  return result
}

function getAllSkills(): Skill[] {
  const skills: Skill[] = []
  const skillsDir = getSkillsDir()

  try {
    if (!fs.existsSync(skillsDir)) {
      console.log('Skills directory does not exist:', skillsDir)
      return skills
    }

    const entries = fs.readdirSync(skillsDir, { withFileTypes: true })

    for (const entry of entries) {
      if (!entry.isDirectory()) continue

      const skillPath = path.join(skillsDir, entry.name)
      const skillName = entry.name

      // Check if this is a skill folder (contains subdirectories with SKILL.md)
      const childSkills = getChildSkills(skillPath)

      // Look for SKILL.md in the skill folder
      let description = ''
      let frontmatterName: string | undefined
      let frontmatterDescription: string | undefined
      const skillMdPath = path.join(skillPath, 'SKILL.md')
      if (fs.existsSync(skillMdPath)) {
        const content = fs.readFileSync(skillMdPath, 'utf-8')

        // Parse frontmatter
        const fm = parseFrontmatter(content)
        if (fm.name) {
          frontmatterName = fm.name
        }
        if (fm.description) {
          frontmatterDescription = fm.description
        }

        // Get first 500 chars as fallback description
        description = content.substring(0, 500).replace(/[#*`\n]/g, ' ').trim()
        if (content.length > 200) description += '...'
      }

      // Check if .skill file exists
      const skillFilePath = path.join(skillsDir, `${skillName}.skill`)
      const hasSkillFile = fs.existsSync(skillFilePath)

      // If it has child skills, treat it as a folder
      const isFolder = childSkills.length > 0

      const skill: Skill = {
        id: skillName,
        name: formatSkillName(skillName),
        description: description || (isFolder ? '' : ''),
        frontmatterName,
        frontmatterDescription,
        path: skillPath,
        hasSkillFile,
        isFolder,
        children: isFolder ? childSkills : undefined
      }

      skills.push(skill)
    }
  } catch (error) {
    console.error('Error reading skills:', error)
  }

  return skills.sort((a, b) => a.name.localeCompare(b.name))
}

// Recursively get child skills from a folder
// Only folders containing SKILL.md are considered real skills
function getChildSkills(folderPath: string): Skill[] {
  const children: Skill[] = []

  try {
    if (!fs.existsSync(folderPath)) {
      return children
    }

    const entries = fs.readdirSync(folderPath, { withFileTypes: true })

    for (const entry of entries) {
      if (!entry.isDirectory()) continue

      const childPath = path.join(folderPath, entry.name)

      // Only consider folders that contain SKILL.md as real skills
      const skillMdPath = path.join(childPath, 'SKILL.md')
      if (!fs.existsSync(skillMdPath)) {
        // Skip non-skill directories like assets, references, scripts
        continue
      }

      // This is a real skill folder, read its description
      let description = ''
      let frontmatterName: string | undefined
      let frontmatterDescription: string | undefined
      const content = fs.readFileSync(skillMdPath, 'utf-8')

      // Parse frontmatter
      const fm = parseFrontmatter(content)
      if (fm.name) {
        frontmatterName = fm.name
      }
      if (fm.description) {
        frontmatterDescription = fm.description
      }

      description = content.substring(0, 200).replace(/[#*`\n]/g, ' ').trim()
      if (content.length > 200) description += '...'

      children.push({
        id: entry.name,
        name: formatSkillName(entry.name),
        description,
        frontmatterName,
        frontmatterDescription,
        path: childPath,
        hasSkillFile: false,
        isFolder: false,
        children: undefined
      })
    }
  } catch (error) {
    console.error('Error reading child skills:', error)
  }

  return children.sort((a, b) => a.name.localeCompare(b.name))
}

function formatSkillName(name: string): string {
  // Convert kebab-case or snake_case to Title Case
  return name
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase())
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    },
    title: 'Claude Skills Viewer',
    backgroundColor: '#f8fafc'
  })

  // Load the app
  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL)
    win.webContents.openDevTools()
  } else {
    win.loadFile(path.join(__dirname, '../dist/index.html'))
  }
}

// IPC Handlers
ipcMain.handle('get-skills', () => {
  return getAllSkills()
})

ipcMain.handle('refresh-skills', () => {
  return getAllSkills()
})

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
