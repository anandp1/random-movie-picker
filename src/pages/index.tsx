import type { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";
import Layout from "../components/shared/layout";

const Home: NextPage = () => {
  return (
    <Layout>
      <p>Hlelo</p>
    </Layout>
  );
};

const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/sign-in",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export { getServerSideProps };

export default Home;
