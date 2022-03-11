import Image from 'next/image';
import { GetStaticProps } from 'next';

import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import api from '../services/api';

import { durationConvert } from '../utils/durationConvert';

import styles from './home.module.scss';

type Episode = {
  id: string;
  url: string;
  title: string;
  members: string;
  duration: number;
  thumbnail: string;
  description: string;
  publishedAt: string;
  durationAsString: number;
};

type HomeProps = {
  allEpisodes: Episode[];
  latestEpisodes: Episode[];
};

const Home = ({ allEpisodes, latestEpisodes }: HomeProps) => (
  <div className={styles.homePage}>
    <section className={styles.latestEpisodes}>
      <h2>Últimos lançamentos</h2>

      <ul>
        {latestEpisodes.map((episode) => (
          <li key={episode.id}>
            <Image
              width={192}
              height={192}
              objectFit="cover"
              alt={episode.title}
              src={episode.thumbnail}
            />

            <div className={styles.episodeDetails}>
              <a href="">{episode.title}</a>
              <p>{episode.members}</p>
              <span>{episode.publishedAt}</span>
              <span>{episode.durationAsString}</span>
            </div>

            <button type="button">
              <img src="/play-green.svg" alt="Tocar episódio" />
            </button>
          </li>
        ))}
      </ul>
    </section>

    <section className={styles.allEpisodes}>
      <h2>Todos episódios</h2>

      <table cellSpacing={0}>
        <thead>
          <th></th>
          <th>Podcast</th>
          <th>Integrantes</th>
          <th>Data</th>
          <th>Duração</th>
          <th></th>
        </thead>
        <tbody>
          {allEpisodes.map((episode) => (
            <tr key={episode.id}>
              <td style={{ width: 72 }}>
                <Image
                  width={120}
                  height={120}
                  src={episode.thumbnail}
                  alt={episode.title}
                  objectFit="cover"
                />
              </td>
              <td>
                <a href="">{episode.title}</a>
              </td>
              <td>{episode.members}</td>
              <td style={{ width: 100 }}>{episode.publishedAt}</td>
              <td>{episode.durationAsString}</td>
              <td>
                <button type="button">
                  <img src="/play-green.svg" alt="Tocar episódio" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  </div>
);

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get('/episodes', {
    params: {
      _limit: 12,
      _sort: 'published_at',
      _order: 'desc',
    },
  });

  const episodes = data.map((episode) => ({
    id: episode.id,
    title: episode.title,
    url: episode.file.url,
    members: episode.members,
    thumbnail: episode.thumbnail,
    duration: episode.file.duration,
    description: episode.description,
    durationAsString: durationConvert(episode.file.duration),
    publishedAt: format(parseISO(episode.published_at), 'd MMM yy', {
      locale: ptBR,
    }),
  }));

  const latestEpisodes = episodes.slice(0, 2);
  const allEpisodes = episodes.slice(2, episodes.length);

  return {
    props: {
      allEpisodes,
      latestEpisodes,
    },
    revalidate: 60 * 60 * 8,
  };
};
