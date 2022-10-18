import type { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";
import useSWR from "swr";
import Layout from "../components/shared/layout";
import { fetcher } from "../lib/fetcher";

import MovieRow from "../components/home/movie-row";
import { getAvailableUsers, SafeUser } from "../modal/user.modal";

interface HomeProps {
  username: string;
  availableUsers: SafeUser[];
}

const Home: NextPage = ({ username, availableUsers }: HomeProps) => {
  const { data, error, mutate } = useSWR("/api/user-movies", fetcher);

  const yourUsername = username;

  if (error) {
    return (
      <Layout
        username={username}
        mutateUserData={mutate}
        availableUsers={availableUsers}
      >
        <p>Failed to load</p>
      </Layout>
    );
  }

  return (
    <Layout
      username={username}
      mutateUserData={mutate}
      availableUsers={availableUsers}
    >
      {data ? (
        <div className="flex flex-col">
          {Object.keys(data.moviesByUser).map((username, index) => {
            return (
              <MovieRow
                key={username}
                username={username}
                yourUsername={yourUsername}
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

  const availableUsers = await getAvailableUsers();

  return {
    props: {
      username: session.user.email,
      availableUsers,
    },
  };
};

export { getServerSideProps };

export default Home;
