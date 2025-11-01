import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://querymind-backend.onrender.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const connectDatabase = async (config) => {
  const response = await api.post('/database/connect', config);
  return response.data;
};

export const executeQuery = async (connectionId, query) => {
  const response = await api.post('/database/execute', { connectionId, query });
  return response.data;
};

export const executeUserQuery = async (dbConfig, query) => {
  const response = await api.post('/query/execute', {
    host: dbConfig.host,
    port: dbConfig.port,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database,
    dbType: dbConfig.type,
    query
  });
  return response.data;
};

export const disconnectDatabase = async (connectionId) => {
  const response = await api.post('/database/disconnect', { connectionId });
  return response.data;
};

export const getSchema = async (connectionId) => {
  const response = await api.post('/schema/analyze', { connectionId });
  return response.data;
};

export const convertNLToSQL = async (naturalLanguage, schema, dbType, language) => {
  const response = await api.post('/query/convert', {
    naturalLanguage,
    schema,
    dbType,
    language
  });
  return response.data;
};

export const optimizeQuery = async (sqlQuery, dbType) => {
  const response = await api.post('/query/optimize', { sqlQuery, dbType });
  return response.data;
};

export const getSuggestions = async (sqlQuery, schema, dbType) => {
  const response = await api.post('/query/suggestions', { sqlQuery, schema, dbType });
  return response.data;
};

export default api;