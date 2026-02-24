import { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import type { Language, LanguageContextType } from '../types'
import zhTranslations from '../i18n/zh.json'
import enTranslations from '../i18n/en.json'

const translations = {
  zh: zhTranslations,
  en: enTranslations
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const stored = localStorage.getItem('claude-skills-viewer-language')
    return (stored === 'en' ? 'en' : 'zh') as Language
  })

  const t = useCallback((key: string): string => {
    return translations[language][key as keyof typeof translations.zh] || key
  }, [language])

  const handleSetLanguage = useCallback((lang: Language) => {
    setLanguage(lang)
    localStorage.setItem('claude-skills-viewer-language', lang)
  }, [])

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
