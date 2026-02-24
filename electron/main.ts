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
  path: string
  hasSkillFile: boolean
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

      // Look for SKILL.md in the skill folder
      let description = ''
      const skillMdPath = path.join(skillPath, 'SKILL.md')
      if (fs.existsSync(skillMdPath)) {
        const content = fs.readFileSync(skillMdPath, 'utf-8')
        // Get first 200 chars as description
        description = content.substring(0, 200).replace(/[#*`\n]/g, ' ').trim()
        if (content.length > 200) description += '...'
      }

      // Check if .skill file exists
      const skillFilePath = path.join(skillsDir, `${skillName}.skill`)
      const hasSkillFile = fs.existsSync(skillFilePath)

      skills.push({
        id: skillName,
        name: formatSkillName(skillName),
        description,
        path: skillPath,
        hasSkillFile
      })
    }
  } catch (error) {
    console.error('Error reading skills:', error)
  }

  return skills.sort((a, b) => a.name.localeCompare(b.name))
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
