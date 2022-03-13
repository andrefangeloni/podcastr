import React from 'react';

type Episode = {
  url: string;
  title: string;
  members: string;
  duration: number;
  thumbnail: string;
};

type PlayerContextData = {
  isPlaying: boolean;
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

  const playNext = () => {
    const nextEpisodeIndex = currentEpisodeIndex + 1;

    if (nextEpisodeIndex < episodeList.length) {
      setCurrentEpisodeIndex(currentEpisodeIndex + 1);
    }
  };

  const playPrevious = () => {
    const nextEpisodeIndex = currentEpisodeIndex - 1;

    if (nextEpisodeIndex > 0) {
      setCurrentEpisodeIndex(currentEpisodeIndex - 1);
    }
  };

  return (
    <PlayerContext.Provider
      value={{
        play,
        playList,
        playNext,
        isPlaying,
        togglePlay,
        episodeList,
        playPrevious,
        setPlayingState,
        currentEpisodeIndex,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};
