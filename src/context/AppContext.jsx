import React, { createContext, useContext, useState, useEffect } from 'react';
import { getFromStorage, saveToStorage } from '../utils/storage';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [theme, setTheme] = useState(getFromStorage('theme') || 'dark');
  const [connectionId, setConnectionId] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [currentDatabase, setCurrentDatabase] = useState(null);
  const [schema, setSchema] = useState(null);
  const [queryHistory, setQueryHistory] = useState(getFromStorage('queryHistory') || []);
  const [apiKey, setApiKey] = useState(getFromStorage('apiKey') || '');
  const [language, setLanguage] = useState(getFromStorage('language') || 'en');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    saveToStorage('theme', theme);
  }, [theme]);

  useEffect(() => {
    saveToStorage('queryHistory', queryHistory);
  }, [queryHistory]);

  useEffect(() => {
    saveToStorage('apiKey', apiKey);
  }, [apiKey]);

  useEffect(() => {
    saveToStorage('language', language);
  }, [language]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const addToHistory = (query) => {
    const historyItem = {
      id: Date.now(),
      ...query,
      timestamp: new Date().toISOString()
    };
    setQueryHistory(prev => [historyItem, ...prev].slice(0, 50)); // Keep last 50
  };

  const clearHistory = () => {
    setQueryHistory([]);
  };

  const value = {
    theme,
    toggleTheme,
    connectionId,
    setConnectionId,
    isConnected,
    setIsConnected,
    currentDatabase,
    setCurrentDatabase,
    schema,
    setSchema,
    queryHistory,
    addToHistory,
    clearHistory,
    apiKey,
    setApiKey,
    language,
    setLanguage
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};