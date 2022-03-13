import React from 'react';

import Image from 'next/image';

import Slider from 'rc-slider';

import { usePlayer } from '../../hooks/usePlayer';

import { durationConvert } from '../../utils/durationConvert';

import 'rc-slider/assets/index.css';
import styles from './styles.module.scss';

const Player = () => {
  const [progress, setProgress] = React.useState(0);

  const audioRef = React.useRef<HTMLAudioElement>(null);

  const {
    hasNext,
    playNext,
    isPlaying,
    isLooping,
    togglePlay,
    toggleLoop,
    hasPrevious,
    episodeList,
    isShuffling,
    playPrevious,
    toggleShuffle,
    setPlayingState,
    clearPlayerState,
    currentEpisodeIndex,
  } = usePlayer();

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

  const setupProgressListener = () => {
    audioRef.current.currentTime = 0;

    audioRef.current.addEventListener('timeupdate', () => {
      setProgress(Math.floor(audioRef.current.currentTime));
    })
  };

  const handleSeek = (amount: number) => {
    audioRef.current.currentTime = amount;
    setProgress(amount);
  };

  const handleEnded = () => {
    if (hasNext) {
      playNext();
    } else {
      clearPlayerState();
    }
  };

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
          <span>{durationConvert(progress)}</span>
          <div className={styles.slider}>
            {episode ? (
              <Slider
                value={progress}
                onChange={handleSeek}
                max={episode.duration}
                railStyle={{ backgroundColor: '#9f75ff' }}
                trackStyle={{ backgroundColor: '#04d361' }}
                handleStyle={{ borderColor: '#04d361', borderWidth: 4 }}
              />
            ) : (
              <div className={styles.emptySlider} />
            )}
          </div>
          <span>{durationConvert(episode?.duration ?? 0)}</span>
        </div>

        {episode ? (
          <audio
            autoPlay
            ref={audioRef}
            loop={isLooping}
            src={episode.url}
            onEnded={handleEnded}
            onPlay={() => setPlayingState(true)}
            onPause={() => setPlayingState(false)}
            onLoadedMetadata={() => setupProgressListener()}
          />
        ) : null}

        <div className={styles.buttons}>
          <button
            type="button"
            onClick={() => toggleShuffle()}
            className={isShuffling ? styles.isActive : ''}
            disabled={!episode || episodeList.length === 1}
          >
            <img src="/shuffle.svg" alt="Embaralhar" />
          </button>

          <button
            type="button"
            onClick={() => playPrevious()}
            disabled={!episode || !hasPrevious}
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
            onClick={() => playNext()}
            disabled={!episode || !hasNext}
          >
            <img src="/play-next.svg" alt="Tocar próxima" />
          </button>

          <button
            type="button"
            disabled={!episode}
            onClick={() => toggleLoop()}
            className={isLooping ? styles.isActive : ''}
          >
            <img src="/repeat.svg" alt="Repetir" />
          </button>
        </div>
      </footer>
    </div>
  );
};

export { Player };
