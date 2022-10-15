import type { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";
import Layout from "../components/shared/layout";

interface HomeProps {
  username: string;
}

const Home: NextPage = ({ username }: HomeProps) => {
  return (
    <Layout username={username}>
      <p>Hlelo</p>
    </Layout>
  );
};

const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session.user.email) {
    console.log("here");
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
