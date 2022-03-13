import React from 'react';

type Episode = {
  url: string;
  title: string;
  members: string;
  duration: number;
  thumbnail: string;
}

type PlayerContextData = {
  episodeList: Episode[];
  currentEpisodeIndex: number;
  play: (episode: Episode) => void;
}

export const PlayerContext = React.createContext({} as PlayerContextData);
