import React from 'react';

import Image from 'next/image';

import Slider from 'rc-slider';

import { PlayerContext } from '../../contexts/PlayerContext';

import 'rc-slider/assets/index.css';
import styles from './styles.module.scss';

const Player = () => {
  const audioRef = React.useRef<HTMLAudioElement>(null);

  const {
    playNext,
    isPlaying,
    togglePlay,
    episodeList,
    playPrevious,
    setPlayingState,
    currentEpisodeIndex,
  } = React.useContext(PlayerContext);

  const episode = episodeList[currentEpisodeIndex];

  React.useEffect(() => {
    if (!audioRef.current) {
      return;
    }

    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  return (
    <div className={styles.playerContainer}>
      <header>
        <img src="/playing.svg" alt="Tocando agora" />
        <strong>Tocando agora {episode?.title}</strong>
      </header>

      {episode ? (
        <div className={styles.currentEpisode}>
          <Image
            width={592}
            height={592}
            objectFit="cover"
            alt="Episódio atual"
            src={episode.thumbnail}
          />
          <strong>{episode.title}</strong>
          <span>{episode.members}</span>
        </div>
      ) : (
        <div className={styles.emptyPlayer}>
          <strong>Selecione um Podcast para ouvir</strong>
        </div>
      )}

      <footer className={episode ? '' : styles.empty}>
        <div className={styles.progress}>
          <span>00:00</span>
          <div className={styles.slider}>
            {episode ? (
              <Slider
                railStyle={{ backgroundColor: '#9f75ff' }}
                trackStyle={{ backgroundColor: '#04d361' }}
                handleStyle={{ borderColor: '#04d361', borderWidth: 4 }}
              />
            ) : (
              <div className={styles.emptySlider} />
            )}
          </div>
          <span>00:00</span>
        </div>

        {episode ? (
          <audio
            autoPlay
            ref={audioRef}
            src={episode.url}
            onPlay={() => setPlayingState(true)}
            onPause={() => setPlayingState(false)}
          />
        ) : null}

        <div className={styles.buttons}>
          <button type="button" disabled={!episode}>
            <img src="/shuffle.svg" alt="Embaralhar" />
          </button>

          <button
            type="button"
            disabled={!episode}
            onClick={() => playPrevious()}
          >
            <img src="/play-previous.svg" alt="Tocar anterior" />
          </button>

          <button
            type="button"
            disabled={!episode}
            className={styles.playButton}
            onClick={() => togglePlay()}
          >
            <img
              src={isPlaying ? '/pause.svg' : '/play.svg'}
              alt={isPlaying ? 'Pausar' : 'Tocar'}
            />
          </button>

          <button
            type="button"
            disabled={!episode}
            onClick={() => playNext()}
          >
            <img src="/play-next.svg" alt="Tocar próxima" />
          </button>

          <button type="button" disabled={!episode}>
            <img src="/repeat.svg" alt="Repetir" />
          </button>
        </div>
      </footer>
    </div>
  );
};

export { Player };
