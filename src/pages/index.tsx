import type { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";
import useSWR from "swr";
import Layout from "../components/shared/layout";
import { fetcher } from "../lib/fetcher";

interface HomeProps {
  username: string;
}

const Home: NextPage = ({ username }: HomeProps) => {
  const { data, error, mutate } = useSWR("/api/user-movies", fetcher);

  if (error) {
    return (
      <Layout username={username}>
        <p>Failed to load</p>
      </Layout>
    );
  }

  return (
    <Layout username={username}>
      {data ? (
        Object.keys(data.moviesByUser).map((displayName) => {
          return (
            <div key={displayName}>
              <h1>{displayName}</h1>
              <ul>
                {data.moviesByUser[displayName].map((movie) => {
                  return (
                    <li key={movie.imdbID}>
                      <img src={movie.imageUrl} alt={movie.title} />
                      <p>{movie.title}</p>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })
      ) : (
        <p>Loading...</p>
      )}
    </Layout>
  );
};

const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session.user.email) {
    return {
      redirect: {
        destination: "/sign-in",
        permanent: false,
      },
    };
  }

  return {
    props: {
      username: session.user.email,
    },
  };
};

export { getServerSideProps };

export default Home;
