import { GetStaticProps, GetStaticPaths } from 'next';
import { ParsedUrlQuery } from 'querystring';

interface IParams extends ParsedUrlQuery {
  username: string;
}

const Profile = ({ username }: { username: string }) => {
  return (
    <div>
      <h1>Profile: {username}</h1>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { username } = context.params as IParams;
  console.log('username: ', username);
  return {
    props: {
      username,
    },
  };
};

export const getStaticPaths: GetStaticPaths<{ username: string }> = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: 'blocking', //indicates the type of fallback
  };
};

export default Profile;
