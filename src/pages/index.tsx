import type { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";
import Image from "next/image";
import useSWR from "swr";
import Layout from "../components/shared/layout";
import { fetcher } from "../lib/fetcher";
import { Movie } from "../modal/user.modal";

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
          {Object.keys(data.moviesByUser).map((displayName) => {
            return (
              <div key={displayName}>
                <h1 className="text-black font-semibold text-4xl mb-2">
                  {displayName}
                </h1>
                <div className="flex flex-row gap-x-2">
                  {data.moviesByUser[displayName].map((movie: Movie) => {
                    return (
                      <Image
                        key={movie.imbdId}
                        height={280}
                        width={210}
                        src={movie.imageUrl}
                        alt={movie.title}
                      />
                    );
                  })}
                </div>
              </div>
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
