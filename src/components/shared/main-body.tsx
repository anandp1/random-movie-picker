import { KeyedMutator } from "swr";
import { SafeUser } from "../../modal/user.modal";
import { NavBar } from "./nav-bar";

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
    <div className="grid grid-cols-1 grow h-full bg-black">
      <div className="relative px-6 py-4 flex flex-col">
        {children}
        <NavBar
          mutateUserData={mutateUserData}
          availableUsers={availableUsers}
          username={username}
        />
      </div>
    </div>
  );
};

export default MainBody;
