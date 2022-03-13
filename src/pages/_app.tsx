import React from 'react';

import { Header } from '../components/Header';
import { Player } from '../components/Player';

import { PlayerContext } from '../contexts/PlayerContext';

import '../styles/global.scss';
import styles from '../styles/app.module.scss';

const MyApp = ({ Component, pageProps }) => {
  const [episodeList, setEpisodeList] = React.useState([]);
  const [currentEpisodeIndex, setcurrentEpisodeIndex] = React.useState(0);

  const play = (episode) => {
    setEpisodeList([episode]);
    setcurrentEpisodeIndex(0);
  };

  return (
    <PlayerContext.Provider
      value={{
        play,
        episodeList,
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
