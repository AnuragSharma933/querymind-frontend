import React, { useState } from 'react';
import { Database, Loader2, RefreshCw, X } from 'lucide-react';
import { connectDatabase, getSchema, disconnectDatabase } from '../utils/api';
import { useApp } from '../context/AppContext';
import toast from 'react-hot-toast';

const DatabaseConnection = () => {
  const { connectionId, setConnectionId, setIsConnected, setCurrentDatabase, setSchema, isConnected } = useApp();
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [config, setConfig] = useState({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    user: '',
    password: '',
    database: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await connectDatabase(config);
      setConnectionId(response.data.connectionId);
      setIsConnected(true);
      setCurrentDatabase({ name: config.database, type: config.type });

      // Fetch schema
      const schemaResponse = await getSchema(response.data.connectionId);
      setSchema(schemaResponse.data.schema);

      toast.success('Connected successfully!');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Connection failed');
    } finally {
      setLoading(false);
    }
  };

  const handleRefreshSchema = async () => {
    if (!connectionId) return;
    setRefreshing(true);
    try {
      const schemaResponse = await getSchema(connectionId);
      setSchema(schemaResponse.data.schema);
      toast.success('Schema refreshed!');
    } catch (error) {
      toast.error('Failed to refresh schema');
    } finally {
      setRefreshing(false);
    }
  };

  const handleDisconnect = async () => {
    if (!connectionId) return;
    try {
      await disconnectDatabase(connectionId);
      setConnectionId(null);
      setIsConnected(false);
      setCurrentDatabase(null);
      setSchema(null);
      toast.success('Disconnected successfully!');
    } catch (error) {
      toast.error('Disconnect failed');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg md:rounded-xl p-3 sm:p-4 lg:p-6 shadow-lg max-w-full">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div className="flex items-center gap-2 sm:gap-3">
          <Database className="w-5 h-5 sm:w-6 sm:h-6 gradient-text" />
          <h2 className="text-base sm:text-lg lg:text-xl font-heading font-semibold dark:text-white">
            Database Connection
          </h2>
        </div>
        {isConnected && (
          <div className="flex gap-2">
            <button
              onClick={handleRefreshSchema}
              disabled={refreshing}
              className="p-1.5 sm:p-2 rounded-md sm:rounded-lg bg-blue-100 dark:bg-blue-900 hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
              title="Refresh Schema"
            >
              <RefreshCw className={`w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600 dark:text-blue-400 ${refreshing ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={handleDisconnect}
              className="p-1.5 sm:p-2 rounded-md sm:rounded-lg bg-red-100 dark:bg-red-900 hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
              title="Disconnect"
            >
              <X className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-600 dark:text-red-400" />
            </button>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-2.5 sm:space-y-3 lg:space-y-4">
        <div>
          <label className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2 dark:text-gray-300">
            Database Type
          </label>
          <select
            value={config.type}
            onChange={(e) => setConfig({ ...config, type: e.target.value })}
            className="w-full px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base rounded-md sm:rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-primary-purple outline-none"
          >
            <option value="mysql">MySQL</option>
            <option value="postgresql">PostgreSQL</option>
            <option value="sqlite">SQLite</option>
          </select>
        </div>

        {config.type !== 'sqlite' ? (
          <>
            <div>
              <label className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2 dark:text-gray-300">
                Host
              </label>
              <input
                type="text"
                value={config.host}
                onChange={(e) => setConfig({ ...config, host: e.target.value })}
                className="w-full px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base rounded-md sm:rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-primary-purple outline-none"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 lg:gap-4">
              <div>
                <label className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2 dark:text-gray-300">
                  Port
                </label>
                <input
                  type="number"
                  value={config.port}
                  onChange={(e) => setConfig({ ...config, port: parseInt(e.target.value) })}
                  className="w-full px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base rounded-md sm:rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-primary-purple outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2 dark:text-gray-300">
                  Username
                </label>
                <input
                  type="text"
                  value={config.user}
                  onChange={(e) => setConfig({ ...config, user: e.target.value })}
                  className="w-full px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base rounded-md sm:rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-primary-purple outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2 dark:text-gray-300">
                Password
              </label>
              <input
                type="password"
                value={config.password}
                onChange={(e) => setConfig({ ...config, password: e.target.value })}
                className="w-full px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base rounded-md sm:rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-primary-purple outline-none"
              />
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2 dark:text-gray-300">
                Database Name
              </label>
              <input
                type="text"
                value={config.database}
                onChange={(e) => setConfig({ ...config, database: e.target.value })}
                className="w-full px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base rounded-md sm:rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-primary-purple outline-none"
                required
              />
            </div>
          </>
        ) : (
          <div>
            <label className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2 dark:text-gray-300">
              Database File
            </label>
            <input
              type="text"
              placeholder="database.db"
              value={config.database}
              onChange={(e) => setConfig({ ...config, database: e.target.value, filename: e.target.value })}
              className="w-full px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base rounded-md sm:rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-primary-purple outline-none"
              required
            />
          </div>
        )}

        <button
          type="submit"
          disabled={loading || isConnected}
          className="w-full gradient-bg text-white py-2 sm:py-2.5 lg:py-3 rounded-md sm:rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2 text-sm sm:text-base"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
              <span className="hidden sm:inline">Connecting...</span>
              <span className="sm:hidden">Connecting</span>
            </>
          ) : isConnected ? (
            'Connected'
          ) : (
            'Connect'
          )}
        </button>
      </form>
    </div>
  );
};

export default DatabaseConnection;