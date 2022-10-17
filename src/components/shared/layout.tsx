import { KeyedMutator } from "swr";
import { SafeUser } from "../../modal/user.modal";
import HeadComponent from "./head-component";
import MainBody from "./main-body";
import { NavBar } from "./nav-bar";

interface LayoutProps {
  children: React.ReactNode;
  username: string;
  mutateUserData: KeyedMutator<any>;
  availableUsers: SafeUser[];
}

const Layout: React.FC<LayoutProps> = ({
  children,
  username,
  mutateUserData,
  availableUsers,
}: LayoutProps) => {
  return (
    <>
      <HeadComponent />
      <div className="w-full min-h-screen overflow-y relative flex flex-col">
        <MainBody
          username={username}
          mutateUserData={mutateUserData}
          availableUsers={availableUsers}
        >
          {children}
        </MainBody>
      </div>
    </>
  );
};

export default Layout;
