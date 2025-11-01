import React from 'react';
import { Clock, Trash2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatDate, truncateText } from '../utils/helpers';

const QueryHistory = ({ onSelectQuery }) => {
  const { queryHistory, clearHistory } = useApp();
  
  const handleQueryClick = (item) => {
    if (onSelectQuery) {
      onSelectQuery(item);
    }
    // Copy to clipboard
    navigator.clipboard.writeText(item.naturalLanguage);
    // You could also navigate to dashboard here
  };

  if (queryHistory.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
        <Clock className="w-12 h-12 mx-auto mb-3 opacity-50" />
        <p>No query history yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold dark:text-white">Recent Queries</h3>
        <button
          onClick={clearHistory}
          className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700 dark:text-red-400"
        >
          <Trash2 className="w-4 h-4" />
          Clear All
        </button>
      </div>

      <div className="space-y-2">
        {queryHistory.map(item => (
          <div
            key={item.id}
            onClick={() => handleQueryClick(item)}
            className="p-3 md:p-4 bg-white dark:bg-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors border dark:border-gray-700"
          >
            <p className="text-sm font-medium dark:text-white mb-1">
              {truncateText(item.naturalLanguage, 60)}
            </p>
            <code className="text-xs text-gray-600 dark:text-gray-400 block mb-2">
              {truncateText(item.sqlQuery, 80)}
            </code>
            <span className="text-xs text-gray-500 dark:text-gray-500">
              {formatDate(item.timestamp)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QueryHistory;