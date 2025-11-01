import React, { useState } from 'react';
import { Send, Sparkles } from 'lucide-react';
import { convertNLToSQL } from '../utils/api';
import { useApp } from '../context/AppContext';
import toast from 'react-hot-toast';

const QueryInput = ({ onQueryGenerated }) => {
  const { schema, currentDatabase, language } = useApp();
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || !schema) return;

    setLoading(true);
    try {
      const response = await convertNLToSQL(
        input,
        schema,
        currentDatabase.type,
        language
      );
      onQueryGenerated({
        naturalLanguage: input,
        sqlQuery: response.data.sqlQuery
      });
      setInput('');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to convert query');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="flex items-center gap-2 sm:gap-3 bg-white dark:bg-gray-900 rounded-lg sm:rounded-xl p-2 sm:p-3 lg:p-4 shadow-lg border dark:border-gray-800">
        <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-primary-purple flex-shrink-0" />
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything in natural language..."
          className="flex-1 bg-transparent outline-none dark:text-white placeholder-gray-400 text-sm sm:text-base"
          disabled={loading || !schema}
        />
        <button
          type="submit"
          disabled={loading || !input.trim() || !schema}
          className="gradient-bg p-2 sm:p-2.5 lg:p-3 rounded-md sm:rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          <Send className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
        </button>
      </div>
      {!schema && (
        <p className="text-xs text-gray-500 mt-1 sm:mt-2 ml-2 sm:ml-4">
          Please connect to a database first
        </p>
      )}
    </form>
  );
};

export default QueryInput;