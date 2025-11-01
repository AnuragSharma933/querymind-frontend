import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  History,
  Settings,
  FileText,
  CheckCircle,
  XCircle,
  Database as DatabaseIcon
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import ThemeToggle from './ThemeToggle';

const Sidebar = () => {
  const location = useLocation();
  const { isConnected, currentDatabase } = useApp();

  const menuItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/history', icon: History, label: 'History' },
    { path: '/settings', icon: Settings, label: 'Settings' },
    { path: '/docs', icon: FileText, label: 'Documentation' }
  ];

  return (
    <div className="w-56 lg:w-64 bg-white dark:bg-gray-900 h-screen border-r dark:border-gray-800 flex flex-col">
      <div className="p-3 lg:p-4 xl:p-6">
        <h1 className="text-lg lg:text-xl xl:text-2xl font-heading font-bold gradient-text">
          QueryMind AI
        </h1>
      </div>

      <div className="px-2 lg:px-3 xl:px-4 mb-3 lg:mb-4 xl:mb-6">
        <div className="bg-gray-50 dark:bg-gray-800 rounded-md lg:rounded-lg p-2 lg:p-3 xl:p-4">
          <div className="flex items-center justify-between mb-1 lg:mb-2">
            <span className="text-xs lg:text-sm font-medium dark:text-gray-300">
              Connection Status
            </span>
            {isConnected ? (
              <CheckCircle className="w-5 h-5 text-green-500" />
            ) : (
              <XCircle className="w-5 h-5 text-red-500" />
            )}
          </div>
          {currentDatabase && (
            <div className="flex items-center gap-1 lg:gap-2 text-xs text-gray-600 dark:text-gray-400">
              <DatabaseIcon className="w-3 h-3 lg:w-4 lg:h-4" />
              <span className="truncate">{currentDatabase.name}</span>
            </div>
          )}
        </div>
      </div>

      <nav className="flex-1 px-2 lg:px-3 xl:px-4 space-y-1">
        {menuItems.map(item => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-2 lg:gap-3 px-2 lg:px-3 xl:px-4 py-2 lg:py-2.5 xl:py-3 rounded-md lg:rounded-lg transition-colors text-xs lg:text-sm xl:text-base ${
                isActive
                  ? 'gradient-bg text-white'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-300'
              }`}
            >
              <Icon className="w-4 h-4 lg:w-5 lg:h-5" />
              <span className="font-medium truncate">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-2 lg:p-3 xl:p-4 border-t dark:border-gray-800">
        <div className="flex items-center justify-between">
          <span className="text-xs lg:text-sm dark:text-gray-400">Theme</span>
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;