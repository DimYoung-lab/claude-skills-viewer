import { contextBridge, ipcRenderer } from 'electron'

interface Skill {
  id: string
  name: string
  description: string
  path: string
  hasSkillFile: boolean
}

contextBridge.exposeInMainWorld('electronAPI', {
  getSkills: (): Promise<Skill[]> => ipcRenderer.invoke('get-skills'),
  refreshSkills: (): Promise<Skill[]> => ipcRenderer.invoke('refresh-skills')
})
