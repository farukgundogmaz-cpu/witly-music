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
 * GET /api/users/me
 * Get current user profile
 */
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = await pb.collection('users').getOne(req.userId);

    res.status(200).json({
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        name: user.name,
        avatar: user.avatar,
        created: user.created,
        updated: user.updated
      }
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      error: 'Failed to fetch user profile'
    });
  }
});

/**
 * PATCH /api/users/me
 * Update user profile
 */
router.patch('/me', authMiddleware, async (req, res) => {
  try {
    const { name, username, avatar } = req.body;

    const updated = await pb.collection('users').update(req.userId, {
      ...(name && { name }),
      ...(username && { username }),
      ...(avatar && { avatar })
    });

    res.status(200).json({
      message: 'Profile updated successfully',
      user: {
        id: updated.id,
        email: updated.email,
        username: updated.username,
        name: updated.name,
        avatar: updated.avatar
      }
    });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({
      error: 'Failed to update profile'
    });
  }
});

/**
 * GET /api/users/me/favorites
 * Get user's favorite tracks
 */
router.get('/me/favorites', authMiddleware, async (req, res) => {
  try {
    const favorites = await pb.collection('favorites').getFullList({
      filter: `user = "${req.userId}"`,
      sort: '-created',
      expand: 'track'
    });

    res.status(200).json({
      favorites
    });
  } catch (error) {
    console.error('Get favorites error:', error);
    res.status(500).json({
      error: 'Failed to fetch favorites'
    });
  }
});

/**
 * POST /api/users/me/favorites
 * Add track to favorites
 */
router.post('/me/favorites', authMiddleware, async (req, res) => {
  try {
    const { trackId, trackData } = req.body;

    if (!trackId || !trackData) {
      return res.status(400).json({
        error: 'Track ID and data are required'
      });
    }

    // Check if already favorited
    const existing = await pb.collection('favorites').getFullList({
      filter: `user = "${req.userId}" && track.externalId = "${trackId}"`
    });

    if (existing.length > 0) {
      return res.status(400).json({
        error: 'Track already in favorites'
      });
    }

    // Create or find track
    let track;
    const existingTrack = await pb.collection('tracks').getFullList({
      filter: `externalId = "${trackId}"`
    });

    if (existingTrack.length > 0) {
      track = existingTrack[0];
    } else {
      track = await pb.collection('tracks').create({
        externalId: trackId,
        title: trackData.title,
        artist: trackData.artist,
        album: trackData.album,
        duration: trackData.duration,
        coverImage: trackData.coverImage,
        source: trackData.source || 'deezer',
        previewUrl: trackData.previewUrl
      });
    }

    // Add to favorites
    const favorite = await pb.collection('favorites').create({
      user: req.userId,
      track: track.id
    });

    res.status(201).json({
      message: 'Track added to favorites',
      favorite
    });
  } catch (error) {
    console.error('Add favorite error:', error);
    res.status(500).json({
      error: 'Failed to add favorite'
    });
  }
});

/**
 * DELETE /api/users/me/favorites/:trackId
 * Remove track from favorites
 */
router.delete('/me/favorites/:trackId', authMiddleware, async (req, res) => {
  try {
    const favorites = await pb.collection('favorites').getFullList({
      filter: `user = "${req.userId}" && track.externalId = "${req.params.trackId}"`,
      expand: 'track'
    });

    if (favorites.length === 0) {
      return res.status(404).json({
        error: 'Favorite not found'
      });
    }

    await pb.collection('favorites').delete(favorites[0].id);

    res.status(200).json({
      message: 'Track removed from favorites'
    });
  } catch (error) {
    console.error('Remove favorite error:', error);
    res.status(500).json({
      error: 'Failed to remove favorite'
    });
  }
});

/**
 * GET /api/users/me/listening-history
 * Get user's listening history
 */
router.get('/me/listening-history', authMiddleware, async (req, res) => {
  try {
    const { limit = 50 } = req.query;

    const history = await pb.collection('listening_history').getFullList({
      filter: `user = "${req.userId}"`,
      sort: '-created',
      limit: parseInt(limit),
      expand: 'track'
    });

    res.status(200).json({
      history
    });
  } catch (error) {
    console.error('Get history error:', error);
    res.status(500).json({
      error: 'Failed to fetch listening history'
    });
  }
});

/**
 * POST /api/users/me/listening-history
 * Add track to listening history
 */
router.post('/me/listening-history', authMiddleware, async (req, res) => {
  try {
    const { trackId, trackData } = req.body;

    if (!trackId || !trackData) {
      return res.status(400).json({
        error: 'Track ID and data are required'
      });
    }

    // Create or find track
    let track;
    const existingTrack = await pb.collection('tracks').getFullList({
      filter: `externalId = "${trackId}"`
    });

    if (existingTrack.length > 0) {
      track = existingTrack[0];
    } else {
      track = await pb.collection('tracks').create({
        externalId: trackId,
        title: trackData.title,
        artist: trackData.artist,
        album: trackData.album,
        duration: trackData.duration,
        coverImage: trackData.coverImage,
        source: trackData.source || 'deezer',
        previewUrl: trackData.previewUrl
      });
    }

    // Add to history
    const historyEntry = await pb.collection('listening_history').create({
      user: req.userId,
      track: track.id
    });

    res.status(201).json({
      message: 'Added to listening history',
      historyEntry
    });
  } catch (error) {
    console.error('Add history error:', error);
    res.status(500).json({
      error: 'Failed to add to history'
    });
  }
});

module.exports = router;
