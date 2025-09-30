const express = require('express');
const router = express.Router();
const { pb } = require('../config/pocketbase');

/**
 * POST /api/auth/register
 * Register a new user
 */
router.post('/register', async (req, res) => {
  try {
    const { email, password, username, name } = req.body;

    // Validate input
    if (!email || !password || !username) {
      return res.status(400).json({
        error: 'Email, username, and password are required'
      });
    }

    // Create user in PocketBase
    const user = await pb.collection('users').create({
      email,
      password,
      passwordConfirm: password,
      username,
      name: name || username,
      emailVisibility: true
    });

    // Authenticate the user
    const authData = await pb.collection('users').authWithPassword(email, password);

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: authData.record.id,
        email: authData.record.email,
        username: authData.record.username,
        name: authData.record.name
      },
      token: authData.token
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(400).json({
      error: error.message || 'Failed to register user'
    });
  }
});

/**
 * POST /api/auth/login
 * Login user
 */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: 'Email and password are required'
      });
    }

    // Authenticate with PocketBase
    const authData = await pb.collection('users').authWithPassword(email, password);

    res.status(200).json({
      message: 'Login successful',
      user: {
        id: authData.record.id,
        email: authData.record.email,
        username: authData.record.username,
        name: authData.record.name,
        avatar: authData.record.avatar
      },
      token: authData.token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(401).json({
      error: 'Invalid email or password'
    });
  }
});

/**
 * POST /api/auth/refresh
 * Refresh authentication token
 */
router.post('/refresh', async (req, res) => {
  try {
    const authData = await pb.collection('users').authRefresh();

    res.status(200).json({
      message: 'Token refreshed successfully',
      token: authData.token
    });
  } catch (error) {
    console.error('Token refresh error:', error);
    res.status(401).json({
      error: 'Failed to refresh token'
    });
  }
});

/**
 * POST /api/auth/logout
 * Logout user
 */
router.post('/logout', (req, res) => {
  pb.authStore.clear();
  res.status(200).json({
    message: 'Logout successful'
  });
});

module.exports = router;
