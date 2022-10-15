import HeadComponent from "./head-component";
import MainBody from "./main-body";
import { NavBar } from "./nav-bar";

interface LayoutProps {
  children: React.ReactNode;
  username: string;
}

const Layout: React.FC<LayoutProps> = ({ children, username }: LayoutProps) => {
  return (
    <>
      <HeadComponent />
      <div className="w-full min-h-screen overflow-y relative flex flex-col">
        <MainBody username={username}>{children}</MainBody>
      </div>
    </>
  );
};

export default Layout;
