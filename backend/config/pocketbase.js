const PocketBase = require('pocketbase/cjs');

// PocketBase client instance
const pb = new PocketBase(process.env.POCKETBASE_URL || 'https://api1.witlydesign.com');

// Auto-refresh auth token
pb.autoCancellation(false);

// Admin authentication function
async function authenticateAdmin() {
  try {
    const authData = await pb.admins.authWithPassword(
      process.env.POCKETBASE_ADMIN_EMAIL,
      process.env.POCKETBASE_ADMIN_PASSWORD
    );
    console.log('✅ PocketBase admin authenticated successfully');
    return authData;
  } catch (error) {
    console.error('❌ PocketBase admin authentication failed:', error.message);
    throw error;
  }
}

// Initialize PocketBase connection
async function initializePocketBase() {
  try {
    await authenticateAdmin();
    console.log('✅ PocketBase initialized successfully');
  } catch (error) {
    console.error('❌ Failed to initialize PocketBase:', error.message);
  }
}

// Export
module.exports = {
  pb,
  authenticateAdmin,
  initializePocketBase
};
