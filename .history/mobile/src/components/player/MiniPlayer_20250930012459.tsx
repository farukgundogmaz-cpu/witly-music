import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { usePlayer } from '../../contexts/PlayerContext';

const MiniPlayer = () => {
  const { currentTrack, isPlaying, play, pause, resume, skipToNext } = usePlayer();

  if (!currentTrack) {
    return null;
  }

  const togglePlayPause = () => {
    if (isPlaying) {
      pause();
    } else {
      resume();
    }
  };

  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.9}>
      <View style={styles.content}>
        <Image
          source={{ uri: currentTrack.artwork }}
          style={styles.artwork}
        />
        
        <View style={styles.info}>
          <Text style={styles.title} numberOfLines={1}>
            {currentTrack.title}
          </Text>
          <Text style={styles.artist} numberOfLines={1}>
            {currentTrack.artist}
          </Text>
        </View>

        <View style={styles.controls}>
          <TouchableOpacity
            onPress={togglePlayPause}
            style={styles.controlButton}>
            <Icon
              name={isPlaying ? 'pause' : 'play'}
              size={28}
              color="#FFFFFF"
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={skipToNext}
            style={styles.controlButton}>
            <Icon name="play-skip-forward" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.progressBar}>
        <View style={styles.progress} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 60,
    left: 0,
    right: 0,
    backgroundColor: '#282828',
    borderTopWidth: 1,
    borderTopColor: '#404040',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  artwork: {
    width: 48,
    height: 48,
    borderRadius: 6,
    backgroundColor: '#404040',
  },
  info: {
    flex: 1,
    marginLeft: 12,
    marginRight: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  artist: {
    fontSize: 12,
    color: '#B3B3B3',
    marginTop: 2,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  controlButton: {
    padding: 8,
    marginLeft: 8,
  },
  progressBar: {
    height: 2,
    backgroundColor: '#404040',
  },
  progress: {
    height: '100%',
    width: '30%',
    backgroundColor: '#1DB954',
  },
});

export default MiniPlayer;
