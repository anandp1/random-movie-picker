import type { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";
import useSWR from "swr";
import Layout from "../components/shared/layout";
import { fetcher } from "../lib/fetcher";

import MovieRow from "../components/home/movie-row";

interface HomeProps {
  username: string;
}

const Home: NextPage = ({ username }: HomeProps) => {
  const { data, error, mutate } = useSWR("/api/user-movies", fetcher);

  if (error) {
    return (
      <Layout username={username} mutateUserData={mutate}>
        <p>Failed to load</p>
      </Layout>
    );
  }

  return (
    <Layout username={username} mutateUserData={mutate}>
      {data ? (
        <div className="flex flex-col gap-y-3">
          {Object.keys(data.moviesByUser).map((username, index) => {
            return (
              <MovieRow
                key={username}
                username={username}
                randomId={index}
                data={data}
              />
            );
          })}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </Layout>
  );
};

const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session?.user?.email) {
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
