import axios from 'axios';
import { store } from '@store/store';

export const api = axios.create({
  baseURL: 'https://api.chat2cv.app',
  timeout: 10000
});

api.interceptors.request.use((config) => {
  const token = store.getState().auth.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = async (email: string, password: string) => {
  const { data } = await api.post('/auth/login', { email, password });
  return data;
};

export const signup = async (name: string, email: string, password: string) => {
  const { data } = await api.post('/auth/signup', { name, email, password });
  return data;
};

export const requestPasswordReset = async (email: string) => {
  await api.post('/auth/forgot', { email });
};

export const fetchKeywordSuggestions = async (profileId: string) => {
  const { data } = await api.post('/llm/improve', { profileId });
  return data;
};
