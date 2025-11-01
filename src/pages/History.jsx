import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import QueryHistory from '../components/QueryHistory';
import { useApp } from '../context/AppContext';
import toast from 'react-hot-toast';

const History = () => {
  const { queryHistory } = useApp();
  const navigate = useNavigate();

  const handleSelectQuery = (query) => {
    // Copy to clipboard
    navigator.clipboard.writeText(query.naturalLanguage);
    toast.success('Query copied to clipboard!');
    // Navigate to dashboard
    navigate('/dashboard');
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
        <div className="max-w-4xl">
          <h1 className="text-2xl md:text-3xl font-heading font-bold mb-6 md:mb-8 dark:text-white">
            Query History
          </h1>
          <div className="bg-white dark:bg-gray-900 rounded-xl p-4 md:p-6 shadow-lg">
            <QueryHistory onSelectQuery={handleSelectQuery} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;