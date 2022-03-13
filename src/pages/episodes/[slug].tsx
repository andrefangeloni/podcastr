import Link from 'next/link';
import Image from 'next/image';
import { GetStaticProps, GetStaticPaths } from 'next';

import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import api from '../../services/api';

import { durationConvert } from '../../utils/durationConvert';

import styles from './episode.module.scss';

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

type EpisodeProps = {
  episode: Episode;
};

const Episode = ({ episode }: EpisodeProps) => (
  <div className={styles.episode}>
    <div className={styles.thumbnailContainer}>
      <Link href="/">
        <button>
          <img src="/arrow-left.svg" alt="Voltar" />
        </button>
      </Link>
      <Image
        width={700}
        height={160}
        alt="Thumbnail"
        objectFit="cover"
        src={episode.thumbnail}
      />

      <button type="button">
        <img src="/play.svg" alt="Tocar episódio" />
      </button>
    </div>

    <header>
      <h1>{episode.title}</h1>
      <span>{episode.members}</span>
      <span>{episode.publishedAt}</span>
      <span>{episode.durationAsString}</span>
    </header>

    <div
      className={styles.description}
      dangerouslySetInnerHTML={{ __html: episode.description }}
    />
  </div>
);

export default Episode;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { slug } = ctx.params;

  const { data } = await api.get(`/episodes/${slug}`);

  const episode = {
    id: data.id,
    title: data.title,
    url: data.file.url,
    members: data.members,
    thumbnail: data.thumbnail,
    duration: data.file.duration,
    description: data.description,
    durationAsString: durationConvert(data.file.duration),
    publishedAt: format(parseISO(data.published_at), 'd MMM yy', {
      locale: ptBR,
    }),
  };

  return {
    props: {
      episode,
    },
    revalidate: 60 * 60 * 24, // 24 hours
  };
};
