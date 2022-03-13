import React from 'react';

import { Header } from '../components/Header';
import { Player } from '../components/Player';

import { PlayerContext } from '../contexts/PlayerContext';

import '../styles/global.scss';
import styles from '../styles/app.module.scss';

const MyApp = ({ Component, pageProps }) => {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [episodeList, setEpisodeList] = React.useState([]);
  const [currentEpisodeIndex, setcurrentEpisodeIndex] = React.useState(0);

  const play = (episode) => {
    setEpisodeList([episode]);
    setcurrentEpisodeIndex(0);
    setIsPlaying(true);
  };

  const togglePlay = () => setIsPlaying(prevState => !prevState);

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
      <div className={styles.wrapper}>
        <main>
          <Header />
          <Component {...pageProps} />
        </main>

        <Player />
      </div>
    </PlayerContext.Provider>
  );
};

export default MyApp;
