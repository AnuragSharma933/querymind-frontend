import React, { useState } from 'react';
import { Lightbulb, Zap } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import QueryInput from '../components/QueryInput';
import ResultTable from '../components/ResultTable';
import DatabaseConnection from '../components/DatabaseConnection';
import LoadingSpinner from '../components/LoadingSpinner';
import { useApp } from '../context/AppContext';
import { executeQuery, executeUserQuery, optimizeQuery, getSuggestions } from '../utils/api';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const { connectionId, isConnected, schema, currentDatabase, addToHistory } = useApp();
  const [dbConfig, setDbConfig] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  const handleQueryGenerated = async (query) => {
    setMessages(prev => [...prev, {
      type: 'user',
      content: query.naturalLanguage
    }]);

    setLoading(true);
    setSuggestions([]); // Clear previous suggestions
    
    try {
      // Execute query using user's database config
      const response = dbConfig ? 
        await executeUserQuery(dbConfig, query.sqlQuery) :
        await executeQuery(connectionId, query.sqlQuery);
      
      setMessages(prev => [...prev, {
        type: 'assistant',
        sqlQuery: query.sqlQuery,
        results: response.data.results,
        rowCount: response.data.rowCount
      }]);

      // Add to history
      addToHistory({
        naturalLanguage: query.naturalLanguage,
        sqlQuery: query.sqlQuery,
        rowCount: response.data.rowCount
      });

      // Only show suggestions if results are empty or very few
      if (response.data.results.length === 0 || response.data.results.length < 3) {
        try {
          const suggestionsResponse = await getSuggestions(
            query.sqlQuery,
            schema,
            currentDatabase.type
          );
          setSuggestions(suggestionsResponse.data.suggestions);
        } catch (error) {
          console.error('Failed to get suggestions:', error);
        }
      }

    } catch (error) {
      toast.error(error.response?.data?.error || 'Query execution failed');
      setMessages(prev => [...prev, {
        type: 'error',
        content: error.response?.data?.error || 'Query execution failed'
      }]);
      
      // Show suggestions on error
      try {
        const suggestionsResponse = await getSuggestions(
          query.sqlQuery,
          schema,
          currentDatabase.type
        );
        setSuggestions(suggestionsResponse.data.suggestions);
      } catch (error) {
        console.error('Failed to get suggestions:', error);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleOptimize = async (sqlQuery) => {
    try {
      const response = await optimizeQuery(sqlQuery, currentDatabase.type);
      toast.success('Query optimized!');
      setMessages(prev => [...prev, {
        type: 'optimization',
        content: response.data
      }]);
    } catch (error) {
      toast.error('Optimization failed');
    }
  };

  if (!isConnected) {
    return (
      <div className="flex flex-col lg:flex-row min-h-screen">
        <div className="lg:hidden">
          <div className="p-3 sm:p-4 bg-white dark:bg-gray-900 border-b dark:border-gray-800">
            <h1 className="text-lg sm:text-xl font-heading font-bold gradient-text">QueryMind AI</h1>
          </div>
        </div>
        <div className="hidden lg:block">
          <Sidebar />
        </div>
        <div className="flex-1 p-3 sm:p-4 lg:p-6 xl:p-8 overflow-auto">
          <div className="max-w-xl lg:max-w-2xl mx-auto">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-heading font-bold mb-4 sm:mb-6 lg:mb-8 dark:text-white">
              Connect to Database
            </h1>
            <DatabaseConnection onConfigChange={setDbConfig} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      <div className="lg:hidden">
        <div className="p-2 sm:p-3 bg-white dark:bg-gray-900 border-b dark:border-gray-800">
          <h1 className="text-base sm:text-lg font-heading font-bold gradient-text">QueryMind AI</h1>
        </div>
      </div>
      <div className="hidden lg:block">
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-2 sm:p-3 lg:p-4 xl:p-6 space-y-3 sm:space-y-4 lg:space-y-6">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <Lightbulb className="w-16 h-16 mx-auto mb-4 text-primary-purple opacity-50" />
                <h2 className="text-2xl font-heading font-semibold mb-2 dark:text-white">
                  Ask me anything
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Start by typing a natural language query below
                </p>
              </div>
            </div>
          ) : (
            messages.map((msg, idx) => (
              <div key={idx}>
                {msg.type === 'user' && (
                  <div className="flex justify-end">
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl px-6 py-4 max-w-2xl">
                      <p className="dark:text-white">{msg.content}</p>
                    </div>
                  </div>
                )}

                {msg.type === 'assistant' && (
                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-primary-pink/10 to-primary-purple/10 rounded-2xl p-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-semibold gradient-text">
                          Generated SQL
                        </span>
                        <button
                          onClick={() => handleOptimize(msg.sqlQuery)}
                          className="flex items-center gap-2 text-sm text-primary-purple hover:text-primary-pink transition-colors"
                        >
                          <Zap className="w-4 h-4" />
                          Optimize
                        </button>
                      </div>
                      <code className="block bg-black dark:bg-gray-900 text-white p-4 rounded-lg text-sm overflow-x-auto">
                        {msg.sqlQuery}
                      </code>
                    </div>

                    <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg">
                      <h3 className="text-lg font-semibold mb-4 dark:text-white">
                        Results ({msg.rowCount} rows)
                      </h3>
                      <ResultTable data={msg.results} />
                    </div>
                  </div>
                )}

                {msg.type === 'optimization' && (
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6">
                    <h3 className="text-lg font-semibold mb-3 text-blue-900 dark:text-blue-300">
                      Optimization Suggestions
                    </h3>
                    <code className="block bg-black dark:bg-gray-900 text-white p-4 rounded-lg text-sm mb-4">
                      {msg.content.optimizedQuery}
                    </code>
                    <div className="space-y-2">
                      {msg.content.improvements?.map((imp, i) => (
                        <p key={i} className="text-sm text-gray-700 dark:text-gray-300">
                          • {imp}
                        </p>
                      ))}
                    </div>
                  </div>
                )}

                {msg.type === 'error' && (
                  <div className="bg-red-50 dark:bg-red-900/20 rounded-2xl p-6">
                    <p className="text-red-600 dark:text-red-400">{msg.content}</p>
                  </div>
                )}
              </div>
            ))
          )}

          {loading && (
            <div className="flex justify-center">
              <LoadingSpinner text="Processing query..." />
            </div>
          )}

          {suggestions.length > 0 && (
            <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-3 text-yellow-900 dark:text-yellow-300">
                💡 Suggestions
              </h3>
              <ul className="space-y-2">
                {suggestions.map((suggestion, idx) => (
                  <li key={idx} className="text-sm text-gray-700 dark:text-gray-300">
                    • {suggestion}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-2 sm:p-3 lg:p-4 xl:p-6 border-t dark:border-gray-800">
          <QueryInput onQueryGenerated={handleQueryGenerated} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;