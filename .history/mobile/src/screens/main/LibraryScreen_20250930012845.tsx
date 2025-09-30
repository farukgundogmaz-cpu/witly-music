import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { apiClient } from '../../services/api/client';

const LibraryScreen = ({ navigation }: any) => {
  const [playlists, setPlaylists] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadLibraryData();
  }, []);

  const loadLibraryData = async () => {
    try {
      const [playlistsRes, favoritesRes] = await Promise.all([
        apiClient.get('/playlists'),
        apiClient.get('/users/me/favorites'),
      ]);
      setPlaylists(playlistsRes.data.playlists || []);
      setFavorites(favoritesRes.data.favorites || []);
    } catch (error) {
      console.error('Failed to load library:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    loadLibraryData();
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1DB954" />
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} tintColor="#1DB954" />
      }>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Kitaplığım</Text>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>❤️ Favoriler</Text>
          <Text style={styles.sectionCount}>{favorites.length}</Text>
        </View>
        <TouchableOpacity style={styles.favoriteCard}>
          <Icon name="heart" size={32} color="#1DB954" />
          <Text style={styles.favoriteText}>Beğendiğim Şarkılar</Text>
          <Icon name="chevron-forward" size={20} color="#B3B3B3" />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>📝 Çalma Listeleri</Text>
          <Text style={styles.sectionCount}>{playlists.length}</Text>
        </View>

        <TouchableOpacity style={styles.createPlaylistCard}>
          <View style={styles.createPlaylistIcon}>
            <Icon name="add" size={32} color="#FFFFFF" />
          </View>
          <Text style={styles.createPlaylistText}>Çalma Listesi Oluştur</Text>
        </TouchableOpacity>

        {playlists.map((playlist: any) => (
          <TouchableOpacity key={playlist.id} style={styles.playlistItem}>
            <View style={styles.playlistIcon}>
              <Icon name="musical-notes" size={24} color="#FFFFFF" />
            </View>
            <View style={styles.playlistInfo}>
              <Text style={styles.playlistName} numberOfLines={1}>
                {playlist.name}
              </Text>
              <Text style={styles.playlistMeta} numberOfLines={1}>
                {playlist.tracks?.length || 0} şarkı
              </Text>
            </View>
            <Icon name="chevron-forward" size={20} color="#B3B3B3" />
          </TouchableOpacity>
        ))}

        {playlists.length === 0 && (
          <View style={styles.emptyState}>
            <Icon name="musical-notes-outline" size={48} color="#282828" />
            <Text style={styles.emptyStateText}>Henüz çalma listesi yok</Text>
          </View>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📊 İstatistikler</Text>
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{favorites.length}</Text>
            <Text style={styles.statLabel}>Favori</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{playlists.length}</Text>
            <Text style={styles.statLabel}>Çalma Listesi</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>0</Text>
            <Text style={styles.statLabel}>Saatlik Dinleme</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
  header: {
    padding: 24,
    paddingTop: 48,
    backgroundColor: '#1DB954',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  sectionCount: {
    fontSize: 14,
    color: '#B3B3B3',
  },
  favoriteCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#282828',
    borderRadius: 12,
    padding: 16,
  },
  favoriteText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 16,
  },
  createPlaylistCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#282828',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  createPlaylistIcon: {
    width: 56,
    height: 56,
    borderRadius: 8,
    backgroundColor: '#1DB954',
    justifyContent: 'center',
    alignItems: 'center',
  },
  createPlaylistText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 16,
  },
  playlistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  playlistIcon: {
    width: 56,
    height: 56,
    borderRadius: 8,
    backgroundColor: '#404040',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playlistInfo: {
    flex: 1,
    marginLeft: 12,
  },
  playlistName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  playlistMeta: {
    fontSize: 14,
    color: '#B3B3B3',
    marginTop: 2,
  },
  emptyState: {
    alignItems: 'center',
    padding: 32,
  },
  emptyStateText: {
    fontSize: 14,
    color: '#B3B3B3',
    marginTop: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#282828',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1DB954',
  },
  statLabel: {
    fontSize: 12,
    color: '#B3B3B3',
    marginTop: 4,
  },
});

export default LibraryScreen;
