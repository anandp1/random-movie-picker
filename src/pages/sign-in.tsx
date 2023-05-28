import { GetServerSideProps } from "next";
import { getSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { Fade } from "react-awesome-reveal";

export enum SignInRole {
  USER = "user",
  GUEST = "guest",
}

const SignIn: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleSignIn = (role: SignInRole) => {
    if (role === SignInRole.GUEST) {
      setUsername(SignInRole.GUEST);
    }

    signIn("credentials", {
      username,
      password,
      redirect: false,
    });

    router.push("/");
  };

  return (
    <div className="w-screen h-screen bg-gradient-to-t from-slate-800 to-stone-900 flex flex-col justify-center sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* logo */}
          <Fade triggerOnce={true}>
            <div className="relative flex justify-center sm:mt-6 hover:opacity-75">
              <img
              className="w-[300px] lg:w-[360px] sm:mx-8"
              src={"logo.png"}
              alt={"Logo"}
              />
            </div>
          </Fade>
      </div>
      <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="space-y-6">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-stone-200"
              >
                Username
              </label>
              <div className="mt-1">
                <input
                  id="username"
                  name="username"
                  type="username"
                  autoComplete="username"
                  required
                  onChange={(event) => setUsername(event.target.value)}
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-stone-200"
              >
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  onChange={(event) => setPassword(event.target.value)}
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <button
                onClick={() => handleSignIn(SignInRole.USER)}
                className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-stone-200 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Sign In
              </button>
            </div>
          </div>
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-500" />
              </div>
              <div className="relative flex justify-center text-sm">
              </div>
            </div>

            <div className="mt-6">
              <div>
                <button
                  onClick={() => handleSignIn(SignInRole.GUEST)}
                  className="flex w-full justify-center rounded-md border border-transparent bg-indigo-800 py-2 px-4 text-sm font-medium text-stone-200 shadow-sm hover:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Guest Sign In
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (session?.user?.email) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export { getServerSideProps };

export default SignIn;
