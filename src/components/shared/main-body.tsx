import { NavBar } from "./nav-bar";

interface MainBodyProps {
  children: React.ReactNode;
  username: string;
}

const MainBody: React.FC<MainBodyProps> = ({
  children,
  username,
}: MainBodyProps) => {
  return (
    <div className="grid grid-cols-1 grow h-full bg-gray-200">
      <div className="relative px-6 py-4 flex flex-col">
        {children}
        <NavBar username={username} />
      </div>
    </div>
  );
};

export default MainBody;
