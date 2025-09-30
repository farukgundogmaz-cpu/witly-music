import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import TrackPlayer, { State, usePlaybackState, useProgress } from 'react-native-track-player';

interface Track {
  id: string;
  title: string;
  artist: string;
  artwork: string;
  url: string;
  duration: number;
}

interface PlayerContextType {
  currentTrack: Track | null;
  isPlaying: boolean;
  playlist: Track[];
  play: (track: Track) => Promise<void>;
  pause: () => Promise<void>;
  resume: () => Promise<void>;
  skipToNext: () => Promise<void>;
  skipToPrevious: () => Promise<void>;
  seekTo: (position: number) => Promise<void>;
  setPlaylist: (tracks: Track[]) => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider = ({ children }: { children: ReactNode }) => {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [playlist, setPlaylistState] = useState<Track[]>([]);
  const playbackState = usePlaybackState();
  const isPlaying = playbackState === State.Playing;

  useEffect(() => {
    setupPlayer();
    return () => {
      TrackPlayer.reset();
    };
  }, []);

  const setupPlayer = async () => {
    try {
      await TrackPlayer.setupPlayer();
      await TrackPlayer.updateOptions({
        stopWithApp: false,
        capabilities: [
          TrackPlayer.CAPABILITY_PLAY,
          TrackPlayer.CAPABILITY_PAUSE,
          TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
          TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
          TrackPlayer.CAPABILITY_SEEK_TO,
        ],
        compactCapabilities: [
          TrackPlayer.CAPABILITY_PLAY,
          TrackPlayer.CAPABILITY_PAUSE,
          TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
        ],
      });
    } catch (error) {
      console.error('Failed to setup player:', error);
    }
  };

  const play = async (track: Track) => {
    try {
      await TrackPlayer.reset();
      await TrackPlayer.add({
        id: track.id,
        url: track.url,
        title: track.title,
        artist: track.artist,
        artwork: track.artwork,
        duration: track.duration,
      });
      await TrackPlayer.play();
      setCurrentTrack(track);
    } catch (error) {
      console.error('Failed to play track:', error);
    }
  };

  const pause = async () => {
    try {
      await TrackPlayer.pause();
    } catch (error) {
      console.error('Failed to pause:', error);
    }
  };

  const resume = async () => {
    try {
      await TrackPlayer.play();
    } catch (error) {
      console.error('Failed to resume:', error);
    }
  };

  const skipToNext = async () => {
    try {
      await TrackPlayer.skipToNext();
      const track = await TrackPlayer.getTrack(await TrackPlayer.getCurrentTrack());
      if (track) {
        setCurrentTrack({
          id: track.id as string,
          title: track.title as string,
          artist: track.artist as string,
          artwork: track.artwork as string,
          url: track.url as string,
          duration: track.duration as number,
        });
      }
    } catch (error) {
      console.error('Failed to skip to next:', error);
    }
  };

  const skipToPrevious = async () => {
    try {
      await TrackPlayer.skipToPrevious();
      const track = await TrackPlayer.getTrack(await TrackPlayer.getCurrentTrack());
      if (track) {
        setCurrentTrack({
          id: track.id as string,
          title: track.title as string,
          artist: track.artist as string,
          artwork: track.artwork as string,
          url: track.url as string,
          duration: track.duration as number,
        });
      }
    } catch (error) {
      console.error('Failed to skip to previous:', error);
    }
  };

  const seekTo = async (position: number) => {
    try {
      await TrackPlayer.seekTo(position);
    } catch (error) {
      console.error('Failed to seek:', error);
    }
  };

  const setPlaylist = (tracks: Track[]) => {
    setPlaylistState(tracks);
  };

  return (
    <PlayerContext.Provider
      value={{
        currentTrack,
        isPlaying,
        playlist,
        play,
        pause,
        resume,
        skipToNext,
        skipToPrevious,
        seekTo,
        setPlaylist,
      }}>
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
};
