import React, { useState } from 'react';
import { Download, FileJson, FileSpreadsheet } from 'lucide-react';
import { exportToCSV, exportToJSON } from '../utils/helpers';

const ExportButton = ({ data }) => {
  const [showMenu, setShowMenu] = useState(false);

  const handleExport = (format) => {
    const filename = `query_results_${Date.now()}`;
    if (format === 'csv') {
      exportToCSV(data, `${filename}.csv`);
    } else {
      exportToJSON(data, `${filename}.json`);
    }
    setShowMenu(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      >
        <Download className="w-4 h-4 dark:text-white" />
        <span className="text-sm dark:text-white">Export</span>
      </button>

      {showMenu && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border dark:border-gray-700 py-2 z-10">
          <button
            onClick={() => handleExport('csv')}
            className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <FileSpreadsheet className="w-4 h-4 text-green-600" />
            <span className="text-sm dark:text-white">Export as CSV</span>
          </button>
          <button
            onClick={() => handleExport('json')}
            className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <FileJson className="w-4 h-4 text-blue-600" />
            <span className="text-sm dark:text-white">Export as JSON</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default ExportButton;