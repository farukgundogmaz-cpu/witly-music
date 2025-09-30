const express = require('express');
const router = express.Router();
const deezerService = require('../services/deezer.service');
const spotifyService = require('../services/spotify.service');

/**
 * GET /api/music/search
 * Search for music across services
 */
router.get('/search', async (req, res) => {
  try {
    const { q, type = 'track', limit = 25, source = 'deezer' } = req.query;

    if (!q) {
      return res.status(400).json({
        error: 'Search query is required'
      });
    }

    let results;

    if (source === 'spotify') {
      // Spotify search
      results = await spotifyService.search(q, [type], parseInt(limit));
    } else {
      // Deezer search (default)
      results = await deezerService.search(q, type, parseInt(limit));
    }

    res.status(200).json({
      source,
      query: q,
      type,
      results
    });
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({
      error: error.message || 'Failed to search music'
    });
  }
});

/**
 * GET /api/music/track/:id
 * Get track details
 */
router.get('/track/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { source = 'deezer' } = req.query;

    let track;

    if (source === 'spotify') {
      track = await spotifyService.getTrack(id);
    } else {
      track = await deezerService.getTrack(id);
    }

    res.status(200).json({
      source,
      track
    });
  } catch (error) {
    console.error('Get track error:', error);
    res.status(500).json({
      error: error.message || 'Failed to fetch track'
    });
  }
});

/**
 * GET /api/music/artist/:id
 * Get artist details
 */
router.get('/artist/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { source = 'deezer' } = req.query;

    let artist;

    if (source === 'spotify') {
      artist = await spotifyService.getArtist(id);
    } else {
      artist = await deezerService.getArtist(id);
    }

    res.status(200).json({
      source,
      artist
    });
  } catch (error) {
    console.error('Get artist error:', error);
    res.status(500).json({
      error: error.message || 'Failed to fetch artist'
    });
  }
});

/**
 * GET /api/music/album/:id
 * Get album details
 */
router.get('/album/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { source = 'deezer' } = req.query;

    let album;

    if (source === 'spotify') {
      album = await spotifyService.getAlbum(id);
    } else {
      album = await deezerService.getAlbum(id);
    }

    res.status(200).json({
      source,
      album
    });
  } catch (error) {
    console.error('Get album error:', error);
    res.status(500).json({
      error: error.message || 'Failed to fetch album'
    });
  }
});

/**
 * GET /api/music/charts
 * Get music charts
 */
router.get('/charts', async (req, res) => {
  try {
    const { type = 'tracks', limit = 20, source = 'deezer' } = req.query;

    let charts;

    if (source === 'spotify') {
      // Spotify uses new releases as charts
      charts = await spotifyService.getNewReleases(parseInt(limit));
    } else {
      charts = await deezerService.getChart(type, parseInt(limit));
    }

    res.status(200).json({
      source,
      type,
      charts
    });
  } catch (error) {
    console.error('Get charts error:', error);
    res.status(500).json({
      error: error.message || 'Failed to fetch charts'
    });
  }
});

/**
 * GET /api/music/genres
 * Get available music genres
 */
router.get('/genres', async (req, res) => {
  try {
    const genres = await deezerService.getGenres();

    res.status(200).json({
      genres
    });
  } catch (error) {
    console.error('Get genres error:', error);
    res.status(500).json({
      error: error.message || 'Failed to fetch genres'
    });
  }
});

/**
 * GET /api/music/radio
 * Get radio stations
 */
router.get('/radio', async (req, res) => {
  try {
    const { limit = 25 } = req.query;
    const radios = await deezerService.getRadios(parseInt(limit));

    res.status(200).json({
      radios
    });
  } catch (error) {
    console.error('Get radios error:', error);
    res.status(500).json({
      error: error.message || 'Failed to fetch radios'
    });
  }
});

/**
 * GET /api/music/recommendations
 * Get personalized recommendations (Spotify only)
 */
router.get('/recommendations', async (req, res) => {
  try {
    const { seed_artists, seed_tracks, seed_genres, limit = 20 } = req.query;

    if (!seed_artists && !seed_tracks && !seed_genres) {
      return res.status(400).json({
        error: 'At least one seed parameter is required'
      });
    }

    const recommendations = await spotifyService.getRecommendations({
      seed_artists,
      seed_tracks,
      seed_genres,
      limit: parseInt(limit)
    });

    res.status(200).json({
      recommendations
    });
  } catch (error) {
    console.error('Get recommendations error:', error);
    res.status(500).json({
      error: error.message || 'Failed to fetch recommendations'
    });
  }
});

module.exports = router;
