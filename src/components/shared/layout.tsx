import HeadComponent from "./head-component";
import MainBody from "./main-body";
import { NavBar } from "./nav-bar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }: LayoutProps) => {
  return (
    <>
      <HeadComponent />
      <div className="w-full min-h-screen overflow-y relative flex flex-col">
        <MainBody>{children}</MainBody>
      </div>
    </>
  );
};

export default Layout;
