import React from 'react';

type Episode = {
  url: string;
  title: string;
  members: string;
  duration: number;
  thumbnail: string;
};

type PlayerContextData = {
  hasNext: boolean;
  isPlaying: boolean;
  hasPrevious: boolean;
  episodeList: Episode[];
  currentEpisodeIndex: number;

  playNext: () => void;
  togglePlay: () => void;
  playPrevious: () => void;
  play: (episode: Episode) => void;
  setPlayingState: (state: boolean) => void;
  playList: (list: Episode[], index: number) => void;
};

type PlayerContextProviderProps = {
  children: React.ReactNode;
};

export const PlayerContext = React.createContext({} as PlayerContextData);

export const PlayerContextProvider = ({
  children,
}: PlayerContextProviderProps) => {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [episodeList, setEpisodeList] = React.useState([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = React.useState(0);

  const play = (episode: Episode) => {
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
    setIsPlaying(true);
  };

  const playList = (list: Episode[], index: number) => {
    setEpisodeList(list);
    setCurrentEpisodeIndex(index);
    setIsPlaying(true);
  };

  const togglePlay = () => setIsPlaying((prevState) => !prevState);

  const setPlayingState = (state: boolean) => setIsPlaying(state);

  const hasNext = currentEpisodeIndex + 1 < episodeList.length;
  const hasPrevious = currentEpisodeIndex > 0;

  const playNext = () => {
    if (hasNext) {
      setCurrentEpisodeIndex(currentEpisodeIndex + 1);
    }
  };

  const playPrevious = () => {
    if (hasPrevious) {
      setCurrentEpisodeIndex(currentEpisodeIndex - 1);
    }
  };

  return (
    <PlayerContext.Provider
      value={{
        play,
        hasNext,
        playList,
        playNext,
        isPlaying,
        togglePlay,
        episodeList,
        hasPrevious,
        playPrevious,
        setPlayingState,
        currentEpisodeIndex,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};
