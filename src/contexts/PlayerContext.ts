import React from 'react';

type Episode = {
  url: string;
  title: string;
  members: string;
  duration: number;
  thumbnail: string;
}

type PlayerContextData = {
  isPlaying: boolean;
  episodeList: Episode[];
  currentEpisodeIndex: number;

  togglePlay: () => void;
  play: (episode: Episode) => void;
  setPlayingState: (state: boolean) => void;
}

export const PlayerContext = React.createContext({} as PlayerContextData);
