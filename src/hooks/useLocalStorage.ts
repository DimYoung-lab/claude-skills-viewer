import { useState, useEffect, useCallback } from 'react';
import type { UsageStats, UsageRecord } from '../types';

const STORAGE_KEY = 'claude-skills-viewer-usage';

export function useLocalStorage() {
  const [usageStats, setUsageStats] = useState<UsageStats>({});

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setUsageStats(JSON.parse(stored));
      } catch {
        setUsageStats({});
      }
    }
  }, []);

  const saveToStorage = useCallback((stats: UsageStats) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
  }, []);

  const incrementUsage = useCallback((skillId: string) => {
    setUsageStats(prev => {
      const existing = prev[skillId] || { count: 0, lastUsed: '' };
      const updated: UsageRecord = {
        count: existing.count + 1,
        lastUsed: new Date().toISOString(),
      };
      const newStats = { ...prev, [skillId]: updated };
      saveToStorage(newStats);
      return newStats;
    });
  }, [saveToStorage]);

  const getUsage = useCallback((skillId: string): UsageRecord | undefined => {
    return usageStats[skillId];
  }, [usageStats]);

  return {
    usageStats,
    incrementUsage,
    getUsage,
  };
}
