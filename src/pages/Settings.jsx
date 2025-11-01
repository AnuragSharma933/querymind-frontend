import React, { useState } from 'react';
import { Save, Key, Globe } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { useApp } from '../context/AppContext';
import toast from 'react-hot-toast';

const Settings = () => {
  const { apiKey, setApiKey, language, setLanguage } = useApp();
  const [localApiKey, setLocalApiKey] = useState(apiKey);
  const [localLanguage, setLocalLanguage] = useState(language);

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'Hindi' },
    { code: 'hi-en', name: 'Hinglish' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'zh', name: 'Chinese' }
  ];

  const handleSave = () => {
    setApiKey(localApiKey);
    setLanguage(localLanguage);
    toast.success('Settings saved successfully!');
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="md:hidden">
        <div className="p-4 bg-white dark:bg-gray-900 border-b dark:border-gray-800">
          <h1 className="text-xl font-heading font-bold gradient-text">QueryMind AI</h1>
        </div>
      </div>
      <div className="hidden md:block">
        <Sidebar />
      </div>
      <div className="flex-1 p-4 md:p-8 overflow-auto">
        <div className="max-w-2xl">
          <h1 className="text-2xl md:text-3xl font-heading font-bold mb-6 md:mb-8 dark:text-white">
            Settings
          </h1>

          <div className="space-y-4 md:space-y-6">
            {/* API Key Section */}
            <div className="bg-white dark:bg-gray-900 rounded-xl p-4 md:p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <Key className="w-6 h-6 gradient-text" />
                <h2 className="text-xl font-heading font-semibold dark:text-white">
                  OpenRouter API Key
                </h2>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Get your API key from{' '}
                <a
                  href="https://openrouter.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-purple hover:underline"
                >
                  openrouter.ai
                </a>
              </p>
              <input
                type="password"
                value={localApiKey}
                onChange={(e) => setLocalApiKey(e.target.value)}
                placeholder="sk-..."
                className="w-full px-4 py-3 rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-primary-purple outline-none"
              />
            </div>

            {/* Language Section */}
            <div className="bg-white dark:bg-gray-900 rounded-xl p-4 md:p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <Globe className="w-6 h-6 gradient-text" />
                <h2 className="text-xl font-heading font-semibold dark:text-white">
                  Preferred Language
                </h2>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Select your preferred language for natural language input
              </p>
              <select
                value={localLanguage}
                onChange={(e) => setLocalLanguage(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-primary-purple outline-none"
              >
                {languages.map(lang => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={handleSave}
              className="w-full gradient-bg text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            >
              <Save className="w-5 h-5" />
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;