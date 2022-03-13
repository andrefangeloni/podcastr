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

  togglePlay: () => void;
  play: (episode: Episode) => void;
  setPlayingState: (state: boolean) => void;
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
  const [currentEpisodeIndex, setcurrentEpisodeIndex] = React.useState(0);

  const play = (episode: Episode) => {
    setEpisodeList([episode]);
    setcurrentEpisodeIndex(0);
    setIsPlaying(true);
  };

  const togglePlay = () => setIsPlaying((prevState) => !prevState);

  const setPlayingState = (state: boolean) => setIsPlaying(state);

  return (
    <PlayerContext.Provider
      value={{
        play,
        isPlaying,
        togglePlay,
        episodeList,
        setPlayingState,
        currentEpisodeIndex,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};
