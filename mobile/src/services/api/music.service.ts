import { apiClient } from './client';

export const musicService = {
  async search(query: string, type: string = 'track', limit: number = 25, source: string = 'deezer') {
    const response = await apiClient.get('/music/search', {
      params: { q: query, type, limit, source },
    });
    return response.data;
  },

  async getTrack(id: string, source: string = 'deezer') {
    const response = await apiClient.get(`/music/track/${id}`, {
      params: { source },
    });
    return response.data;
  },

  async getArtist(id: string, source: string = 'deezer') {
    const response = await apiClient.get(`/music/artist/${id}`, {
      params: { source },
    });
    return response.data;
  },

  async getAlbum(id: string, source: string = 'deezer') {
    const response = await apiClient.get(`/music/album/${id}`, {
      params: { source },
    });
    return response.data;
  },

  async getCharts(type: string = 'tracks', limit: number = 20, source: string = 'deezer') {
    const response = await apiClient.get('/music/charts', {
      params: { type, limit, source },
    });
    return response.data;
  },

  async getGenres() {
    const response = await apiClient.get('/music/genres');
    return response.data;
  },

  async getRadios(limit: number = 25) {
    const response = await apiClient.get('/music/radio', {
      params: { limit },
    });
    return response.data;
  },

  async getRecommendations(params: any) {
    const response = await apiClient.get('/music/recommendations', {
      params,
    });
    return response.data;
  },
};
