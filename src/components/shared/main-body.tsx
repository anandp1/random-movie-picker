import { NavBar } from "./nav-bar";

interface MainBodyProps {
  children: React.ReactNode;
}

const MainBody: React.FC<MainBodyProps> = ({ children }: MainBodyProps) => {
  return (
    <div className="flex flex-row grow h-full bg-gray-200">
      <div className="relative container mx-auto max-w-7xl px-8 py-4 flex flex-col">
        {children}
        <NavBar />
      </div>
    </div>
  );
};

export default MainBody;
