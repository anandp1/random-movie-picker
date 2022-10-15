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
    <div className="flex flex-row grow h-full bg-gray-200">
      <div className="relative container mx-auto max-w-7xl px-8 py-4 flex flex-col">
        {children}
        <NavBar username={username} />
      </div>
    </div>
  );
};

export default MainBody;
