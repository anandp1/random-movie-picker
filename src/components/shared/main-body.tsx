/* eslint-disable @next/next/no-img-element */
import { KeyedMutator } from "swr";
import { SafeUser } from "../../modal/user.modal";
import { NavBar } from "./nav-bar";
import { Navigation } from "./navigation";

interface MainBodyProps {
  children: React.ReactNode;
  availableUsers: SafeUser[];
  mutateUserData: KeyedMutator<any>;
  username: string;
}

const MainBody: React.FC<MainBodyProps> = ({
  children,
  availableUsers,
  mutateUserData,
  username,
}: MainBodyProps) => {
  return (
    <div className="grid grid-cols-1 grow h-full bg-gradient-to-t from-slate-800 to-stone-900">
      <div className="relative px-6 py-4 flex flex-col">
        <Navigation
          mutateUserData={mutateUserData}
          availableUsers={availableUsers}
          username={username}/>
       {/* <img
        className="w-[200px] sm:w-[250px] lg:w-[300px] my-9 mx-4"
        src={"logo.png"}
        alt={"Logo"}
        /> */}
        {children}
        {/* <NavBar
          mutateUserData={mutateUserData}
          availableUsers={availableUsers}
          username={username}
        /> */}
      </div>
    </div>
  );
};

export default MainBody;
