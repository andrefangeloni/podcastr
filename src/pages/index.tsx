import api from '../services/api';

const Home = ({ episodes }) => <p>{JSON.stringify(episodes)}</p>;

export default Home;

export const getStaticProps = async () => {
  const { data } = await api.get('/episodes');

  return {
    props: {
      episodes: data,
    },
    revalidate: 60 * 60 * 8,
  };
};
