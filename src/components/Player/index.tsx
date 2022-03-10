import Image from 'next/image';

import styles from './styles.module.scss';

const Player = () => (
  <div className={styles.playerContainer}>
    <header>
      <Image src="/playing.svg" alt="Tocando agora" width={40} height={22.5} />
      <strong>Tocando agora</strong>
    </header>

    <div className={styles.emptyPlayer}>
      <strong>Selecione um Podcast para ouvir</strong>
    </div>

    <footer className={styles.empty}>
      <div className={styles.progress}>
        <span>00:00</span>
        <div className={styles.slider}>
          <div className={styles.emptySlider} />
        </div>
        <span>00:00</span>
      </div>

      <div className={styles.buttons}>
        <button type="button">
          <Image src="/shuffle.svg" alt="Embaralhar" width={40} height={22.5} />
        </button>

        <button type="button">
          <Image
            src="/play-previous.svg"
            alt="Tocar anterior"
            width={40}
            height={22.5}
          />
        </button>

        <button type="button" className={styles.playButton}>
          <Image src="/play.svg" alt="Tocar" width={40} height={22.5} />
        </button>

        <button type="button">
          <Image
            src="/play-next.svg"
            alt="Tocar próxima"
            width={40}
            height={22.5}
          />
        </button>

        <button type="button">
          <Image src="/repeat.svg" alt="Repetir" width={40} height={22.5} />
        </button>
      </div>
    </footer>
  </div>
);

export { Player };
