import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { musicService } from '../../services/api/music.service';
import { usePlayer } from '../../contexts/PlayerContext';

const HomeScreen = () => {
  const [charts, setCharts] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { play } = usePlayer();

  useEffect(() => {
    loadHomeData();
  }, []);

  const loadHomeData = async () => {
    try {
      const chartsData = await musicService.getCharts('tracks', 20);
      setCharts(chartsData);
    } catch (error) {
      console.error('Failed to load home data:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    loadHomeData();
  };

  const handlePlayTrack = (track: any) => {
    play({
      id: track.id.toString(),
      title: track.title,
      artist: track.artist?.name || 'Unknown Artist',
      artwork: track.album?.cover_xl || track.album?.cover_big || '',
      url: track.preview || '',
      duration: track.duration || 0,
    });
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
        <Text style={styles.headerTitle}>Witly Music</Text>
        <Text style={styles.headerSubtitle}>Müziğin dünyasına hoş geldin</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🔥 Popüler Şarkılar</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {charts?.charts?.data?.slice(0, 10).map((track: any, index: number) => (
            <TouchableOpacity
              key={track.id}
              style={styles.trackCard}
              onPress={() => handlePlayTrack(track)}>
              <Image
                source={{ uri: track.album?.cover_xl || track.album?.cover_big }}
                style={styles.trackImage}
              />
              <Text style={styles.trackTitle} numberOfLines={1}>
                {track.title}
              </Text>
              <Text style={styles.trackArtist} numberOfLines={1}>
                {track.artist?.name}
              </Text>
              <View style={styles.rankBadge}>
                <Text style={styles.rankText}>#{index + 1}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🎵 Yeni Çıkanlar</Text>
        {charts?.charts?.data?.slice(10, 20).map((track: any) => (
          <TouchableOpacity
            key={track.id}
            style={styles.listItem}
            onPress={() => handlePlayTrack(track)}>
            <Image
              source={{ uri: track.album?.cover_medium }}
              style={styles.listItemImage}
            />
            <View style={styles.listItemInfo}>
              <Text style={styles.listItemTitle} numberOfLines={1}>
                {track.title}
              </Text>
              <Text style={styles.listItemArtist} numberOfLines={1}>
                {track.artist?.name}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
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
  headerSubtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.9,
    marginTop: 4,
  },
  section: {
    marginTop: 24,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: 16,
  },
  trackCard: {
    width: 160,
    marginLeft: 16,
    position: 'relative',
  },
  trackImage: {
    width: 160,
    height: 160,
    borderRadius: 12,
    backgroundColor: '#282828',
  },
  trackTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginTop: 8,
  },
  trackArtist: {
    fontSize: 12,
    color: '#B3B3B3',
    marginTop: 2,
  },
  rankBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#1DB954',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  rankText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  listItemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#282828',
  },
  listItemInfo: {
    flex: 1,
    marginLeft: 12,
  },
  listItemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  listItemArtist: {
    fontSize: 14,
    color: '#B3B3B3',
    marginTop: 2,
  },
});

export default HomeScreen;
