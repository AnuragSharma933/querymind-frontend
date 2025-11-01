import React from 'react';
import Sidebar from '../components/Sidebar';
import { Book, Zap, Database, Globe, Shield } from 'lucide-react';

const Documentation = () => {
  const sections = [
    {
      icon: Book,
      title: 'Getting Started',
      content: [
        'Connect to your database using the connection form',
        'Enter your OpenRouter API key in Settings',
        'Start typing natural language queries',
        'View and export your results'
      ]
    },
    {
      icon: Database,
      title: 'Supported Databases',
      content: [
        'MySQL - Full support for MySQL 5.7+',
        'PostgreSQL - Full support for PostgreSQL 12+',
        'SQLite - Support for SQLite 3'
      ]
    },
    {
      icon: Globe,
      title: 'Language Support',
      content: [
        'English - Native support',
        'Hindi - हिंदी में पूछें',
        'Hinglish - Mix English aur Hindi',
        'Spanish - Español completo',
        'French - Français complet',
        'Chinese - 完整的中文支持'
      ]
    },
    {
      icon: Zap,
      title: 'Features',
      content: [
        'Natural language to SQL conversion',
        'Query optimization suggestions',
        'AI-powered improvements',
        'Schema analysis',
        'Export to CSV/JSON',
        'Query history tracking'
      ]
    },
    {
      icon: Shield,
      title: 'Security',
      content: [
        'All queries are sanitized',
        'No destructive operations allowed',
        'API keys stored locally',
        'HTTPS encryption in production',
        'Rate limiting enabled'
      ]
    }
  ];

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
      <div className="flex-1 p-4 md:p-8 overflow-y-auto">
        <div className="max-w-4xl">
          <h1 className="text-2xl md:text-3xl font-heading font-bold mb-6 md:mb-8 dark:text-white">
            Documentation
          </h1>

          <div className="space-y-4 md:space-y-6">
            {sections.map((section, idx) => {
              const Icon = section.icon;
              return (
                <div
                  key={idx}
                  className="bg-white dark:bg-gray-900 rounded-xl p-4 md:p-6 shadow-lg"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="gradient-bg w-10 h-10 rounded-lg flex items-center justify-center">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-2xl font-heading font-semibold dark:text-white">
                      {section.title}
                    </h2>
                  </div>
                  <ul className="space-y-2">
                    {section.content.map((item, i) => (
                      <li
                        key={i}
                        className="text-gray-700 dark:text-gray-300 pl-4"
                      >
                        • {item}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          <div className="mt-8 bg-gradient-to-r from-primary-pink/10 to-primary-purple/10 rounded-xl p-6">
            <h3 className="text-xl font-heading font-semibold mb-3 dark:text-white">
              Example Queries
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium dark:text-gray-300 mb-1">English:</p>
                <code className="text-sm text-gray-700 dark:text-gray-400">
                  "Show me all users who registered in the last 30 days"
                </code>
              </div>
              <div>
                <p className="text-sm font-medium dark:text-gray-300 mb-1">Hindi:</p>
                <code className="text-sm text-gray-700 dark:text-gray-400">
                  "मुझे सभी यूजर्स दिखाओ जो पिछले 30 दिनों में रजिस्टर हुए"
                </code>
              </div>
              <div>
                <p className="text-sm font-medium dark:text-gray-300 mb-1">Hinglish:</p>
                <code className="text-sm text-gray-700 dark:text-gray-400">
                  "Mujhe sabhi users dikhao jo last 30 days me register hue"
                </code>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documentation;