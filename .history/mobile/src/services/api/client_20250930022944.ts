import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// API base URL - PRODUCTION
// Backend sunucuda çalışıyor
const API_BASE_URL = 'https://api1.witlydesign.com/api';

// LOCAL TEST: Aynı WiFi ağında test için
// const API_BASE_URL = 'http://192.168.1.110:3000/api';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - token ekleme
apiClient.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - hata yönetimi
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response?.status === 401) {
      // Token geçersiz, kullanıcıyı çıkart
      await AsyncStorage.removeItem('auth_token');
      await AsyncStorage.removeItem('user');
    }
    return Promise.reject(error);
  }
);
