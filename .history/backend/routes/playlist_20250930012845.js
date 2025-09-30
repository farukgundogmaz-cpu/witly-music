const express = require('express');
const router = express.Router();
const { pb } = require('../config/pocketbase');

/**
 * Middleware to verify authentication
 */
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      error: 'Authentication required'
    });
  }

  const token = authHeader.substring(7);
  pb.authStore.save(token);

  if (!pb.authStore.isValid) {
    return res.status(401).json({
      error: 'Invalid or expired token'
    });
  }

  req.userId = pb.authStore.model.id;
  next();
};

/**
 * GET /api/playlists
 * Get all playlists for authenticated user
 */
router.get('/', authMiddleware, async (req, res) => {
  try {
    const playlists = await pb.collection('playlists').getFullList({
      filter: `user = "${req.userId}"`,
      sort: '-created',
      expand: 'tracks'
    });

    res.status(200).json({
      playlists
    });
  } catch (error) {
    console.error('Get playlists error:', error);
    res.status(500).json({
      error: 'Failed to fetch playlists'
    });
  }
});

/**
 * POST /api/playlists
 * Create a new playlist
 */
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { name, description, isPublic = false, coverImage } = req.body;

    if (!name) {
      return res.status(400).json({
        error: 'Playlist name is required'
      });
    }

    const playlist = await pb.collection('playlists').create({
      name,
      description: description || '',
      user: req.userId,
      isPublic,
      coverImage: coverImage || '',
      tracks: []
    });

    res.status(201).json({
      message: 'Playlist created successfully',
      playlist
    });
  } catch (error) {
    console.error('Create playlist error:', error);
    res.status(500).json({
      error: 'Failed to create playlist'
    });
  }
});

/**
 * GET /api/playlists/:id
 * Get playlist by ID
 */
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const playlist = await pb.collection('playlists').getOne(req.params.id, {
      expand: 'tracks,user'
    });

    // Check if user has access
    if (playlist.user !== req.userId && !playlist.isPublic) {
      return res.status(403).json({
        error: 'Access denied'
      });
    }

    res.status(200).json({
      playlist
    });
  } catch (error) {
    console.error('Get playlist error:', error);
    res.status(404).json({
      error: 'Playlist not found'
    });
  }
});

/**
 * PATCH /api/playlists/:id
 * Update playlist
 */
router.patch('/:id', authMiddleware, async (req, res) => {
  try {
    const { name, description, isPublic, coverImage } = req.body;

    // Check ownership
    const playlist = await pb.collection('playlists').getOne(req.params.id);
    if (playlist.user !== req.userId) {
      return res.status(403).json({
        error: 'Access denied'
      });
    }

    const updated = await pb.collection('playlists').update(req.params.id, {
      ...(name && { name }),
      ...(description !== undefined && { description }),
      ...(isPublic !== undefined && { isPublic }),
      ...(coverImage !== undefined && { coverImage })
    });

    res.status(200).json({
      message: 'Playlist updated successfully',
      playlist: updated
    });
  } catch (error) {
    console.error('Update playlist error:', error);
    res.status(500).json({
      error: 'Failed to update playlist'
    });
  }
});

/**
 * DELETE /api/playlists/:id
 * Delete playlist
 */
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    // Check ownership
    const playlist = await pb.collection('playlists').getOne(req.params.id);
    if (playlist.user !== req.userId) {
      return res.status(403).json({
        error: 'Access denied'
      });
    }

    await pb.collection('playlists').delete(req.params.id);

    res.status(200).json({
      message: 'Playlist deleted successfully'
    });
  } catch (error) {
    console.error('Delete playlist error:', error);
    res.status(500).json({
      error: 'Failed to delete playlist'
    });
  }
});

/**
 * POST /api/playlists/:id/tracks
 * Add track to playlist
 */
router.post('/:id/tracks', authMiddleware, async (req, res) => {
  try {
    const { trackId, trackData } = req.body;

    if (!trackId || !trackData) {
      return res.status(400).json({
        error: 'Track ID and data are required'
      });
    }

    // Check ownership
    const playlist = await pb.collection('playlists').getOne(req.params.id);
    if (playlist.user !== req.userId) {
      return res.status(403).json({
        error: 'Access denied'
      });
    }

    // Create track record
    const track = await pb.collection('tracks').create({
      externalId: trackId,
      title: trackData.title,
      artist: trackData.artist,
      album: trackData.album,
      duration: trackData.duration,
      coverImage: trackData.coverImage,
      source: trackData.source || 'deezer',
      previewUrl: trackData.previewUrl
    });

    // Add track to playlist
    const currentTracks = playlist.tracks || [];
    const updated = await pb.collection('playlists').update(req.params.id, {
      tracks: [...currentTracks, track.id]
    });

    res.status(200).json({
      message: 'Track added to playlist',
      playlist: updated
    });
  } catch (error) {
    console.error('Add track error:', error);
    res.status(500).json({
      error: 'Failed to add track to playlist'
    });
  }
});

/**
 * DELETE /api/playlists/:id/tracks/:trackId
 * Remove track from playlist
 */
router.delete('/:id/tracks/:trackId', authMiddleware, async (req, res) => {
  try {
    // Check ownership
    const playlist = await pb.collection('playlists').getOne(req.params.id);
    if (playlist.user !== req.userId) {
      return res.status(403).json({
        error: 'Access denied'
      });
    }

    // Remove track from playlist
    const currentTracks = playlist.tracks || [];
    const updated = await pb.collection('playlists').update(req.params.id, {
      tracks: currentTracks.filter(id => id !== req.params.trackId)
    });

    res.status(200).json({
      message: 'Track removed from playlist',
      playlist: updated
    });
  } catch (error) {
    console.error('Remove track error:', error);
    res.status(500).json({
      error: 'Failed to remove track from playlist'
    });
  }
});

module.exports = router;
