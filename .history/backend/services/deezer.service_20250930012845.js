const axios = require('axios');
const NodeCache = require('node-cache');

// Cache for 1 hour
const cache = new NodeCache({ stdTTL: 3600 });

const DEEZER_API_BASE = 'https://api.deezer.com';

class DeezerService {
  /**
   * Search for tracks, artists, or albums
   */
  async search(query, type = 'track', limit = 25) {
    const cacheKey = `search_${type}_${query}_${limit}`;
    const cached = cache.get(cacheKey);
    
    if (cached) {
      return cached;
    }

    try {
      const response = await axios.get(`${DEEZER_API_BASE}/search/${type}`, {
        params: { q: query, limit }
      });
      
      cache.set(cacheKey, response.data);
      return response.data;
    } catch (error) {
      console.error('Deezer search error:', error.message);
      throw new Error('Failed to search music');
    }
  }

  /**
   * Get track details by ID
   */
  async getTrack(trackId) {
    const cacheKey = `track_${trackId}`;
    const cached = cache.get(cacheKey);
    
    if (cached) {
      return cached;
    }

    try {
      const response = await axios.get(`${DEEZER_API_BASE}/track/${trackId}`);
      cache.set(cacheKey, response.data);
      return response.data;
    } catch (error) {
      console.error('Deezer get track error:', error.message);
      throw new Error('Failed to fetch track details');
    }
  }

  /**
   * Get artist details and top tracks
   */
  async getArtist(artistId, includeTopTracks = true) {
    const cacheKey = `artist_${artistId}_${includeTopTracks}`;
    const cached = cache.get(cacheKey);
    
    if (cached) {
      return cached;
    }

    try {
      const [artistResponse, topTracksResponse] = await Promise.all([
        axios.get(`${DEEZER_API_BASE}/artist/${artistId}`),
        includeTopTracks ? axios.get(`${DEEZER_API_BASE}/artist/${artistId}/top`) : null
      ]);

      const result = {
        artist: artistResponse.data,
        topTracks: topTracksResponse?.data || null
      };

      cache.set(cacheKey, result);
      return result;
    } catch (error) {
      console.error('Deezer get artist error:', error.message);
      throw new Error('Failed to fetch artist details');
    }
  }

  /**
   * Get album details with tracks
   */
  async getAlbum(albumId) {
    const cacheKey = `album_${albumId}`;
    const cached = cache.get(cacheKey);
    
    if (cached) {
      return cached;
    }

    try {
      const response = await axios.get(`${DEEZER_API_BASE}/album/${albumId}`);
      cache.set(cacheKey, response.data);
      return response.data;
    } catch (error) {
      console.error('Deezer get album error:', error.message);
      throw new Error('Failed to fetch album details');
    }
  }

  /**
   * Get chart (top tracks, albums, artists)
   */
  async getChart(type = 'tracks', limit = 20) {
    const cacheKey = `chart_${type}_${limit}`;
    const cached = cache.get(cacheKey);
    
    if (cached) {
      return cached;
    }

    try {
      const response = await axios.get(`${DEEZER_API_BASE}/chart/0/${type}`, {
        params: { limit }
      });
      
      cache.set(cacheKey, response.data);
      return response.data;
    } catch (error) {
      console.error('Deezer get chart error:', error.message);
      throw new Error('Failed to fetch charts');
    }
  }

  /**
   * Get genre list
   */
  async getGenres() {
    const cacheKey = 'genres';
    const cached = cache.get(cacheKey);
    
    if (cached) {
      return cached;
    }

    try {
      const response = await axios.get(`${DEEZER_API_BASE}/genre`);
      cache.set(cacheKey, response.data);
      return response.data;
    } catch (error) {
      console.error('Deezer get genres error:', error.message);
      throw new Error('Failed to fetch genres');
    }
  }

  /**
   * Get radio stations
   */
  async getRadios(limit = 25) {
    const cacheKey = `radios_${limit}`;
    const cached = cache.get(cacheKey);
    
    if (cached) {
      return cached;
    }

    try {
      const response = await axios.get(`${DEEZER_API_BASE}/radio`, {
        params: { limit }
      });
      
      cache.set(cacheKey, response.data);
      return response.data;
    } catch (error) {
      console.error('Deezer get radios error:', error.message);
      throw new Error('Failed to fetch radios');
    }
  }
}

module.exports = new DeezerService();
