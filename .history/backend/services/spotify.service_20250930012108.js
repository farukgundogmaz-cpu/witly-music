const axios = require('axios');
const NodeCache = require('node-cache');

// Cache for 1 hour
const cache = new NodeCache({ stdTTL: 3600 });

const SPOTIFY_API_BASE = 'https://api.spotify.com/v1';
const SPOTIFY_AUTH_URL = 'https://accounts.spotify.com/api/token';

class SpotifyService {
  constructor() {
    this.accessToken = null;
    this.tokenExpiry = null;
  }

  /**
   * Get Spotify access token using Client Credentials flow
   */
  async getAccessToken() {
    // Return cached token if still valid
    if (this.accessToken && this.tokenExpiry && Date.now() < this.tokenExpiry) {
      return this.accessToken;
    }

    try {
      const credentials = Buffer.from(
        `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
      ).toString('base64');

      const response = await axios.post(
        SPOTIFY_AUTH_URL,
        'grant_type=client_credentials',
        {
          headers: {
            'Authorization': `Basic ${credentials}`,
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      );

      this.accessToken = response.data.access_token;
      // Set expiry to 5 minutes before actual expiry
      this.tokenExpiry = Date.now() + (response.data.expires_in - 300) * 1000;

      return this.accessToken;
    } catch (error) {
      console.error('Spotify authentication error:', error.message);
      throw new Error('Failed to authenticate with Spotify');
    }
  }

  /**
   * Make authenticated request to Spotify API
   */
  async request(endpoint, params = {}) {
    const token = await this.getAccessToken();

    try {
      const response = await axios.get(`${SPOTIFY_API_BASE}${endpoint}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        params
      });

      return response.data;
    } catch (error) {
      console.error('Spotify API error:', error.message);
      throw new Error('Failed to fetch data from Spotify');
    }
  }

  /**
   * Search for tracks, artists, albums
   */
  async search(query, types = ['track'], limit = 20) {
    const cacheKey = `spotify_search_${query}_${types.join(',')}_${limit}`;
    const cached = cache.get(cacheKey);
    
    if (cached) {
      return cached;
    }

    const result = await this.request('/search', {
      q: query,
      type: types.join(','),
      limit
    });

    cache.set(cacheKey, result);
    return result;
  }

  /**
   * Get track by ID
   */
  async getTrack(trackId) {
    const cacheKey = `spotify_track_${trackId}`;
    const cached = cache.get(cacheKey);
    
    if (cached) {
      return cached;
    }

    const result = await this.request(`/tracks/${trackId}`);
    cache.set(cacheKey, result);
    return result;
  }

  /**
   * Get artist by ID
   */
  async getArtist(artistId) {
    const cacheKey = `spotify_artist_${artistId}`;
    const cached = cache.get(cacheKey);
    
    if (cached) {
      return cached;
    }

    const result = await this.request(`/artists/${artistId}`);
    cache.set(cacheKey, result);
    return result;
  }

  /**
   * Get album by ID
   */
  async getAlbum(albumId) {
    const cacheKey = `spotify_album_${albumId}`;
    const cached = cache.get(cacheKey);
    
    if (cached) {
      return cached;
    }

    const result = await this.request(`/albums/${albumId}`);
    cache.set(cacheKey, result);
    return result;
  }

  /**
   * Get recommendations based on seed
   */
  async getRecommendations(params) {
    const cacheKey = `spotify_recommendations_${JSON.stringify(params)}`;
    const cached = cache.get(cacheKey);
    
    if (cached) {
      return cached;
    }

    const result = await this.request('/recommendations', params);
    cache.set(cacheKey, result);
    return result;
  }

  /**
   * Get new releases
   */
  async getNewReleases(limit = 20) {
    const cacheKey = `spotify_new_releases_${limit}`;
    const cached = cache.get(cacheKey);
    
    if (cached) {
      return cached;
    }

    const result = await this.request('/browse/new-releases', { limit });
    cache.set(cacheKey, result);
    return result;
  }

  /**
   * Get featured playlists
   */
  async getFeaturedPlaylists(limit = 20) {
    const cacheKey = `spotify_featured_${limit}`;
    const cached = cache.get(cacheKey);
    
    if (cached) {
      return cached;
    }

    const result = await this.request('/browse/featured-playlists', { limit });
    cache.set(cacheKey, result);
    return result;
  }
}

module.exports = new SpotifyService();
