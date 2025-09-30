import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { musicService } from '../../services/api/music.service';
import { usePlayer } from '../../contexts/PlayerContext';

const SearchScreen = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const { play } = usePlayer();

  const handleSearch = async (text: string) => {
    setQuery(text);

    if (text.length < 2) {
      setResults(null);
      return;
    }

    setLoading(true);
    try {
      const searchResults = await musicService.search(text, 'track', 20);
      setResults(searchResults);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
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

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Icon name="search" size={20} color="#B3B3B3" />
          <TextInput
            style={styles.searchInput}
            placeholder="Şarkı, sanatçı veya albüm ara..."
            placeholderTextColor="#B3B3B3"
            value={query}
            onChangeText={handleSearch}
            autoCapitalize="none"
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => handleSearch('')}>
              <Icon name="close-circle" size={20} color="#B3B3B3" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView style={styles.content}>
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#1DB954" />
          </View>
        )}

        {!loading && results && (
          <View style={styles.results}>
            <Text style={styles.resultsTitle}>
              {results.results?.data?.length || 0} sonuç bulundu
            </Text>
            {results.results?.data?.map((track: any) => (
              <TouchableOpacity
                key={track.id}
                style={styles.resultItem}
                onPress={() => handlePlayTrack(track)}>
                <Image
                  source={{ uri: track.album?.cover_medium }}
                  style={styles.resultImage}
                />
                <View style={styles.resultInfo}>
                  <Text style={styles.resultTitle} numberOfLines={1}>
                    {track.title}
                  </Text>
                  <Text style={styles.resultArtist} numberOfLines={1}>
                    {track.artist?.name}
                  </Text>
                  <Text style={styles.resultAlbum} numberOfLines={1}>
                    {track.album?.title}
                  </Text>
                </View>
                <Icon name="play-circle" size={32} color="#1DB954" />
              </TouchableOpacity>
            ))}
          </View>
        )}

        {!loading && !results && (
          <View style={styles.emptyState}>
            <Icon name="musical-notes" size={64} color="#282828" />
            <Text style={styles.emptyStateTitle}>Müzik ara</Text>
            <Text style={styles.emptyStateText}>
              Sevdiğin şarkıları, sanatçıları ve albümleri bul
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  searchContainer: {
    padding: 16,
    paddingTop: 48,
    backgroundColor: '#1DB954',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#000000',
  },
  content: {
    flex: 1,
  },
  loadingContainer: {
    padding: 32,
    alignItems: 'center',
  },
  results: {
    padding: 16,
  },
  resultsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  resultImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#282828',
  },
  resultInfo: {
    flex: 1,
    marginLeft: 12,
    marginRight: 12,
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  resultArtist: {
    fontSize: 14,
    color: '#B3B3B3',
    marginTop: 2,
  },
  resultAlbum: {
    fontSize: 12,
    color: '#808080',
    marginTop: 2,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
    marginTop: 64,
  },
  emptyStateTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 16,
  },
  emptyStateText: {
    fontSize: 14,
    color: '#B3B3B3',
    textAlign: 'center',
    marginTop: 8,
  },
});

export default SearchScreen;
